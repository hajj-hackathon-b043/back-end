const express = require('express');
const router = express.Router();

router.use('/tracking', require('./tracking'));
router.use('/tests', require('./tests'));
router.use('/notifications', require('./notifications'));

module.exports = router;