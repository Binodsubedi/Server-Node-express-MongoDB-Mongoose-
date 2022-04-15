const express = require('express');
const driver = require('../models/driverModel');

const driverController = require('./../controllers/driverController');

const router = express.Router();

router.route('/signup').post(driverController.signup);

router.route('/login').post(driverController.login);

router.route('/getRoutes').get(driverController.getRoutes);

router.route('/getLFound').get(driverController.getLFound);

router.route('/getAllDrivers').get(driverController.getAll);

router.route('/start').post(driverController.start);

router.route('/stop').post(driverController.stop);

router.route('/lostAndFound').post(driverController.lostAndFound);

module.exports = router;
