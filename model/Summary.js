import mongoose from "mongoose";

const summarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     title: { type: String }, 
    originalText: { type: String },
    summary: { type: String, required: true },
    url: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Summary", summarySchema);
