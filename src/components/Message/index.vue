<script setup lang="ts">
import type { MessageType } from '~/types/message';

const _props = defineProps<{
  message: string;
  length: number;
  type?: MessageType;
  onClick: () => void;
}>();

const open = ref(false);
/**
 * 确认
 */
const handleComfirm = (): void => {
  open.value = false;
  setTimeout((): void => {
    _props.onClick();
  }, 400);
};

onMounted(() => {
  open.value = true;
  setTimeout(() => {
    handleComfirm();
  }, 2000);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="message">
      <Suspense>
        <div
          v-show="open"
          id="message"
          class="trans message absolute left-[50%] z-99 border-default h-11 min-w-30 border-3 rounded-lg bg-white text-center shadow-md transition-all"
          :style="{ top: length * 7 + 6 + '%' }"
        >
          <div class="box-border h-full w-full flex-default px-5">
            <div v-if="type" class="min-w-8 flex-default">
              <svg-icon class="h-6 w-6" :name="`message-${type}`" />
            </div>
            <div class="flex-1 whitespace-nowrap">
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </Suspense>
    </Transition>
  </Teleport>
</template>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}

.message-enter-from,
.message-leave-to {
  transform: translate(-50%, -100%);
  opacity: 0;
}
</style>
