import { buildSchema } from 'graphql';
import {
  getAllBillingItems,
  getCostSpikeAlerts,
  getOptimizationRecommendations,
  getServiceSpend,
  getSpendSummary
} from '../services/billingService.js';

export const schema = buildSchema(`
  type SpendSummary {
    totalSpend: Float
    lineItemCount: Int
    topService: String
    serviceCount: Int
    optimizationCount: Int
  }

  type BillingItem {
    id: String
    accountId: String
    service: String
    usageType: String
    region: String
    cost: Float
    date: String
  }

  type ServiceSpend {
    service: String
    amount: Float
  }

  type CostAlert {
    service: String
    amount: Float
    severity: String
    message: String
  }

  type Recommendation {
    service: String
    estimatedMonthlySavings: Float
    recommendation: String
  }

  type Query {
    spendSummary: SpendSummary
    serviceSpend: [ServiceSpend]
    billingItems(service: String, accountId: String): [BillingItem]
    alerts: [CostAlert]
    recommendations: [Recommendation]
  }
`);

export const root = {
  spendSummary: () => getSpendSummary(),
  serviceSpend: () => getServiceSpend(),
  billingItems: ({ service, accountId }) => getAllBillingItems({ service, accountId }),
  alerts: () => getCostSpikeAlerts(),
  recommendations: () => getOptimizationRecommendations()
};
