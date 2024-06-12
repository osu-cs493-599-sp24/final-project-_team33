import { Buffer } from "node:buffer"
import { ObjectId } from "mongodb"
import { Readable } from "node:stream"
import crypto from "crypto"
import fs from "fs"
import mongoose from "mongoose"
import multer from "multer"

const imageTypes: any = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
}

export const pdfPath = `src/submission/upload`

const storage: any = multer.diskStorage({
  destination: pdfPath,
  filename: (_: any, file: any, callback: any) => {
    const filename = crypto.pseudoRandomBytes(16).toString("hex")
    const extension: any = imageTypes[file.mimetype]
    console.log("file", file)
    callback(null, `${filename}.${extension}`)
  },
})

export const upload: any = multer({
  storage: storage,
  fileFilter: (req: any, file: any, callback: any): void => {
    callback(null, !!imageTypes[file.mimetype])
  },
})

export const uploadFile = ({ filePath, fileName, bucketName }: any) => {
  const db = mongoose.connections[0].db
  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: bucketName,
  })
  // const data = fs.readFileSync(filePath)
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

export const getFileById = async (id: string, bucketName = "submissionFile") => {
  const db = mongoose.connections[0].db
  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: bucketName,
  })
  const downloadStream = bucket.openDownloadStream(new ObjectId(id))

  const chunks = []
  for await (const chunk of downloadStream) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)
  return buffer
}
