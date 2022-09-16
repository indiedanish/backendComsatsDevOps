var mongoose = require("mongoose");
var TemplateSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("Template", TemplateSchema);
