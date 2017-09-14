require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');

/**
 * 该页面功能点：
 * 1、数据回显
 * 2、
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
            initPlugin();
        }
    }
});

/**
 * 表单提交：
 * 1、因为表单要进行数据回显，所以是动态异步创建出来的。
 * 我们这里要通过插件的ajaxForm监听表单提交事件必须使用委托的方式，插件提供了delegation选项配置为true即可。
 * 2、修改成功后给个用户提示
 * */
$('#teacher-profile-form').ajaxForm({
  delegation: true,
  success: function(data) {
    if(data.code == 200) {
      alert('修改成功');
    }
  }
});



/**
 * 所有的插件初始化都放在这里
 * */
function initPlugin() {
  $('input[name=tc_birthday]').datepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd',
    endDate: new Date('2010-01-01')
  });
  $('input[name=tc_join_date]').datepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd',
    endDate: new Date('2010-01-01')
  });
}
