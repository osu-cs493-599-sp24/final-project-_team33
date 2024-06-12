import crypto from "crypto"
import fs from "fs"
import mongoose from "mongoose"
import multer from "multer"
const { Buffer } = require("node:buffer")
const { Readable } = require("node:stream")

const imageTypes: any = {
  "image/jpeg": "jpg",
  "image/png": "png",
}

const storage: any = multer.diskStorage({
  destination: `src/submission/upload`,
  filename: (_: any, file: any, callback: any) => {
    const filename = crypto.pseudoRandomBytes(16).toString("hex")
    const extension: any = imageTypes[file.mimetype]
    callback(null, `${filename}.${extension}`)
  },
})

export const upload: any = multer({
  storage: storage,
  fileFilter: (req: any, file: any, callback: any): void => {
    callback(null, !!imageTypes[file.mimetype])
  },
})

export const uploadPhoto = ({ filePath, fileName, bucketName }: any) => {
  const db = mongoose.connections[0].db
  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: bucketName,
  })
  const data = fs.readFileSync(filePath)
  const uploadStream = bucket.openUploadStream(fileName)
  const buffer = fs.readFileSync(filePath)
  return new Promise((resolve, reject) => {
    Readable.from(buffer)
      .pipe(uploadStream)
      .on("error", (error: any) => reject)
      .on("finish", () => {
        fs.unlink(filePath, () => {
          resolve(uploadStream.id)
        })
      })
  })
}
