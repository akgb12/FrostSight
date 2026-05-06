<template>
  <main class="app-shell">
    <section class="hero-card">
      <div>
        <p class="eyebrow">cloud cost intelligence</p>
        <h1>FrostSight</h1>
        <p class="subtitle">Track spend spikes, cache dashboard summaries, and explore service level cloud billing data in 3D.</p>
      </div>
      <button @click="loadDashboard">Refresh dashboard</button>
    </section>

    <DashboardView
      :summary="summary"
      :services="services"
      :alerts="alerts"
      :recommendations="recommendations"
    />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DashboardView from './views/DashboardView.vue';
import { getAlerts, getRecommendations, getServiceSpend, getSpendSummary } from './services/api.js';

const summary = ref(null);
const services = ref([]);
const alerts = ref([]);
const recommendations = ref([]);

async function loadDashboard() {
  const [summaryData, serviceData, alertData, recommendationData] = await Promise.all([
    getSpendSummary(),
    getServiceSpend(),
    getAlerts(),
    getRecommendations()
  ]);

  summary.value = summaryData;
  services.value = serviceData;
  alerts.value = alertData;
  recommendations.value = recommendationData;
}

onMounted(loadDashboard);
</script>
