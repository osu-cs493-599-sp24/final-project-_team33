import mongoose from "mongoose"

const Schema = new mongoose.Schema(
  {
    courseId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    due: {
      type: Date,
      required: true,
    },
  },
  {
    strict: false,
    timestamps: true, // Automatically manage createdAt and updatedAt
    collection: "assignment",
  }
)

export default mongoose.models.Assignment || mongoose.model("assignment", Schema)
