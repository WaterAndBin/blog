import http from '~/server';

/**
 * 获取所有的标签
 * @param data 数据
 * @returns
 */
export async function getAllTabs(): Promise<{ code: number; data: any[]; message: string }> {
  return await http.post<{ code: number; data: any[]; message: string }>('/tabs/getAllTabs');
}
