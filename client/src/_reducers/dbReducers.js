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
            
         default:
             return state;
    }
}
