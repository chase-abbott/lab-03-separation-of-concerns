const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .post('/api/v1/cats', async (req, res) => {
    try {
      const cat = await Cat.insertCat(req.body);
      res.send(cat);
    }
    catch(err){
      res.status(500).send(err);
    }
  })
  .get('/api/v1/cats', async (req, res) => {
    try {
      const cats = await Cat.selectCats();
      res.send(cats);
    }
    catch(err){
      res.status(500).send(err);
    }
  });
// .put()
// .delete();
