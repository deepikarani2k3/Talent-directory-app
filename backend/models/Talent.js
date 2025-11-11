const mongoose = require('mongoose');
const validator = require('validator');

const talentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  skills: {
    type: [String],
    required: [true, 'Please provide at least one skill'],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'Please provide at least one skill'
    }
  },
  experience: {
    type: Number,
    required: [true, 'Please provide years of experience'],
    min: [0, 'Experience cannot be negative'],
    max: [70, 'Experience cannot be more than 70 years']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Talent', talentSchema);
