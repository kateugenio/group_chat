var all_messages = [];
var all_users = [];

module.exports = function(server){
	var io = require('socket.io').listen(server);
	io.sockets.on('connection', function(socket){
		console.log("Houston, we're using sockets!");
		var user = [];
		socket.on("got_a_new_user", function(req){
			var new_user = {};
			new_user[socket.id] = req.name;
			all_users.push(new_user);
			console.log(all_users);
			io.emit("new_user", {new_user: req.name});
			socket.emit("displayAll", {current_user: req.name, allMessages: all_messages});
		});
		socket.on("new_message", function(req){
			all_messages.push({name: req.current_user, message: req.newMessage});
			console.log(all_messages);
			io.emit("display_new_message", {user: req.current_user, new_message: req.newMessage});
		});
	});
}