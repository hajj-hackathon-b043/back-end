const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    group: {type: String, required: true},
    date: Date,
    message: String,
});

NotificationSchema.index({group: 1}, {unique: false});

module.exports = mongoose.model('Notifications', NotificationSchema);
