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

/**
 * 点击标题子列表显示隐藏：
 * 1、获取导航中a标签绑定点击事件
 * 2、事件触发时让它的下一个兄弟元素ul显示隐藏切换
 * */
$('.navs a').on('click', function() {
  $(this).next('ul').slideToggle();
});

/**
 * 根据访问的页面给对应的标题添加焦点：
 * 1、首先获取页面location.pathname
 * 2、获取全部的导航a标签，先统一取出active类名
 * 3、然后利用这个值和导航a标签的href去匹配得到对应的a标签，添加active类名焦点样式
 * 4、最后在焦点a标签的父级元素，让它show
 * */
var path = location.pathname;
$('.navs a').removeClass('active');
$('.navs a[href="' + path + '"]').addClass('active').parents('ul').show();
