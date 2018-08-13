import { spotConstants } from '../_constants'

export const spot = (state=[], action) => {
    switch(action.type) {
        case spotConstants.ADD:
            return [
                ...state,
                action.payload
            ]
        
        case spotConstants.EDIT:
            return [
                ...state.filter(spot => spot.id !== action.payload.spot.id),
                Object.assign({}, action.payload.spot)
            ]

        case spotConstants.REMOVE:
            return [...state.filter(spot => spot.id !== action.payload.id)]
        
        default:
            return state;
    }
}