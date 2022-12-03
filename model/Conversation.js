const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
 
  {
    members: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Student'}],
  },


  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
