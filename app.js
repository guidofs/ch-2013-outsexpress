var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	nicknames={},
	admin=['Guido','Joaco'],
	onoff = 0,
	admon = 0,
	flag = 0,
	jerarquia = 0;
server.listen(process.env.PORT || 3000, function(){
  console.log('listening on', server.address().port);
});
app.get('/',function(req,resp)

{
resp.sendfile(__dirname + '/index.html')
});

io.sockets.on('connection',function(socket){



function Login()

{
	if(socket.onoff==1)
	{
	socket.onoff=0;
	io.sockets.emit('newMessage', {msg:"Admin Off " + socket.nickname, nick:socket.nickname});
	}
	else
	{
	socket.onoff=1;
	io.sockets.emit('newMessage', {msg:"Admin On " + socket.nickname, nick:socket.nickname});
		}

}
	socket.on('admin',function(data,callback){
if(data)
{

		
}
});

	socket.on('newUser',function(data,callback){
		if(data in nicknames){
			callback(false);
		}
		else
		{
			callback(true);
			socket.nickname = data;
			nicknames[socket.nickname] = 1;

		for(var x = 0; x <= 1; x++)
		{
			if(socket.nickname == admin[x])
			socket.jerarquia=1;
		}


		}

			updatenick();

		

	});
	  socket.on('disconnect', function() {
    console.log('User disconnected');
  });

	socket.on('sendMessage',function(data){

		if(socket.jerarquia == 1)
		{
						if(data == "gm")
							{
								Login();	
							}
						else if(data == "alert")
						{
							io.sockets.emit('admin', {msg:"alert", nick:socket.nickname});
						}
							else
							{
								 io.sockets.emit('newMessage', {msg:"data", nick:socket.nickname});
							}

		}
		else
		{
				 io.sockets.emit('newMessage', {msg:data, nick:socket.nickname});
		}

	


	});

function updatenick()
{
	io.sockets.emit('uernames',nicknames);
}
});