require('../common/header.js');
require('../common/aside.js');

/**
 * 渲染学科列表：
 * 1、请求接口获取列表数据
 * 2、使用模版引擎得到数据渲染后的html，插入到页面指定位置
 * */
$.get('/v6/category', function(data) {
  $('.table-bordered').append(template('category-list-tpl', data.result));
});
