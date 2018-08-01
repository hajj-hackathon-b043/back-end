const app        = require('express')();
const http       = require('http').Server(app);
const io         = require('socket.io')(http);
const router = require('express').Router();



app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

router.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

router.post('/locations', function(request, response){
    console.log('Locations:\n\n\n', request.body);
    console.log('------------------------------');
    io.emit('locations', request.body);
    response.sendStatus(200);
});

router.post('/sync', function(request, response){
    console.log('Synced Locations:\n', request.body);
    console.log('------------------------------');
    io.emit('locations', request.body);
    response.sendStatus(200);
});

io.on('connection', function(socket){
    console.log('a user connected');
});

module.exports = router;
