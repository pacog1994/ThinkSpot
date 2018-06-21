import { combineReducers } from 'redux'
import { errors } from './alertReducers'
import { user } from './userReducers'


const appReducer = combineReducers({
    user,
    errors
})

export default appReducer