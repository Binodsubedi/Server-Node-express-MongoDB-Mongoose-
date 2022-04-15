const express = require('express');

const routeController = require('../controllers/routeController');

const router = express.Router();

router.route('/createRoute').post(routeController.createRoute);

router.route('/calculateDistance').get(routeController.calculateDistance);

module.exports = router;
