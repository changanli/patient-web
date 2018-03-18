import * as route from '@/router';
import '@/css/weui.scss'
import '@/css/main.scss'

// 状态管理工具
import Store from '@/redux';
window.Store = Store;

// 实例化路由
var Routes = Backbone.Router.extend({
	routes: route.router_object,
	...route.routes,
	initialize() {}
})

window.appRouter = new Routes();

appRouter.on('route', function(route, params) {
	document.body.scrollTop = 0; // 每次切换页面容器置顶
});

Backbone.history.start();
