const express = require('express');
const router = express.Router();

router.use('/tracking', require('./tracking'));

module.exports = router;