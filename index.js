const express = require('express')
const mongoose = require('mongoose')

const app = express();

const User = require('./models/User');

const user = new User();
user.id = 21312;
user.team = 'B043';
user.food = "TEST";
user.lastLocation = {
    lat: 0,
    lng: 0
};
user.save();

mongoose.connect("mongodb://all:abc123@ds263571.mlab.com:63571/hackthon-stage", { useNewUrlParser: true })
