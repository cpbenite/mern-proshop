// node import
import path from 'path'

// express imports
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Routes imports
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Config imports
import connectDb from './config/db.js'

// middleware imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

connectDb();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve()
console.log(__dirname)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})