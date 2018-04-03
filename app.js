'use strict'

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

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

connection.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
  if(err) console.log('err: ', err)
  else console.log('Terminated done: ')
})

express()
  .use(express.static('static'))
  .use(express.static(__dirname + '/public'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', home)
  .get('/login/', login)
  .get('/register/', register)
  .post('/', addUser)
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
  if (err) {
    next(err)
  } else {
    connection.query('INSERT INTO User SET? ', {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Username: req.body.Username,
      Password: req.body.Password,
      Description: req.body.Description,
      Cover: req.file ? req.file.filename : null
    }, done)
  }
}

function notFound(req, res) {
  res.send('errors/error', 404)
}
