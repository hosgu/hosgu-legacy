import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './estate'

const router = createCRUDRoutes(CRUD)

export default router
