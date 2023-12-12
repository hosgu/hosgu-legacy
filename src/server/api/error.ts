import { Response } from 'express'

export function handleErrorResponse(error: any, res: Response) {
  switch (error.type) {
    case 'CONFLICT_ERROR':
      return res.status(409).json({ ok: false, error })
    case 'NOT_FOUND_ERROR':
      return res.status(404).json({ ok: false, error })
    case 'BAD_REQUEST_ERROR':
      return res.status(400).json({ ok: false, error })
    case 'UNAUTHORIZED_ERROR':
      return res.status(401).json({ ok: false, error })
    case 'FORBIDDEN_ERROR':
      return res.status(403).json({ ok: false, error })
    case 'INTERNAL_SERVER_ERROR':
      return res.status(500).json({ ok: false, error })
    default:
      console.error(error)
      return res.status(500).json({ ok: false, error })
  }
}
