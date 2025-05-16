const mongoose = require('mongoose')

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/tasks?retryWrites=true&w=majority')
    console.log('MongoDB Connected')
  } catch (error) {
    process.exit(1)
  }
}

module.exports = ConnectDB