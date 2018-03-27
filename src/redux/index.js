import {
    combineReducers,
    applyMiddleware,
    createStore
} from 'redux'
import thunk from 'redux-thunk'
import user from './reducers/user'
import doctor from './reducers/doctor'

const reducer = combineReducers({
    user,
    doctor
})
export default createStore(reducer, applyMiddleware(thunk));