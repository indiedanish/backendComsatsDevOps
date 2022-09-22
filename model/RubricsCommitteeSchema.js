
var mongoose = require("mongoose");
var RubricsCommitteeSchema = new mongoose.Schema({

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

}
);

module.exports = mongoose.model("RubricsCommittee", RubricsCommitteeSchema);




