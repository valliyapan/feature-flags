import express from 'express'
import flagRoutes from './routes/flag.route.js'
import authenticate from './middlewares/auth.middleware.js'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:4000'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log('Request method:', req.method, 'Path:', req.path)
    next()
})
app.use(authenticate)

app.use('/', flagRoutes)

app.use((req, res, next) => {
    console.log('No route found for method:', req.method, 'path:', req.path)
    res.status(404).json({ message: 'No route found' })
})

app.use((err, req, res, next) => {
    console.log('Caught in custom error handler:', err)
    res.status(500).json({ message: 'Internal server error' })
})

export default app