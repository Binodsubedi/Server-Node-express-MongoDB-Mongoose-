const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const driverSchema = new mongoose.Schema({
  fullName: String,
  password: {
    type: String,
    required: [true, 'Please enter the password'],
    minlength: 8,
  },
  confirm_password: {
    type: String,
    required: [true, 'Please re-enter the password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Please enter the correct password',
    },
  },
  phone_no: {
    type: String,
    required: [true, 'Please enter your phone number'],
    unique: true,
  },
  liscense_no: {
    type: String,
    required: [true, 'Please enter your liscense number'],
    unique: true,
  },
  bus_no: {
    type: String,
    required: [true, 'Please enter the bus number'],
    unique: true,
  },
  main_route: {
    type: String,
    default: 'Machhegaun-Ratnapark',
  },
  sub_route: {
    type: [String],
    default: [
      'Machhegaun',
      'Kritipur',
      'Balkhu',
      'Kuleshwor',
      'Kalimati',
      'Teku',
      'Tripureshwor',
      'Ratnapark',
    ],
  },
  lFound_item: {
    type: String,
    select: false,
  },
  lFound_detail: {
    type: String,
    select: false,
  },

  start_time: {
    type: String,
    default: '9:00',
  },
  stop_time: {
    type: String,
    default: '9:15',
  },
  verification_status: {
    type: Boolean,
    default: false,
  },
  Active: {
    type: Boolean,
    default: false,
  },
});

driverSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirm_password = undefined;

  next();
});

driverSchema.methods.correctPassword = async function (
  passwordCandidate,
  userPassword
) {
  return await bcrypt.compare(passwordCandidate, userPassword);
};

const driver = mongoose.model('driver', driverSchema);

module.exports = driver;
