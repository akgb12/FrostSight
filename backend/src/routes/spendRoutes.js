import express from 'express';
import { getAllBillingItems, getOptimizationRecommendations, getServiceSpend, getSpendSummary } from '../services/billingService.js';
import { getCachedJson, setCachedJson } from '../services/cacheService.js';

const router = express.Router();

router.get('/api/spend/summary', async (req, res) => {
  const cached = await getCachedJson('spend:summary', 'spend-summary');
  if (cached) return res.json(cached);

  const summary = getSpendSummary();
  await setCachedJson('spend:summary', summary, 30);
  res.json(summary);
});

router.get('/api/spend/services', async (req, res) => {
  const cached = await getCachedJson('spend:services', 'spend-services');
  if (cached) return res.json(cached);

  const services = getServiceSpend();
  await setCachedJson('spend:services', services, 30);
  res.json(services);
});

router.get('/api/spend/items', (req, res) => {
  res.json(getAllBillingItems({ service: req.query.service, accountId: req.query.accountId }));
});

router.get('/api/recommendations', (req, res) => {
  res.json(getOptimizationRecommendations());
});

export default router;
