import { dbConstants } from '../_constants'

//Get all users from express API
export const getUsers = () => dispatch => {
    fetch('http://localhost:3100/*')
    .then(res => res.json())
    .then(users => dispatch({
        type: dbConstants.GET_ALL_USERS,
        payload: users 
    }))
}

//Get all spots from express API
export const getSpots = () => dispatch => {
    fetch('http://localhost:3100/spots')
    .then(res => res.json())
    .then(spots => dispatch({
        type: dbConstants.GET_ALL_SPOTS,
        payload: spots
    }))
}