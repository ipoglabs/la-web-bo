import mongoose, { Schema, models, model } from "mongoose"

const MessageSchema = new Schema({
  senderAdminId: {
    type: Schema.Types.ObjectId,
    ref: "AdminUser"
  },

  senderEmail: String,

  text: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

const ReportConversationSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  messages: {
    type: [MessageSchema],
    default: []
  }

})

export default models.ReportConversation ||
  model("ReportConversation", ReportConversationSchema)