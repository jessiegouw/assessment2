'use strict'

var express = require('express')
var app = express()
var path = require('path')

express()
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', home)
  .listen(8000, console.log('Ya servah runs 🔥'))

function home(req, res) {
  res.render('index')
}
