import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    target: { type: Number, required: true },
    months: { type: Number, required: true },
    currentSaved: { type: Number, default: 0 },
    risk: { type: String, default: "Medium" },
    sip: { type: Number, required: true },
    projection: { type: Array, default: [] },
    milestones: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
