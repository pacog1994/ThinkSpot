import { userConstants } from '../_constants'
/**
 * Redux user state actions consuming server-side data from fetch API
 */

/**
 * log in user
 * @param {string} f_name first name
 * @param {string} l_name last name
 * @param {string} username username
 * @param {string} profile_picture profile picture
 */
export function login (f_name, l_name, username, profile_picture) {

    //Validation logic
    
    return {
        type: userConstants.LOGIN_USER,
        payload: {
            "first_name": f_name,
            "last_name": l_name, 
            "username": username,
            "profile_picture": profile_picture            
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
            "username": null,
            "profile_picture": ""
        }
    }
}
