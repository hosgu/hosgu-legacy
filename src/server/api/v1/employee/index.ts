import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './employee'

const router = createCRUDRoutes(CRUD)

export default router
