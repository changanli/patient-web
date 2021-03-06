import axios from 'axios'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: '../',
    timeout: 30000
});

service.interceptors.request.use(function (config) {
    if (getToken()) {
        config.headers['accessToken'] = getToken() // 让每个请求携带token--['Authorization']
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    console.log(error.response)
    if (error.response.status == 401) {
        weui.alert('会话过期,请重新登录', {
           title: '温馨提示',
            buttons: [{
                label: '去登录',
                type: 'primary',
                onClick: function(){ 
                    appRouter.navigate('login',{trigger:true});
                }
            }]
        });
        
    }

    return Promise.reject(error.response);
});

export default service;