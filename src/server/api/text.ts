/*
 * @Author: Guiter 1336263157@qq.com
 * @Date: 2023-11-03 11:24:27
 * @LastEditors: Guiter 1336263157@qq.com
 * @LastEditTime: 2023-11-03 11:26:25
 * @FilePath: \nuxt3-music-player\src\server\api\text.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* 测试 */
import http from '~/server';

/* 写法一 */
export const getText1 = async (id: string): Promise<any> => {
  return await http.post<{ code: number; data: any }>('/users/login', {
    username: '123',
    password: '123'
  }); // 接收，地址，参数
};
