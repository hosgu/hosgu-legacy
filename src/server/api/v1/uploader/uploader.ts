import path from 'path'
import multer from 'multer'
import files from '@architecturex/utils.files'
import fs from 'fs'

const workingDir = process.cwd()
const storageDir = '/public/files/images'

const imageTypes = ['jpeg', 'jpg', 'png']
const documentTypes = ['pdf']
const allowedFileTypes = {
  image: imageTypes,
  document: documentTypes,
  all: [...imageTypes, ...documentTypes]
}

const multerStorage = (destinationDir: string) =>
  multer.diskStorage({
    destination(_req: any, _file: any, cb: any) {
      cb(null, destinationDir)
    },
    filename(_req: any, file: any, cb: any) {
      const { fileName } = files.generateUniqueFileName(file.originalname)
      cb(null, fileName)
    }
  })

const getMulterOptions = (fileTypes: string[], businessSlug: string) => {
  const businessStorage = path.join(storageDir, businessSlug)
  const destinationDir = path.join(workingDir, businessStorage)

  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir)
  }
  return {
    storage: multerStorage(destinationDir),
    limits: {
      files: 15
    },
    fileFilter(_req: any, file: any, cb: any) {
      const { extension } = files.getFileNameAndExtension(file.originalname)
      const isValidExtension = fileTypes.includes(extension)

      if (!isValidExtension) {
        cb(new Error('Invalid file extension'), false)
      }
      cb(null, isValidExtension)
    }
  }
}

const multiUpload = (req: any, res: any, next: any) => {
  const setType = req.query.setType
  const businessSlug = req.query.businessSlug

  const fileTypes = allowedFileTypes[setType as keyof typeof allowedFileTypes]

  if (!fileTypes) {
    return res.status(400).json({ error: 'Invalid set type' })
  }

  const multerOptions = getMulterOptions(fileTypes, businessSlug)
  const upload = multer(multerOptions).array('files')

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('⚠️ Multer error', err)
      return res.status(500).json(err)
    }
    if (err) {
      console.error('⚠️ Upload error', err)
      return res.status(400).json(err)
    }
    next()
  })
}

export default multiUpload
