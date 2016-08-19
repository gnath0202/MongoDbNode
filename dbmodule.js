var databaseUrl = "localhost/customer";
var collections = ["users"]
var db = require("./mongojs").connect(databaseUrl, collections);

//db(databaseUrl, collections);
db.users.ensureIndex({email:1},{unique:true});

exports.authenticateUser = function(username,email,age,place,response){
	db.users.find({"name":username,"email":email,"age":age,"place":place},function(err, users) {
	
		if( err || !users){
			response.write("..Not Authorized User");
			response.end();
		}
		else if(users.length==0){
			response.write("Not Authorized User");
			response.end();
		}
		else{
			response.write("Authorized User");
			response.end();
		}
	
	});
}

exports.saveUser=function(username,email,age,place,response){
	
	console.log('Saving user details to MongoDB');
	db.users.save({"name":username,"email":email,"age":age,"place":place},function(err, saved) {
		if(err || !saved) response.end("User not saved in DB");
		else response.end("User saved in DB"+saved);
	});
}

exports.fetchUserDetails=function(username,email,age,place,response){
	console.log('Fetching user details from MongoDB');
	db.users.find({"name":username,"email":email,"age":age,"place":place},function(err, users) {
		if(err || !users){
			response.write("User not found in DB");
			response.end();
		} 
		else if(users.length==0){
			response.write("User not found in DB");
			response.end();
		}
		else {
			response.write("User found in DB"+ ":"+username+"|"+email+"|"+age+"|"+place);
			response.end();
		}
		
	});
}


