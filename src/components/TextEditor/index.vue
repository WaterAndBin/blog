<template>
  <div class="box-border">
    <div
      ref="editorBody"
      class="border-default box-border h-auto max-w-200 border-3 rounded-lg shadow-lg"
    >
      <!-- class="box-border h-auto max-w-200 border-2 border-gray-300/70 rounded-lg border-solid shadow-lg" -->
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
                <button
                  class="box-border button-editor"
                  :class="checkButton(items.actions)"
                  @click="clickNav(items, index)"
                >
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
        class="editor-box box-border min-h-100 w-full cursor-text overflow-hidden p-3 outline-0"
        @mouseup="getMouseSelection"
        @keydown.enter="insertP"
        @input="changeContent"
        v-html="content"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { render } from 'vue';
/* 标题的子组件 */
import Title from './Title.vue';
import type { EditorButton } from '~/utils/editorDefaultButton';
import { tagNameAction } from '~/utils/editorDefaultButton';
import { findSameDocument } from '~/utils/findSameDocument';

// const props = defineProps({
//   modelValue: {
//     // 数据
//     type: String,
//     required: true,
//     default: ''
//   }
// });

const emit = defineEmits<{
  (event: 'update:modelValue', modelValue: string): void;
}>();

// const content =
// '<p>123 <strong>4<s>6</s>5</strong> ddd<strong>asd</strong>789<u><i>hallo</i></u></p>';
const content =
  '<p>123 <strong>4<s>6</s>5</strong> <strong>test</strong> ddd <strong><u>a<i>sd78</i>9</u></strong></p>';

/* 仓库 */
const editorButton = useEditorButton();

/* dom元素 */
const editor = ref<HTMLElement | null>(null);
const editorNav = ref<HTMLElement | null>(null);
const editorBody = ref<HTMLElement | null>(null);

const changeContent = (event: Event): void => {
  const editorElement = editor.value; // 获取 <div id="editor" ...> 元素
  if (editorElement) {
    const editorHTML = editorElement.innerHTML; // 获取编辑器内容的 HTML
    emit('update:modelValue', editorHTML);
  }
};

/* 记录点击的最后一行 */
const lastNode = ref<HTMLElement>();
/* 哪些对象不能存在 */
const selectActions = [
  'title',
  'hold',
  'color',
  'delete',
  'bias',
  'underline',
  'line',
  'code',
  'image'
];

/* 默认按钮 */
const buttonState = {
  isP: false,
  hold: false, // 加粗
  bias: false, // 斜线
  delete: false, // 删除线
  underline: false // 下划线
};

/* 活跃的状态 */
let activeActions: any = reactive({ ...buttonState });

const handleButtonNav = (actions: string): void => {
  if (editor.value) {
    // 获取当前的 dom 对象
    const target = editor.value;

    if (lastNode.value && target) {
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
        if (actions == 'line') {
          /* 插入水平线 */
          insertLine();
        } else if (actions == 'code') {
          insertCode();
        } else {
          /* 部分处理 */
          otherChange(actions);
        }
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
      /* 重置数据 */
      // resetActiveActions();
      /* 检查活动的区域 */
      checkActiveActions(selection);
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
 * 当点击其他地方的时候组件隐藏,头部
 * @param e Event
 */
const handleOutsideClick = (e: Event): void => {
  if (!editorNav?.value?.contains(e.target as Node)) {
    editorButton.resetButton();
  }
  if (!editorBody?.value?.contains(e.target as Node)) {
    resetActiveActions();
  }
};

/**
 * 检查文字，并且附上属性
 * @param actions 选择的选项
 */
const otherChange = (actions: string): void => {
  // 获取选择区域的对象
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0 && lastNode.value && selection.focusNode) {
    // checkActiveActions(selection);
    console.log(activeActions);
    /* 选区 */
    const range = selection?.getRangeAt(0);
    let parentNodeLength; /* 父亲长度 */
    const commonAncestorContainer: ParentNode | Node | undefined = findParent(
      range.commonAncestorContainer
    );

    if (commonAncestorContainer) {
      parentNodeLength = commonAncestorContainer.textContent?.length;

      if (Object.values(activeActions).every((val) => !val)) {
        /* 判断里面是否都是false */
        insertDocument(actions, commonAncestorContainer);
      } else {
        /* 以下是难点 */
        const startOffset = range.startOffset;
        const endOffset = range.endOffset;

        /* 判断一下是需要添加还是取消添加 */
        const isAdd = activeActions[actions];

        /* 全选字段 */
        const isAll = isSelectAll(commonAncestorContainer, parentNodeLength);

        if (
          startOffset === 0 &&
          startOffset < endOffset &&
          endOffset !== parentNodeLength &&
          isAll
        ) {
          /* 当从第一位开始选择的时候,并且不到尾部 */
          console.log('第一位开始');
          commonChange(isAdd, actions, commonAncestorContainer, 'start');
        } else if (startOffset !== 0 && endOffset === parentNodeLength && startOffset < endOffset) {
          /* 当是最后一位开始 */
          console.log('从中间选择开始，到最后');
          commonChange(isAdd, actions, commonAncestorContainer, 'end');
        } else if (startOffset === 0 && (endOffset === parentNodeLength || !isAll)) {
          console.log('选了全部');
          allChange(isAdd, actions, commonAncestorContainer);
        } else if (startOffset < endOffset) {
          /* 当只选择了中间 */
          console.log('选择了中间');
          middleChange(isAdd, actions, commonAncestorContainer);
        }
      }
    }
  }
};

/**
 * 插入新的元素
 * @param actions 元素
 */
const insertDocument = (actions: string, parentNode: ParentNode | Node | null): void => {
  console.log('插入新的元素');
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0 && parentNode) {
    const range = selection.getRangeAt(0);
    /* 去找相同的元素再决定用什么方法来解决 */
    const extractedContents = range.extractContents();
    /* 获取新的处理的节点 */
    const newExtractedContents = findSameDocument(actions, parentNode, extractedContents);
    /* 记录空节点，查看哪个节点里面的内容是空的 */
    const fragment = document.createDocumentFragment();
    fragment.appendChild(newExtractedContents);
    const actionsNode = document.createElement((tagNameAction as any)[actions]);
    range.surroundContents(actionsNode);
    actionsNode.appendChild(fragment);
    const nullNode = Array.from(parentNode.childNodes).find((items) => items.textContent == '');
    if (nullNode) {
      /* 上节点 */
      parentNode.insertBefore(actionsNode, nullNode);
      nullNode.remove();
    } else {
      console.log('没有空节点');
    }
  }
  console.log(parentNode);
};

// const getNodesBetween = (startNode: Node | ChildNode | null, endNode: Node | ChildNode) => {
//   const nodes = [];
//   let currentNode = startNode;
//   while (currentNode && currentNode !== endNode) {
//     nodes.push(currentNode);
//     currentNode = currentNode.nextSibling;
//   }
//   nodes.push(endNode);
//   return nodes;
// };

/**
 * 插入p标签
 */
const insertP = (e: Event): void => {
  // 获取光标位置或选择的文本
  const selection = window.getSelection();
  if (selection && lastNode.value) {
    const range = selection.getRangeAt(0);
    /* 专门记录code的 */
    const rangeParent = range.commonAncestorContainer.parentNode as HTMLElement;
    console.log(rangeParent);
    /* 位置 */
    const startOffset = range.startOffset;
    const lastNodeLength = lastNode.value?.textContent?.length;
    console.log(range.commonAncestorContainer);
    console.log(lastNode.value);
    if (rangeParent.className == 'pre-code' || lastNode.value.className == 'pre-code') {
      if (rangeParent.tagName !== 'CODE') {
        console.log('=======');
        document.execCommand('insertHTML', true, '<span class="pre-code"><br/></span>');
      } else {
        document.execCommand('insertHTML', true, '<span class="pre-code"><br/></span>');
      }
      e.preventDefault();
    } else if (
      range.startContainer.parentNode instanceof Element &&
      range.startContainer.parentNode.tagName !== 'P' &&
      range.startContainer.parentNode !== editor.value
    ) {
      /* 如果长度相同的情况下 */
      if (startOffset === lastNodeLength) {
        document.execCommand('insertHTML', true, '<p><br/></p>');
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
  resetActiveActions();
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection?.getRangeAt(0);
    const startContainer = range.startContainer;
    // const { childNodes } = startContainer;
    /* 判断孩子节点 */
    // if (childNodes.length !== 0) {
    //   for (let i = 0; i < childNodes.length; i++) {
    //     childNodes[i] instanceof HTMLElement
    //       ? checkClassName(childNodes[i])
    //       : checkClassName(childNodes[i].parentNode);
    //   }
    // } else {
    // let parentNode = startContainer.parentNode;
    checkClassName(startContainer.parentNode);
    // }
  }
};

/**
 * 更新样式
 * @param node 节点
 */
const checkClassName = (node: ParentNode | ChildNode | null): void => {
  if (node) {
    if (node.nodeName == 'STRONG') {
      activeActions.hold = true;
    }
    if (node.nodeName == 'S') {
      activeActions.delete = true;
    }
    if (node.nodeName == 'U') {
      activeActions.underline = true;
    }
    if (node.nodeName == 'I') {
      activeActions.bias = true;
    }
    if (node.parentNode?.parentNode !== editor.value) {
      checkClassName(node.parentNode);
    }
  }
};

/**
 * 重置活跃数据
 */
const resetActiveActions = (): void => {
  activeActions = Object.assign(activeActions, { ...buttonState });
};

/**
 * 检查按钮是否是激活的
 * @param items
 */
const checkButton = (items: string): string => {
  const actice = activeActions[items] as string;
  if (actice) {
    return 'activeButtonBg';
  }
  return '';
};

/**
 * 插入样式
 * @param isAdd 判断是插入还是删除
 * @param actions 他要插入的对象
 * @param parentNode 父亲
 */
const commonChange = (
  isAdd: boolean,
  actions: string,
  parentNode: Node | ParentNode | null,
  position: string
): void => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0 && lastNode.value && selection.focusNode) {
    /* 先判断是不是父亲 */
    if (parentNode) {
      const range = selection.getRangeAt(0);
      /* 选区模块 */
      const extractedContents = range.extractContents();
      /* 获取新的处理的节点 */
      const newExtractedContents = findSameDocument(actions, parentNode, extractedContents);

      /* 记录空节点，查看哪个节点里面的内容是空的 */
      const nullNode = Array.from(parentNode.childNodes).find((items) => items.textContent == '');
      if (
        nullNode &&
        parentNode.nodeName !== tagNameAction[actions as keyof TagNameAction].toUpperCase()
      ) {
        /* 如果不是选择全选 */
        if (!isAdd) {
          /* 上节点 */
          const actionsNode = document.createElement((tagNameAction as any)[actions]);
          actionsNode.appendChild(newExtractedContents);
          nullNode.appendChild(actionsNode);
        } else {
          const fragment = document.createDocumentFragment();
          fragment.appendChild(newExtractedContents);
          parentNode.insertBefore(fragment, nullNode);
          nullNode.remove();
        }
      } else {
        const fragment = document.createDocumentFragment();
        fragment.appendChild(newExtractedContents);
        if (!isAdd) {
          console.log('isAdd');
          const actionsNode = document.createElement((tagNameAction as any)[actions]);
          actionsNode.appendChild(fragment);
          if (position == 'end') {
            range.startContainer.parentNode?.appendChild(actionsNode);
          }
        } else {
          console.log('非isAdd');
          if (position == 'start') {
            try {
              parentNode.insertBefore(fragment, range.startContainer.parentNode);
            } catch (e) {
              parentNode.insertBefore(fragment, range.startContainer);
            }
          } else if (position == 'end') {
            if (range.startContainer.parentNode && range.endContainer.parentNode) {
              try {
                parentNode.insertBefore(fragment, range.endContainer.parentNode?.nextSibling);
              } catch (e) {
                if (parentNode.parentNode) {
                  parentNode.parentNode.insertBefore(
                    fragment,
                    range.endContainer.parentNode?.nextSibling
                  );
                }
              }
            }
          }
        }
      }

      const deletNode = Array.from(parentNode.childNodes).find((items) => items.textContent == '');
      deletNode?.remove();
    }
  }
};

/**
 * 全部的时候
 * @param isAdd
 * @param actions
 * @param parentNode
 */
const allChange = (isAdd: boolean, actions: string, parentNode: Node | ParentNode | null): void => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0 && lastNode.value && selection.focusNode) {
    const range = selection?.getRangeAt(0);
    if (isAdd) {
      findParentNode(actions, range.commonAncestorContainer);
    } else {
      const commonAncestorContainer = range.commonAncestorContainer;
      const extractedContents = range.extractContents();
      const fragment = document.createDocumentFragment();
      fragment.appendChild(extractedContents);
      const actionsNode = document.createElement((tagNameAction as any)[actions]);
      actionsNode.appendChild(fragment);
      commonAncestorContainer?.appendChild(actionsNode);
    }
  }
};

/**
 * 找到父级的parent
 * @param actions
 * @param node 节点
 */
const findParentNode = (actions: string, node: ParentNode | Node | null): void => {
  if (node == editor.value) return;
  if (node) {
    if (node.nodeName !== tagNameAction[actions as keyof TagNameAction].toUpperCase()) {
      findParentNode(actions, node.parentNode);
    } else {
      /* 找到了该属性 */
      const range = document.createRange();
      range.selectNodeContents(node);
      const newContents = range.extractContents();
      const fragment = document.createDocumentFragment();
      fragment.appendChild(newContents);
      node.parentNode?.replaceChild(fragment, node);
    }
  }
};

/**
 * 找到父节点
 * @param node
 */
const findParent = (
  node: HTMLElement | Element | ParentNode | Node | null | undefined
): Node | ParentNode | HTMLElement | Element | undefined => {
  if (node) {
    if (node.parentNode !== editor.value && editor.value?.contains(node.parentNode)) {
      return findParent(node.parentNode);
    } else {
      return node;
    }
  }
};

/**
 * 处理中间
 * @param isAdd
 * @param actions
 * @param parentNode
 */
const middleChange = (
  isAdd: boolean,
  actions: string,
  parentNode: Node | ParentNode | null
): void => {
  const selection = window.getSelection();
  if (
    selection &&
    selection.rangeCount > 0 &&
    lastNode?.value &&
    selection?.focusNode &&
    parentNode?.parentNode
  ) {
    const range = selection.getRangeAt(0);
    /* 选区模块 */
    const extractedContents = range.extractContents();
    const fragment = document.createDocumentFragment();
    fragment.appendChild(extractedContents);
    if (!isAdd) {
      const actionsNode = document.createElement((tagNameAction as any)[actions]);
      range.surroundContents(actionsNode);
      actionsNode.appendChild(fragment);
    } else {
      const actionsNode = document.createElement('span');
      range.surroundContents(actionsNode);
      // 创建一个新的范围 -- 中间节点
      if (actionsNode.nextSibling && range.commonAncestorContainer.parentNode) {
        const newRange = document.createRange();
        /* 先拿到下一个节点放外面 */
        newRange.selectNodeContents(actionsNode.nextSibling);
        const newExtractedContents = newRange.extractContents();
        const newFragment = document.createDocumentFragment();
        newFragment.appendChild(newExtractedContents);
        const actionsParentNode = document.createElement(parentNode.nodeName);
        actionsParentNode.appendChild(newFragment);
        parentNode.parentNode.insertBefore(
          actionsParentNode,
          range.commonAncestorContainer?.nextSibling
        );
        /* 将变化的节点扔到被转移节点的前面 */
        parentNode.parentNode.insertBefore(fragment, actionsParentNode);
        actionsNode.remove();
      }
    }
  }
};

/**
 * 插入水平线
 */
const insertLine = (): void => {
  // document.execCommand('insertHTML', true, '<hr>');//废弃的方法
  // document.execCommand('insertHTML', true, '<p><br/></p>');
  /* 找到lastNode.value的父亲组件 */
  const parentNode = findParent(lastNode.value);
  // 获取当前的选区
  const selection = window.getSelection();
  if (editor.value && parentNode && selection && selection.rangeCount > 0) {
    const hr = document.createElement('hr');
    const p = document.createElement('p');
    const br = document.createElement('br');
    p.appendChild(br);

    editor.value?.insertBefore(hr, parentNode?.nextSibling);
    editor.value?.insertBefore(p, hr.nextSibling);

    // 创建一个新的 range
    const range = document.createRange();
    // 设置 range 的起点和终点在新插入的 p 元素内
    range.setStart(p, 0);
    range.setEnd(p, 0);
    // 移出所有选区
    selection.removeAllRanges();
    // 将新的 range 设置为选区
    selection.addRange(range);
  }
};

/**
 * 插入代码块
 */
const insertCode = (): void => {
  // document.execCommand(
  //   'insertHTML',
  //   true,
  //   `<div class="pre-box" contenteditable="false"><div class="pre-header"><div></div><div></div><div></div></div><pre class="pre-body"><code contenteditable="true"><span class="pre-code"><br/></span></code></pre>`
  // );
  /* 找到lastNode.value的父亲组件 */
  const parentNode = findParent(lastNode.value);
  // 获取当前的选区
  const selection = window.getSelection();
  if (editor.value && parentNode && selection && selection.rangeCount > 0) {
    const outerDiv = document.createElement('div');
    outerDiv.className = 'pre-box';
    outerDiv.contentEditable = 'false';

    const preHeader = document.createElement('div');
    preHeader.className = 'pre-header';

    const preHeaderLeft = document.createElement('div');
    preHeaderLeft.className = 'pre-header-left';
    preHeaderLeft.innerHTML = '<div></div><div></div><div></div>';

    const preHeaderRight = document.createElement('div');
    preHeaderRight.className = 'pre-header-right';

    const pre = document.createElement('pre');
    pre.className = 'pre-body';

    const code = document.createElement('code');
    code.contentEditable = 'true';
    code.innerHTML = '<span class="pre-code"><br></span>';

    // 挂点节点
    pre.appendChild(code);
    outerDiv.appendChild(preHeader);
    outerDiv.appendChild(pre);
    preHeader.appendChild(preHeaderLeft);
    preHeader.appendChild(preHeaderRight);

    editor.value?.insertBefore(outerDiv, parentNode?.nextSibling);

    // 创建一个新的 range
    const range = document.createRange();
    // 设置 range 的起点和终点在新插入的 p 元素内
    range.setStart(code, 0);
    range.setEnd(code, 0);
    // 移出所有选区
    selection.removeAllRanges();
    // 将新的 range 设置为选区
    selection.addRange(range);

    /* 挂载按钮 */
    const buttonVNode = h(ButtonComponent, {
      onClick: (e: Event) => {
        const target = e.target as Element;
        if (target?.parentElement) {
          const parentNode = findParent(target) as Element;
          parentNode?.remove();
        }
      }
    });

    // 渲染按钮 VNode 到 outerDiv
    render(buttonVNode, preHeaderRight);
  }
};

const ButtonComponent = defineComponent({
  setup(props, { emit }) {
    return () => h('button', '删除');
  }
});

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
        console.log(mutation);
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

.activeButtonBg {
  background-color: rgba(128, 128, 128, 0.192);
}
</style>
