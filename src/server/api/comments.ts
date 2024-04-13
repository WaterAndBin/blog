import http from '~/server';

/**
 * 发布评论
 * @param data 数据
 * @returns
 */
export async function reqComments(
  content: string,
  id: number
): Promise<{ code: number; data: any[]; message: string }> {
  return await http.post<{ code: number; data: any[]; message: string }>('/comments/reqComments', {
    reviewer_content: content,
    article_id: id
  });
}

/**
 * 发布评论
 * @param data 数据
 * @returns
 */
export async function getComments(
  id: number
): Promise<{ code: number; data: any[]; message: string }> {
  return await http.post<{ code: number; data: any[]; message: string }>('/comments/getComments', {
    article_id: id
  });
}
