/**
 * 登陆权限校验：
 * 1、我们先在前端拿到本地的cookie，看看其中有没有PHPSESSID这一项
 *      有：就认为用户已登陆
 *      没有：就认为用户未登陆
 * 2、通过location.path判断用户是在登陆页面，还是其他页面
 * 3、登陆页面已登陆，转到首页；其他页面未登陆，转到登陆页
 * */
var isLogin = !!$.cookie('PHPSESSID');   // 用户是否已登陆
var isLoginPage = location.pathname == '/dist/html/user/login.html'; // 用户是否在登陆页面

// 如果用户打开登陆页面时，已经登陆了，那么给它自动转到首页
if(isLoginPage && isLogin) {
  location.href = '/dist';
}
// 如果用户在其他页面时，未登陆过，那么给它自动转到登陆页
else if(!isLoginPage && !isLogin) {
  location.href = '/dist/html/user/login.html';
}
