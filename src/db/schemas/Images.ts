import mongoose from "mongoose";

interface ImagesSchema {
  topic: string;
  images: string[];
}

const imagesSchema = new mongoose.Schema<ImagesSchema>({
  topic: { type: String, required: true, unique: true },
  images: {
    type: [{ type: String, required: true, unique: true }],
    default: [],
  },
});

export default mongoose.model("Images", imagesSchema);
