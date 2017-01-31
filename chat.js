//준비물 작성
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
connections = []; //소켓 연결된 횟수 알아볼때 쓸거.
server.listen(process.env.PORT || 3000);
console.log('3000번 포트에서 서버가 동작 중입니다.');
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});
//소켓이 연결된 횟수를 알아보자.
io.sockets.on('connection', function(socket){
  connections.push(socket);//6번째 줄의 connections 배열을 쓰는 거다.
  console.log('connected : %s sockets connected', connections.length);
//소켓 연결 해제 되면 connectons.length를 줄이자.
  socket.on('disconnect', function(){
  connections.splice(connections.indexOf(socket),1);
  console.log('disconnected : %s sockets connected', connections.length);
  });
//index.html의  socket.emit('send message', $message.val()); 이벤트를  받는 부분을 만들자.
  socket.on('send message', function(data){
  console.log(data);
  io.sockets.emit('new message', {msg:data});//다시 new message 이벤트를 보낸다.
});
});
