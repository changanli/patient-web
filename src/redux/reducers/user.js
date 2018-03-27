import * as auth from '@/utils/auth'
import * as types from '../mutation-types';
import {
    local,
    localRemove
} from '@/utils'

const USER_PHONE = 'USER_PHONE'
const USER_ACCESSTOKEN = 'USER_ACCESSTOKEN'
const USER_ID = 'USER_ID'

/*
    刷新浏览器页面后,store会被重置。
    store是内存机制，不是缓存机制，页面刷新和关闭都会导致store初始化
    store一般保存的数据:
    1.组件的初始状态
    2.后端数据的初始状态
    如果你需要存储的数据是实时存储并且读取出来显示，
    那么存在本地或者服务器，这样每次刷新页面都要读取本地缓存或者服务端API,然后保存到store,在从store去读取到组件
*/
const initState = () => ({
    userId: local(USER_ID) || null,
    phone: local(USER_PHONE) || null,
    accessToken: auth.getToken() || null,
})

export default function userInfo(state = initState(), action) {
    switch (action.type) {
        case types.USER_LOGIN:
        {
            const {
                phone,
                accessToken,
                userId
            } = action.data
            local(USER_PHONE, phone)
            local(USER_ID,userId)
            accessToken && auth.setToken(accessToken) // cookies缓存token
            return initState();
        }
        case types.USER_REGISTER:
        {
            const {phone,accessToken,userId} = action.data;
            local(USER_PHONE, phone)
            local(USER_ID,userId)
            accessToken && auth.setToken(accessToken) // cookies缓存token
            return initState()
        }
        case types.USER_RESET_PASSWORD:
        {
            const {phone,accessToken,userId} = action.data;
            local(USER_PHONE, phone)
            local(USER_ID,userId)
            accessToken && auth.setToken(accessToken) // cookies缓存token
            return initState()
        }
        case types.USER_LOGIN_OUT:
            localRemove(USER_PHONE)
            localRemove(USER_ID)
            auth.removeToken()
            return initState();
        case types.USER_INFO:
            return {...state,...action.data};
        default:
        console.log(action.type);
            return state;
    }
}
