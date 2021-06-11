const express = require('express');
const app = express();
const orderController = require('../controllers/orders');
const birdController = require('../controllers/birds');
const dogController = require('../controllers/dogs');

app.use(express.json());

app.use(orderController);
app.use(birdController);
app.use(dogController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
