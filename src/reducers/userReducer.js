import { GET_NAME, GET_EMAIL } from '../actions/';

const INITIAL_STATE = {
  name: '',
  email: '',
  hash: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case GET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
        hash: action.payload.hash,
      };
    default:
      return state;
  }
}

export default userReducer;
