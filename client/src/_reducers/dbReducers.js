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
        
        case dbConstants.POST_SPOT:
            return { 
                ...state,
                spots: [
                    ...state.spots,
                    action.payload
                ]
            }   
        
        case dbConstants.PUT_SPOT:
            return {
                ...state,
                spots: [
                    Object.assign({}, action.payload.spot),
                    ...state.spots.filter(spot => spot.id !== action.payload.spot.id)
                    
                ]
            }

        case dbConstants.REMOVE_SPOT:
            return { 
                ...state,
                spots: [...state.spots.filter(spot => spot.id !== action.payload.id)]
            }

         default:
             return state;
    }
}
