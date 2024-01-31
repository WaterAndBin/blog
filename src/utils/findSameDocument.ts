/* 专门拿来查找DOM的tagName，然后把tagName给去掉 */
/*
    例如：
    <strong>123<s>456<s/>789</strong>
    变成
    123<s>456</s>789
*/
import { tagNameAction } from './editorDefaultButton';
import type { TagNameAction } from './editorDefaultButton';

const findSameDocument = (
  actions: string,
  extractedContents: DocumentFragment
): DocumentFragment => {
  Array.from(extractedContents.childNodes).forEach((node) => {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.nodeName === tagNameAction[actions as keyof TagNameAction].toUpperCase()
    ) {
      if (node.firstChild && node.lastChild?.textContent) {
        const newRange = document.createRange();
        newRange.setStart(node.firstChild, 0);
        newRange.setEnd(node.lastChild, node.lastChild.textContent.length);
        const extractedContents = newRange.extractContents();
        const fragment = document.createDocumentFragment();
        console.log(extractedContents);
        fragment.appendChild(extractedContents);
        node.replaceWith(fragment);
      }
    }
  });
  console.log('新的结点');
  console.log(extractedContents);
  return extractedContents;
};

export default findSameDocument;
