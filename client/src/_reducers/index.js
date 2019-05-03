import { combineReducers } from 'redux'
import { db } from './dbReducers'
import { sort } from './sortReducers'
import { user } from './userReducers'


/**
 * Store architecture
 * db - temp database
 * user - current user logged in
 * sort - the value used to sort listed data
 */
const rootReducer = combineReducers({
    db: db,
    sort: sort,
    user: user
})

export default rootReducer