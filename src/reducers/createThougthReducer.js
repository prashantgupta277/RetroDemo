import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {
    case types.CREATE_THOUGHT:
      return action.data
    case types.CREATE_THOUGHT_RES:
      return action.data
    case types.GET_ALL_THOUGHT:
      return action.data
    case types.GET_ALL_THOUGHT_RES:
      return action.data
    case types.UPDATE_THOUGHT:
      return action.data
    case types.UPDATE_THOUGHT_RES:
      return action.data
    
    default:
      return state
  }
}
