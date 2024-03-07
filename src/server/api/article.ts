import http from '~/server';

/**
 * 注册
 * @param data 数据
 * @returns
 */
export async function publishArticle(data: FormData): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/article/publishArticle', data);
}
