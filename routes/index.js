'use strict';
const express = require('express');
const router = express.Router();
const api = require('./api');

router.use('/api', api);
// router.use('/status', status);

module.exports = router;
