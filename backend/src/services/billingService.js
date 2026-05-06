import { sampleBillingItems } from '../data/sampleBilling.js';
import { recordCostSpike, recordIngestion } from './datadogService.js';
import { archiveRawExport } from './s3Service.js';

let billingItems = [...sampleBillingItems];

export async function ingestBillingItems(items, sourceName = 'manual-upload.json') {
  const normalized = items.map((item, index) => ({
    id: `${Date.now()}-${index}`,
    accountId: item.accountId || 'unknown',
    service: item.service || 'Unknown',
    usageType: item.usageType || 'unknown',
    region: item.region || 'global',
    cost: Number(item.cost || 0),
    date: item.date || new Date().toISOString().slice(0, 10)
  }));

  billingItems = [...billingItems, ...normalized];
  await archiveRawExport(sourceName, JSON.stringify(items, null, 2));
  recordIngestion(normalized.length);
  return normalized;
}

export async function ingestSampleBilling() {
  billingItems = [...sampleBillingItems];
  recordIngestion(billingItems.length);
  return billingItems;
}

export function getSpendSummary() {
  const totalSpend = billingItems.reduce((sum, item) => sum + item.cost, 0);
  const byService = getServiceSpend();
  const topService = byService.length > 0 ? byService[0].service : 'None';

  return {
    totalSpend: Number(totalSpend.toFixed(2)),
    lineItemCount: billingItems.length,
    topService,
    serviceCount: byService.length,
    optimizationCount: getOptimizationRecommendations().length
  };
}

export function getServiceSpend() {
  const totals = new Map();

  for (const item of billingItems) {
    const current = totals.get(item.service) || 0;
    totals.set(item.service, current + item.cost);
  }

  return Array.from(totals.entries())
    .map(([service, amount]) => ({ service, amount: Number(amount.toFixed(2)) }))
    .sort((a, b) => b.amount - a.amount);
}

export function getAllBillingItems(filters = {}) {
  return billingItems.filter((item) => {
    if (filters.service && item.service !== filters.service) return false;
    if (filters.accountId && item.accountId !== filters.accountId) return false;
    return true;
  });
}

export function getCostSpikeAlerts() {
  const serviceSpend = getServiceSpend();
  const alerts = serviceSpend
    .filter((entry) => entry.amount > 10000)
    .map((entry) => {
      recordCostSpike(entry.service, entry.amount);
      return {
        service: entry.service,
        amount: entry.amount,
        severity: entry.amount > 20000 ? 'critical' : 'warning',
        message: `${entry.service} spend exceeded the cost spike threshold`
      };
    });

  return alerts;
}

export function getOptimizationRecommendations() {
  return getServiceSpend().slice(0, 4).map((entry) => ({
    service: entry.service,
    estimatedMonthlySavings: Number((entry.amount * 0.18).toFixed(2)),
    recommendation: `Review ${entry.service} usage patterns, idle resources, and reserved capacity options`
  }));
}
