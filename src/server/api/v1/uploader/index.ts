import express from 'express'
import files from '@architecturex/utils.files'
import fs from 'fs'

import multiUpload from './uploader'

const router: express.Router = express.Router()

router.post('/', multiUpload, (req: any, res) => {
  if (!req.files || req.files.length == 0) {
    return res.status(400).json({ ok: false, error: 'No files' })
  }

  const files = req.files.map((file: any) => ({
    path: '/' + file.path.substring(file.path.indexOf('images'), file.path.length)
  }))

  return res.status(200).json({ ok: true, data: files })
})

router.delete('/:fileName', async (req: any, res: any) => {
  const file = `${files.getFileDir(req.params.fileName)}${req.params.fileName.includes('\\') ? '\\' : '/'}${req.params.fileName}`

  fs.unlink(file, (err: any) => {
    if (err) {
      return res.status(500).send(false)
    }

    return res.status(200).send(true)
  })
})

export default router
