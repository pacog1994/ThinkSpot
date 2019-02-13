import { spotConstants } from '../_constants'

export function addSpot(uid, author, title, description) {
    
    //Validation logic

    return {
        type: spotConstants.ADD,
        payload: {
            "id": uid,
            "author": author,
            "title": title,
            "description": description
        }
    }
}

export function editSpot(spot) {

    //Validation logic
    return {
        type: spotConstants.EDIT,
        payload: {
            "spot": spot 
        }
    }
}

export function removeSpot(uid) {

    return {
        type: spotConstants.REMOVE,
        payload: {
            "id": uid
        }
    }
}

export const getSpot = username => dispatch => {
    fetch("http://localhost:3100/spots?author="+username)
    .then(res => res.json())
    .then(spots => dispatch({
        type: spotConstants.GET,
        payload: spots
    }))
}