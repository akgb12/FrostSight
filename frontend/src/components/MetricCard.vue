<template>
  <div class="metric-card">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number]
});
</script>
