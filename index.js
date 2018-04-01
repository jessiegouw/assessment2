'use strict'

var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')

express()
  .use(express.static('static'))
  .use(express.static(__dirname + '/public'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', home)
  .get('/login/', login)
  .get('/register/', register)
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

function notFound(req, res) {
  res.send('errors/error', 404)
}
