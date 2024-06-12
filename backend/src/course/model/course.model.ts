import { number, ref } from "joi"

import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema(
  {
    courseId: { type: Number },
    description: { type: String },
    subject: { type: String },
    title: { type: String },
    term: { type: String },
    instructorId: { type: ObjectId, ref: "user" },

    students: [{ type: ObjectId, ref: "user" }],
    assignments: [{ type: ObjectId, ref: "assignment" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    strict: false,
    timestamps: false,
    collection: "course",
  }
)

const Model = mongoose.models.Course || mongoose.model("course", Schema)

export default Model
