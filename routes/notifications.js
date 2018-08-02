const {addToTopic, notify, notifyTopic} = require('../libs/Notifications');
const router = require('express').Router();
const User = require('../models/User');
const Notification = require('../models/Notification');

router.post('/register', (req, res) => {
    const {id, fcm_token} = req.body;
    if (id && fcm_token) {
        User.findOneAndUpdate({id}, {fcm_token}).then(dRes => {
            addToTopic({topic: dRes.team, fcm_token})
            res.json({status: 'updated'})
        }).catch(error => {
            res.json({error})
        })
    } else {
        res.json({error: 'no id or fcm_token was provided'});
    }
});

router.post('/notify', (req, res) => {

    const {token, message} = req.body;

    if (token && message) {
        notify({token, message})
        res.json({status: 'sent'})
    } else {
        res.json({error: 'no token or message was provided'});
    }

});
router.post('/notify-topic', (req, res) => {
    const {topic, message} = req.body;

    const notification = new Notification();
    notification.group = topic;
    notification.message = message.body;
    notification.date = new Date();
    console.log(notification.save());

    if (topic && message) {
        notifyTopic({topic, message})
        res.json({status: 'sent'})
    } else {
        res.json({error: 'no token or message was provided'});
    }
});
router.get('/:group', (req, res) => {
    const group = req.params.group;
    console.log(group);
    if (group) {
        Notification.find({group}).sort({date: -1}).then(dRes => {
            console.log(dRes);
            if (dRes) {
                if (dRes.length > 0) {
                    res.json(dRes)
                }
            }
        }).catch(error => {
            res.json({error})
        })
    } else {
        res.json({error: 'something got wrong'})
    }
});

module.exports = router;