import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './agent'

const router = createCRUDRoutes(CRUD)

export default router
