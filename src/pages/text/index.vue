<!--
 * @Author: Guiter 1336263157@qq.com
 * @Date: 2023-11-03 20:25:21
 * @LastEditors: Guiter 1336263157@qq.com
 * @LastEditTime: 2023-11-17 16:57:31
 * @FilePath: \frame\src\pages\text\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="bg-red-500">测试</h2>
    <h3>image的使用</h3>
    <nuxt-img src="/冰冰.jpg" class="h-100" />
    <h4>svg的使用</h4>
    <svg-icon name="list" height="28" wight="28" class="w-9 bg-black" @click="showList" />
  </div>
</template>

<script lang="ts" setup>
// 这里会报错，提示错误，若没报错，请注意插件是否有无安装
// const a = ref<number>(1);

const showList = (): void => {
  console.log('你好');
};
</script>
