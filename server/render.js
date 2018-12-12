//@flow
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from 'components/App';
import { StaticRouter } from 'react-router-dom';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { configureStore } from 'store';

const generateHtml = (clientStats, store, app) => {
  const chunkNames = flushChunkNames();
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
    '<link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700" rel="stylesheet">',
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
  const store = configureStore({
    initialState: {},
    middleware: [],
  });
  const { url } = req;
  const context = {};

  const app = (
    <StaticRouter location={url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
  renderToString(app);
  store.finishAllPendingTasks().then(() => {
    res.send(generateHtml(clientStats, store, app));
  });
};
