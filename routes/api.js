'use strict';

const express = require('express');
const router = express.Router();
const server = require('./server');
const status = require('./status');

router.use('/server', server);
router.use('/status', status);

module.exports = router;
