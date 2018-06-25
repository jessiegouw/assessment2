// 'use strict'

var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var multer = require('multer')
var argon2 = require('argon2')
var helmet = require('helmet')
var compression = require('compression')

require('dotenv').config()

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect(function(err) {
  if(err) {
    console.log('Error connecting to Db')
    return
  }
  console.log('Connection established')
})

var upload = multer({dest: 'public/upload/'})

express()
  .use(helmet())
  .use(compression())
  .use(express.static('public'))
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.urlencoded({extended: true}))
  .set('trust proxy', 1) // trust first proxy
  .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', home)
  .get('/recipes', recipes)
  .post('/recipes', upload.single('Cover'), addRecipe)
  .get('/add', addForm)
  .get('/:id', recipe)
  .get('/profile', profile)
  .get('/register', registerForm)
  .post('/register', register)
  .get('/login', loginForm)
  .post('/login', login)
  .get('/logout', logout)
  .use(notFound)
  .listen(8000, console.log('Ya servah runs 🔥'))

function home(req, res) {
  res.render('index')
}

function registerForm(req, res) {
  res.render('user/register')
}

function register(req, res, next) {
  var FirstName = req.body.FirstName
  var LastName = req.body.LastName
  var Username = req.body.Username
  var Password = req.body.Password
  var Details = req.body.Details

  connection.query('SELECT * FROM User WHERE Username = ?', Username, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else if (data.length === 0) {
      argon2.hash(Password).then(addUser, next)
    } else {
      res.status(409).send('Username already in use')
    }
  }

  if (req.body.Password != req.body.Password2) {
    res.send('Your password does not match')
    return
  }

  function addUser(Password) {
    connection.query('INSERT INTO User SET ?', {
      FirstName: FirstName,
      LastName: LastName,
      Username: Username,
      Password: Password,
      Details: Details
    }, errorCheck)

    function errorCheck(err) {
      if (err) {
        next(err)
      } else {
        // User is now registered
        res.redirect('/login')
      }
    }
  }
}

function loginForm(req, res) {
  res.render('user/login')
}

function login(req, res, next) {
  var Username = req.body.Username
  var Password = req.body.Password

  connection.query('SELECT * FROM user WHERE Username = ?', Username, done)

  function done(err, data) {
    var user = data && data[0]

    if (err) {
      next(err)
    } else if (user) {
      console.log(user)
      argon2.verify(user.Password, Password).then(onverify, next)
    } else {
      res.status(401).send('Username does not exist')
    }

    function onverify(match) {
      if (match) {
        req.session.user = {Username: user.Username}
        res.redirect('/recipes')
      } else {
        res.status(401).send('Password incorrect')
      }
    }
  }
}

function logout(req, res) {
  // Destroy the session
  req.session.destroy()
  // Redirect to index page
  res.redirect('/')
  console.log('destroyed')
}

function recipes(req, res, next) {
  connection.query('SELECT * FROM recipe', done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('user/recipes', {data: data})
    }
  }
}

function recipe(req, res, next) {
  var id = req.params.id

  connection.query('SELECT * FROM recipe WHERE ID = ?', id, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else if (data.length === 0) {
      next()
    } else {
      res.render('user/detail', {data: data[0]})
    }
  }
}

function addForm(req, res) {
  res.render('user/add')
}

function addRecipe(req, res, next) {

  connection.query('INSERT INTO recipe SET ?', {
    Name: req.body.Name,
    Description: req.body.Description,
    Ingredients: req.body.Ingredients,
    Instructions: req.body.Instructions,
    Cover: req.file ? req.file.filename : null
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/' + data.insertId)
    }
  }
}

function notFound(req, res) {
  res.status(404).render('errors/error')
}
