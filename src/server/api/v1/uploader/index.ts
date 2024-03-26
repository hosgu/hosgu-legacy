import express from 'express'
import multiUpload from './uploader'

const router = express.Router()

router.post('/', multiUpload, (req, res) => {
  if (!req.files || req.files.length == 0) {
    return res.status(400).send('No files were uploaded.')
  }
  return res.status(200).send(req.files)
})

export default router
