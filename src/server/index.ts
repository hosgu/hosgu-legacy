import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import nextJS from 'next'
import path from 'path'

// APIs
import agentApiV1 from './api/v1/agent'
import businessApiV1 from './api/v1/business'
import cancellationApiV1 from './api/v1/cancellation'
import comissionApiV1 from './api/v1/comission'
import employeeApiV1 from './api/v1/employee'
import estateApiV1 from './api/v1/estate'
import propertieApiV1 from './api/v1/property'
import tierApiV1 from './api/v1/tier'
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
  app.use('/api/v1/business', businessApiV1)
  app.use('/api/v1/cancellation', cancellationApiV1)
  app.use('/api/v1/comission', comissionApiV1)
  app.use('/api/v1/employee', employeeApiV1)
  app.use('/api/v1/estate', estateApiV1)
  app.use('/api/v1/property', propertieApiV1)
  app.use('/api/v1/tier', tierApiV1)
  app.use('/api/v1/user', userApiV1)

  // Logout
  app.get([`/:locale(en-us|es-mx)/logout`, '/logout'], (req: Request, res: Response) => {
    const redirect: any = req.query.redirectTo || '/'
    res.clearCookie('at')
    res.redirect(redirect)
  })

  // Setting userLanguage cookie
  app.use((req: Request, res: Response, next: NextFunction) => {
    const languages = (req.headers['accept-language'] || '').split(';')[0]
    const userLanguage = languages.split(',')[0] || ''
    let language = 'en-us'

    if (userLanguage.includes('es')) {
      language = 'es-mx'
    }

    res.cookie('language', language)

    next()
  })

  // Traffic handling
  app.all('*', (req: Request, res: Response) => handle(req, res))

  // Listening...
  app.listen(port)
})
