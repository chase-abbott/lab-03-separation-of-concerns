const { Router } = require('express');
const Bird = require('../models/Bird');

module.exports = Router()
  .post('/api/v1/birds', async (req, res) => {
    try {
      const bird = await Bird.insertBird(req.body);
      res.send(bird);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .get('/api/v1/birds', async (req, res) => {
    try {
      const birds = await Bird.selectBirds();
      res.send(birds);
    }
    catch(err) {
      res.status(500).send(err);
    }})
  .put('/api/v1/birds/:id', async (req, res) => {
    try {
      const bird = await Bird.updateBird(req.params.id, req.body);
      res.send(bird);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .delete('/api/v1/birds/:id', async (req, res) => {
    try {
      const bird = await Bird.deleteBird(req.params.id);
      res.send(bird);
    }
    catch(err){
      res.status(500).send(err);
    }
  });
