//@flow
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import { configureStore } from 'store';

const store = configureStore({
  initialState: {},
  middleware: [],
});

const renderApp = () => {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept(renderApp);
}
renderApp();
