import * as auth from '@/utils/auth'
import * as types from '../mutation-types';
import {
    local,
    localRemove
} from '@/utils'

const initState = {title:'',secondFacultyId:'',doctors:[]}
export default function doctorInfo(state = initState,action){
    switch(action.type){
        case types.DOCTOR_LIST:
            return {...state,...action.data};
        default:
            return state;
    }
}