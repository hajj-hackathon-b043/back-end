const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        id: { type: String, required: true },
        username: String,
        team: String,
    });

module.exports = mongoose.model('Users', UserSchema);
