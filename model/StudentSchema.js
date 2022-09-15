var mongoose = require("mongoose");
var StudentSchema = new mongoose.Schema({
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
  RegNo: {
    type: String,
    required: true,
    unique: true,
  },

  Position: {
    type: String,
    required: true,
  },

  FypStatus: {
    type: String,
    required: true,
  },
  CommitteeRemarks: {
    Presentation: { Remarks: { type: String }, Marks: { type: Number } },
    TechnicalKnowledge: { Remarks: { type: String }, Marks: { type: Number } },
    Communication: { Remarks: { type: String }, Marks: { type: Number } },
    Documentation: { Remarks: { type: String }, Marks: { type: Number } },
  },
  SupervisorRemarks: {
    Presentation: { Remarks: { type: String }, Marks: { type: Number } },
    TechnicalKnowledge: { Remarks: { type: String }, Marks: { type: Number } },
    Communication: { Remarks: { type: String }, Marks: { type: Number } },
    Documentation: { Remarks: { type: String }, Marks: { type: Number } },
  },
  OnlineStatus: {
    type: Boolean,
  },

  RefreshToken: {
    type: String,
  }
});

module.exports = mongoose.model("Student", StudentSchema);
