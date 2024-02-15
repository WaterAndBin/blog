<template>
  <label class="relative my-4">
    <span class="mb-2 text-lg font-extralight font-semibold font-serif text-stone-800">
      {{ title }}
      <span class="text-lg text-red-600">*</span>
    </span>
    <input
      class="border-default box-border max-h-none min-h-6 w-full border-3 rounded px-2 py-1 text-xl"
      :type="type"
      :value="modelValue"
      :placeholder="placeholderVaule"
      autocomplete="off"
      @input="updateValue"
    />
    <transition name="tip">
      <span
        v-show="modelValue == '' && show"
        class="absolute bottom-[-1.3rem] left-0 text-sm text-red-600"
      >
        请输入{{ props.title }}
      </span>
    </transition>
    <transition name="tip">
      <span
        v-show="modelValue != '' && modelValue !== againPassword && again && show"
        class="absolute bottom-[-1.2rem] left-0 text-sm text-red-600"
      >
        请与上一次密码相同
      </span>
    </transition>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    // 标题与提示关键词
    type: String,
    default: '内容'
  },
  modelValue: {
    // 数据
    type: String,
    required: true,
    default: ''
  },
  show: {
    // 是否展示提示
    type: Boolean,
    default: false
  },
  type: {
    // 输入框类型
    type: String,
    default: 'text'
  },
  placeholderVaule: String, // 输入框提示内容
  again: {
    // 确认的显示与隐藏
    type: Boolean,
    default: false
  },
  againPassword: {
    // 确认多一次密码
    type: String,
    default: ''
  }
});

const emit = defineEmits<{
  (event: 'update:modelValue', modelValue: string | number): void;
}>();

const updateValue = (event: Event): void => {
  if (event.target) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
};
</script>

<style lang="scss" scoped>
.tip-enter-active {
  -webkit-animation: slide-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.tip-leave-active {
  -webkit-animation: leave-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: leave-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@-webkit-keyframes slide-bottom {
  0% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes slide-bottom {
  0% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    opacity: 1;
  }
}

@-webkit-keyframes leave-bottom {
  0% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    opacity: 0;
  }
}
@keyframes leave-bottom {
  0% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    opacity: 0;
  }
}
</style>
