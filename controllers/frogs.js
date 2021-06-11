const { Router } = require('express');
const Frog = require('../models/Frog');

module.exports = Router()
  .post('/api/v1/frogs', async (req, res) => {
    try {
      const frog = await Frog.insertFrog(req.body);
      res.send(frog);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .get('/api/v1/frogs', async (req, res) => {
    try {
      const frog = await Frog.selectFrogs();
      res.send(frog);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .get('/api/v1/frogs/:id', async (req, res) => {
    try {
      const frog = await Frog.selectFrogById(req.params.id);
      res.send(frog);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .put('/api/v1/frogs/:id', async (req, res) => {
    try {
      const frog = await Frog.updateFrog(req.params.id, req.body);
      res.send(frog);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .delete('/api/v1/frogs/:id', async (req, res) => {
    try {
      const frog = await Frog.deleteFrog(req.params.id);
      res.send(frog);
    }
    catch(err){
      res.status(500).send(err);
    }
  });

