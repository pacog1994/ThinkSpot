import { spotConstants } from '../_constants'

export const spot = (state=[], action) => {
    switch(action.type) {
        case spotConstants.GET:
           return action.payload

        default:
            return state;
    }
}