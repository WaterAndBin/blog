/* 检查obj是否里面为空 */

export default function checkObj(obj: any, keyword: any[]): any {
  const objKeys = Object.keys(obj);

  const filteredObjIndex = objKeys.findIndex((key): string | number | undefined => {
    if (obj[key] === null || obj[key] === '') {
      return key; // 返回属性名称作为索引值
    }
  });

  if (filteredObjIndex == -1) {
    return false;
  } else {
    useMessage({
      message: `${keyword[filteredObjIndex]}不能为空！`,
      type: 'info'
    });
    return keyword[filteredObjIndex];
  }
}
