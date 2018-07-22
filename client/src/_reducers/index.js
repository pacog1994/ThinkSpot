import { combineReducers } from 'redux'
import { errors } from './alertReducers'
import { spot } from './spotReducers'
import { user } from './userReducers'


const appReducer = combineReducers({
    user,
    spot,
    errors
})

export default appReducer