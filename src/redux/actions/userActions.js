import axios from 'axios';

// Action Types
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';

// Fetch Users Action
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };

// Add User Action
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

// Edit User Action
export const editUser = (updatedUser) => ({
  type: EDIT_USER,
  payload: updatedUser,
});

// Delete User Action
export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});
