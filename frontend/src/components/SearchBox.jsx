import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
  const { keyword: urlKeyword } = useParams()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState(urlKeyword)

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
      setKeyword('')
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search products...'
        className='mr-sm-2 ml-sm-5'
      >

      </Form.Control>
      <Button type='submit' variant='outline-light' className='mx-2 p-2'>Submit</Button>
    </Form>
  )
}

export default SearchBox