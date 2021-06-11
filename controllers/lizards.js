const { Router } = require('express');
const Lizard = require('../models/Lizard');

module.exports = Router()
  .post('/api/v1/lizards', async (req, res) => {
    try {
      const lizard = await Lizard.insertLizard(req.body);
      res.send(lizard);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .get('/api/v1/lizards', async (req, res) => {
    try {
      const lizards = await Lizard.getLizards();
      res.send(lizards);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .get('/api/v1/lizards/:id', async (req, res) => {
    try {
      const lizard = await Lizard.getLizardById(req.params.id);
      res.send(lizard);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .put('/api/v1/lizards/:id', async (req, res) => {
    try {
      const lizard = await Lizard.updateLizard(req.params.id, req.body);
      res.send(lizard);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .delete('/api/v1/lizards/:id', async (req, res) => {
    try {
      const lizard = await Lizard.deleteLizard(req.params.id);
      res.send(lizard);
    }
    catch(err){
      res.status(500).send(err);
    }
  });
