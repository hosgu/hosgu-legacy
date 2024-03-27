import path from 'path'
import multer from 'multer'
import files from '@architecturex/utils.files'

const workingDir = process.cwd()
const storageDir = '/public/files/images'
const destinationDir = path.join(workingDir, storageDir)

const multerStorage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, destinationDir)
  },
  filename(_req, file, cb) {
    const { fileName } = files.generateUniqueFileName(file.originalname)
    cb(null, fileName)
  }
})

const multerOptions = {
  storage: multerStorage,
  limits: {
    files: 15
  },
  fileFilter(_req: any, file: Express.Multer.File, cb: any) {
    const { extension } = files.getFileNameAndExtension(file.originalname)
    const isValidExtension = ['png', 'jpg', 'jpeg'].includes(extension)
    cb(null, isValidExtension)
  }
}

const upload = multer(multerOptions).array('files')

const multiUpload = (req: any, res: any, next: any) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('⚠️ Multer error', err)
      return res.status(500).json(err)
    }
    if (err) {
      console.error('⚠️ Upload error', err)
      return res.status(500).json(err)
    }
    next()
  })
}

export default multiUpload
