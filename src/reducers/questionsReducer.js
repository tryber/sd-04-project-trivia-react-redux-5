import { QUESTIONS_REQUEST, QUESTIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUESTIONS_REQUEST:
      return { ...state, isFetching: true };
    case QUESTIONS_SUCCESS:
      return { ...state, questions: action.questions, isFetching: false };
    default:
      return state;
  }
};

export default questionReducer;
