'use strict';

const express = require('express');
const router = express.Router();

const serverCtrl = require('../controllers/serverController');

router.get('/', serverCtrl.getAllServers);
router.get('/:hostname', serverCtrl.getServer);

module.exports = router;
