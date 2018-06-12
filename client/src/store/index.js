/**
 * Middleware to create store factory
 */
import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
    //action gets dispatched
    let result = next(action)

    console.groupCollapsed(`dispatching action => ${action.type}`)
    
    let { user, errors } = store.getState()

    console.log(`

        first name: ${user.first_name}
        last name: ${user.last_name}
        username : ${user.username}
        errors: ${errors.length}

    `)

    console.groupEnd()

    return result
}

export default (initialState={}) => {
    return applyMiddleware(consoleMessages)(createStore)(appReducer, initialState)
}