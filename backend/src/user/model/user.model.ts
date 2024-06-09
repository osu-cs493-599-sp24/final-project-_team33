import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
    },
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
      enum: ["ADMIN", "INSTRUCTOR", "STUDENT"],
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
