const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  main_route: String,
  sub_route: [String],
  distance: [Number],
});

const route = mongoose.model('route', routeSchema);

module.exports = route;
