import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema(
  {
    assignmentId: {
      type: Number,
      unique: true,
      required: true,
      autoIncrement: true,
    },
    status: {
      type: String,
      enum: ['opened', 'closed'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseId: {
      type: ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    dueAt: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    strict: false,
    timestamps: true, // Automatically manage createdAt and updatedAt
    collection: 'assignment',
  }
)

// Update `updatedAt` on each save
Schema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Assignment || mongoose.model("assignment", Schema)
