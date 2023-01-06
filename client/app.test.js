import request from 'supertest';

import server from './server';

describe('API TEST', () => {
  it('GET - /dictionary', async () => {
    const { body } = await request(server).get('/dictionary');
    expect(body.length).toEqual(2);
  });
});
