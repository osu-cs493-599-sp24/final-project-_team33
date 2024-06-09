import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
    },
    courseId: { type: Number },
    description: { type: String },
    subject: { type: String },
    title: { type: String },
    term: { type: String },
    instructorId: { type: ObjectId },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now},
  },
  {
    strict: false,
    timestamps: false,
    collection: "course",
  }
)

const Model = mongoose.model("course", Schema)

export default mongoose.models.Course || Model
