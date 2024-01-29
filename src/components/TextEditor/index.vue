<template>
  <div class="box-border h-screen w-screen overflow-y-scroll overflow-x-hidden">
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
        class="box-border min-h-100 w-full cursor-text overflow-hidden p-3 outline-0"
        @mouseup="getMouseSelection"
        @keydown.enter="insertP"
      >
        <p>
          123
          <span class="weight">456</span>
          789
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
/* 哪些对象不能存在 */
const selectActions = ['title', 'hold', 'color', 'delete'];
/* 活跃的状态 */
let activeActions = reactive({
  isP: true,
  hold: false
});

const handleButtonNav = (actions: string): void => {
  if (editor.value) {
    // 获取当前的 dom 对象
    const target = editor.value;

    if (lastNode.value && target) {
      console.log('进来了');

      /* 判断是不是整行处理的 */
      if (!selectActions.includes(actions)) {
        // 获取当前选中的文档
        const parent = lastNode.value;
        /* 创建一个标签 */
        const newElement = document.createElement(actions);

        /* 判读文章里面是否有内容 */
        if (parent.innerHTML) {
          /* 接收文章内容 */
          newElement.innerHTML = parent.innerHTML;
        }

        /* 替换 */
        parent.replaceWith(newElement);
        /* 重新绑定最后一个节点 */
        lastNode.value = newElement;
      } else {
        /* 部分处理 */
        otherChange(actions);
      }
    }
  }
};

/**
 * 获取鼠标点击的范围
 */
const getMouseSelection = (e?: Event): void => {
  if (editor.value) {
    // 获取选择区域的对象
    const selection = window.getSelection();
    // 获取当前文档中被选中的文本所对应的第一个选区范围对象
    if (selection && selection.rangeCount > 0 && editor?.value?.contains(e?.target as Node)) {
      const range = selection?.getRangeAt(0);
      if (range) {
        /* 判断他们的上级是不是editor */
        if (range.commonAncestorContainer.parentNode === editor.value) {
          lastNode.value = range.commonAncestorContainer as HTMLElement;
        } else {
          /* 判断元素是不是在editor里面 */
          if (editor?.value?.contains(range.commonAncestorContainer.parentNode)) {
            lastNode.value = range.commonAncestorContainer.parentNode as HTMLElement;
          } else {
            lastNode.value = editor.value.childNodes[0] as HTMLElement;
          }
        }
      }
    } else {
      lastNode.value = editor.value.childNodes[0] as HTMLElement;
    }
  }
  console.log('节点', lastNode.value);
  /* 不能用下面的方法，会出现问题，节点锁定到大的div盒子 */
  // if (editor.value) {
  //   if (e) {
  //     lastNode.value = e.target as HTMLElement;
  //   } else {
  //     console.log('获取了editor的第一个子元素');
  //     lastNode.value = editor.value.childNodes[0] as HTMLElement;
  //   }
  // }
  // console.log(lastNode.value);
};

/**
 * 点击标题的时候
 * @param data 数据
 * @param index 序号
 */
const clickNav = (data: EditorButton, index: number): void => {
  if (data.hide !== undefined && data.hide !== null) {
    editorButton.setButtonHide(index);
  }
  if (!data.hide && data.actions) {
    handleButtonNav(data.actions);
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

/**
 * 检查文字，并且附上属性
 * @param actions 选择的选项
 */
const otherChange = (actions: string): void => {
  // 获取选择区域的对象
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    checkActiveActions(selection);
    const { hold } = activeActions;
    const range = selection?.getRangeAt(0);
    if (!hold) {
      const selectedText = selection.toString();
      range.deleteContents(); // 删除选中的内容
      const span = document.createElement('span'); // 创建一个新的span元素
      span.classList.add('weight');
      span.textContent = selectedText; // 设置span的内容为选中的文本
      range.insertNode(span); // 将span插入到选中的位置
    } else {
      let parentNode;
      if (lastNode.value?.parentNode !== editor.value) {
        parentNode = lastNode.value;
      }
      console.log(parentNode);

      const startOffset = range.startOffset;
      const endOffset = range.endOffset;
      console.log(range.toString());

      if (startOffset < endOffset) {
        const selectedText = selection.toString();
        range.deleteContents(); // 删除选中的内容
        const span = document.createElement('span'); // 创建一个新的span元素
        span.id = 'change';
        span.textContent = selectedText; // 设置span的内容为选中的文本
        range.insertNode(span); // 将span插入到选中的位置
      }

      console.log(startOffset, endOffset);
    }
  }
};

/**
 * 插入p标签
 */
const insertP = (e: Event): void => {
  // 获取光标位置或选择的文本
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    /* 位置 */
    const offset = range.startOffset;
    const lastNodeLength = lastNode.value?.textContent?.length;
    if (
      range.startContainer.parentNode instanceof Element &&
      range.startContainer.parentNode.tagName !== 'P' &&
      range.startContainer.parentNode !== editor.value
    ) {
      /* 如果长度相同的情况下 */
      if (offset === lastNodeLength) {
        document.execCommand('insertHTML', false, '<p><br/></p>');
        e.preventDefault();
      }
    }
  }
};

/**
 * 删除元素
 */
const deleteDocument = (): void => {
  if (editor) {
    const newParagraph = document.createElement('p');
    const newBreak = document.createElement('br');
    newParagraph.appendChild(newBreak);
    editor.value?.appendChild(newParagraph);
  }
};

/**
 * 检查活跃的状态
 */
const checkActiveActions = (e: Selection): void => {
  activeActions = {
    isP: false,
    hold: false
  };
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection?.getRangeAt(0);
    const commonAncestorContainer = range.commonAncestorContainer;
    const { childNodes } = commonAncestorContainer;
    /* 判断孩子节点 */
    if (childNodes.length !== 0) {
      for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i] as HTMLElement;
        if (node.className === 'weight') {
          activeActions.hold = true;
        }
      }
    } else {
      /* 没有孩子节点就判断父亲 */
      const node = commonAncestorContainer.parentNode as HTMLElement;
      if (node.className === 'weight') {
        activeActions.hold = true;
      }
    }
  }
};

onMounted(() => {
  /* 挂载全局点击事件 */
  window.addEventListener('click', handleOutsideClick);

  /* 先获取节点 */
  getMouseSelection();

  /* 观察者 => 观察结构等是否发生变化 */
  const observer = new MutationObserver((mutations): void => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const addedNode = mutation.addedNodes[i];
          if (addedNode.nodeName === 'P') {
            /* 增加一个Event属性 */
            const event = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            addedNode.dispatchEvent(event);
            getMouseSelection(event);
          }
        }
      }
      if (mutation.removedNodes.length > 0 && editor) {
        // 当有节点被移除时，检查editor是否没有子节点
        if (editor.value?.firstChild === null) {
          deleteDocument();
        }
      }
    });
  });

  // attributes: 当设置为true时，这个属性会观察目标节点的属性变化。当属性变化发生时，MutationObserver回调函数会被触发。
  // childList: 当设置为true时，这个属性会观察目标节点的直接子节点的添加和移除。当子节点发生变化时，MutationObserver回调函数会被触发。
  // subtree: 当设置为true时，这个属性会观察目标节点的所有子孙节点的添加和移除。当子孙节点发生变化时，MutationObserver回调函数会被触发。
  const options = { attributes: true, childList: true, subtree: true };
  observer.observe(document.getElementById('editor') as Node, options);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
});
</script>

<style>
.highlight {
  color: red;
}

.weight {
  font-weight: 600;
}
</style>
