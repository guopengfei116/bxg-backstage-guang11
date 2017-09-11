require('../common/header.js');
require('../common/aside.js');

/**
 * 功能点：
 * 1、列表数据展示
 * 2、讲师查看
 * 3、讲师启用与注销
 * */

/**
 * 列表数据展示：
 * 1、请求接口获取数据
 * 2、得到数据渲染后的模版，插入页面指定位置
 * */
$.get('/v6/teacher', function(data) {
  data.code == 200 && $('#teacher-list-table').append( template('teacher-list-tpl', data.result) );
});
