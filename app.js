var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	nicknames={},
	onoff = 0,
	jerarquia = 0;
server.listen(process.env.PORT || 3000, function(){
  console.log('listening on', server.address().port);
});
app.get('/',function(req,resp)

{
resp.sendfile(__dirname + '/index.html')
});

io.sockets.on('connection',function(socket){



function interna()

{
	if(onoff==0)
	{
	io.sockets.emit('newMessage', {msg:"Admin Off " + socket.nickname, nick:socket.nickname, jerarquia:socket.jerarquia});
	}
	else
	{

	io.sockets.emit('newMessage', {msg:"Admin On " + socket.nickname, nick:socket.nickname, jerarquia:socket.jerarquia});
		}
}

	socket.on('newUser',function(data,callback){
		if(data in nicknames){
			callback(false);
		}
		else
		{
			callback(true);
			socket.nickname = data;
			nicknames[socket.nickname] = 1;
			socket.jerarquia = 0;
			updatenick();

		}

	});
	socket.on('sendMessage',function(data){
		if(data=="admp")
		{
			if(onoff == 0)
			{
				onoff=1;
				socket.jerarquia=1;
			}
			else
			{
				onoff=0;

			}
			
		}
		if(onoff==1)
{
	io.sockets.emit('admin', {msg:data, nick:socket.nickname});
}
		if(socket.jerarquia==1)
		{


switch(data){
case "admp":
interna();
break;
case "ban":
io.sockets.emit('newMessage',{msg:"colagusano",nick:socket.nickname});
break;
default: io.sockets.emit('newMessage', {msg:data, nick:socket.nickname});
}
}
else
	io.sockets.emit('newMessage', {msg:data, nick:socket.nickname});

	});

function updatenick()
{
	io.sockets.emit('uernames',nicknames);
}
});