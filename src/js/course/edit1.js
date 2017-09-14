require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
require('../common/common.js');
var util = require('../common/util.js');

/**
 * 功能点：
 * 1、数据回显
 * 2、学科二级联动
 * 3、表单提交
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
    data.result.editIndex = 1;
    $('#course-edit1').append(template('course-edit1-tpl', data.result));
  }
});

/**
 * 学科二级联动：
 * 1、因为整个数据回显是动态构建的，所以通过委托的方式监听父级学科select的change事件
 * 2、事件发生时获取所选顶级学科cg_id，调用接口获取对应的子级学科列表
 * 3、拿到数据后动态生成新的子级option进行替换
 * */
$(document).on('change', '#category-top-select', function() {

  // select的value就是用户所选的顶级学科cg_id
  var topCgid = $(this).val();

  // 利用顶级学科cg_id获取对应子级学科列表
  $.get('/v6/category/child', { cg_id: topCgid }, function(data) {

    var html = '';
    var childList = data.result;

    if(data.code == 200) {
      // 根据子级列表动态生成对应的option
      for(var i = 0, len = childList.length; i < len; i++) {
        html += '<option value="' + childList[i].cg_id + '">' + childList[i].cg_name + '</option>'
      }
    }

    // 使用新的option进行替换
    $('#category-child-select').html(html);
  });
});

/**
 * 表单提交：
 * 1、使用ajaxForm方法的委托方式表单转ajax
 * 2、编辑成功后给出提示，然后跳转到编辑第二步页面(跳转时需要继续把cs_id传递过去)
 * */
$('#course-edit1-form').ajaxForm({
  delegation: true,
  success: function(data) {
    if(data.code == 200) {
      alert('修改成功');
      location.href = '/dist/html/course/edit2.html?cs_id=' + cs_id;
    }
  }
});
