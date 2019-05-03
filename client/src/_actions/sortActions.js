import { sortConstants } from '../_constants'

/**
 * Redux re-sort actions for displaying listed data
 */

 /**
  * update sort
  * @param {string} s selection for sort
  */
 export function updateSort(s) {
     //Whitelist
     if(s === "MOST_LIKED" || s === "MOST_RECENT" || s === "MOST_VIEWED") {
        return {
            type: sortConstants.UPDATE_SORT,
            payload: s
        }
    }
    return
 }

 export function resetSort() {
     return {
         type: sortConstants.RESET_SORT,
         payload: ""
     }
 }
