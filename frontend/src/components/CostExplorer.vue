<template>
  <div ref="container" class="three-container"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, watch, ref } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  services: {
    type: Array,
    default: () => []
  }
});

const container = ref(null);
let renderer;
let scene;
let camera;
let animationId;

function buildScene() {
  if (!container.value) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, container.value.clientWidth / 360, 0.1, 1000);
  camera.position.set(0, 8, 18);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, 360);
  container.value.innerHTML = '';
  container.value.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 10, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));

  renderBars();
  animate();
}

function renderBars() {
  if (!scene) return;

  const existing = scene.children.filter((child) => child.userData.costBar);
  for (const child of existing) {
    scene.remove(child);
  }

  const maxAmount = Math.max(...props.services.map((item) => item.amount), 1);
  const startX = -(props.services.length * 1.5) / 2;

  props.services.forEach((item, index) => {
    const height = Math.max(0.6, (item.amount / maxAmount) * 8);
    const geometry = new THREE.BoxGeometry(1, height, 1);
    const material = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 });
    const bar = new THREE.Mesh(geometry, material);
    bar.position.set(startX + index * 1.5, height / 2, 0);
    bar.userData.costBar = true;
    scene.add(bar);
  });
}

function animate() {
  animationId = requestAnimationFrame(animate);
  if (scene) {
    scene.rotation.y += 0.003;
    renderer.render(scene, camera);
  }
}

watch(() => props.services, renderBars, { deep: true });

onMounted(buildScene);

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  if (renderer) renderer.dispose();
});
</script>
