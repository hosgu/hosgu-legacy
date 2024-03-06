import { RequestHandler } from 'express'
import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './reservation'
import { db } from '../../../db/index'
import { handleErrorResponse } from '../../error'

const customCRUD = new CRUD(db)

const customRoutes: Record<string, { method: string; handler: RequestHandler }> = {
  '/:id': {
    method: 'GET',
    handler: async (req, res) => {
      try {
        const { id } = req.params
        const { card } = req.query
        let response

        if (card === 'true') {
          response = await customCRUD.getByIdForCard(id)
        } else {
          response = await customCRUD.getOne(id)
        }
        res.json({ ok: true, ...response })
      } catch (error) {
        handleErrorResponse(error, res)
      }
    }
  },
  '/guest/:id': {
    method: 'GET',
    handler: async (req, res) => {
      try {
        const { id } = req.params
        const response = await customCRUD.getByGuestId(id)
        res.json({ ok: true, ...response })
      } catch (error) {
        handleErrorResponse(error, res)
      }
    }
  }
}

const router = createCRUDRoutes(CRUD, customRoutes)

export default router
