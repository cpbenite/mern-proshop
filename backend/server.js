import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
// import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDb from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

connectDb();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})