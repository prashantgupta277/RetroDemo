import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {
    
    case types.All_MY_TEMPLATES:
      return action.data
    case types.All_MY_TEMPLATES_RES:
      return action.data
    default:
      return state
  }
}
