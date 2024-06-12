import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const SubmissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: ObjectId,
      ref: "Assignment",
      required: true,
    },
    studentId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    file: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "submission",
  }
)

export default mongoose.models.Submission || mongoose.model("submission", SubmissionSchema)
