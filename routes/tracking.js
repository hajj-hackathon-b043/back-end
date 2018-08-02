const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = require('express').Router();
const Group = require('../models/Group');

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

router.post('/locations', function (req, res) {
    const name = req.body[0].group;
    io.emit('locations', req.body);

    const location = {
        lat: req.body[0].latitude,
        lng: req.body[0].longitude,
    };

    Group.findOneAndUpdate({name}, {location}).then(collection => {
        if (collection)
            res.json({status: 'updated'});
        else
            res.json({status: 'error happened'})
    }).catch(error => {
        res.json({error})
    });

});



module.exports = router;
