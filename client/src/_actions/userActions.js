import { userConstants } from '../_constants'

export function login(username=null) {

    console.log(username) 

    return {
        type: userConstants.LOGIN_USER,
        payload: {
            "first_name": "Paco",
            "last_name": "Gallegos", 
            "username": "paco123"
        }
    }
}

/**
 * TODO: Add Logic for checking if user is logged in. 
 */
export function logout() {

    //Add Logic

    return {
        type: userConstants.LOGOUT_USER
    }
}


//add error
//clear error