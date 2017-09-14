require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
require('../common/common.js');
var util = require('../common/util.js');

/**
 * 功能点：
 * 1、页面数据回显
 * 2、编辑章节
 *    2.1、数据回显
 *    2.2、数据提交
 * 3、添加章节
 *    3.1、数据回显   --  按照常理是不需要回显的，但是因为和编辑同用html模版，需要回显空数据
 *    3.2、数据提交
 * */
var cs_id = util.getSearch('cs_id');
var lessons;

/**
 * 页面数据回显：
 * 1、拿到location.search里面的cs_id
 * 2、通过这个id请求接口获取数据
 * 3、得到数据渲染后的模版，插入页面指定的位置
 * */
$.get('/v6/course/lesson', { cs_id: cs_id }, function(data) {
  if(data.code == 200) {
    lessons = data.result.lessons;
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
 * 添加章节_数据回显
 * 1、因为页面是动态生成的，所以需要通过委托的方式给添加按钮绑定click事件
 * 2、因为模态框中的内容做成了模版，所以使用一个空对象渲染模版，插入到页面中
 * */
$(document).on('click', '#btn-lesson-add', function() {
  // 空对象中额外添加cs_id是因为后端需要这个值来区分修改的章节属于那个课程
  $('#chapterModal').html(template('lesson-tpl', { cs_id: cs_id }));
});

/**
 * 修改章节与添加章节：
 * 1、因为在同一个页面中，修改与添加使用的是同一个form，这里一起就处理了
 * 2、通过ajaxForm插件方法把表单默认刷新提交转ajax提交，因为form是动态生成的，所以要使用委托
 * 3、请求成功后，通过判断服务器data.result来却分是修改还是添加，给用户不同的提示信息
 * */
$('#lesson-form').ajaxForm({
  delegation: true,

  // 表单提交之前做点事情
  beforeSubmit: function(arrData, $form, options) {
    arrData.push({
      name: 'ct_is_free',
      value: $('#ct_is_free').prop('checked')? 1: 0
    })
  },

  success: function(data) {

    // 添加成功后，给出提示，并重置表单
    if(data.result) {
      alert('添加成功');
      upLessons(data.result);
      $('#lesson-form').get(0).reset();
    }

    // 修改成功后，给出提示
    else {
      alert('修改成功');
      upLessons();
    }
  }
});

/**
 * 更新章节列表：
 * lessons: [ {ct_id:"1", "ct_name":"介绍", "ct_video_duration":"3:12"}
 *                {ct_id:"2", "ct_name":"定位和浮动", "ct_video_duration":"08:14"} ]
 * 1、获取表单中的章节名称、分钟、秒三个字段，还要获取ct_id字段
 * 2、其中ct_id编辑和添加章节获取的方式不一样
 *    2.1、如果是编辑直接从表单中获取即可
 *    2.2、如果是添加则需要用户传入ct_id
 * 3、把得到的数据拼成lessons里面的对象的样子
 * 4、如果是添加章节那么直接把对象push进入即可，如果是编辑找到章节的下标进行splice替换
 * 5、最后按新的lessons数据重新渲染
 * */
function upLessons(ct_id) {
  var formData = getFormData();

  var lessonData = {
    ct_id: formData.ct_id || ct_id,  // 编辑时候ct_id来自表单，添加时候ct_id来自后端返回值
    ct_name: formData.ct_name,
    ct_video_duration: formData.ct_minutes + ':' + formData.ct_seconds
  };

  // 添加章节，直接push到lessons即可
  if(ct_id) {
    lessons.push(lessonData);
  }
  // 编辑章节，先通过ct_id得到这个章节的下标，然后splice替换为新的对象
  else {
    var index = getLessonIndex(formData.ct_id);
    lessons.splice(index, 1, lessonData);
  }

  // 把新的章节列表数据进行渲染
  $('#lesson-list').html(template('lesson-list-tpl', lessons));
}

/**
 * 返回模态框form数据构成的对象：
 * 1、先通过JQ的方法获取一个数组
 * 2、然后遍历数组中的值重新组织成{ key: val, key: val }的数据形式
 * */
function getFormData() {
  var formArrData = $('#lesson-form').serializeArray();
  var formData = {};
  for(var i = 0, len = formArrData.length; i < len; i++) {
    formData[ formArrData[i].name ] = formArrData[i].value;
  }
  return formData;
}

/**
 * 通过ct_id返回它在lessons中的下标：
 * */
function getLessonIndex(ct_id) {
  for(var i = 0, len = lessons.length; i < len; i++) {
    if(lessons[i].ct_id == ct_id) {
      return i;
    }
  }
}
