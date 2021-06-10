const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
// const app = require('../lib/app');

describe('separation-of-concerns routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('puts a new order in the database', async () => {
    const response = await request
      .post('/api/v1/orders')
      .send({ quantityOfItems: 1 });

    expect(response).toBe({ id: 1, quantityOfItems: 1 });
  });
});
