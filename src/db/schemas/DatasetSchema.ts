import mongoose from "mongoose";

interface DatasetSchema {
  name: string;
  data: any;
  author: any;
  likes: any[];
}

const dataSchema = new mongoose.Schema<DatasetSchema>(
  {
    name: { type: String, required: true },
    data: { type: mongoose.SchemaTypes.Mixed, required: true },
    author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    likes: {
      type: [{ type: mongoose.Types.ObjectId, required: true }],
      default: [],
    },
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model("DatasetSchema", dataSchema);
