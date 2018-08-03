const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = require('express').Router();
const Group = require('../models/Group');

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

router.post('/locations', function (req, res) {


});



module.exports = router;
