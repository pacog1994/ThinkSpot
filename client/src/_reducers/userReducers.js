import { userConstants } from '../_constants'

export const user = (state=null, action) => {
    switch(action.type) {
        case userConstants.LOGIN_USER:
            return action.payload
        
        case userConstants.LOGOUT_USER:
            return {
                "first_name": null,
                "last_name": null,
                "username": null
            }
       
        default:
            return state;
    }
}