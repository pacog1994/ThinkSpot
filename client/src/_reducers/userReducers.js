import { userConstants } from '../_constants'

const initialState = { 
    first_name: null,
    last_name: null,
    username: null,
    profile_picture: ""
}

export const user = (state=initialState, action) => {
    switch(action.type) {
        case userConstants.LOGIN_USER:
            return action.payload
        
        case userConstants.LOGOUT_USER:
            return action.payload

         default:
             return state;
    }
}