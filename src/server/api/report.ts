import http from '~/server';
import type { ArticleDetail } from '~/types/article';

/**
 * 举报文章
 * @param data
 * @returns
 */
export async function reportArticle({
  id,
  rejectType,
  rejectReason
}: {
  id: number;
  rejectType: number;
  rejectReason: string;
}): Promise<{ code: number; data: ArticleDetail; message: string }> {
  return await http.post<{ code: number; data: ArticleDetail; message: string }>(
    '/report/reportArticle',
    {
      id,
      reject_type: rejectType,
      reject_reason: rejectReason
    }
  );
}
