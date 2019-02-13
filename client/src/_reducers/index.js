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
    db: db,
    user: user,
    spots: spot,
    errors: errors
})

export default rootReducer