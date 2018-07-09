const express = require('express');
const app = express();
const port = process.env.PORT || 3101;
//Load Java Script object
const users =  require('./models/Users');

app.get('/*', (req, res) => {
  res.send(users);
});

app.listen(port, () => console.log(`Listening on port ${port}`));