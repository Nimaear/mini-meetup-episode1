// @flow
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware, { END } from 'redux-saga';
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

  const rootTask = sagaMiddleware.run(function*() {
    yield all(getSagas());
  });

  store.finishAllPendingTasks = () => {
    store.dispatch(END);
    return rootTask.done;
  };
  if (typeof window !== 'undefined') {
    window.store = store;
  }

  return store;
};

export default configureStore;
