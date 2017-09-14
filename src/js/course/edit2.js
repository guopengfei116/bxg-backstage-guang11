require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
require('../common/common.js');
var util = require('../common/util.js');

/**
 * 功能点：
 * 1、数据回显
 * 2、课程封面上传
 * 3、封面图裁剪
 * */
var cs_id = util.getSearch('cs_id');

/**
 * 数据回显：
 * 1、拿到location.search里面的cs_id
 * 2、通过这个id请求接口获取数据
 * 3、得到数据渲染后的模版，插入页面指定的位置
 * */
$.get('/v6/course/picture', { cs_id: cs_id }, function(data) {
  if(data.code == 200) {
    data.result.editIndex = 2;
    $('#course-edit2').append(template('course-edit2-tpl', data.result));
    initPlugin();
  }
});

/**
 * 初始化插件
 * */
function initPlugin() {

  $('#uploadify').uploadify({
    swf: '/lib/jquery-uploadify/uploadify.swf',  // 这个是flash脚本，必须引入，不然无法选择文件
    uploader: '/v6/uploader/cover',                  // 这个是上传图片的接口
    fileTypeExts: '*.gif; *.jpg; *.png',                 // 这个用来限制上传图片的类型
    fileObjName: 'cs_cover_original',                // 这个用来设置提交给后端时，文件数据对应的name
    formData: {                                                  // 如果接口需要额外的数据，通过这个配置来添加
      cs_id:  cs_id
    },
    buttonText: '上传',
    buttonClass: 'btn btn-success btn-sm',
    onUploadSuccess: function(file, dataStr) {                    // 图片上传成功后的回调
      var data = JSON.parse(dataStr);
      $('.preview img').attr('src', data.result.path);
    }
  });

}



/**
 * 委托方式给裁剪图片绑定点击事件，初始化裁剪插件
 * */
$(document).on('click', '#btn-clip', function() {

});
