import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
// import cors from 'cors'
import products from './data/products.js'
import connectDb from './config/db.js'

connectDb();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors())

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(p => p._id === id)
  res.json(product)
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})