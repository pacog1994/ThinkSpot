import { spotConstants } from '../_constants'

export function addSpot(username, title, content) {
    
    //Validation logic

    return {
        type: spotConstants.ADD,
        payload: {
            "username": username,
            "title": title,
            "content": content
        }
    }
}

export function removeSpot() {

    return {
        type: spotConstants.REMOVE
    }
}