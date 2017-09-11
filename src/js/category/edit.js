require('../common/header.js');
require('../common/aside.js');
var util = require('../common/util.js');

/**
 * 功能点：
 * 1、数据回显，需要确定你编辑的是那个学科
 * 2、表单提交
 * */

/**
 * 数据回显：
 * 1、先获取location.search中的cg_id值
 * 2、利用这个cg_id请求接口获取数据
 * 3、得到数据渲染后的模版，插入到页面指定位置
 * */
var cg_id = util.getSearch('cg_id');
$.get('/v6/category/edit', { cg_id: cg_id }, function(data) {
  $('.category-edit').html(template('category-edit-tpl', data.result));
});
