const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {type: String, required: true},
    team: String,
    food: String,
    lastLocation: Object,
});

module.exports = mongoose.model('Users', UserSchema);
