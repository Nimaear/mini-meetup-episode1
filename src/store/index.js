// @flow
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import getSagas from 'sagas';

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

  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = devtools || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...[sagaMiddleware].concat(...middleware)))
  );

  sagaMiddleware.run(function*() {
    yield all(getSagas());
  });

  const compoundStore = {
    store,
  };
  if (typeof window !== 'undefined') {
    window.store = compoundStore;
  }

  return compoundStore;
};

export default configureStore;
