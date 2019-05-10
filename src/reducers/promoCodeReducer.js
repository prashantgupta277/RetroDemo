import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {
    case types.GET_PROMOCODE_LIST:
      return action.data
    case types.GET_PROMOCODE_LIST_RES:
      return action.data
    case types.UPDATE_PROMOCODE:
      return action.data
    case types.UPDATE_PROMOCODE_RES:
      return action.data
    case types.GET_PROMOCODE_DETAIL:
      return action.data
    case types.GET_PROMOCODE_DETAIL_RES:
      return action.data
    
    default:
      return state
  }
}
