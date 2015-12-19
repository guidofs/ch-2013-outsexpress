var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	nicknames={},
	admin=['Guido','Joaco'],
	onoff = 0,
	admon = 0,
	flag = 0,
	id = -1;
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
	var resul = "on"
	if(socket.onoff==1)
	{
		resul ="OFF";
		socket.onoff=0;

	}
	else
	{
		resul ="ON"
		socket.onoff=1;

		}
		return resul;
}
	socket.on('newMessage',function(data,callback){
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
			socket.id = nickname.length;
			socket.nickname = data;
			nicknames[socket.nickname] = 1;

		for(var x = 0; x <= 1; x++)
		{
			if(socket.nickname == admin[x])
			socket.jerarquia=1;
			socket.onoff=0;
		}


		}

			updatenick();

		

	});


    socket.on('disconnect', function () {
    	nicknames.slice(socket.id,1);
    	updatenick();

    });

	socket.on('sendMessage',function(data)
	{

		if(socket.jerarquia == 1)
			{
				if(socket.onoff==1)
					{
					
						if(data.substr(0, 5) == "alert")
							{
								io.sockets.emit('admin', {msg:"alert",txt:data.substr(5,data.length), nick:socket.nickname});
							}

								if(data == "cls")
							{
								io.sockets.emit('admin', {msg:"cls", nick:socket.nickname});
							}
						
					}

					if(data == "gm")
					{
						data = "Login " + Login();

					}	

			}
		
				io.sockets.emit('newMessage', {msg:data, nick:socket.nickname});
			
	});

function updatenick()
{
	io.sockets.emit('uernames',nicknames);
}
});