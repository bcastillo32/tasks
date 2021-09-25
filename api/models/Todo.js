const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TaskSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: String,
    default: Date.now()
  }
});

const task = mongoose.model('Task', TaskSchema);

module.exports = Task;
