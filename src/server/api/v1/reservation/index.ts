import { RequestHandler } from 'express'
import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './reservation'
import { db } from '../../../db/index'

const customCRUD = new CRUD(db)

const customRoutes: Record<string, { method: string; handler: RequestHandler }> = {
  '/guest/:id': {
    method: 'GET',
    handler: async (req, res) => {
      try {
        const { id } = req.params
        const response = await customCRUD.getByGuestId(id)
        res.json({ ok: true, ...response })
      } catch (error) {
        res.status(500).json({ ok: false, error: error })
      }
    }
  }
}

const router = createCRUDRoutes(CRUD, customRoutes)

export default router
