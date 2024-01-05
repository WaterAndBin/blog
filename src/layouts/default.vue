<script setup lang="ts">
/* dom元素 */
const fullWindow = ref<HTMLElement | null>(null);
/* 仓库 */
const useEditor = useEditorStore();

const fullDown = (): void => {
  if (fullWindow.value) {
    useEditor.setDocumentTarget(fullWindow.value.id);
  }
};
</script>

<template>
  <div id="id" ref="fullWindow" class="h-screen w-screen bg-black" @mousedown="fullDown">
    <NuxtPage></NuxtPage>
  </div>
</template>
