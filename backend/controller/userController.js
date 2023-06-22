import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// @desc    Authorize user and get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000      // 30 days in ms
    })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password.')
  }
})

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('Register user')
})

// @desc    Logout user & clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('Logout user')
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('Get User Profile')
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('Update User Profile')
})

// @desc    Get users
// @route   GET /api/users
// @access  Private / admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('Get Users')
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private / admin
const getUserById = asyncHandler(async (req, res) => {
  res.send('Get User by id')
})

// @desc    Update user by id
// @route   PUT /api/users/:id
// @access  Private / admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('Update User by id')
})

// @desc    Delete user
// @route   GET /api/users/:id
// @access  Private / admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete user')
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}