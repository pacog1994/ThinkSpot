import { spotConstants } from '../_constants'

export function addSpot(author, title, content) {
    
    //Validation logic

    return {
        type: spotConstants.ADD,
        payload: {
            "author": author,
            "title": title,
            "content": content
        }
    }
}

export function editSpot(author, title, content) {

    //Validation logic
    return {
        type: spotConstants.EDIT,
        payload: {
            "author": author,
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