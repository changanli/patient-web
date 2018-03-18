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
    'home': 'home',
    'doctor' : 'doctor',
    'knowledge' : 'knowledge',
    'mine' : 'mine',
    'login': 'login',
    'register/:title' : 'register',
    'iframe/:title' : 'iframe',
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
            CommonController(controller,{...arguments})
        })
    },
    iframe(params){
        import('@/pages/iframe/controller').then(controller=>{
            CommonController(controller,{...arguments})
        })
    }
}
