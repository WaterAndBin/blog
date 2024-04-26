import http from '~/server';
import type { ArticleDetail } from '~/types/article';

/**
 * 举报文章
 * @param data
 * @returns
 */
export async function reportArticle({
  articleId,
  rejectType,
  rejectReason
}: {
  articleId: number;
  rejectType: number;
  rejectReason: string;
}): Promise<{ code: number; data: ArticleDetail; message: string }> {
  return await http.post<{ code: number; data: ArticleDetail; message: string }>(
    '/report/reportArticle',
    {
      article_id: articleId,
      reject_type: rejectType,
      reject_reason: rejectReason
    }
  );
}
