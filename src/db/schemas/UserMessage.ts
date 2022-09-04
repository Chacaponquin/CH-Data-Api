import mongoose from "mongoose";

export interface UserMessageSchema {
  name: string;
  userEmail: string;
  message: string;
}

const userMessageSchema = new mongoose.Schema<UserMessageSchema>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  userEmail: { type: String, required: true },
});

export default mongoose.model("UserMessage", userMessageSchema);
