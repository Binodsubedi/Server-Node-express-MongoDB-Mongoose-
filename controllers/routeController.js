const Route = require('../models/routeModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

exports.calculateDistance = catchAsync(async (req, res, next) => {
  const routedistance = await Route.aggregate([
    {
      $project: {
        x: { $zip: { inputs: ['$sub_route', '$distance'] } },
        main_route: 1,
        _id: 0,
      },
    },
    {
      $unwind: '$x',
    },
    {
      $project: {
        main_route: 1,
        sub_route: { $first: '$x' },
        distance: { $last: '$x' },
      },
    },
  ]);

  res.status(200).json({
    routedistance,
  });
});

exports.createRoute = catchAsync(async (req, res, next) => {
  const newRoute = await Route.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newRoute,
    },
  });
});
