export const editorButton: EditorButton[] = [
  {
    name: 'editor-title.svg',
    title: '标题',
    hide: false,
    actions: 'title',
    children: [
      {
        name: 'editor-title1.svg',
        title: '标题一',
        actionsTitle: '标题',
        actions: 'h1'
      },
      {
        name: 'editor-title2.svg',
        title: '标题二',
        actionsTitle: '标题',
        actions: 'h2'
      },
      {
        name: 'editor-title3.svg',
        title: '标题三',
        actionsTitle: '标题',
        actions: 'h3'
      },
      {
        name: 'editor-title4.svg',
        title: '标题四',
        actionsTitle: '标题',
        actions: 'h4'
      },
      {
        name: 'editor-title5.svg',
        title: '标题五',
        actionsTitle: '标题',
        actions: 'h5'
      }
    ]
  },
  {
    name: 'editor-bold.svg',
    title: '加粗',
    actions: 'hold'
  },
  {
    name: 'editor-color.svg',
    title: '颜色',
    actions: 'color'
  },
  {
    name: 'editor-italic.svg',
    title: '斜线',
    actions: 'delete'
  },
  {
    name: 'editor-strikethrough.svg',
    title: '删除线',
    actions: 'delete'
  },
  {
    name: 'editor-underline.svg',
    title: '下划线',
    actions: 'delete'
  },
  {
    name: 'editor-orderedLists.svg',
    title: '有序列表',
    actions: 'delete'
  },
  {
    name: 'editor-unorderedListings.svg',
    title: '无序列表',
    actions: 'delete'
  },
  {
    name: 'editor-align.svg',
    title: '对齐',
    hide: false,
    actions: 'delete',
    children: [
      {
        name: 'editor-leftAlign.svg',
        title: '左对齐',
        actionsTitle: '对齐',
        actions: 'h5'
      },
      {
        name: 'editor-rightAlign.svg',
        title: '右对齐',
        actionsTitle: '对齐',
        actions: 'h5'
      }
    ]
  },
  {
    name: 'editor-horizon.svg',
    title: '水平线',
    actions: 'delete'
  },
  {
    name: 'editor.codeBlocks.svg',
    title: '代码块',
    actions: 'delete'
  },
  {
    name: 'editor-image.svg',
    title: '图像',
    actions: 'delete'
  }
];

export interface EditorButton {
  name: string;
  title: string;
  actions: string;
  hide?: boolean;
  children?: EditorButtonChild[];
}

export interface EditorButtonChild {
  name: string;
  title: string;
  actionsTitle: string;
  actions: string;
  hide?: boolean;
  children?: EditorButtonChild[];
}
