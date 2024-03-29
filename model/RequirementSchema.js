var mongoose = require("mongoose");
var requirementSchema = new mongoose.Schema({

    Title: {
        type: String,
        required: true,

    },

    Description: {
        type: String,

    },

    ProjectName: {
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
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
    }],

    File: [{
        type: String,

    }
    ],

    SubmittedFile: [{
        type: String,

    }],

    DateModified: {
        type: Date,
        default: Date.now,
    },

    start: {
        type: Date,
        default: Date.now,
    },

    end: {
        type: Date,


    }
});
module.exports = mongoose.model("Requirement", requirementSchema);

