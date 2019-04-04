import { dbConstants } from '../_constants'
const initialState = {
    users: [],
    spots: []
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
                    Object.assign({}, action.payload.spot),
                    ...state.spots.filter(spot => spot.id !== action.payload.spot.id)
                    
                ]
            }

        case dbConstants.DELETE_SPOT:
            return { 
                ...state,
                spots: [...state.spots.filter(spot => spot.id !== action.payload.id)]
            }

        case dbConstants.CREATE_POST:
            const selectedSpot = state.spots.find(spot => spot.id === action.payload.id)
            const updatedPost = selectedSpot.posts.concat(action.payload.post)
            const updatedSpot = Object.assign(selectedSpot, {"posts": updatedPost})
            return {
                ...state,
                spots: [
                    ...state.spots.filter(spot => spot.id !== action.payload.id),
                    updatedSpot
                ]
            }

        case dbConstants.UPDATE_POST:
            return

        case dbConstants.DELETE_POST:
            return 
        

         default:
             return state;
    }
}
