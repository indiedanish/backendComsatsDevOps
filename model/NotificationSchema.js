var mongoose = require("mongoose");
var NotificationSchema = new mongoose.Schema({
    
    title: {
        type: String,
    },

    content: {
        type: String,
    },
  

    sender:{
        type: String,
    },

    senderImg:{
        type: String,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    receiverId:{
        type: String,

        
    }

});

module.exports = mongoose.model("Notification", NotificationSchema);
