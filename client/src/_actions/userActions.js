import { userConstants } from '../_constants'
/**
 * Redux user state actions consuming server-side data from fetch API
 */

/**
 * log in user
 * @param {string} f_name first name
 * @param {string} l_name last name
 * @param {string} username username
 */
export function login (f_name, l_name, username) {

    //Validation logic
    
    return {
        type: userConstants.LOGIN_USER,
        payload: {
            "first_name": f_name,
            "last_name": l_name, 
            "username": username,            
        }
    }
}

//log out user
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
