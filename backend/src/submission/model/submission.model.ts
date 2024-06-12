import mongoose, { isValidObjectId } from "mongoose"
import multer from "multer";
import crypto from "crypto";

const ObjectId = mongoose.Schema.Types.ObjectId


const Schema = new mongoose.Schema(
  {
    assignmentId: { type: Number },
    studentId: { type: Number },
    grade: { type: Number, default: 0, min: 0, max: 100 },
    file: { type: String },
    timestamp: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    strict: false,
    timestamps: false,
    collection: "submission",
  }
)

//TO DO: change
const imageTypes = {
  "image/jpeg": "jpg",
  "image/png": "png"
}


export const upload = multer({
  storage: multer.diskStorage({
      destination: `src/submission/upload`, 
      filename: (req, file, callback) => {
          const filename = crypto.pseudoRandomBytes(16).toString("hex")
          const extension = imageTypes[file.mimetype]
          callback(null, `${filename}.${extension}`)
      },
      fileFilter: (req, file, callback) => {
          callback(null, !!imageTypes[file.mimetype])
      }
   }),
})

const Model = mongoose.models.Submission || mongoose.model("submission", Schema)

export default Model