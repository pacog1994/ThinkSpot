import { dbConstants } from '../_constants'
/**
 * Redux db actions consuming server-side data using fetch API
 */

//Get all users
export const getUsers = () => dispatch => {
    fetch('http://localhost:3100/users')
    .then(res => res.json())
    .then(users => dispatch({
        type: dbConstants.GET_ALL_USERS,
        payload: users 
    }))
}

//Get all spots
export const getSpots = () => dispatch => {
    fetch('http://localhost:3100/spots')
    .then(res => res.json())
    .then(spots => dispatch({
        type: dbConstants.GET_ALL_SPOTS,
        payload: spots
    }))
}

/**
 * Add spot to db
 * @param {string} uid unique Id 
 * @param {string} author the author of the spot 
 * @param {string} title title of the spot
 * @param {string} description title of the description
 */
export function addSpot(uid, author, title, description) {
    
    //Validation logic

    return {
        type: dbConstants.POST_SPOT,
        payload: {
            "id": uid,
            "author": author,
            "title": title,
            "description": description
        }
    }
}

/**
 * edit existing spot from db
 * @param {object} spot updated spot object
 */
export function editSpot(spot) {

    //Validation logic
    return {
        type: dbConstants.PUT_SPOT,
        payload: {
            "spot": spot 
        }
    }
}

/**
 * remove existing spot from db
 * @param {string} uid spot's unique id
 */
export function removeSpot(uid) {

    return {
        type: dbConstants.REMOVE_SPOT,
        payload: {
            "id": uid
        }
    }
}
