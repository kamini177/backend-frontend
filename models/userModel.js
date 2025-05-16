const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Syötä nimesi'],
  },
  email: {
    type: String,
    required: [true, 'Syötä sähköpostiosoitteesi'],
  },
  password: {
    type: String,
    required: [true, 'Syötä salasana']
  }
})

module.exports = mongoose.model('User', userSchema)