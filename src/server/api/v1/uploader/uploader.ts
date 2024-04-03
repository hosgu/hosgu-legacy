import path from 'path'
import multer from 'multer'
import files from '@architecturex/utils.files'

const workingDir = process.cwd()
const storageDir = '/public/files/images'
const destinationDir = path.join(workingDir, storageDir)

const imageTypes = ['jpeg', 'jpg', 'png']
const documentTypes = ['pdf']
const allowedFileTypes = {
  image: imageTypes,
  document: documentTypes,
  all: [...imageTypes, ...documentTypes]
}

const multerStorage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, destinationDir)
  },
  filename(_req, file, cb) {
    const { fileName } = files.generateUniqueFileName(file.originalname)
    cb(null, fileName)
  }
})

const getMulterOptions = (fileTypes: string[]) => {
  return {
    storage: multerStorage,
    limits: {
      files: 15
    },
    fileFilter(_req: any, file: Express.Multer.File, cb: any) {
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
  const fileTypes = allowedFileTypes[setType as keyof typeof allowedFileTypes]

  if (!fileTypes) {
    return res.status(400).json({ error: 'Invalid set type' })
  }

  const multerOptions = getMulterOptions(fileTypes)
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
