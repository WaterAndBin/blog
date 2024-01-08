export const editorButton: EditorButton[] = [
  {
    name: 'editor-bold.svg',
    title: '加粗'
  },
  {
    name: 'editor-color.svg',
    title: '颜色'
  },
  {
    name: 'editor-italic.svg',
    title: '斜线'
  },
  {
    name: 'editor-strikethrough.svg',
    title: '删除线'
  },
  {
    name: 'editor-underline.svg',
    title: '下划线'
  },
  {
    name: 'editor-orderedLists.svg',
    title: '有序列表'
  },
  {
    name: 'editor-unorderedListings.svg',
    title: '无序列表'
  },
  {
    name: '',
    title: '对齐'
  },
  {
    name: 'editor-horizon.svg',
    title: '水平线'
  },
  {
    name: 'editor.codeBlocks.svg',
    title: '代码块'
  },
  {
    name: 'editor-image.svg',
    title: '图像'
  }
];

export interface EditorButton {
  name: string;
  title: string;
}
