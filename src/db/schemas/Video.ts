import mongoose from "mongoose";

interface VideoSchema {
  topic: string;
  videos: string[];
}

const videoSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  videos: { type: [{ type: String, required: true }], default: [] },
});

export default mongoose.model("Video", videoSchema);
