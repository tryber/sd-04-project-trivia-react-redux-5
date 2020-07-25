import { QUESTIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUESTIONS_SUCCESS:
      return { ...state, questions: action.questions, isFetching: false };
    default:
      return state;
  }
};

export default questionReducer;
