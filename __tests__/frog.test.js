require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('separation-of-concerns frog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a frog to the database', async () => {
    const { body } = await request(app)
      .post('/api/v1/frogs')
      .send({ numberOfFrogs: 3 });

    expect(body).toEqual({ id: '1', numberOfFrogs: 3 });
  });

  it('gets all frogs from the database', async () => {
    const frog = await request(app)
      .post('/api/v1/frogs')
      .send({ numberOfFrogs: 3 });

    const { body } = await request(app)
      .get('/api/v1/frogs');

    expect(body).toEqual([frog.body]);
  });

  it('gets a specific frog from the database', async () => {
    const frog = await request(app)
      .post('/api/v1/frogs')
      .send({ numberOfFrogs: 3 });

    const { body } = await request(app)
      .get(`/api/v1/frogs/${frog.body.id}`);

    expect(body).toEqual(frog.body);
  });

  it('updates a frog in the database', async () => {
    const frog = await request(app)
      .post('/api/v1/frogs')
      .send({ numberOfFrogs: 3 });

    const { body } = await request(app)
      .put(`/api/v1/frogs/${frog.body.id}`)
      .send({ numberOfFrogs: 1 });

    expect(body).toEqual({ id: '1', numberOfFrogs: 1 });
  });

  it('deletes a frog from the databse', async () => {
    const frog = await request(app)
      .post('/api/v1/frogs')
      .send({ numberOfFrogs: 3 });

    const { body } = await request(app)
      .delete(`/api/v1/frogs/${frog.body.id}`);
    
    expect(body).toEqual(frog.body);

    const getResponse = await request(app)
      .get(`/api/v1/frogs/${frog.body.id}`);

    expect(getResponse.body).toEqual({});
  });
});
