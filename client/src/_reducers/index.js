import { combineReducers } from 'redux'
import { errors } from './alertReducers'
import { user } from './userReducers'
import { db } from './dbReducers'

/**
 * Store architecture
 * db - temp database
 * user - current user logged in
 * errors - current error being displayed
 */
const rootReducer = combineReducers({
    db: db,
    user: user,
    errors: errors
})

export default rootReducer