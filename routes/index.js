const express = require('express');
const router = express.Router();

router.use('/tests', require('./tests'));
router.use('/notifications', require('./notifications'));

module.exports = router;