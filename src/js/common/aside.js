/**
 * 导航三个功能点：
 * 1、用户信息展示
 * 2、点击标题子列表显示隐藏
 * 3、根据访问的页面添加对应的焦点
 * */

/**
 * 用户信息展示：
 * 1、读取storage的userinfo数据
 * 2、但是数据是字符串，使用不便，使用JSON.parse转为对象使用
 * 3、然后把对象中的名字与头像设置到导航对应的标签中
 * */
var userinfoStr = localStorage.getItem('userinfo');
var userinfo = JSON.parse(userinfoStr);
$('.aside img').attr('src', userinfo.tc_avatar);
$('.aside h4').text(userinfo.tc_name);
