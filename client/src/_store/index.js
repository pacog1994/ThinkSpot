/**
 * Middleware to create store factory
 */
import appReducer from '../_reducers'
import { userConstants } from '../_constants'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
    //action gets dispatched
    let result = next(action)

    console.groupCollapsed(`dispatching action => ${action.type}`)
    
    let { user, spot, errors } = store.getState()

    if (user !== null && spot !== null && errors !== null) {
    console.log(`

            first name: ${user.first_name}
            last name: ${user.last_name}
            username : ${user.username}
            
            User's Spots
            1. ${spot.title}
            ${spot.content}
            
            errors: ${errors.length}

        `)
    }
    else { console.log("setting up initial state of the store") } 

    console.groupEnd()

    return result
}

const rootReducer = (state, action) => {
    if( action.type === userConstants.LOGOUT_USER) {
        state = undefined
    }
    return appReducer(state, action)
}

export const storeFactory = (initialState={}) => {
    return applyMiddleware(consoleMessages)(createStore)(rootReducer, initialState)
}