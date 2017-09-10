require('../common/header.js');
require('../common/aside.js');

/**
 * 该页面功能点：
 * 1、数据回显
 * 2、表单提交
 */

/**
 * 数据回显：
 * 1、请求接口获取当前用户的信息
 * 2、使用模版引擎把数据嵌套到模版当中，得到数据渲染后的模版
 * 基本语法：var html = template('id', data)
 * 3、把渲染后的模版插入到页面指定位置
 */
$.ajax({
    url: '/v6/teacher/profile',
    type: 'get',
    success: function(data) {
        if(data.code == 200) {
            $('.teacher-profile').html(template('teacher-profile-tpl', data.result));
        }
    }
});