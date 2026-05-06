import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000'
});

export async function getSpendSummary() {
  const response = await api.get('/api/spend/summary');
  return response.data;
}

export async function getServiceSpend() {
  const response = await api.get('/api/spend/services');
  return response.data;
}

export async function getAlerts() {
  const response = await api.get('/api/alerts');
  return response.data;
}

export async function getRecommendations() {
  const response = await api.get('/api/recommendations');
  return response.data;
}

export async function runGraphQLQuery(query) {
  const response = await api.post('/graphql', { query });
  return response.data.data;
}
