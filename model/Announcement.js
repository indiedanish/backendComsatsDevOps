var mongoose = require("mongoose");
var AnnouncementSchema = new mongoose.Schema({

  Title: {
    type: String,
    required: true,
    unique: true,
  },

  Description: {
    type: String,
  },


});


module.exports = mongoose.model("Announcement", AnnouncementSchema);
