import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const Model = mongoose.model(
  "course",
  new mongoose.Schema(
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
      updatedAt: { type: Date },
    },
    {
      strict: false,
      timestamps: false,
      collection: "course",
    }
  )
)

export default mongoose.models.Course || Model
