const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Syötä tapahtuman nimi"],
  },
  day: {
    type: Date,
    required: [true, "Syötä tapahtuman päiväys"],
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }
});
module.exports = mongoose.model("Task", taskSchema);

