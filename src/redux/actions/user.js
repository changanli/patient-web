import * as types from '../mutation-types';
import {loginAxios,registerAxios,resetPasswordAxios} from '@/api/user';

//Action Creator
export function login(data) {
    return {
        type: types.USER_LOGIN,
        data
    }
}

export function register(data) {
    return {
        type:types.USER_REGISTER,
        data
    }
}

export function loginOut() {
    return {
        type: types.USER_LOGIN_OUT
    }
}

export function resetPassword(data){
    return {
        type: types.USER_RESET_PASSWORD,
        data
    }
}

/**
 * 重置密码
 * @param {phone,passowrd} params 
 */
export const resetPwd=(params)=>(dispatch,getState)=>{
    if(params){
        return new Promise((resolve,reject)=>{
            resetPasswordAxios(params).then(res=>{
                const data = res.data;
                if(data.code === 0){
                    const {phone,accessToken,userId} = data;
                    dispatch(resetPassword({phone,accessToken,userId}))
                }else{
                    weui.topTips(data.data || '修改密码失败，请联系客服')
                }
                resolve(res);
            }).catch(error=>{
                weui.topTips(error.data);
                reject(error);
            })
        })
    }
}

/**
 * 注册(异步发送action)
 * @param {phone,passowrd} params 
 */
export const signUp = (params)=>(dispatch,getState)=>{
    if(params) {
        return new Promise((resolve,reject)=>{
            registerAxios(params).then(res=>{
                const data = res.data;
                if(data.code === 0){
                    const {phone,accessToken,userId} = data
                    dispatch(register({phone,accessToken,userId}));
                }else{
                    weui.topTips(data.data || '注册失败');
                }
                resolve(res);
            }).catch(error=>{
                weui.topTips(error.data);
                reject(error);
            })
        })
    }
}

/**
 * 异步
 * @param {phone,password} params 
 */
export const signIn = (params)=>(dispatch,getState)=>{
    if(params){
        return new Promise((resolve,reject)=>{
            loginAxios(params).then(res=>{
                const data = res.data;
                const {phone,accessToken,userId} = data;
                if(data.code === 0){
                    dispatch(login({
                        phone,
                        accessToken,
                        userId
                    }))
                    weui.toast('登录成功', 1000)
                }else{
                    weui.topTips(data.data || '登录失败');
                }
                resolve(res);
            }).catch(error=>{
                weui.topTips(error.data);
                reject(error);
            })
        })
    }
}