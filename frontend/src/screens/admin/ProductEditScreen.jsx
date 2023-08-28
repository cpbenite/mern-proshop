import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import FormContainer from '../../components/FormContainer'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice'

const ProductEditScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState('')

  const { id: productId } = useParams()
  const navigate = useNavigate()

  const {
    data: product,
    isLoading: loadingGetProductDetails,
    error
  } = useGetProductDetailsQuery(productId)

  const [updateProduct, { isLoading: loadingUpdateProduct }] =
    useUpdateProductMutation()
  
  const [uploadImage] =
    useUploadProductImageMutation()

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    console.log(e.target.files[0])
    try {
      const res = await uploadImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }

    const result = await updateProduct(updatedProduct)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Product success')
      navigate('/admin/productlist')
    }
  }

  useEffect(() => {
    if (product) {
      setName(product.name)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
      setImage(product.image)
      setPrice(product.price)
    }
  }, [product])

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>  
      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdateProduct && <Loader />}
        
        {loadingGetProductDetails ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={e => setImage}
              ></Form.Control>
              <Form.Control
                type='file'
                label='Choose file'
                onChange={uploadFileHandler}
              >

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='brand' className='my-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='my-2'
            >Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen