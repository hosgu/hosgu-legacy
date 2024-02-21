import { RequestHandler } from 'express'
import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './reservation'
import { db } from '../../../db/index'

var customCRUD = new CRUD(db)

var customRoutes: Record<string, { method: string; handler: RequestHandler }> = {
  '/guest/:id': {
    method: 'GET',
    handler: async (req, res) => {
      try {
        var { id } = req.params
        var response = await customCRUD.getByGuestId(id)
        res.json({ ok: true, data: response })
      } catch (error) {
        res.status(500).json({ ok: false, error: error })
      }
    }
  }
}

const router = createCRUDRoutes(CRUD, customRoutes)

export default router
