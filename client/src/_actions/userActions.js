import { userConstants } from '../_constants'

export function login (f_name, l_name, username) {

    //Validation logic
    
    return {
        type: userConstants.LOGIN_USER,
        payload: {
            "first_name": f_name,
            "last_name": l_name, 
            "username": username
        }
    }
}

/**
 * TODO: Add Logic for checking if user is logged in. 
 */
export function logout() {
    //Add Logic
    return {
        type: userConstants.LOGOUT_USER,
        payload: {
            "first_name": null,
            "last_name": null,
            "username": null
        }
    }
}
