import * as route from '@/router';
import '@/css/weui.scss'
import '@/css/main.scss'

// 状态管理工具
import Store from '@/redux';
window.Store = Store;

// 实例化路由
var routerType;
var Routes = Backbone.Router.extend({
	routes: route.router_object,
	...route.routes,
	initialize() {}
})

window.appRouter = new Routes();

appRouter.on('route', function(route, params) {
	window.scrollTo(0,0); //每次切换页面容器置顶
	// setTimeout(() => { //这个方法不好使用了
    //     document.body.scrollTop = 0; // 每次切换页面容器置顶
    // }, 10);
});

Backbone.history.start();
