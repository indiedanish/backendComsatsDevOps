var mongoose = require("mongoose");
var TemplateSchema = new mongoose.Schema({

  

  Title: {
    type: String,
    required: true,
    unique: true,
  },

  DateModified: {
    type: Date,
    default: Date.now,
  },

  Deadline: {
    type: Date,
    required: true,

  },

  File: {
    type: String,
    required: true,
  }

});


module.exports = mongoose.model("Template", TemplateSchema);