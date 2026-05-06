<template>
  <section class="grid two-columns">
    <div class="panel">
      <h2>Spend Summary</h2>
      <div class="metric-grid" v-if="summary">
        <MetricCard label="Total Spend" :value="formatCurrency(summary.totalSpend)" />
        <MetricCard label="Line Items" :value="summary.lineItemCount" />
        <MetricCard label="Top Service" :value="summary.topService" />
        <MetricCard label="Optimizations" :value="summary.optimizationCount" />
      </div>
    </div>

    <div class="panel">
      <h2>Cost Spike Alerts</h2>
      <div v-if="alerts.length === 0" class="empty-state">No active cost spike alerts.</div>
      <div v-for="alert in alerts" :key="alert.service" class="alert-card">
        <strong>{{ alert.service }}</strong>
        <span>{{ alert.severity }}</span>
        <p>{{ alert.message }} at {{ formatCurrency(alert.amount) }}</p>
      </div>
    </div>
  </section>

  <section class="panel explorer-panel">
    <div class="section-header">
      <div>
        <h2>Interactive Cost Explorer</h2>
        <p>Three.js bars scale by service level cloud spend.</p>
      </div>
    </div>
    <CostExplorer :services="services" />
  </section>

  <section class="grid two-columns">
    <div class="panel">
      <h2>Service Breakdown</h2>
      <div v-for="service in services" :key="service.service" class="service-row">
        <span>{{ service.service }}</span>
        <strong>{{ formatCurrency(service.amount) }}</strong>
      </div>
    </div>

    <div class="panel">
      <h2>Recommended Optimizations</h2>
      <div v-for="item in recommendations" :key="item.service" class="recommendation-card">
        <strong>{{ item.service }}</strong>
        <p>{{ item.recommendation }}</p>
        <span>Estimated savings {{ formatCurrency(item.estimatedMonthlySavings) }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import CostExplorer from '../components/CostExplorer.vue';
import MetricCard from '../components/MetricCard.vue';

defineProps({
  summary: Object,
  services: Array,
  alerts: Array,
  recommendations: Array
});

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
}
</script>
