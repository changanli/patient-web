function CommonController(controller, params) {
    if (appRouter.currentController && appRouter.currentController !== controller) {
        appRouter.currentController.onRouteChange && appRouter.currentController.onRouteChange();
    }
    appRouter.currentController = controller;
    controller(params);

}

export const router_object = {
    '/': 'login',
    'index': 'index',
    'home': 'home', //首页
    'doctor' : 'doctor', //医生
    'knowledge' : 'knowledge', //知识
    'mine' : 'mine', //个人中心
    'login': 'login', //登录
    'register' : 'register', //注册
    'personalInformation':'personalInformation', //个人信息
    'iframe' : 'iframe',
    '*actions': 'login'
}

export const routes = {
    index(params) {
        /*require.ensure([], function(require) {
            CommonController(require('../pages/index/controller'), params)
        }, 'index');*/
        import('@/pages/index/controller').then(controller => {
            CommonController(controller, params)
        })
    },
    home(params) {
        import('@/pages/home/controller').then(controller => {
            CommonController(controller, params)
        })
    },
    doctor(params){
        import('@/pages/doctor/controller').then(controller=>{
            CommonController(controller,params)
        })
    },
    knowledge(params){
        import('@/pages/knowledge/controller').then(controller=>{
            CommonController(controller,params)
        })
    },
    mine(params){
        import('@/pages/mine/controller').then(controller=>{
            CommonController(controller,params)
        })
    },
    login(params){
        import('@/pages/login/controller').then(controller=>{
            CommonController(controller,params)
        })
    },
    register(params) {
        import('@/pages/register/controller').then(controller=>{
            CommonController(controller,params)
        })
    },
    personalInformation(params) {
        import('@/pages/personalInformation/controller').then(controller=>{
            CommonController(controller,params)
        })
    },
    iframe(params){
        import('@/pages/iframe/controller').then(controller=>{
            CommonController(controller,params)
        })
    }
}
