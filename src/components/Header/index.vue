<script setup lang="ts">
const router = useRouter();

const userStore = useUserStore();

const reset = (): void => {
  userStore.$reset();
  useMessage({
    message: '退出成功',
    type: 'success'
  });
};
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
        <template v-if="!userStore.userInfo.user_name">
          <span class="cursor-pointer text-lg" @click="router.push('/account/login')">登录</span>
        </template>
        <template v-else>
          <span class="mr-5 text-lg">您好，{{ userStore.userInfo.user_name }}</span>
          <span class="cursor-pointer text-lg" @click="reset">退出登录</span>
        </template>
      </div>
      <div>
        <button
          class="border-default flex-default border-3 bg-transparent px-1 text-lg hover:bg-gray-100"
          @click="router.push('/new')"
        >
          <!-- <nuxt-link to="/new"> -->
          <svg-icon name="header-publish.svg" class="mr-1 h-6 w-6 cursor-pointer"></svg-icon>
          <span>发布文章</span>
          <!-- </nuxt-link> -->
        </button>
      </div>
    </div>
  </div>
</template>
