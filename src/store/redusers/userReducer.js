import update from 'react-addons-update';
import { SET_AUTH } from '../actions/userActions';

const initialStore = {
  authed: false,
  userEmail: '',
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    case SET_AUTH: {
      console.log(action.authed);
      return update(store, {
        authed: {
          $set: action.authed,
        },
        userEmail: {
          $set: action.email,
        },
      });
    }
    default:
      return store;
  }
}
