import { combineReducers } from 'redux';
// import questionsReducer from './questionsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
