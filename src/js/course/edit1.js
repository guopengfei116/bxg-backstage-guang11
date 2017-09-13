require('../common/header.js');
require('../common/aside.js');
var util = require('../common/util.js');

/**
 * 功能点：
 * 1、数据回显
 * 2、表单提交
 * 3、学科二级联动
 * */
var cs_id = util.getSearch('cs_id');

/**
 * 数据回显：
 * 1、拿到location.search里面的cs_id
 * 2、通过这个id请求接口获取数据
 * 3、得到数据渲染后的模版，插入页面指定的位置
 * */
$.get('/v6/course/basic', { cs_id: cs_id }, function(data) {
  if(data.code == 200) {
    $('#course-edit1').append(template('course-edit1-tpl', data.result));
  }
});
