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
export const getText1 = async (id: string) => {
  return await http.get<{ code: number; data: any }>('/catalog/catPicturesList', { id }); // 接收，地址，参数
};

/* 写法二 */
export const getText2 = async (id: string) => {
  const res = await http.get<{ code: number; data: any }>('/catalog/catPicturesList', { id });
  return res;
};

/* 写法三 */
export const getText3 = (id: string) => {
  http
    .get<{ code: number; data: any }>('/catalog/catPicturesList', { id })
    .then((data: any) => {
      console.log(data);
      return data;
    })
    .catch((error: any) => {
      console.log(error);
    });
};
