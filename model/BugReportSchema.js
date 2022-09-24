var mongoose = require("mongoose");
var bugReportSchema = new mongoose.Schema({

    
    BugReportTitle: {
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
    
      //Save those requirements where TestPass is false
    
      DebuggingRequirement: {
       type: mongoose.Schema.ObjectId,
        ref: 'Requirement',
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

module.exports = mongoose.model("BugReport", bugReportSchema);

