import http from '~/server';
import type { AddArticle, ArticleDetail, ArticleListPagination } from '~/types/article';

/**
 * 发布文章
 * @param data 数据
 * @returns
 */
export async function publishArticle(data: AddArticle): Promise<{ code: number; message: string }> {
  return await http.post<{ code: number; message: string }>('/article/publishArticle', data);
}

/**
 * 获取文章列表
 * @param data
 * @returns
 */
export async function getAllArticleList(
  page: number,
  pageSize: number
): Promise<{ code: number; data: ArticleListPagination; message: string }> {
  return await http.post<{ code: number; data: ArticleListPagination; message: string }>(
    '/article/getAllArticleList',
    {
      page,
      pageSize
    }
  );
}

/**
 * 获取文章的详细数据
 * @param data
 * @returns
 */
export async function getArticleDetail(
  id: number
): Promise<{ code: number; data: ArticleDetail; message: string }> {
  return await http.post<{ code: number; data: ArticleDetail; message: string }>(
    '/article/getArticleDetail',
    {
      id
    }
  );
}

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
    '/article/reportArticle',
    {
      id,
      reject_type: rejectType,
      reject_reason: rejectReason
    }
  );
}
