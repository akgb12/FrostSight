import request from 'supertest';
import { app } from '../src/server.js';

describe('health endpoint', () => {
  test('returns ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
