import { DECREMENT_TIMER, TIMER_CONFIG } from '../actions/TimeAction';
import { CALC_POINTS } from '../actions';

const INITIAL_STATE = {
  time: 30,
  points: 0,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DECREMENT_TIMER:
      return { ...state, time: state.time - 1 };
    case TIMER_CONFIG:
      return { ...state, time: 30 };
    case CALC_POINTS: {
      const { player } = JSON.parse(localStorage.getItem('state'));
      player.assertions += 1;
      player.score += 10 + (state.time * action.value);
      localStorage.setItem('state', JSON.stringify({ player }));
      const { player: { score } } = JSON.parse(localStorage.getItem('state'));
      return { ...state, points: score };
    }
    default:
      return state;
  }
};

export default timerReducer;
