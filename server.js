var module =require('./dbmodule');
var url=require('url');
var querystring=require('querystring');
var http=require('http');

http.createServer(function(request,response){
	var data1="";
	if(request.url === '/favicon.ico')
	{
		response.writeHead(200,{'content-Type' : 'image/x-icon'});
		//console.log("server.js IF part");
		response.end();
	}
	else
	{
		request.on('data',function(chunk){
			//console.log("server.js else part executing");
			data1+=chunk;
		});
		request.on('end',function(){
			var name=querystring.parse(data1)["username"];
			var email=querystring.parse(data1)["email"];
			var age=querystring.parse(data1)["age"];
			var place=querystring.parse(data1)["place"];
			console.log("username: "+name+"\n"+"emailID: "+email+"\n"+"age: "+age+"\n"+"place: "+place);
			if(request.url==='/login')
			{
				module.authenticateUser(name,email,age,place,response);
				console.log("User in Login mode");
			}
			else if(request.url==='/fetch')
			{
				module.fetchUserDetails(name,email,age,place,response);
				console.log("fetching user data");
			}
			else if(request.url==='/save')
			{
				module.saveUser(name,email,age,place,response);
				console.log("Saving user data");
			}
			
		});
	}
}).listen(3000);
console.log("Server has started at 3000");
