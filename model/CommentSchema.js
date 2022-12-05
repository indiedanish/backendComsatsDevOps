var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({   


        Sender: {
            type: mongoose.Schema.ObjectId,
            ref: 'Student',

            
        },


        Content: [{
            type: String,
          }],

        DateModified: {
            type: Date,
            default: Date.now,
        },


});

module.exports = mongoose.model("Comment", CommentSchema);
