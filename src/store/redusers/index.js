import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import msgReducer from './msgReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    userReducer,
    chatReducer,
    msgReducer,
  });
