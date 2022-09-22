
var mongoose = require("mongoose");
var RubricsSupervisorSchema = new mongoose.Schema({


    Name: {
        type: String,
        required: true,
        unique: true,
    },



    Questions: [
        {
            Criteria: {
                type: String,
            },

            TotalMark: {
                type: Number
            }
        }
    ],

});

module.exports = mongoose.model("RubricsSupervisor", RubricsSupervisorSchema);




