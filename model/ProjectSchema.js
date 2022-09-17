var mongoose = require("mongoose");
var ProjectSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        unique: true,
    },

    Technologies: {
        type: String,    
    },

    Description: {  
        type: String,
    },

    Status: {  
        type: String,
    },

    Group: {
        type: Schema.Types.ObjectId,
        ref: 'FypGrp'
    },

  



});
module.exports = mongoose.model("Project", ProjectSchema);

