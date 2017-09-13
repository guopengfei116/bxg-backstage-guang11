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
       data.result.cs_id = cs_id;   // 后端需要这个值来区分修改的章节属于那个课程
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
  success: lessonSuccess
});

/**
 * 添加章节：
 * 1、因为表单要数据回显是动态生成的，所以使用委托的方式给添加按钮绑定click事件
 * 2、事件触发时使用一个空对象渲染模态框模版，插入到页面中
 * */
$(document).on('click', '#btn-lesson-add', function() {
  $('#chapterModal').html(template('lesson-tpl', { cs_id: cs_id }));
});

/**
 * 修改或添加章节成功后的处理回调：
 * 1、如果服务器返回的数据中有result那么证明是添加章节成功了，否则就是修改成功了
 * 2、不同的情况给出不同的用户提示，然后添加章节成功后清空表单
 * */
function lessonSuccess(data) {
  if(data.result) {
    alert('添加成功');
    $('#lesson-form').get(0).reset();
  }else {
    alert('修改成功');
  }
}
