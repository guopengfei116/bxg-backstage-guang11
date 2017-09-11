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

/**
 * 讲师启用与注销：
 * 1、因为按钮是随着列表动态生成的，所以需要委托的方式绑定click事件
 * 2、点击时通过自定义属性拿到这个按钮身上的tc_id与tc_status请求接口
 * 3、状态修改成功后，要重新设置按钮的文本，按钮的自定义属性
 * */
$(document).on('click', '.btn-teacher-status', function() {
    var $this = $(this);   // 这里保存按钮是为了在ajax的回调中再次使用
    var data = {
      tc_id: $(this).attr('data-id'),
      tc_status: $(this).attr('data-status')
    };
    $.post('/v6/teacher/handle', data, function(data) {
      var newStatus = data.result.tc_status;
      $this.text(newStatus == 0? '注 销': '启 用');  // 更新按钮的文本
      $this.attr('data-status', newStatus);       // 修改自定位属性为新的status
    });
});
