import mongoose from "mongoose";

export interface QuestionSchema {
  question: string;
  answer: string;
  userEmail: string;
}

const questionSchema = new mongoose.Schema<QuestionSchema>({
  question: { type: String, required: true },
  answer: { type: String, default: "" },
  userEmail: { type: String, required: true },
});

export default mongoose.model("Question", questionSchema);
