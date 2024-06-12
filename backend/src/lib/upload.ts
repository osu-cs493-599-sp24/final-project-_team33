import crypto from "crypto"
import multer from "multer"

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
