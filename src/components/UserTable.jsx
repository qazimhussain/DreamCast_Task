import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, deleteUser, editUser } from '../redux/actions/userActions';
import { Table, Button, Form,Row,Container,Col,Modal, Spinner } from 'react-bootstrap';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ id: '', name: '', email: '', phone: '',address:{ city: '', zipcode: ''} })
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    setShowModal(true);
    setEditMode(false);
    setNewUser({ id: '', name: '', email: '', phone: '',address:{ city: '', zipcode: ''} })
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setShowModal(true);
    setEditMode(true);
  };

  const handleSaveUser = () => {
    if (editMode) {
      dispatch(editUser(newUser));
    } else {
      dispatch(addUser({ ...newUser, id: users.length + 1 }));
    }
    setShowModal(false);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

 

  

  return (
    <div className='py-4'>
        <Container>

            <Row>
        
        <Col>
        <div className="d-flex mb-3 justify-content-between align-items-center">
            <h4>User Management</h4>
            
        <Button onClick={handleAddUser} className="mb-3">Add User</Button>

        </div>
        {
            !loading?

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City with Zipcode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,i) => (
            <tr key={user.id}>
              <td>{i+1}</td>
              <td>
                
                  {user.name}
                
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{`${user.address.city}, ${user.address.zipcode}`}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>{' '}
                
                  <Button variant="success" onClick={() => handleEditUser(user)} className='ms-2'>Edit</Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>:
      <div className="d-flex justify-content-center align-items-center" style={{height:'50vh'}}>
<Spinner variant='primary'/>
      </div>
      
}


 {/* Add/Edit Modal */}
 <Modal show={showModal} onHide={() => setShowModal(false)} centered>
 <Form onSubmit={(e)=>{e.preventDefault()
            handleSaveUser()
          }}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
            <Form.Group className='mt-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control required={true} type="text" value={newUser?.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" value={newUser?.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Phone</Form.Label>
              <Form.Control required type="text" value={newUser?.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>City</Form.Label>
              <Form.Control required type="text" value={newUser?.address?.city} onChange={(e) => setNewUser({ ...newUser, address:{...newUser.address,city: e.target.value} })} />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control required type="text" value={newUser?.address?.zipcode} onChange={(e) => setNewUser({ ...newUser, address:{...newUser.address,zipcode: e.target.value} })} />
            </Form.Group>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" type='submit' >{editMode ? 'Save Changes' : 'Add User'}</Button>
        </Modal.Footer>
        </Form>
      </Modal>
</Col>
</Row>
</Container>
    </div>
  );
};

export default UserTable;
