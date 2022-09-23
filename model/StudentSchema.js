var mongoose = require("mongoose");
var StudentSchema = new mongoose.Schema({
  
  Name: {
    type: String,
    
  },
  
  RegNo: {
    type: String,
    required: true,
    unique: true,
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

  },
  Gender: {
    type: Boolean,
  
  },

  Role: {
    type: String,

  },


  Position: {
    type: String,

  },

  FypStatus: {
    type: String,
 
  },

  CommitteeEvaluation: {
  
    type: mongoose.Schema.ObjectId,
      ref: 'EvaluationCommittee'
 
  },

  SupervisorEvaluation: {
    type: mongoose.Schema.ObjectId,
    ref: 'EvaluationSupervisor'

  },

  Notifications: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Notification'

  }],

  OnlineStatus: {
    type: Boolean,
  },

  RefreshToken: {
    type: String,
  }
});

module.exports = mongoose.model("Student", StudentSchema);
