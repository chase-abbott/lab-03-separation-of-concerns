require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('separation-of-concerns cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('puts a new cat into the cats talbe', async () => {
    const { body } = await request(app)
      .post('/api/v1/cats')
      .send({ numberOfCats: 5 });

    expect(body).toEqual({ id: '1', numberOfCats: 5 }); 
  });

  it('gets all of the cats from the database', async () => {
    await request(app)
      .post('/api/v1/cats')
      .send({ numberOfCats: 5 });

    const getResponse = await request(app)
      .get('/api/v1/cats');
    
    expect(getResponse.body).toEqual([{ id: '1', numberOfCats: 5 }]);
  });

  it('gets a specific cat from the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/cats')
      .send({ numberOfCats: 5 });

    const getResponse = await request(app)
      .get(`/api/v1/cats/${body.id}`);
    
    expect(getResponse.body).toEqual({ id: '1', numberOfCats: 5 });
  });

  it('updates a cat from the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/cats')
      .send({ numberOfCats: 5 });
   
    const updateResponse = await request(app)
      .put(`/api/v1/cats/${body.id}`)
      .send({ numberOfCats: 2 });

    expect(updateResponse.body).toEqual({ id: '1', numberOfCats: 2 });
  });

  it('deletes a cat from the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/cats')
      .send({ numberOfCats: 5 });

    const deleteResponse = await request(app)
      .delete(`/api/v1/cats/${body.id}`);
    
    expect(deleteResponse.body).toEqual(body);

    const getResponse = await request(app)
      .get('/api/v1/cats');

    expect(getResponse.body).toEqual([]);
  });
});
