import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './tiers'

const router = createCRUDRoutes(CRUD)

export default router
