const { response } = require('express');
var express = require('express'); //node.js exprees를 이용
var fs = require('fs'); //파일 읽기, 쓰기를 위한 node 내장 모듈 불러옴
var app = express()
var template = require('./template.js'); //js파일 읽기

app.use(express.static('image')); //정적인 사진 사용


app.get('/', function (request, response) {
  var html = template.TIME();
  response.send(html);
});

app.get('/login.html', function (request, response) {
  var html = template.LOGIN();
  response.send(html);
});

app.get('/register.html', function (request, response) {
  var html = template.REGISTER();
  response.send(html);
});



app.listen(3000)