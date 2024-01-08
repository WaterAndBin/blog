<script setup lang="ts">
/* dom元素 */
const fullWindow = ref<HTMLElement | null>(null);
</script>

<template>
  <div id="id" ref="fullWindow" class="h-screen w-screen">
    <NuxtPage></NuxtPage>
  </div>
</template>
