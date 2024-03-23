import express from 'express'
import multiUpload from './uploader'

const router = express.Router()

router.post('/', multiUpload, (req: any, res) => {
  if (!req.files || req.files.length == 0) {
    return res.status(400).json({ ok: false, error: 'No files' })
  }
  return res.status(200).json({ ok: true, data: req.files })
})

export default router
