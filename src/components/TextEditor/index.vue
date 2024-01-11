<template>
  <div class="box-border h-screen w-screen overflow-hidden">
    <div
      class="m-[0_auto] mt-10 box-border h-auto max-w-200 border-1 border-gray-300/50 rounded-lg border-solid shadow-lg"
    >
      <!-- 各种功能 -->
      <div
        class="box-border h-14 w-full flex select-none items-center border-gray-900/10 rounded-t-lg px-1 py-2 shadow-md"
      >
        <div ref="editorNav" class="w-full">
          <div class="w-full flex items-center justify-around">
            <div
              v-for="(items, index) in editorButton.data.value"
              :key="index"
              class="relative w-full"
            >
              <div class="flex items-center justify-around">
                <button class="box-border button-default" @click="clickNav(items, index)">
                  <i class="block">
                    <svg-icon :name="items.name" class="h-5 w-5"></svg-icon>
                  </i>
                  <span class="block w-16 text-center">{{ items.title }}</span>
                </button>
              </div>
              <div v-if="items.children">
                <Title
                  v-show="items.hide"
                  :children="items.children"
                  :title="items.title"
                  @handleButtonNav="handleButtonNav"
                ></Title>
              </div>
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
        class="box-border min-h-100 w-full cursor-text overflow-hidden p-3 outline-0"
        @mouseup="getSelection"
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
/* 标题的子组件 */
import Title from './Title.vue';
import type { EditorButton } from '~/utils/editorDefaultButton';

/* 仓库 */
const editorButton = useEditorButton();

/* dom元素 */
const editor = ref<HTMLElement | null>(null);
const editorNav = ref<HTMLElement | null>(null);

/* 记录点击的最后一行 */
const lastNode = ref<HTMLElement>();

const handleButtonNav = (actions: string): void => {
  if (editor.value) {
    // 先判断lastNode 是否为空
    if (lastNode.value === undefined) {
      getSelection();
    }

    // 获取当前的 dom 对象
    const target = editor.value;

    if (lastNode.value && target) {
      // 获取当前选中的文档
      const parent = lastNode.value;
      /* 创建一个标签 */
      const newElement = document.createElement(actions);
      /* 接收文章内容 */
      newElement.innerHTML = parent.innerHTML;
      /* 替换 */
      parent.replaceWith(newElement);
      /* 重新绑定最后一个节点 */
      lastNode.value = newElement;
    }
  }
};

/**
 * 获取鼠标点击的范围
 */
const getSelection = (): void => {
  if (editor.value) {
    // 获取选择区域的对象
    const selection = window.getSelection();
    // 获取当前文档中被选中的文本所对应的第一个选区范围对象
    if (selection && selection.rangeCount > 0) {
      const range = selection?.getRangeAt(0);

      console.log('====');
      console.log(lastNode.value);
      console.log(range.toString());
      console.log(range.startOffset);
      console.log(range.endOffset);

      if (range) {
        lastNode.value = range.commonAncestorContainer.parentNode as HTMLElement;
      }
      console.log(lastNode.value);
    } else {
      lastNode.value = editor.value.childNodes[0] as HTMLElement;
    }
  }
};

const clickNav = (data: EditorButton, index: number): void => {
  if (data.hide !== undefined && data.hide !== null) {
    editorButton.setButtonHide(index);
  }
};

/**
 * 当点击其他地方的时候组件隐藏
 * @param e Event
 */
const handleOutsideClick = (e: Event): void => {
  if (!editorNav?.value?.contains(e.target as Node)) {
    editorButton.resetButton();
  }
};

onMounted(() => {
  /* 挂载全局点击事件 */
  window.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
});
</script>

<style>
.highlight {
  color: red;
}
</style>
