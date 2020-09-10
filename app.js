var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

// app.get("/", function(req, res){
// 	res.sendFile(__dirname + "/index.html");	
// });

io.sockets.on('connection', function (socket) {
	
    console.log("NOTICE: NEW USER CONNECTED" + socket.id);
    console.log(getMilis());
    console.log(getFilenameImage(socket.id));
    socket.on("CLIENT_SEND_IMAGE",function(data){
        console.log(data);
        fs.writeFile( getFilenameImage(socket.id), data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
    });  

    socket.on("CLIENT_SEND_REQUEST", function(data){
        fs.readFile("test.png",function(err, data){
            if(!err) {
                io.emit('SERVER_SEND_IMAGE',data);
            } else{
                console.log('THAT BAI.');
            }
        });
    });
});
function getFilenameImage(id){
    return "images/" + id.substring(2) + getMilis() + ".png";
}

function getMilis(){
    var date = new Date();
    var milis = date.getTime();
    return milis;
}