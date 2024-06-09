import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

export const USER_ROLES = ["admin", "instructor", "student"]

const Schema = new mongoose.Schema(
  {
    description: { type: String },
    name: { type: String },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: USER_ROLES,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    strict: false,
    timestamps: false,
    collection: "user",
  }
)

const Model = mongoose.model("user", Schema)

Schema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    // hash password here
  }
  next()
})

export default mongoose.models.User || Model
