import { INCREMENT_TIMER } from '../actions/TimeAction';

const INITIAL_STATE = {
  time: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT_TIMER:
      return { time: state.time - 1 };
    default:
      return state;
  }
};

export default timerReducer;
