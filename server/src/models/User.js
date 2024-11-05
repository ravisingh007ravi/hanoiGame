const mongoose = require('mongoose');
const { validName, validEmail, validPassword, validPhone } = require('../Validation/AllValidation.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String, required: [true, 'Please add a name'],
    validate: [validName, 'Invalid Name'], trim: true
  },
  email: {
    type: String, required: [true, 'Please add an email'], unique: true,
    validate: [validEmail, 'Invalid Email'], trim: true
  },
  mobile: {
    type: String, required: [true, 'Please add an mobile'], unique: true,
    validate: [validPhone, 'Invalid mobile'], trim: true
  },
  password: {
    type: String, required: [true, 'Please add a password'],
    validate: [validPassword, 'Invalid Password'], trim: true
  },
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
