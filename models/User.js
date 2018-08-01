const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {type: String, required: true},
    team: String,
    food: String,
    lastLocation: Object,
});

UserSchema.index({id: 1}, {unique: true});

module.exports = mongoose.model('Users', UserSchema);
