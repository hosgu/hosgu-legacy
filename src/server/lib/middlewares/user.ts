import { NextFunction, Request, Response } from 'express'
import api from '@architecturex/utils.api'

import UserService from '../../../app/shared/services/user'
import Config from '../../config'

export const isConnected =
  (isLogged = true, roles = ['visitor'], redirectTo = '/') =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const connectedUser = await UserService.getOne({
      endpoint: 'user/validate',
      method: 'POST',
      credentials: 'include',
      body: {
        at: req.cookies.at
      },
      returnFirstItemOnly: true
    })

    if (!connectedUser && !isLogged) {
      return next()
    }

    if (connectedUser && isLogged) {
      if (roles.includes('global.god') && connectedUser.role === 'global.god') {
        return next() // If user is logged in and has a valid role, continue to dashboard
      }

      if (roles.includes('global.admin') && connectedUser.role === 'global.admin') {
        return next()
      }

      if (roles.includes('business.admin') && connectedUser.role === 'business.admin') {
        return next()
      }

      if (roles.includes('business.editor') && connectedUser.role === 'business.editor') {
        return next()
      }

      if (roles.includes('business.agent') && connectedUser.role === 'business.agent') {
        return next()
      }

      res.redirect('/') // Redirect to login page if user is connected but has no valid role
    } else {
      res.redirect(redirectTo)
    }
  }
