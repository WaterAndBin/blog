/* 文章 */
import { UserList } from './user';

/**
 * 登陆账号，密码
 */
export interface AddArticle {
  article_title: string; // 文章标题
  article_cover: string; // 文章封面
  article_content: string; // 文章内容
}

/**
 * 文章列表分页
 */
export interface ArticleListPagination {
  currentPage: number;
  pageSize: number;
  total: number;
  list: ArticleDetail[];
}

/**
 * 文章列表
 */
export interface ArticleDetail {
  id: number;
  article_title: string;
  article_cover: string;
  article_content: string;
  author: UserList;
  author_id: number;
  created_time: string;
  updated_time: string;
  tabs_id: string | number[];
  status: number;
  is_deleted: number;
  type: number;
  auditors: number;
  review_time: string;
  reject_reason: string;
  reject_type: number;
}
