var express = require('express');
var cors = require('cors');
var app = express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
var bodyParser=require('body-parser');
//CRSF
app.use(cors());
app.options('*', cors());
//activation du module bodyParser pour preparer les donnees des requete http
app.use(bodyParser.json());
//pour permettre l'acces a ces dossiers pour le client
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.post("/societes", function (req, res,next) {
   io.sockets.emit("refreshSocietes",req.body);
});
app.listen(8300);
io.sockets.on('connection',function(socket){
    console.log("a client is connected");
    socket.on('refreshSocietes',function(data){
        console.log("refreshing societies");
socket.broadcast.emit("refreshSocietes",data);
        io.sockets.emit("refreshSocietes",data);
    });
});
