/**
 * Mock Express Server entry point used for testing React client-side application
 */
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3100;

//Load Routes
const routes = require('./routes');
//Load JSON Model
const users = require('../database/models/Users');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());

app.use('/api', routes);
app.get('/api/*', (req, res) => {
  res.status(200).send(users);
}); 

app.listen(port, () => console.log(`Listening on port ${port}`));