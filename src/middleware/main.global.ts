/*
 * @Author: WaterAndBin 1336263157@qq.com
 * @Date: 2023-08-18 09:09:36
 * @LastEditors: Guiter 1336263157@qq.com
 * @LastEditTime: 2023-11-30 16:17:54
 * @FilePath: \manage-back\src\middleware\main.global.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default defineNuxtRouteMiddleware((to, _from) => {
  // const userStore = useUserStore();
  // const token = userStore.token;
  // 当去的路径不是登录界面时;
  // if (to.path !== '/login') {
  //   // 如果存在token 那么就放行
  //   if (token) {
  //     abortNavigation();
  //   } else {
  //     // 如果不存在token 那么就跳转到登录界面
  //     abortNavigation();
  //     return navigateTo('/login');
  //   }
  // } else {
  //   // 当去的路径是登录界面时
  //   // 如果存在token 那么就跳转到首页
  //   if (token) {
  //     abortNavigation();
  //     return navigateTo('/');
  //   } else {
  //     // 如果不存在token 那么就放行
  //     abortNavigation();
  //   }
  // }
});
