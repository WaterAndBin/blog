<template>
  <div class="w-screen h-screen overflow-hidden box-border">
    <div
      class="m-[0_auto] h-auto max-w-200 box-border shadow-lg rounded-lg border-1 border-solid border-gray-300/50 mt-10"
    >
      <!-- 各种功能 -->
      <div class="h-10 flex items-center border-gray-900/10 rounded-t-lg py-2 shadow-md">
        <div class="flex">
          <div class="flex">
            <div class="" v-for="(items, index) in editorButton" :key="index">
              <button class="button-default">
                <i class="block">
                  <svg-icon :name="items.name" class="w-5 h-5"></svg-icon>
                </i>
                <span class="w-14 block text-center">{{ items.title }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 文本编辑器 -->
      <div
        id="editor"
        ref="editor"
        contenteditable="true"
        placeholder="请输入你想要的文章"
        class="w-full min-h-100 box-border overflow-hidden outline-0 p-3"
        @mouseup="handleMouseUp"
      >
        <p>
          这是一个
          <span class="highlight">高亮</span>
          文字
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { editorButton } from '~/utils/editorDefaultButton';

/* dom元素 */
const editor = ref<HTMLElement | null>(null);
const selectedText = ref('');

const handleMouseUp = (): void => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (range && range.toString().length > 0) {
      selectedText.value = range.toString();
    }
  }
  console.log(selection);
  console.log(selectedText.value);
};
</script>

<style>
.highlight {
  font-size: 20px;
}
</style>
