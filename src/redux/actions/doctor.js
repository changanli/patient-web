import * as types from '../mutation-types';
import {loginAxios,registerAxios,resetPasswordAxios} from '@/api/user';
import { getDepartmentsAxios,getDoctorListAxios } from '../../api/doctor';


export function departs(data){
    return {
        type:types.DEPART,
        data
    }
}

export function doctorList(data){
    return {
        type:types.DOCTOR_LIST,
        data
    }
}

//获取医生列表

export const getDoctorList=(params)=>(dispatch,getState)=>{
    if(params){
        return new Promise((resolve,reject)=>{
            getDoctorListAxios(params).then(res=>{
                const data = res.data;
                if(data.code == 0){
                    dispatch(doctorList({'doctors':data.doctorList}))
                }else{
                    weui.topTips(data.msg || '加载失败，请联系客服');
                }
                resolve(res.data.doctorList);
            }).catch(error=>{
                weui.topTips(error.data);
                reject(error);
            })
        })
    }
}

// 获取部门列表
export const getDeparts=(params)=>(dispatch,getState)=>{
    if(params){
        return new Promise((resolve,reject)=>{
            getDepartmentsAxios(params).then(res=>{
                const data = res.data;
                dispatch(departs(data))
                resolve(data)
            }).catch(error=>{
                weui.topTips(error.data);
                reject(error);
            })
        })
    }
}
