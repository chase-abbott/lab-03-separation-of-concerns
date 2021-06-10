const { Router } = require('express');
const Order = require('../models/Order');

// export default Router.......
module.exports = Router() // app.post(....)
  .post('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.insertOrder(req.body); 
      res.send(order);
    } catch(err) {
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders', async (req, res) => {
    try {
      const orders = await Order.selectOrders();
      res.send(orders);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.selectOrderById(req.params.id);
      res.send(order);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .put('/api/v1/orders/:id', async (req, res) => {
    try {
      const updatedOrder = req.body;
      const order = await Order.updateOrder(req.params.id, updatedOrder);
      res.send(order);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .delete('/api/v1/orders/:id', async (req, res) => {
    try {
      const deletedOrder = await Order.deleteOrder(req.params.id);
      res.send(deletedOrder);
    }
    catch(err){
      res.status(500).send(err);
    }
  });
