import React from 'react';
import { render } from 'react-dom';

const renderApp = () => {
  render(<div>hi3</div>, document.getElementById('root'));
};

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept(() => {
    renderApp();
  });
}

renderApp();
