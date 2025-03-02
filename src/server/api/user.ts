import http from '~/server';
import type { userAccount, UserInfo } from '~/types/user';

/**
 * 注册
 * @param data 数据
 * @returns
 */
export async function userRegister(data: userAccount): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/user/register', {
    ...data
  });
}

/**
 * 登录
 * @param data 数据
 * @returns
 */
export async function userLogin(
  data: userAccount
): Promise<{ code: number; token: string; message: string }> {
  return await http.post<{ code: number; token: string; message: string }>('/user/login', {
    ...data
  });
}

/**
 * 登录
 * @param data 数据
 * @returns
 */
export async function getMyInfo(): Promise<{ code: number; data: UserInfo }> {
  return await http.get<{ code: number; data: UserInfo }>('/user/getMyInfo');
}
