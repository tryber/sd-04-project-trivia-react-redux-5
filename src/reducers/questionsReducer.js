import { QUESTIONS_SUCCESS, SET_ISDISABLED, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  isDisabled: true,
  classe: false,
  position: 0,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUESTIONS_SUCCESS:
      return { ...state, questions: action.questions, isFetching: false };
    case SET_ISDISABLED:
      return { ...state, isDisabled: !state.isDisabled, classe: !state.classe };
    case NEXT_QUESTION:
      return { ...state, position: state.position + 1 };
    default:
      return state;
  }
};

export default questionReducer;
