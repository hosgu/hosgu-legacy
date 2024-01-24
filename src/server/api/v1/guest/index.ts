import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './guest'

const router = createCRUDRoutes(CRUD)

export default router
