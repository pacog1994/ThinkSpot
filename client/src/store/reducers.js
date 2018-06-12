import C from '../constants'
import { combineReducers } from 'redux'

export const user = (state=null, action) => {
    switch(action.type) {
        case C.LOGIN_USER:
            return action.payload
        
        case C.LOGOUT_USER:
            return {
                "first_name": null,
                "last_name": null,
                "username": null
            }
       
        default:
            return state;
    }
}

export const errors = (state=[], action) => {
    switch(action.type) {
        case C.ADD_ERROR :
            return [
                ...state, 
                action.payload
            ]

        case C.CLEAR_ERROR :
            return state.filter((message, i) => i !== action.payload)

        default: 
            return state
    }
}

const appReducer = combineReducers({
    user,
    errors
})

export default appReducer