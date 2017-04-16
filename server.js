const express = require('express');

const app = express();
const fetch = require('node-fetch');

app.set('port', 3000);

// Listen for requests
const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log(`Magic happens on port ${port}`); // eslint-disable-line no-console
});


app.all('*', (_req, _res) => {
  fetch(
    `http://api.repo.nypl.org${_req.url}`,
    { method: 'GET', headers: { Authorization: 'Token token=oky2o7oofkmgibd' } }
  ).then(res =>
     res.json())
  .then((res) => {
    _res.append('Access-Control-Allow-Origin', 'http://localhost:8000');
    _res.append(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    );
    _res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    _res.send(res);
  });
});
