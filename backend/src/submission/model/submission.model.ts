import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema(
  {
    id: {
      type: ObjectId,
    },
    description: { type: String },
    assignmentId: { type: ObjectId },
    studentId: { type: ObjectId },
    score: { type: Number, default: 0, min: 0, max: 100 },
    fileIds: { type: [ObjectId], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    strict: false,
    timestamps: false,
    collection: "submission",
  }
)

const Model = mongoose.model("submission", Schema)

export default mongoose.models.Submission || Model
