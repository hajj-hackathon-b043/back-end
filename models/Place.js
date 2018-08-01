const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    category: {type: String, required: true},
    location: Object,
});

module.exports = mongoose.model('Places', PlaceSchema);
