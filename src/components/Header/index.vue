<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="border-default h-16 w-full flex-default justify-between border-b-4 px-5">
    <div class="text-3xl font-semibold">
      <span class="cursor-pointer" @click="router.push('/')">个人博客</span>
    </div>
    <div class="">
      <div class="border-default h-9 flex-default border-3">
        <input class="mx-1 h-full w-53 border-0" type="text" placeholder="请输入关键词" />
        <span class="border-default h-full w-8 flex-default border-l-3">
          <svg-icon name="search" class="h-7 w-7 cursor-pointer"></svg-icon>
        </span>
      </div>
    </div>
    <div class="flex items-center">
      <div class="mr-5">
        <span class="cursor-pointer text-lg" @click="router.push('/account/login')">登录</span>
      </div>
      <div>
        <button
          class="border-default flex-default border-3 bg-transparent px-1 text-lg hover:bg-gray-100"
          @click="router.push('/new')"
        >
          <svg-icon name="header-publish.svg" class="mr-1 h-6 w-6 cursor-pointer"></svg-icon>
          <span>发布文章</span>
        </button>
      </div>
    </div>
  </div>
</template>
