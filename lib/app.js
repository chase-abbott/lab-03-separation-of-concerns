const express = require('express');
const app = express();
const orderController = require('../controllers/orders');


app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
app.use(orderController);

module.exports = app;
