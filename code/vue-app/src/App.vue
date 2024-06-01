<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue';
import { onMounted, onBeforeUnmount } from 'vue';

const handleResize = () => {
  const maxWidth = 750;
  const minWidth = 100;
  const width = Math.min(Math.max(document.documentElement.clientWidth, minWidth), maxWidth);
  const rem = width / 10;
  document.documentElement.style.fontSize = rem + 'px';
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="root">
    <NavigationBar />
    <RouterView />
  </div>
</template>

<style scoped>
.root {
  height: 100%;
  width: 100%;
}
</style>
