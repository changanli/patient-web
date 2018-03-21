import * as auth from '@/utils/auth'
import * as types from '../mutation-types';
import {
    local,
    localRemove
} from '@/utils'

const USER_PHONE = 'USER_PHONE'
const USER_ACCESSTOKEN = 'USER_ACCESSTOKEN'
const USER_ID = 'USER_ID'

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
            console.log('denglu')
            return initState();
        }
        case types.USER_REGISTER:
        {
            console.log('USER_REGISTER')
            const {phone,accessToken,userId} = action.data;
            local(USER_PHONE, phone)
            local(USER_ID,userId)
            accessToken && auth.setToken(accessToken) // cookies缓存token
            return initState()
        }
        case types.USER_RESET_PASSWORD:
        {
            console.log('USER_RESET_PASSWORD')
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
            console.log('USER_LOGIN_OUT')
            return initState();
        case types.USER_INFO:
            return {...state,...action.data};
        default:
        console.log(action.type);
            return state;
    }
}