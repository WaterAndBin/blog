/* 文件上传 */
import http from '~/server';

/**
 * 注册
 * @param data 数据
 * @returns
 */
export async function picUpload(
  data: FormData
): Promise<{ code: number; data: string; message: string }> {
  return await http.post<{ code: number; data: string; message: string }>(
    '/upload/picUpload',
    data
  );
}
