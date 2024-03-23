import express from 'express'
import multiUpload from './uploader'

const router = express.Router()

router.post('/', multiUpload, async (req, res) => {
  console.log('⚡Request', req)
  console.log('⚡Response', res)
  return res.status(200).send(req.files)
})

export default router
