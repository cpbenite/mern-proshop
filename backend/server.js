import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import connectDb from './config/db.js'

connectDb();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/api/products', productRoutes)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})