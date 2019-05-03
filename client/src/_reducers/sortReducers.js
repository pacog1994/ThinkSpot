import {sortConstants } from '../_constants'
const initialState = {
    sort: "SHOW_ALL"
}

export const sort = (state=initialState, action) => {
    switch(action.type) {
        case sortConstants.UPDATE_SORT:
            return action.payload

        case sortConstants.RESET_SORT:
            return action.payload
        
        default:
            return state
    }
}