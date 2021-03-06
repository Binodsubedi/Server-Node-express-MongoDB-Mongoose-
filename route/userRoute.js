const express = require('express');

const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/signup').post(userController.signup);

router.route('/login').post(userController.login);

router.route('/forgotPasswordToken').post(userController.token);

router.route('/passwordUpdate').post(userController.passwordUpdate);

module.exports = router;
