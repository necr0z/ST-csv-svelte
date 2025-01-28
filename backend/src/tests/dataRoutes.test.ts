import request from 'supertest';
import { app } from '../server';

describe('Data Routes', () => {
  it('GET /api/data -> success', async () => {
    const res = await request(app).get('/api/data');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('totalCount');
    expect(res.body).toHaveProperty('currentPage');
    expect(res.body).toHaveProperty('totalPages');
  });
});
