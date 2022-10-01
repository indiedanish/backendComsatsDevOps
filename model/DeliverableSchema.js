var mongoose = require("mongoose");
var DeliverableSchema = new mongoose.Schema({

  Title: {
    type: String,
    required: true,
    unique: true,
  },

  ProjectName: {
    type: String,
    required: true,
  },

  DateModified: {
    type: Date,
    default: Date.now,
  },

  File: {
    type: String,
    required: true,
  }

});


module.exports = mongoose.model("Deliverable", DeliverableSchema);
