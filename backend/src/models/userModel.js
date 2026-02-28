import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    linkedin: { type: String },
    imageUrl: { type: String },
    imageSecret: { type: String }

  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema);
