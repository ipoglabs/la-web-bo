import mongoose, { Schema, models, model } from "mongoose"

const MessageSchema = new Schema(
  {
    senderEmail: String,
    text: String,
  },
  { timestamps: true }
)

const ReportPostConversationSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      index: true,
      unique: true,
    },

    messages: [MessageSchema],
  },
  { timestamps: true }
)

export default models.ReportPostConversation ||
  model("ReportPostConversation", ReportPostConversationSchema)