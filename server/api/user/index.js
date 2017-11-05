const express = require('express');
const router = express.Router();
const cors = require('cors');
const controller = require('./user.controller');

router.get('/:id', cors(), controller.show);
router.get('/:id/plants', cors(), controller.showPlants);

module.exports = router;
