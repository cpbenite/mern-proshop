import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 1
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const count = await Product.countDocuments({...keyword})

  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Get a specific product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404);
    throw new Error('Resource not found')
  }
})

// @desc    Create new product
// @route   POST /api/products
// @access  Private / Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private / Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private / Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await Product.deleteOne({ _id: product._id})
    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) { 
    const reviews = product.reviews
    res.status(200).json(reviews)
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

// @desc    Get a specific product review
// @route   GET /api/products/:productId/reviews/:reviewId
// @access  Public
const getProductReviewById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404);
    throw new Error('Resource not found')
  }
})

// @desc    Create new product review
// @route   POST /api/products/:id/reviews
// @access  Private / Admin
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) { 
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() == req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = 
      product.reviews.reduce((acc, review) => acc + review.rating, 0)
    
    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

// @desc    Update product review
// @route   PUT /api/products/:id/reviews
// @access  Private
const updateProductReview = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    res.json({})
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

// @desc    Delete product review
// @route   DELETE /api/products/:id/reviews
// @access  Private
const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await Product.deleteOne({ _id: product._id})
    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  getProductReviewById,
  createProductReview,
  updateProductReview,
  deleteProductReview
}