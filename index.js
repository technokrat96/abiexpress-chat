var express = require("express"),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    rfs = require('rotating-file-stream'),
    library = require("./lib");

var lib = library();

var app = express();

var isUseHTTPs = false;
var server = require(isUseHTTPs ? 'https' : 'http');

var logDirectory = "./log";

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = rfs(lib.getFullDate("dmY")+'_access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

app.use(morgan('dev', {
    skip: function (req, res) {
        console.log(req.url);
    }, stream: accessLogStream
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.status(200).json({ message: "Connected"});
});


var port = process.env.PORT || 9001;
var ip = process.env.IP || '0.0.0.0';




var listen = server.createServer(app).listen(port, ip, function(error) {
    console.log('Connected');
});

require("./Signaling-Server")(listen,function(socket) {
    try {
        var params = socket.handshake.query;
        if (!params.socketCustomEvent) {
            params.socketCustomEvent = 'custom-message';
        }

        socket.on(params.socketCustomEvent, function(message) {
            try {
                socket.broadcast.emit(params.socketCustomEvent, message);
            } catch (e) {}
        });
    } catch (e) {}
});