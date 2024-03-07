/* 文件上传 */
import http from '~/server';

/**
 * 注册
 * @param data 数据
 * @returns
 */
export async function picUpload(data: Blob): Promise<{ code: number; message: string }> {
  console.log(data);
  console.log(typeof data);
  return await http.post<{ code: number; message: string }>('/upload/picUpload', data);
}
