require('../common/header.js');
require('../common/aside.js');

/**
 * 渲染课程列表：
 * 1、请求接口获取列表数据
 * 2、得到数据渲染后的模版，插入页面指定位置
 * */
$.get('/v6/course', function(data) {
  if(data.code == 200) {
    $('#course-list').html(template('course-list-tpl', data.result));
  }
});
