/**
 * Middleware to create store factory
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../_reducers'
import { userConstants } from '../_constants'


const appReducer = (state, action) => {
    if( action.type === userConstants.LOGOUT_USER) {
        state = undefined
    }
    return rootReducer(state, action)
}

const initialState = (localStorage['redux-store']) ?
JSON.parse(localStorage['redux-store']) : {} 
const middleware = [thunk]
const store = createStore(
    appReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

const saveState = () => {
    const state = JSON.stringify(store.getState())
    localStorage['redux-store'] = state
}

store.subscribe(saveState)

export default store
