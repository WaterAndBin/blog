<script lang="ts" setup>
import { userRegister } from '~/server/api/user';
import type { userAccount } from '~/types/user';

const show = ref<boolean>(false);
const keywords = ['账号', '密码'];
const router = useRouter();

const loginState = reactive<userAccount>({
  account: '',
  password: ''
});

const hanleSumbit = async (): Promise<void> => {
  const checkData = checkObj(loginState, keywords);
  if (checkData == false) {
    const res = await userRegister(loginState);
    if (res.code == 200) {
      useMessage({
        message: '注册成功',
        type: 'success'
      });
      router.push('/account/login');
    } else {
      useMessage({
        message: res.message,
        type: 'warn'
      });
    }
  } else {
    show.value = true;
  }
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
          <div class="text-center text-2xl font-semibold">注册</div>
          <div class="mt-4 flex flex-1 flex-col">
            <DefaultInput v-model="loginState.account" title="新账号" :show="show"></DefaultInput>
            <DefaultInput
              v-model="loginState.password"
              type="password"
              title="密码"
              :show="show"
            ></DefaultInput>
          </div>
          <div class="text-sm">
            已有账号?
            <nuxt-link to="/account/login" class="no-underline">点击登录</nuxt-link>
          </div>
          <div class="my-5 text-center">
            <button class="button-default" @click.enter="hanleSumbit">注册</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
