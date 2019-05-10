import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {

    case types.DO_VERIFICATION:
      return action.user
    case types.DO_VERIFICATION_RES:
      return action.user

    default:
      return state
  }
}