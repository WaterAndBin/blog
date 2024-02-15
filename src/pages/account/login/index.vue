<script lang="ts" setup>
const show = ref<boolean>(true);
const loginState = reactive({
  account: '',
  password: ''
});

const hanleSumbit = (): void => {
  console.log(123);
};

// 不使用模板
definePageMeta({
  layout: false
});
</script>

<template>
  <div class="border-default box-border h-screen overflow-hidden border-4 p-4">
    <div class="h-5%">
      <NoLayoutHeader></NoLayoutHeader>
    </div>
    <div class="h-95% flex-default">
      <div class="border-default box-border h-95 w-100 border-4 p-3">
        <form class="h-full w-full flex flex-col" onsubmit="return false;">
          <div class="text-center text-2xl font-semibold">登录</div>
          <div class="mt-4 flex flex-1 flex-col">
            <DefaultInput v-model="loginState.account" title="账号" :show="show"></DefaultInput>
            <DefaultInput
              v-model="loginState.password"
              type="password"
              title="密码"
              :show="show"
            ></DefaultInput>
          </div>
          <div class="my-5 text-center">
            <button class="button-default" @click.enter="hanleSumbit">提交</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
