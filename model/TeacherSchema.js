var mongoose = require("mongoose");
var TeacherSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },

  PhoneNumber: {
    type: Number,
    required: true,
  },
  Gender: {
    type: Boolean,
    required: true,

  },

  Role: {
    type: String,
    required: true,
  },

  Desgination: {
    type: String,
  },
  RefreshToken: {
    type: String,
  }
});
module.exports = mongoose.model("Teacher", TeacherSchema);
