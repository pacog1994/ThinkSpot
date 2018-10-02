/**
 * Mock Express Server entry point used for testing React client-side application
 */
const express = require('express');
const app = express();
const port = process.env.PORT || 3101;
//Load Routes
const routes = require('./server/routes/');
//Load JSON Model
const users = require('./server/models/Users');

app.use('/', routes);

app.get('/*', (req, res) => {
  res.status(200).send(users);
}); 

app.listen(port, () => console.log(`Listening on port ${port}`));