import { spotConstants } from '../_constants'
/**
 * Redux spot actions consuming server-side data using fetch API
 */

 /**
  * Get specific spots based off user
  * @param {string} username logged in user 
  */
export const getSpot = username => dispatch => {
    fetch("http://localhost:3100/spots?author="+username)
    .then(res => res.json())
    .then(spots => dispatch({
        type: spotConstants.GET,
        payload: spots
    }))
}