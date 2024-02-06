/* 专门拿来查找DOM的tagName，然后把tagName给去掉 */
/*
    例如：
    <strong>123<s>456<s/>789</strong>
    变成
    123<s>456</s>789
*/
import { tagNameAction } from './editorDefaultButton';
import type { TagNameAction } from './editorDefaultButton';

export const findSameDocument = (
  actions: string,
  parentNode: Node | ParentNode | null,
  extractedContents: DocumentFragment
): DocumentFragment => {
  extractedContents.childNodes.forEach((node) => {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.nodeName === tagNameAction[actions as keyof TagNameAction].toUpperCase()
    ) {
      if (node.firstChild && node.lastChild?.textContent) {
        // const newRange = document.createRange();
        // newRange.setStart(node.firstChild, 0);
        // newRange.setEnd(node.lastChild, node.lastChild.textContent.length);
        // const extractedContents = newRange.extractContents();
        // console.log(extractedContents);
        // const fragment = document.createDocumentFragment();
        // fragment.appendChild(extractedContents);
        // node.replaceWith(fragment);
        const range = document.createRange();
        range.selectNodeContents(node);
        const newContents = range.extractContents();
        const fragment = document.createDocumentFragment();
        fragment.appendChild(newContents);
        node.parentNode?.replaceChild(fragment, node);
      }
    }
  });
  // console.log(extractedContents.childNodes);
  return extractedContents;
};

export const isExtractedContents = (range: Range, actions: string): DocumentFragment => {
  // return range.cloneContents();
  const extractedContents = range.cloneContents();
  if (range.endContainer.nodeName == tagNameAction[actions as keyof TagNameAction].toUpperCase()) {
    return range.cloneContents();
  } else {
    const findTheSame = Array.from(extractedContents.childNodes).find(
      (node): boolean | undefined => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName === tagNameAction[actions as keyof TagNameAction].toUpperCase()
        ) {
          return true;
        }
        return undefined;
      }
    );
    return findTheSame ? range.extractContents() : range.cloneContents();
  }
};
