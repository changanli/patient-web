import fetch from '@/utils/fetch'

// 获取部门列表
export const getDepartmentsAxios=(data)=>(
    fetch.get('/pv1/department',data)
)
//获取医生列表
export const getDoctorListAxios = (data)=>(
    fetch.get('/pv1/doctorList',data)
)
