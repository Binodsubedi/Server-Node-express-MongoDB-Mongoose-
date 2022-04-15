const { fail } = require('assert');
const User = require('./../models/userModel');
const Driver = require('./../models/driverModel');

const bcrypt = require('bcrypt');

const catchAsync = require('./../utils/catchAsync');

const AppError = require('./../utils/appError');

const accountSid = process.env.AccountSid;
const authToken = process.env.AuthToken;

const client = require('twilio')(accountSid, authToken);

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { phone_no, password } = req.body;

  const loginUser = await User.findOne({ phone_no }).select('+password');

  //Methods are assigned to every document

  const correct = await loginUser.correctPassword(password, loginUser.password);

  if (!loginUser || !correct) {
    return next(
      new AppError('Sorry, your input phone no. or password is wrong', 401)
    );
  }

  // if (loginUser.superUser === true) {
  //   return res.status(200).json({
  //     status: 'success',
  //     type: 'super',
  //     data: {
  //       loginUser,
  //     },
  //   });
  // }

  res.status(200).json({
    status: 'success',
    type: 'normal',
    data: {
      loginUser,
    },
  });
});

exports.token = catchAsync(async (req, res, next) => {
  const { phone_num } = req.body;

  let passPinStr =
    `${Math.floor(Math.random() * 10)}` +
    `${Math.floor(Math.random() * 10)}` +
    `${Math.floor(Math.random() * 10)}` +
    `${Math.floor(Math.random() * 10)}`;

  const passPin = passPinStr * 1;
  // console.log(passPin);

  const userCheck = await User.find({ phone_no: phone_num });

  // console.log(userCheck);

  if (userCheck[0] != null) {
    // console.log(User.find({ phone_no: phone_num }));

    client.messages
      .create({
        body: `Your Pin is ${passPin}`,
        messagingServiceSid: process.env.MessagingServiceSid,
        to: `+977${phone_num}`,
      })
      .then((message) => console.log(message.sid))
      .done();

    res.status(200).json({
      passPin,
      type: 'user',
      userCheck,
    });
  } else {
    client.messages
      .create({
        body: `Your Pin is ${passPin}`,
        messagingServiceSid: process.env.MessagingServiceSid,
        to: `+977${phone_num}`,
      })
      .then((message) => console.log(message.sid))
      .done();

    res.status(200).json({
      passPin,
      type: 'Driver',
    });
  }
});

exports.passwordUpdate = catchAsync(async (req, res, next) => {
  let { type, phone_num, newPass } = req.body;

  Encrypted = await bcrypt.hash(newPass, 12);

  // const userCheck = await User.find({ phone_no: phone_num });

  if ((type = 'user')) {
    await User.findOneAndUpdate(
      { phone_no: phone_num },
      {
        password: Encrypted,
      }
    );

    res.status(200).json({
      status: 'success',
    });
  } else {
    await Driver.findOneAndUpdate(
      { phone_no: phone_num },
      {
        password: Encrypted,
      }
    );

    res.status(200).json({
      status: 'success',
    });
  }
});
