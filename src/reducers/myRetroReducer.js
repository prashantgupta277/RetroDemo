import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {
    case types.RETRO_LIST:
      return action.data
    case types.RETRO_LIST_RES:
      return action.data
    case types.GET_SINGLE_RETRO:
      return action.id
    case types.GET_SINGLE_RETRO_RES:
      return action.data
    case types.DO_UPDATE_RETRO:
      return action.data
    case types.DO_UPDATE_RETRO_RES:
      return action.data
    
    default:
      return state
  }
}