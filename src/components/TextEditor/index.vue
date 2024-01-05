<template>
  <div class="flex flex-col items-center justify-center">
    <div>富文本编辑器</div>
    <div
      id="editor"
      ref="editor"
      contenteditable="true"
      placeholder="请输入你想要的文章"
      class="box-border h-100 w-240 overflow-x-hidden overflow-y-auto border-1 border-solid bg-red-100 p-4 outline-0"
      @mouseup="upEditor"
    >
      这是一个
      <span class="highlight">高亮</span>
      文字
    </div>
  </div>
</template>

<script setup lang="ts">
/* dom元素 */
const editor = ref<HTMLElement | null>(null);
/* 仓库 */
// const useEditor = useEditorStore();

const upEditor = (e: Event): void => {
  console.log(e);
  // if (e.target) {
  // console.log(e.target.id);
  // }
  // if(useEditor.documentTarget == )
};
</script>

<style>
.highlight {
  font-size: 20px;
}
</style>
