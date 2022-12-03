const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(

  {
    conversationId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Conversation'
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'Student'
    },
    isReply: {
      type: Boolean,
      default: true
    },
    text: [{
      type: String,
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
