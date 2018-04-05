'use strict'

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')
var multer = require('multer')
var argon2 = require('argon2')

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

var upload = multer({dest: 'static/upload/'})

express()
  .use(express.static('static'))
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.urlencoded({extended: true}))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', home)
  .get('/login/', login)
  .get('/register', register)
  .post('/', upload.single('cover'), addUser)
  .use('/error/', notFound)
  .listen(8000, console.log('Ya servah runs 🔥'))

function home(req, res) {
  res.render('index')
}

function login(req, res) {
  res.render('user/login')
}

function register(req, res) {
  res.render('user/register')
}

function addUser(req, res, next) {
  Password: argon2.hash('Password').then(hash => {
  }).catch(err => {
    return
  })

  connection.query('INSERT INTO User SET ?', {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Username: req.body.Username,
    Password: req.body.Password,
    Details: req.body.Details,
    Cover: req.file ? req.file.filename : null
  }, done)

  if (req.body.Password != req.body.Password2) {
    res.send('Your password does not match')
    return
  }

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/' + data.insertId)
    }
  }
  connection.end()
}

function notFound(req, res) {
  res.send('errors/error', 404)
}
