import { combineReducers } from 'redux';
import questionReducer from './questionsReducer';

const rootReducer = combineReducers({
  questionReducer,
});

export default rootReducer;
