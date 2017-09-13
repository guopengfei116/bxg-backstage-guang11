require('../common/header.js');
require('../common/aside.js');

/**
 * 表单提交：
 * 1、插件ajaxForm方法处理表单
 * 2、课程创建成功后给出提示，跳转到课程编辑页(需要把新创建课程的cs_id传递过去)
 * */
$('#course-add-form').ajaxForm(function(data) {
  if(data.code == 200) {
    alert('课程创建成功');
    location.href = '/dist/html/course/edit1.html?cs_id=' + data.result.cs_id;
  }
});
