const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('/:id', controller.show);
router.get('/:id/plants', controller.showPlants);

module.exports = router;
