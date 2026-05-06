import request from 'supertest';
import { app } from '../src/server.js';

describe('spend endpoints', () => {
  test('returns spend summary', async () => {
    const response = await request(app).get('/api/spend/summary');
    expect(response.status).toBe(200);
    expect(response.body.totalSpend).toBeGreaterThan(0);
  });
});
