<template>
  <Teleport to="body">
    <!-- <Transition name="dialog"> -->
    <div class="reportDialog absolute z-999 h-full w-full bg-gray-500/60">
      <div
        class="reportDialog absolute border-default box-border h-100 w-100 border-4 bg-white p-4"
      >
        <!-- 标题 -->
        <div class="flex items-center justify-between">
          <span class="text-2xl">举报反馈</span>
          <span class="">
            <svg-icon name="close" class="h-7 w-7 cursor-pointer"></svg-icon>
          </span>
        </div>
        <!-- 内容 -->
        <div class="mt-2">
          <div class="">
            <div>举报类型</div>
            <div class="grid grid-cols-4 mt-3 gap-2">
              <button
                v-for="(items, index) in rejectButton"
                :key="index"
                class="button-default h-8 w-21"
              >
                {{ items.value }}
              </button>
            </div>
          </div>
          <div class="mt-3">
            <div>举报理由</div>
            <div class="mt-2">
              <DefaultTextarea :title-require="false" :is-resize="false" />
            </div>
          </div>
          <div>
            <button></button>
          </div>
        </div>
      </div>
    </div>
    <!-- </Transition> -->
  </Teleport>
</template>

<script lang="ts" setup>
const rejectButton = [
  {
    key: 1,
    value: '封面问题'
  },
  {
    key: 2,
    value: '标题问题'
  },
  {
    key: 3,
    value: '侮辱谩骂'
  },
  {
    key: 4,
    value: '内容抄袭'
  },
  {
    key: 5,
    value: '内容涉黄'
  },
  {
    key: 6,
    value: '政治相关'
  },
  {
    key: 7,
    value: '其他'
  }
];

// const initState = {
//   reject_type: '',
//   reject_reason: ''
// };
// const state = reactive({
//   ...initState
// });
</script>

<style lang="scss" scoped>
.reportDialog {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.5s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  transform: translate(-50%, -100%);
  opacity: 0;
}

.textarea {
  display: block; /* 将 input 元素转换成块级元素 */
  width: 100%; /* 设置元素的宽度为 100% */
  height: auto; /* 设置高度为自适应 */
  padding: 0.375rem 0.75rem; /* 设置内边距 */
  line-height: 1.5; /* 设置行间距 */
  resize: vertical; /* 设置垂直方向可以调整大小 */
}
</style>
