/* 文章的仓库 */
const useEditorStore = defineStore('editor', {
  persist: true,
  state: () => {
    return {
      documentTarget: false as boolean
    };
  },
  actions: {
    /**
     * 设置点击的元素对象
     */
    setDocumentTarget(target?: boolean): void {
      if (target) {
        this.documentTarget = target;
      } else {
        this.documentTarget = !this.documentTarget;
      }
    }
  }
});

export default useEditorStore;
