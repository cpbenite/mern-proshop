import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import FormContainer from '../../components/FormContainer'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'

const UserEditScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { id: userId } = useParams()
  const navigate = useNavigate()

  const {
    data: user,
    isLoading: loadingUserDetails,
    error, 
    refetch
  } = useGetUserDetailsQuery(userId)

  const [updateUser, { isLoading: loadingUpdateUser }] =
    useUpdateUserMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updateUser({ userId, name, email, isAdmin })
      toast.success('Edit User success')
      navigate('/admin/userlist')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>  
      <FormContainer>
        <h1>Edit User</h1>

        {loadingUpdateUser && <Loader />}
        
        {loadingUserDetails ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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

            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin' className='my-2'>
              <Form.Label>Admin</Form.Label>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              >

              </Form.Check>
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

export default UserEditScreen