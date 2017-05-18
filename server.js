var express = require("express");
var port = 8000;

var app = express();

app.use(express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
	res.sendFile(__dirname +'/static/index.html');
});

var server = app.listen(port, function(){
	console.log(`Listening on ${port}`);
});

require('./socket')(server);