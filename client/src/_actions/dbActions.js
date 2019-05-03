import { dbConstants } from '../_constants'
/**
 * Redux db actions consuming server-side data using fetch API
 */

//Get all users
export const getUsers = () => dispatch => {
    fetch('http://localhost:3100/api/users')
    .then(res => res.json())
    .then(users => dispatch({
        type: dbConstants.GET_ALL_USERS,
        payload: users 
    }))
}

//Get all spots
export const getSpots = () => dispatch => {
    fetch('http://localhost:3100/api/spots')
    .then(res => res.json())
    .then(spots => dispatch({
        type: dbConstants.GET_ALL_SPOTS,
        payload: spots
    }))
}

 /**
  * Get specific spot by id
  * @param {string} id uniqueId of the spot 
  */
 export const getSpot = id => dispatch => {
    fetch('http://localhost:3100/api/spots/'+id)
    .then(res => res.json())
    .then(spot => dispatch({
        type: dbConstants.READ_SPOT,
        payload: spot
    }))
} 
 /**
  * Get specific spots based off user
  * @param {string} username logged in user 
  */
 export const getSpotsByUser = username => dispatch => {
    fetch("http://localhost:3100/api/spots?author="+username)
    .then(res => res.json())
    .then(spots => dispatch({
        type: dbConstants.GET_SPOTS_BY_USER,
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
    const obj = JSON.stringify({
        "spotId": {
            "N": uid
        },
        "author": {
            "S": author
        }
    })

    console.log(obj)
    //Validation logic
    fetch('http://localhost:3100/api/spots', {
       method: "post",
       headers: { "Content-Type": "application/json" },
       body: obj 
    }).catch(err => { console.log(err)})

    return {
        type: dbConstants.CREATE_SPOT,
        payload: {
            "id": uid,
            "author": author,
            "date": new Date().getTime(),
            "description": description,
            "likes": 0,
            "posts": [],
            "tags": [],
            "title": title,
            "views": 0
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
        type: dbConstants.UPDATE_SPOT,
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
        type: dbConstants.DELETE_SPOT,
        payload: {
            "id": uid
        }
    }
}

/**
 * add post to current spot
 * @param {string} spotId the spot id that post belongs to
 * @param {string} uid the unique id given to a post
 * @param {string} author the author of the post 
 * @param {string} reply the author's reply
 */
export function addPost(spotId, uid, author, reply) {
    //Validataion logic


    //Proccesing
    const post = {
        "id": uid, 
        "author": author,
        "post": reply,
        "comments": []  
    }

    return {
        type: dbConstants.CREATE_POST,
        payload: {
            "id": spotId,
            "post": post
        }
    }
}
/**
 * edit post in current spot
 * @param {string} spotId id of the current spot
 * @param {object} post  updatedPost
 */
export function editPost(spotId, post) {
    //Validation logic

    return {
        type: dbConstants.UPDATE_POST,
        payload: {
            "spotId": spotId,
            "post": post
        }
    }
}
/**
 * delete post in current spot
 * @param {string} spotId id of the current spot 
 * @param {string} postId id of the post to remove
 */
export function deletePost(spotId, postId) {
    return {
        type: dbConstants.DELETE_POST,
        payload: {
            "spotId": spotId,
            "id": postId
        }
    }
}
