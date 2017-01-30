//준비물 작성
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
connections = [];
server.listen(process.env.PORT || 3000);
console.log('3000번 포트에서 서버가 동작 중입니다.');
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});
