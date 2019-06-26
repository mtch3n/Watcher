'use strict';

const express = require('express');
const router = express.Router();

const statusCtrl = require('../controllers/statusController');

router.get('/', statusCtrl.overview);
router.get('/:hostname', statusCtrl.getStatus);

module.exports = router;
