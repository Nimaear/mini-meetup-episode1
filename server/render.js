//@flow
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from 'components/App';
import axios from 'axios';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { configureStore } from 'store';

const generateHtml = (clientStats) => {
  const store = configureStore({
    initialState: {},
    middleware: [],
  });

  const chunkNames = flushChunkNames();
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });
  const head = Helmet.renderStatic();

  const initialData = JSON.stringify({
    state: store.getState(),
  });

  return [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    head.base.toString(),
    head.title.toString(),
    head.meta.toString(),
    head.link.toString(),
    head.script.toString(),
    styles,
    '</head>',
    '<body>',
    `<div id="root">${renderToString(app)}</div>`,
    `<script>window.__INITIAL_DATA__ = ${initialData}</script>`,
    cssHash,
    js,
    '</body>',
    '</html>',
  ]
    .filter((h) => !!h)
    .join('');
};

export default ({ clientStats }) => (req, res) => {
  res.send(generateHtml(clientStats));
};
