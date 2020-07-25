import { DECREMENT_TIMER, TIMER_CONFIG } from '../actions/TimeAction';

const INITIAL_STATE = {
  time: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DECREMENT_TIMER:
      return { time: state.time - 1 };
    case TIMER_CONFIG:
      return { time: 30 };
    default:
      return state;
  }
};

export default timerReducer;
