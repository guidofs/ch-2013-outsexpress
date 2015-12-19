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

  socket.on('disconnect', function(){
	var aux = {};
	for(name in nicknames)
	{
		if(name !== socket.nickname)
		{
			aux[name] = 1;
		}
	}
	nicknames.length=0;
	nicknames = aux;
	updatenick();
	io.sockets.emit('newMessage', {msg:"Desconectado" , nick:socket.nickname});
  });

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

function validarString (cadenaAnalizar) {
	var resultado = {nombre:"",id:-1};
	var nom = "";
   for (var i = 0; i< cadenaAnalizar.length; i++) {
         var caracter = cadenaAnalizar.charAt(i);
        if(caracter == ";")
        {
		resultado.id = i+6;

        }
        else

        {
	         if( caracter == " ") {
	            
	          }  else {

	  			nom += caracter;
	          }
    	}
	}
resultado.nombre=nom
return resultado; 
}

	socket.on('sendMessage',function(data)
	{
		var comando = 0;

		if(socket.jerarquia == 1)
			{
				if(socket.onoff==1)
					{
					
						if(data.substr(0, 5) == "alert")
							{
								var res = validarString(data.substr(6,data.length));
								io.sockets.emit('admin', {msg:"alert",user:res.nombre,txt:data.substr(res.id,data.length), nick:socket.nickname});
								comando = 1;
							}
						if(data.substr(0, 3) == "ban")
							{
								io.sockets.emit('admin', {msg:"ban",txt:data.substr(4,data.length), nick:socket.nickname});
								comando = 1;
							}
								if(data == "cls")
							{
								io.sockets.emit('admin', {msg:"cls", nick:socket.nickname});
								comando = 2;
							}
						
					}

					if(data == "gm")
					{
						data = "Login " + Login();
						comando = 0;

					}	

			}
		
			if(comando===0)
				io.sockets.emit('newMessage', {msg:data, nick:socket.nickname});
			
	});

function updatenick()
{
	io.sockets.emit('uernames',nicknames);
}
});