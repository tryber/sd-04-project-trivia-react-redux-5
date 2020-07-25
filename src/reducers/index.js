import { combineReducers } from 'redux';
import questionReducer from './questionsReducer';
import timerReducer from './TimerReducer';

const rootReducer = combineReducers({
  questionReducer,
  timerReducer
});

export default rootReducer;
