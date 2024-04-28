import { RequestHandler } from 'express'
import { createCRUDRoutes } from '../../routerGenerator'
import { db } from '../../../db'
import CRUD from './crud'
import { handleErrorResponse } from '../../error'

const CRUDHandler = new CRUD(db)

const customBusinessRoutes: Record<string, { method: string; handler: RequestHandler }> = {
  '/user/:userId': {
    method: 'GET',
    handler: async (req, res) => {
      try {
        const response = await CRUDHandler.by({ userId: req.params.userId })

        if (response) {
          return res.json({ ok: true, ...response })
        }
      } catch (error) {
        return handleErrorResponse(error, res)
      }

      return res.json({ ok: false })
    }
  }
}

const router = createCRUDRoutes(CRUD, customBusinessRoutes)

export default router
