import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import nextJS from 'next'
import path from 'path'

// APIs
import agentApiV1 from './api/v1/agent'
import amenityApiV1 from './api/v1/amenity'
import arrangementApiV1 from './api/v1/arrangement'
import assetApiV1 from './api/v1/asset'
import businessApiV1 from './api/v1/business'
import cancellationApiV1 from './api/v1/cancellation'
import comissionApiV1 from './api/v1/comission'
import employeeApiV1 from './api/v1/employee'
import feeApiV1 from './api/v1/fee'
import guestApiV1 from './api/v1/guest'
import photoApiV1 from './api/v1/photo'
import propertyApiV1 from './api/v1/property'
import reservationApiV1 from './api/v1/reservation'
import roomApiV1 from './api/v1/room'
import serviceApiV1 from './api/v1/service'
import settingsApiV1 from './api/v1/settings'
import tierApiV1 from './api/v1/tier'
import unitApiV1 from './api/v1/unit'
import uploaderApiV1 from './api/v1/uploader'
import userApiV1 from './api/v1/user'

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = nextJS({ dev, port })
const handle = nextApp.getRequestHandler()

const corsOptions = {
  origin: '*',
  credentials: true
}

// Running Next App
nextApp.prepare().then(() => {
  // Express application
  const app: Application = express()

  // Cookies
  app.use(cookieParser())

  app.use(cors(corsOptions))
  app.use(bodyParser.json())

  // Sites static directories
  app.use(express.static(path.join(__dirname, '../public')))

  app.use((req: any, res: Response, next: NextFunction) => {
    req.cwd = process.cwd()

    next()
  })

  // API
  app.use('/api/v1/agent', agentApiV1)
  app.use('/api/v1/amenity', amenityApiV1)
  app.use('/api/v1/arrangement', arrangementApiV1)
  app.use('/api/v1/asset', assetApiV1)
  app.use('/api/v1/business', businessApiV1)
  app.use('/api/v1/cancellation', cancellationApiV1)
  app.use('/api/v1/comission', comissionApiV1)
  app.use('/api/v1/employee', employeeApiV1)
  app.use('/api/v1/fee', feeApiV1)
  app.use('/api/v1/guest', guestApiV1)
  app.use('/api/v1/photo', photoApiV1)
  app.use('/api/v1/property', propertyApiV1)
  app.use('/api/v1/reservation', reservationApiV1)
  app.use('/api/v1/room', roomApiV1)
  app.use('/api/v1/service', serviceApiV1)
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

  // Traffic handling
  app.all('*', (req: Request, res: Response) => handle(req, res))

  // Listening...
  app.listen(port)
})
