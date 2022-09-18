var mongoose = require("mongoose");
var CommitteeSchema = new mongoose.Schema({


       Name: {

        type: String,
        required: true,
        unique: true,
        },

        Teacher: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Teacher'
            }
        ],

       

});
module.exports = mongoose.model("Committee", CommitteeSchema);
