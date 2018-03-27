import fetch from '@/utils/fetch'

export const loginAxios=(data)=>(
    fetch.post('/user/login',data)
)

export const registerAxios=(data)=>(
    fetch.post('/user/register',data)
)

export const resetPasswordAxios=(data)=>(
    fetch.post('/user/resetPassword',data)
)
// 获取个人信息
export const getUserInfoAxios=(data)=>(
    fetch.get('/user/userInfo',data)
)
export const updateUserInfoAxios=(data)=>(
    fetch.post('/user/update',data)
)
// 签到
export const signAxios=(data)=>(
    fetch.post('/user/sign',data)
)

