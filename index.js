const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ type : '*/*' })); // force json

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(require('./routes'));

mongoose.connect("mongodb://all:abc123@ds263571.mlab.com:63571/hackthon-stage", { useNewUrlParser: true })

const server = app.listen(process.env.PORT || 5000, function () {
    console.log('Listening on port ' + server.address().port);
});
