import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {
    case types.INVITE_RETRO:
      return action.data
    case types.INVITE_RETRO_RES:
      return action.data
    case types.INVITE_USER_RETRO:
      return action.data
    case types.INVITE_USER_RETRO_RES:
      return action.data
    case types.INVITE_USER_DELETE:
      return action.data
    case types.INVITE_USER_DELETE_RES:
      return action.data
    case types.All_INVITE:
        return action.data
    case types.All_INVITE_RES:
        return action.data
    
    
    default:
      return state
  }
}
