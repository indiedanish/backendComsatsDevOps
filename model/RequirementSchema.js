var mongoose = require("mongoose");
var requirementSchema = new mongoose.Schema({

    Title: {
        type: String,
        required: true,

    },

    Description: {
        type: String,

    },

    AssignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    },

    Type: {
        type: String,
        required: true,
    },

    Priority: {
        type: String,

    },

    Accepted: {
        type: Boolean,
        default: false
    },

    Comments: [{

        Student: {
            type: mongoose.Schema.ObjectId,
            ref: 'Student'
        },

        Content: {
            type: String,
        },

        DateModified: {
            type: Date,
            default: Date.now,
        },

    }],

    File: [{
        type: String,

    }
    ],

    SubmittedFile: [{
        type: String,

    }
    ],

    DateModified: {
        type: Date,
        default: Date.now,
    },

    Deadline: {
        type: Date,
        required: true,

    }
});
module.exports = mongoose.model("Requirement", requirementSchema);

