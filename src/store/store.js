import { createStore, applyMiddleware, compose } from 'redux';
import initReducers from './redusers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'geekmessanger',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['msgReducer', 'chatReducer'],
};

export const history = createBrowserHistory();

const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f;

function initStore() {
  const innitialStore = {};

  const store = createStore(
    persistReducer(persistConfig, initReducers(history)),
    innitialStore,
    compose(applyMiddleware(routerMiddleware(history), thunk), reduxDevTool)
  );
  const persistor = persistStore(store);

  return { store, persistor };
}

export default initStore;
