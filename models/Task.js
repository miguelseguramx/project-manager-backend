const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  state: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Task', taskSchema)