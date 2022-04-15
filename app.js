const express = require('express');

const app = express();

const globalErrorHandler = require('./controllers/errorController');

const userRoute = require('./route/userRoute');

const driverRoute = require('./route/driverRoute');

const routeRoute = require('./route/routeRoute');

app.use(express.json());

app.use('/api/v1/users', userRoute);

app.use('/api/v1/driver', driverRoute);

app.use('/api/v1/route', routeRoute);

app.use(globalErrorHandler);

module.exports = app;
