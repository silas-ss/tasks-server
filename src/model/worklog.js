const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

const Worklog = mongoose.model("worklog", {
  id: mongoose.Schema.Types.String,
  description: mongoose.Schema.Types.String,
  hours: mongoose.Schema.Types.Number,
  date: mongoose.Schema.Types.Date,
  taskId: mongoose.Schema.Types.String
});

module.exports = {
  db: [mongoose],
  Worklog
};