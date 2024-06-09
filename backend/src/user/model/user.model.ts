import { comparePassword, hashPassword } from "../../lib/helper"

import mongoose from "mongoose"

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

Schema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    console.log("do here")
    const password: string = await hashPassword(this.password)
    console.log(password)
    this.password = password
  }
  next()
})

export default mongoose.models.User || mongoose.model("user", Schema)
