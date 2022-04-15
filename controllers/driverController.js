const { fail } = require('assert');
const Driver = require('./../models/driverModel');

const catchAsync = require('./../utils/catchAsync');

const AppError = require('./../utils/appError');
const { constants } = require('os');

exports.signup = catchAsync(async (req, res, next) => {
  const newDriver = await Driver.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newDriver,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { phone_no, password } = req.body;

  const loginDriver = await Driver.findOne({ phone_no }).select('+password');

  //Methods are assigned to every document

  const correct = await loginDriver.correctPassword(
    password,
    loginDriver.password
  );

  if (!loginDriver || !correct) {
    return next(
      new AppError('Sorry, your input phone no. or password is wrong', 401)
    );
  }

  res.status(200).json({
    status: 'success',
    type: 'driver',
    data: {
      loginDriver,
    },
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const drivers = await Driver.find();

  res.status(200).json({
    drivers,
  });
});

exports.getRoutes = catchAsync(async (req, res, next) => {
  const reqInfo = await Driver.find().select(
    '-verification_status -__v -_id -password'
  );

  res.status(200).json({
    reqInfo,
  });
});

exports.getLFound = catchAsync(async (req, res, next) => {
  const LFoundInfo = await Driver.find()
    .select('+lFound_item +lFound_detail -_id')
    .select('lFound_item lFound_detail fullName phone_no bus_no');

  res.status(200).json({
    LFoundInfo,
  });
});

exports.start = catchAsync(async (req, res, next) => {
  const { phone_num } = req.body;

  const now = new Date();

  const value = `${now.getHours()}:${now.getMinutes()}`;

  const updated = await Driver.findOneAndUpdate(
    { phone_no: phone_num },
    {
      start_time: value,
      Active: true,
    }
  );

  res.status(200).json({
    updated,
  });
});

exports.stop = catchAsync(async (req, res, next) => {
  const { phone_num } = req.body;

  const now = new Date();

  const value = `${now.getHours()}:${now.getMinutes()}`;

  const updated = await Driver.findOneAndUpdate(
    { phone_no: phone_num },
    {
      stop_time: value,
      Active: false,
    }
  );

  res.status(200).json({
    updated,
  });
});

exports.lostAndFound = catchAsync(async (req, res, next) => {
  const { phone_num, lFoundItem, lFoundDetail } = req.body;

  const updated = await Driver.where({ phone_no: phone_num }).update({
    lFound_item: lFoundItem,
    lFound_detail: lFoundDetail,
  });

  res.status(200).json({
    lFoundItem,
    lFoundDetail,
  });
});
