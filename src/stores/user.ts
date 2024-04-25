import { getMyInfo } from '~/server/api/user';
import type { UserInfo } from '~/types/user';

/* 用户的仓库 */
const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      token: '',
      userInfo: {} as const as UserInfo
    };
  },
  actions: {
    /* 存储token */
    setToken(storage: string): void {
      this.token = storage;
    },
    async getUserInfo(): Promise<void> {
      const res = await getMyInfo();
      if (res.code == 200) {
        this.userInfo = res.data;
      }
    }
  }
});

export default useUserStore;
