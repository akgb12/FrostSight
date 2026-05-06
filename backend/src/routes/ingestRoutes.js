import express from 'express';
import { ingestBillingItems, ingestSampleBilling } from '../services/billingService.js';

const router = express.Router();

router.post('/api/ingest/sample', async (req, res) => {
  const items = await ingestSampleBilling();
  res.status(201).json({ ingested: items.length, source: 'sample' });
});

router.post('/api/ingest', async (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];

  if (items.length === 0) {
    return res.status(400).json({ error: 'items must be a non-empty array' });
  }

  const ingested = await ingestBillingItems(items, 'api-upload.json');
  res.status(201).json({ ingested: ingested.length });
});

export default router;
