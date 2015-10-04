import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  behanceID: Number,
  name: String,
  published: Date,
  created: Date,
  modified: Date,
  url: String,
  categories: [String],
  stats: {
    views: Number,
    appreciations: Number,
    comments: Number
  },
  keywords: [String]
});

export default mongoose.model("Image", imageSchema);
