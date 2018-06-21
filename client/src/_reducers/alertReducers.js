import { alertConstants } from '../_constants'

export const errors = (state=[], action) => {
    switch(action.type) {
        case alertConstants.ERROR :
            return [
                ...state, 
                action.payload
            ]

        case alertConstants.CLEAR:
            return state.filter((message, i) => i !== action.payload)

        default: 
            return state
    }
}