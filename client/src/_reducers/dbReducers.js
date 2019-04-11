import { dbConstants } from '../_constants'

const initialState = {
    users: [],
    spots: []
}

//utility functions
function updateObject(oldObject, newValues) {
// Encapsulate the idea of passing a new object as the first parameter
// to Object.assign to ensure we correctly copy data instead of mutating
return Object.assign({}, oldObject, newValues)
}

function updateItemInArray(array, itemId, updateItemCallback) {
const updatedItems = array.map(item => {
    if (item.id !== itemId) {
    // Since we only want to update one item, preserve all others as they are now
    return item
    }
    
    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
})

return updatedItems
}

export const db = (state = initialState, action) => {
    switch(action.type) {
        case dbConstants.GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        
        case dbConstants.GET_ALL_SPOTS:
            return {
                ...state,
                spots: action.payload
            }
        
        case dbConstants.CREATE_SPOT:
            return { 
                ...state,
                spots: [
                    ...state.spots,
                    action.payload
                ]
            }   
        
        case dbConstants.UPDATE_SPOT:
            return {
                ...state,
                spots: [
                    updateObject({}, action.payload.spot),
                    ...state.spots.filter(spot => spot.id !== action.payload.spot.id) 
                ]
            }

        case dbConstants.DELETE_SPOT:
            return { 
                ...state,
                spots: [...state.spots.filter(spot => spot.id !== action.payload.id)]
            }

        case dbConstants.CREATE_POST:
            //Update spots with new post
            let createdSpots = updateItemInArray(state.spots, action.payload.id, spot => {
                return updateObject(spot, {"posts": spot.posts.concat(action.payload.post)})
            })  

            return {
                ...state,
                spots: createdSpots
            }

        case dbConstants.UPDATE_POST:
            //Update spots with updated post
            let updatedSpots = updateItemInArray(state.spots, action.payload.spotId, spot => {
                let updatedPosts = updateItemInArray(spot.posts, action.payload.post.id, post => {
                    console.log(post)
                    console.log(action.payload.post)
                        return updateObject(post, action.payload.post)
                })
                return updateObject(spot, {"posts": updatedPosts})
            })
            
            return {
                ...state, 
                spots: updatedSpots
            }

        case dbConstants.DELETE_POST:
            //Update spots with filtered posts
            let filteredSpots = updateItemInArray(state.spots, action.payload.spotId, spot => {
                return updateObject(spot, {"posts": spot.posts.filter(post => post.id !== action.payload.id)})
            })
            return {
                ...state,
                spots: filteredSpots
            }

         default:
             return state;
    }
}
