const express = require('express')
const mongoose = require('mongoose')

const app = express();


mongoose.connect("mongodb://all:abc123@ds263571.mlab.com:63571/hackthon-stage", { useNewUrlParser: true })
