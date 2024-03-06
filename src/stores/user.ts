/* 用户的仓库 */
const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      token: ''
    };
  },
  actions: {
    /* 存储token */
    setToken(storage: string) {
      this.token = storage;
    }
  }
});

export default useUserStore;
