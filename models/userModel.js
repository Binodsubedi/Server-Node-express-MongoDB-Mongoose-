const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter your fullname'],
  },
  phone_no: {
    type: String,
    unique: true,
    required: [true, 'please enter your phone number'],
    minlength: 10,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter your email address'],
    validator: [validator.isEmail, 'Please enter correct email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    //Should have used select as false to exclude the inclusion in the query data
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
  // superUser: {
  //   type: Boolean,
  //   default: false,
  // },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirm_password = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  passwordCandidate,
  userPassword
) {
  return await bcrypt.compare(passwordCandidate, userPassword);
};

const user = mongoose.model('Users', userSchema);

module.exports = user;
