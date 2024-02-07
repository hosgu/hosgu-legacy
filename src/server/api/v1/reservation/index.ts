import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './reservation'

const router = createCRUDRoutes(CRUD)

export default router
