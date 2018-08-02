const {addToTopic} =require('../libs/Notifications');
const router = require('express').Router();
const User = require('../models/User');

router.post('/register', (req, res) => {
    const {id, fcm_token} = req.body;
    if (id && fcm_token) {
        User.findOneAndUpdate({id}, {fcm_token}).then(dRes => {
            addToTopic({topic: dRes.team, fcm_token})
            res.json({status: 'updated'})
        }).catch(error => {
            res.json({error})
        })
    }else{
        res.json({error: 'no id or fcm_token was provided'});
    }
});

module.exports = router;