import { combineReducers } from 'redux'
import { errors } from './alertReducers'
import { spot } from './spotReducers'
import { user } from './userReducers'
import { db } from './dbReducers'

/**
 * Store architecture
 * db - temp database
 * user - current user logged in
 * spots - spots mapped to user
 * errors - current error being displayed
 */
const rootReducer = combineReducers({
    db,
    user,
    spots: spot,
    errors
})

export default rootReducer