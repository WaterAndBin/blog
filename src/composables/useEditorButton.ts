import { editorButton } from '~/utils/editorDefaultButton';
import type { EditorButton } from '~/utils/editorDefaultButton';

export function useEditorButton(): {
  data: Ref<EditorButton[]>;
  setButtonHide: (index: number) => void;
  resetButton: (isIndex?: number) => void;
} {
  const data = useState<EditorButton[]>('editor', () => editorButton);

  /**
   * 设置某个按钮隐藏或者显示
   * @param index 索引值
   */
  function setButtonHide(index: number): void {
    resetButton(index);
    data.value[index].hide = !data.value[index].hide;
  }

  /**
   * 重置所有的按钮的隐藏
   */
  function resetButton(isIndex?: number): void {
    /* 全部的hide设置为false */
    data.value.forEach((items, index) => {
      if (items.hide !== undefined && items.hide !== null) {
        if (isIndex !== index) {
          items.hide = false;
        }
      }
    });
  }

  return {
    data,
    setButtonHide,
    resetButton
  };
}
