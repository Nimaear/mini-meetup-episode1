// @flow
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';

type StoreT = {
  initialState: {},
  middleware: Array<() => void>,
};

export const configureStore = ({ initialState, middleware = [] }: StoreT = {}) => {
  if (typeof window !== 'undefined' && window.store) {
    return window.store;
  }

  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [],
    });

  const composeEnhancers = devtools || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...[].concat(...middleware))));

  if (typeof window !== 'undefined') {
    window.store = store;
  }
  return store;
};

export default configureStore;
