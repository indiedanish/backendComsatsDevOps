var mongoose = require("mongoose");
var CommitteeSchema = new mongoose.Schema({


       Name: {

        type: String,
        required: true,
        unique: true,
        },

        Teacher: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Teacher'
            }
        ],

        // Groups: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'FypGrp'
        //     }
        // ],


});
module.exports = mongoose.model("Committee", CommitteeSchema);
