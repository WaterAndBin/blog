<script setup lang="ts">
import type { EditorButtonChild } from '~/utils/editorDefaultButton';

const _props = defineProps<{
  children: EditorButtonChild[];
  title: string;
}>();

const _emits = defineEmits<{
  (event: 'handleButtonNav', actions: string): void;
}>();
</script>

<template>
  <div
    class="absolute top-[110%] box-border max-h-40 flex flex-col overflow-x-hidden overflow-y-auto border-1 border-gray-200 rounded border-solid bg-white py-1 shadow-md"
  >
    <template v-if="_props.title == '标题'">
      <div v-for="(items, index) in _props.children" :key="index" class="">
        <button
          class="mx-1 w-24 flex-row text-left button-default hover:bg-sky-200/50"
          @click="_emits('handleButtonNav', items.actions)"
        >
          <div class="">
            <div
              class="w-16"
              :style="{
                fontWeight: `calc(1000 - 300 * ${index})`,
                fontSize: `calc(21px - ${index * 2}px)`
              }"
            >
              {{ items.title }}
            </div>
          </div>
        </button>
      </div>
    </template>
    <template v-else>
      <div v-for="(items, index) in _props.children" :key="index" class="">
        <button class="mx-1 h-9 w-22 flex-row text-left button-default hover:bg-sky-200/50">
          <svg-icon :name="items.name" class="h-6 w-6"></svg-icon>
          <span class="block w-16 text-center">{{ items.title }}</span>
        </button>
      </div>
    </template>
  </div>
</template>
