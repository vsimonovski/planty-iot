const express = require('express');
const router = express.Router();
const cors = require('cors');
const controller = require('./plant.controller');

router.get('/', cors(), controller.index);

module.exports = router;
