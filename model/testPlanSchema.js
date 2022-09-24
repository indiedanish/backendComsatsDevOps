var mongoose = require("mongoose");
var testPlanSchema = new mongoose.Schema({

  TestPlanTitle: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
  },

  DateModified: {
    type: Date,
    default: Date.now,
  },

  //Save test Id from requirements over here

  TestingRequirement: {
   type: mongoose.Schema.ObjectId,
    ref: 'Requirement',
  },

  TestPass: {
    type: Boolean,
  },

  SubmittedFile: [
    {
      type: String,
    },
  ],

  DateModified: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("TestPlan", testPlanSchema);
