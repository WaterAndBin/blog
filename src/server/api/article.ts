import http from '~/server';
import type { AddArticle } from '~/types/article';

/**
 * 注册
 * @param data 数据
 * @returns
 */
export async function publishArticle(data: AddArticle): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/article/publishArticle', data);
}
