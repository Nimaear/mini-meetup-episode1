//@flow
const generateHtml = (clientStats) => {
  return [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    '</head>',
    '<body>',
    `<div id="root"></div>`,
    `<script type="text/javascript" src="static/main.js" defer></script>`,
    '</body>',
    '</html>',
  ]
    .filter((h) => !!h)
    .join('');
};

export default ({ clientStats }) => (req, res) => {
  res.send(generateHtml(clientStats));
};
