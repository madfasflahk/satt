import mongoose from "mongoose";

const factSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    about: { type: String, required: true },
    fees: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    validation: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Fact || mongoose.model("Fact", factSchema);