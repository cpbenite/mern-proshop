import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'

const CartScreen = () => {
  const { cartItems } = useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div>CartScreen</div>
  )
}

export default CartScreen