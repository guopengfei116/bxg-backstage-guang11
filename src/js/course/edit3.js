require('../common/header.js');
require('../common/aside.js');
var util = require('../common/util.js');

/**
 * 功能点：
 * 1、数据回显
 * 2、编辑章节
 *    2.1、数据回显
 *    2.2、数据提交
 * 3、添加章节
 * */
var cs_id = util.getSearch('cs_id');

/**
 * 数据回显：
 * 1、拿到location.search里面的cs_id
 * 2、通过这个id请求接口获取数据
 * 3、得到数据渲染后的模版，插入页面指定的位置
 * */
$.get('/v6/course/lesson', { cs_id: cs_id }, function(data) {
  if(data.code == 200) {
    data.result.editIndex = 3;
    $('#course-edit3').append(template('course-edit3-tpl', data.result));
  }
});

/**
 * 编辑章节_数据回显：
 * 1、因为章节列表是动态生成的，所以需要通过委托的方式给编辑按钮绑定click事件
 * 2、事件触发时获取按钮身上自定义属性记录的ct_id，用来请求接口获取数据
 * 3、数据渲染模态框模版，插入到页面中
 * */
$(document).on('click', '.btn-lesson-edit', function() {
  var data = {
    ct_id: $(this).attr('data-id')
  };

  $.get('/v6/course/chapter/edit', data, function(data) {
     if(data.code == 200) {
       $('#chapterModal').html(template('lesson-tpl', data.result));
     }
  });
});

/**
 * 编辑章节_表单提交：
 * 1、因为表单要数据回显是动态生成的，所以使用ajaxForm插件方法的委托
 * 2、成功后给个提示
 * */
$('#lesson-form').ajaxForm({
  delegation: true,
  success: function(data) {
    if(data.code == 200) {
      alert('修改成功');
    }
  }
});
