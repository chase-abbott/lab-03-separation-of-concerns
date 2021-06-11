require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('separation-of-concerns bird routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('puts a new order in the database', async () => {
    const response = await request(app)
      .post('/api/v1/birds')
      .send({ numberOfBirds: 1 });

    expect(response.body).toEqual({ id: '1', numberOfBirds: 1 });
  });

  it('gets all birds from the database', async () => {
    await request(app).post('/api/v1/birds').send({ numberOfBirds: 1 });
    const response = await request(app)
      .get('/api/v1/birds');
    expect(response.body).toEqual([{ id: '1', numberOfBirds: 1 }]);
  });

  it('gets a specific bird from the database', async () => {
    const { body } = await request(app).post('/api/v1/birds').send({ numberOfBirds: 1 });
    const response = await request(app)
      .get(`/api/v1/birds/${body.id}`);
    expect(response.body).toEqual({ id: '1', numberOfBirds: 1 });
  });

  it('updates a bird', async () => {
    const bird = await request(app).post('/api/v1/birds').send({ numberOfBirds: 1 });
    
    const response = await request(app)
      .put(`/api/v1/birds/${bird.body.id}`)
      .send({ numberOfBirds: 2 });

    
    expect(response.body).toEqual({ id: '1', numberOfBirds: 2 });
  });

  it('deletes a bird', async () => {
    const { body } = await request(app).post('/api/v1/birds').send({ numberOfBirds: 1 });
    
    const response = await request(app)
      .delete(`/api/v1/birds/${body.id}`);

    expect(response.body).toEqual(body);

    const getResponse = await request(app).get('/api/v1/birds');

    expect(getResponse.body).toEqual([]);
  });
});
