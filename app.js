const express = require('express');

const get_routes = require('./get');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST_URL = process.env.HOST_URL || 'localhost'

app.use('/', get_routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST_URL}:${PORT}`);
});

module.exports = app;