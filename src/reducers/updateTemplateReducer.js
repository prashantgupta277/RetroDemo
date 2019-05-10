import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {
    case types.UPDATE_TEMPLATE_RES:
    console.log(action.user);
      return action.user
    default:
      return state
  }
}