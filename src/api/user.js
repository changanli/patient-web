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