const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    category: {type: String, required: true},
    location: Object,
});

PlaceSchema.index({category: 1}, {unique: false});

module.exports = mongoose.model('Places', PlaceSchema);
