/* 用户的仓库 */
const useEditorStore = defineStore('editor', {
  persist: true,
  state: () => {
    return {
      documentTarget: '' as string
    };
  },
  actions: {
    /**
     * 设置点击的元素对象
     */
    setDocumentTarget(target: string) {
      this.documentTarget = target;
    }
  }
});

export default useEditorStore;
