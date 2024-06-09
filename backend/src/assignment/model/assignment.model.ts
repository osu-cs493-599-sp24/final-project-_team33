import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
    },
    assignmentId: { type: Number },
    status: { type: String },
    description: { type: String },
    courseId: { type: ObjectId },
    title: { type: String },
    score: { type: Number },
    dueAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    strict: false,
    timestamps: false,
    collection: "assignment",
  }
)

export default mongoose.models.Assignment || mongoose.model("assignment", Schema)
