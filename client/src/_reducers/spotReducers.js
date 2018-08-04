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
                ...state,
                action.payload
            ]
            
        case spotConstants.REMOVE:
            return []
        
        default:
            return state;
    }
}