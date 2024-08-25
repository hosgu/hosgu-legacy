import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import nextJS from 'next'
import path from 'path'
import nextBuild from 'next/dist/build'

// APIs
import agentApiV1 from './api/v1/agent'
import asrApiV1 from './api/v1/asr'
import assetApiV1 from './api/v1/asset'
import businessApiV1 from './api/v1/business'
import cancellationApiV1 from './api/v1/cancellation'
import commissionApiV1 from './api/v1/commission'
import employeeApiV1 from './api/v1/employee'
import feeApiV1 from './api/v1/fee'
import guestApiV1 from './api/v1/guest'
import photoApiV1 from './api/v1/photo'
import propertyApiV1 from './api/v1/property'
import reservationApiV1 from './api/v1/reservation'
import roomApiV1 from './api/v1/room'
import settingsApiV1 from './api/v1/settings'
import tierApiV1 from './api/v1/tier'
import unitApiV1 from './api/v1/unit'
import uploaderApiV1 from './api/v1/uploader'
import userApiV1 from './api/v1/user'

import { isConnected } from './lib/middlewares/user'

const basePort = 3000
const dev = process.env.NODE_ENV !== 'production'

const nextApp = nextJS({ dev })
const handle = nextApp.getRequestHandler()

const corsOptions = {
  origin: '*',
  credentials: true
}

// Express application
const app: Application = express()

const start = async (): Promise<void> => {
  app.use(cors(corsOptions))

  // Cookies
  app.use(cookieParser())

  app.use(cors(corsOptions))
  app.use(bodyParser.json())

  // Sites static directories
  app.use(express.static(path.join(__dirname, '../../public')))

  app.use((req: any, res: Response, next: NextFunction) => {
    req.cwd = process.cwd()
    next()
  })

  // API
  app.use('/api/v1/agent', agentApiV1)
  app.use('/api/v1/asr', asrApiV1)
  app.use('/api/v1/asset', assetApiV1)
  app.use('/api/v1/business', businessApiV1)
  app.use('/api/v1/cancellation', cancellationApiV1)
  app.use('/api/v1/commission', commissionApiV1)
  app.use('/api/v1/employee', employeeApiV1)
  app.use('/api/v1/fee', feeApiV1)
  app.use('/api/v1/guest', guestApiV1)
  app.use('/api/v1/photo', photoApiV1)
  app.use('/api/v1/property', propertyApiV1)
  app.use('/api/v1/reservation', reservationApiV1)
  app.use('/api/v1/room', roomApiV1)
  app.use('/api/v1/settings', settingsApiV1)
  app.use('/api/v1/tier', tierApiV1)
  app.use('/api/v1/unit', unitApiV1)
  app.use('/api/v1/uploader', uploaderApiV1)
  app.use('/api/v1/user', userApiV1)

  // Logout
  app.get('/logout', (req: Request, res: Response) => {
    const redirect: any = req.query.redirectTo || '/'
    res.clearCookie('at')
    res.redirect(redirect)
  })

  // Setting userLanguage cookie
  app.use((req: Request, res: Response, next: NextFunction) => {
    const languages = (req.headers['accept-language'] || '').split(';')[0]
    const userLanguage = languages.split(',')[0] || ''
    let locale = 'en-us'

    if (userLanguage.includes('es')) {
      locale = 'es-mx'
    }

    res.cookie('locale', locale)

    next()
  })

  // Custom Routes
  app.get('/login', isConnected(false), (req: Request, res: Response, next: NextFunction) => {
    next()
  })

  // Validating if user is logged in and has a valid role to access dashboard
  app.get(
    '/dashboard',
    isConnected(true, ['global.god', 'global.admin'], '/login?redirectTo=/dashboard'),
    (req: Request, res: Response, next: NextFunction) => {
      next()
    }
  )

  // Validating if user is logged in and has a valid role to access control panel
  app.get(
    '/control/:businessId',
    isConnected(
      true,
      ['global.god', 'global.admin', 'business.admin', 'business.editor', 'business.agent'],
      '/login?redirectTo=/control' // Redirect to login page if user is not logged in
    ),
    (req: Request, res: Response, next: NextFunction) => {
      next()
    }
  )

  // Next.js build
  if (process.env.NEXT_BUILD) {
    app.listen(basePort, async () => {
      // Traffic handling
      app.all('*', (req: Request, res: Response) => handle(req, res))

      console.log(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '..'))
      process.exit()
    })

    return
  }

  // Running Next App
  nextApp.prepare().then(() => {
    console.log('Next.js started')

    // Traffic handling
    app.all('*', (req: Request, res: Response) => handle(req, res))

    // Listening...
    app.listen(basePort, () => {
      console.log(`Server is running on port ${basePort}`)
    })
  })
}

start()
