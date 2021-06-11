const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/api/v1/dogs', async (req, res) => {
    try {
      const dog = await Dog.insertDog(req.body);
      res.send(dog);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .get('/api/v1/dogs', async (req, res) => {
    try {
      const dogs = await Dog.selectDogs();
      res.send(dogs);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .put('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.updateDog(req.params.id, req.body);
      res.send(dog);
    }
    catch(err){
      res.status(err).send(err);
    }
  })
  .delete('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.deleteDog(req.params.id);
      res.send(dog);
    }
    catch(err){
      res.status(500).send(err);
    }
  });
