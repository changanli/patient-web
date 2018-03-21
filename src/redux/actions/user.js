import * as types from '../mutation-types';
import {loginAxios,registerAxios,resetPasswordAxios} from '@/api/user';
import { getUserInfoAxios, signAxios, updateUserInfoAxios } from '../../api/user';

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

export function userInfo(data){
    return {
        type: types.USER_INFO,
        data
    }
}

// 签到
export const sign=(params)=>(dispatch,getState)=>{
    if(params){
        return new Promise((resolve,reject)=>{
            signAxios(params).then(res=>{
                const data = res.data;
                if(data.code === 0){
                    const isSign = true;
                    dispatch(userInfo({isSign}))
                }else{
                    weui.topTips(data.data || '签到失败，请联系客服')
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
 * 修改个人信息
 */
export const updateUserInfo=(params)=>(dispatch,getState)=>{
    if(params){
        return new Promise((resolve,reject)=>{
            updateUserInfoAxios(params).then(res=>{
                const {code,...info} = res.data;
                if(code === 0){
                    dispatch(userInfo(info))
                }else{
                    weui.topTips(res.data.data || '未知错误，请联系客服')
                }
                resolve(res.data);
            }).catch(err=>{
                weui.topTips(error.data);
                reject(error);
            })
        })
    }
}
/**
 * 获取用户信息
 * @param {} params 
 */
export const getUserInfo=(params)=>(dispatch,getState)=>{
    if(params){
        return new Promise((resolve,reject)=>{
            getUserInfoAxios(params).then(res=>{
                const {code,...info} = res.data;
                if(code === 0){
                    dispatch(userInfo(info))
                }else{
                    weui.topTips(res.data.data || '未知错误，请联系客服')
                }
                resolve(res.data);
            }).catch(error=>{
                weui.topTips(error.data);
                reject(error);
            })
        })
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