import path from 'path'
import multer from 'multer'

const workingDir = process.cwd()
const destinationDir = '/public/files/images'

const multerOptions = {
  dest: path.join(workingDir, destinationDir),
  limits: {
    files: 10
  }
}

const upload = multer(multerOptions).array('files')

const multiUpload = (req: any, res: any) => {
  return upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('⚠️ Multer error', err)
      return res.status(500).json(err)
    }
    if (err) {
      console.error('⚠️ Upload error', err)
      return res.status(500).json(err)
    }
  })
}

export default multiUpload
