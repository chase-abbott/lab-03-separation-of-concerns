require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('separation-of-concerns dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('posts a new dog to the dog table', async () => {
    const { body } = await request(app)
      .post('/api/v1/dogs')
      .send({ numberOfDogs: 5 });
   
    expect(body).toEqual({ id: '1', numberOfDogs: 5 });
  });

  it('gets all dogs from the dogs table', async () => {
    await request(app)
      .post('/api/v1/dogs')
      .send({ numberOfDogs: 5 });

    const getResponse = await request(app)
      .get('/api/v1/dogs');

    expect(getResponse.body).toEqual([{ id: '1', numberOfDogs: 5 }]);
  });

  it('gets a specifc dog from the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/dogs')
      .send({ numberOfDogs: 5 });

    const getResponse = await request(app)
      .get(`/api/v1/dogs/${body.id}`);

    expect(getResponse.body).toEqual({ id: '1', numberOfDogs: 5 });
  });

  it('updates a dog from the dog table', async () => {
    const { body } = await request(app)
      .post('/api/v1/dogs')
      .send({ numberOfDogs: 5 });

    const updateResponse = await request(app)
      .put(`/api/v1/dogs/${body.id}`)
      .send({ numberOfDogs: 1 });

    expect(updateResponse.body).toEqual({ id: body.id, numberOfDogs: 1 });

  });

  it('deletes a dog from the dogs table', async () => {
    const { body } = await request(app)
      .post('/api/v1/dogs')
      .send({ numberOfDogs: 5 });
    
    const deleteResponse = await request(app)
      .delete(`/api/v1/dogs/${body.id}`);

    expect(deleteResponse.body).toEqual(body);

    const getResponse = await request(app)
      .get('/api/v1/dogs');

    expect(getResponse.body).toEqual([]);
  });
});
