/**
 * 登陆账号，密码
 */
export interface userAccount {
  account: string; // 账号
  password: string; // 密码
}

/**
 * 获取用户列表
 */
export interface userListPagination {
  currentPage: number; // 当前页
  list: tabsList[];
  pageSize: 10; // 页的总数
  total: 1; // 总的数据
}

/**
 * 角色列表
 */
export interface userList {
  id: number; // 主键 id
  role_id: number; // 角色id
  user_name: string; // 标签名字
  is_deleted: number; // 是否禁用
  created_time: string; // 创建时间
  status: number; //状态
}
