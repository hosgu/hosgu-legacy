import { RequestHandler } from 'express'
import { createCRUDRoutes } from '../../routerGenerator'
import { db } from '../../../db'
import CRUD from './crud'
import businessCRUD from '../business/crud'
import { handleErrorResponse } from '../../error'

const CRUDHandler = new CRUD(db)
const CRUDBusiness = new businessCRUD(db)

const customUserRoutes: Record<string, { method: string; handler: RequestHandler }> = {
  '/code/:code': {
    method: 'GET',
    handler: async (req, res) => {
      try {
        const response = await CRUDHandler.by({ code: req.params.code, active: false })

        if (response) {
          const businessResponse = await CRUDBusiness.by({ userId: response.items[0].id })
          const country = businessResponse.items[0].country || null
          response.items[0].country = country

          return res.json({ ok: true, ...response })
        }
      } catch (error) {
        return handleErrorResponse(error, res)
      }

      return res.json({ ok: false })
    }
  },
  '/create': {
    method: 'POST',
    handler: async (req, res) => {
      try {
        const response = await CRUDHandler.create({ user: req.body })

        if (response) {
          return res.json({ ok: true, ...response })
        }
      } catch (error) {
        return handleErrorResponse(error, res)
      }

      return res.json({ ok: false })
    }
  },
  '/login': {
    method: 'POST',
    handler: async (req, res) => {
      try {
        const response = await CRUDHandler.login(req.body)

        return res.json({ ok: true, ...response })
      } catch (error) {
        return handleErrorResponse(error, res)
      }
    }
  },
  '/validate': {
    method: 'POST',
    handler: async (req, res) => {
      if (!req.body.at) {
        return res.json({
          ok: false,
          error: {
            type: 'BAD_REQUEST_ERROR',
            code: 'MISSING_ACCESS_TOKEN',
            message: 'missingAccessToken'
          }
        })
      }

      try {
        const response = await CRUDHandler.getOne(req.body.at)

        return res.json({ ok: true, ...response })
      } catch (error) {
        return handleErrorResponse(error, res)
      }
    }
  }
}

const router = createCRUDRoutes(CRUD, customUserRoutes)

export default router
