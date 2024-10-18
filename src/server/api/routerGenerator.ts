import express, { Request, Response, Router, RequestHandler } from 'express'
import { db } from '../db'
import { handleErrorResponse } from './error'
import { ICRUDHandler } from './types'

type QueryParams = {
  page: string
  size: string
  limit: string
  cache: string
}

export function createCRUDRoutes<T extends ICRUDHandler>(
  CRUDHandler: new (db: any) => T,
  customRoutes?: Record<string, { method: string; handler: RequestHandler }>
): Router {
  const router = express.Router()
  const handler = new CRUDHandler(db)

  if (!customRoutes || !customRoutes['/'] || customRoutes['/'].method !== 'GET') {
    router.get('/', async (req: Request, res: Response) => {
      try {
        const { page = 1, size = 10, limit = 0, cache = '' } = req.query as QueryParams

        const params = JSON.parse((req.headers['x-params'] as string) || '{}')

        const response = await handler.getAll(
          page as number,
          size as number,
          !!limit,
          !!cache,
          params
        )

        res.json({ ok: true, ...response })
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })
  }

  if (!customRoutes || !customRoutes['/:id'] || customRoutes['/:id'].method !== 'GET') {
    router.get('/:id', async (req: Request, res: Response) => {
      try {
        const { cache = '' } = req.query as QueryParams
        const response = await handler.getOne(req.params.id, !!cache)

        res.json({ ok: true, ...response })
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })
  }

  if (!customRoutes || !customRoutes['/create'] || customRoutes['/create'].method !== 'POST') {
    router.post('/create', async (req: Request, res: Response) => {
      try {
        const data = await handler.create(req.body)
        res.status(201).json(data)
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })
  }

  if (!customRoutes || !customRoutes['/:id'] || customRoutes['/:id'].method !== 'PUT') {
    router.put('/:id', async (req: Request, res: Response) => {
      try {
        const data = await handler.update(req.params.id, req.body)

        res.json(data)
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })
  }

  if (!customRoutes || !customRoutes['/:id'] || customRoutes['/:id'].method !== 'DELETE') {
    router.delete('/:id', async (req: Request, res: Response) => {
      try {
        const deletedItem = await handler.delete(req.params.id)

        res.status(200).json(deletedItem)
      } catch (error) {
        handleErrorResponse(error, res)
      }
    })
  }

  if (customRoutes) {
    for (const [path, routeConfig] of Object.entries(customRoutes)) {
      const { method, handler } = routeConfig

      router[method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'](path, handler)
    }
  }

  return router
}
