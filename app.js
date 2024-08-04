const express = require('express');

const get_routes = require('./get');
const put_routes = require('./put');
const delete_routes = require('./delete');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST_URL = process.env.HOST_URL || 'localhost'

app.use(express.json());

app.use('/', get_routes);
app.use('/', put_routes);
app.use('/', delete_routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST_URL}:${PORT}`);
});

module.exports = app;