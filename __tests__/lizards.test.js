require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('separation-of-concerns frog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a lizard to the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/lizards')
      .send({ numberOfLizards: 5 });

    expect(body).toEqual({ id: '1', numberOfLizards: 5 });
  });

  it('gets all lizards from the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/lizards')
      .send({ numberOfLizards: 5 });
    
    const response = await request(app)
      .get('/api/v1/lizards');

    expect(response.body).toEqual([body]);
  });

  it('gets a specific lizard from the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/lizards')
      .send({ numberOfLizards: 5 });

    const response = await request(app)
      .get(`/api/v1/lizards/${body.id}`);

    expect(response.body).toEqual(body);
  });

  it('updates a lizard in the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/lizards')
      .send({ numberOfLizards: 5 });

    const response = await request(app)
      .put(`/api/v1/lizards/${body.id}`)
      .send({ numberOfLizards: 10 });

    expect(response.body).toEqual({ id: body.id, numberOfLizards: 10 });
  });

  it('deletes a lizard from the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/lizards')
      .send({ numberOfLizards: 5 });

    const response = await request(app)
      .delete(`/api/v1/lizards/${body.id}`);
    
    expect(response.body).toEqual(body);

    const getResponse = await request(app)
      .get(`/api/v1/lizards/${body.id}`);

    expect(getResponse.body).toEqual({});
  });
});
