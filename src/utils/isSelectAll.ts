/**
 * 判断是不是全选
 * @param {(ParentNode | ChildNode | Node | null)} node
 * @param {number} length
 * @return {*} boolean
 */
const isSelectAll = (
  node: ParentNode | ChildNode | Node | null,
  length: number | undefined
): boolean | undefined => {
  const selection = window.getSelection();
  if (selection && node) {
    const range = selection.getRangeAt(0);
    const extractedContents = range.cloneContents();

    const fragmentLength = getDocumentFragmentTextLength(extractedContents);

    /* 先判断获取的文章看看是不是全选了 */
    if (
      range.commonAncestorContainer.textContent &&
      fragmentLength == range.commonAncestorContainer.textContent.length
    ) {
      return false;
    }
    return true;
  }
};

const getDocumentFragmentTextLength = (documentFragment: DocumentFragment): number => {
  let length = 0;
  // 遍历 DocumentFragment 中的所有子节点
  documentFragment.childNodes.forEach((childNode) => {
    // 把每个子节点的 textContent 长度加到总长度上
    if (childNode?.textContent) {
      length += childNode.textContent.length;
    }
  });
  return length;
};

export default isSelectAll;
