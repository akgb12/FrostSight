import express from 'express';
import { getCostSpikeAlerts } from '../services/billingService.js';

const router = express.Router();

router.get('/api/alerts', (req, res) => {
  res.json(getCostSpikeAlerts());
});

export default router;
