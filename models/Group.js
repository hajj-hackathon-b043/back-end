const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {type: String, required: true},
    location: Object,
    members: [String],
});

module.exports = mongoose.model('Groups', GroupSchema);
