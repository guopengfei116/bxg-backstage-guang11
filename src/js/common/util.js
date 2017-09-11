/**
 * 解析location.search：
 * 传1个参数返回指定key的值，不传参数返回解析成对象后的值。
 * 1、首先把头部的?去掉
 * 2、通过&符号劈成一组组key=val这样的字符串组成的数组
 * 3、然后在通过=号把一组组字符串劈开获取key与val，存储到一个对象中
 * 4、判断没有传参返回这个对象，传了返回对象中指定key的值
 * */
function getSearch(key) {                                   // '?cg_id=1&cg_type=op'
  var searchStr = location.search.slice(1);            // 'cg_id=1&cg_type=op'
  var searchArr = searchStr.split('&');                  // ['cg_id=1', 'cg_type=op']
  var searchObj = {}, tempArr;

  for(var i = 0, len = searchArr.length; i < len; i++) {
    tempArr = searchArr[i].split('=');                    // ['cg_id', 1]    ['cg_type', 'op']
    searchObj[tempArr[0]] = tempArr[1];             // { cg_id:1, cg_type: 'op' }
  }

  // 传了key返回指定的值，没传返回解析好的整个对象
  return key? searchObj[key]: searchObj;
}

module.exports.getSearch = getSearch;