var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server);

app.get('/',function(req,res){
	res.sendFile(__dirname +'/index.html');
});

//Listen to client connection

io.on('connection',function(client){
	console.log('a user connected');
	client.on('disconnect',function(){
		console.log('user disconnected');
	});
	client.on('join', function(name) {
		client.nickname = name;
		io.emit('join',name + 'has joined');
	});
	client.on('chat message', function(data){
		console.log('message:' + data);
		var nickname = client.nickname;
		io.emit('chat message',nickname +': '+ data);
	});
});

server.listen(8080);