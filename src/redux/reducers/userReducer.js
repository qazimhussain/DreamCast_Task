import { FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER,
  DELETE_USER,
  EDIT_USER, } from '../actions/userActions';

const initialState = {
  users: [],
  loading: false,
  error:''

};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      console.log('Hello')

      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      console.log('Hello')
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      console.log('Hello')

      return { ...state, loading: false, error: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};
