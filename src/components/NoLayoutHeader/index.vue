<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <div
    class="cursor-pointer text-center text-3xl font-semibold sm:text-left"
    @click="router.push('/')"
  >
    个人博客
  </div>
</template>
