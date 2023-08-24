import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from 'react-bootstrap'
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa"
import { toast } from 'react-toastify'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/usersApiSlice"

const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetUsersQuery()

  const [deleteUser, { isLoading: loadingDeleteUser, refetch }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete user?')) {
      try {
        await deleteUser(id)
        toast.success('User deleted successfully.')
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      
      <h1>Users</h1>
      { loadingDeleteUser && <Loader /> }
      {isLoading ? <Loader /> : error ? <Message>{error}</Message> : (
        <Table striped  hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaCheck style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen