import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './reservations'

const router = createCRUDRoutes(CRUD)

export default router
