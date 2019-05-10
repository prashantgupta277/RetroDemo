import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {

    case types.GET_CUSTOM_TEMPLATE:
      return action.user
    case types.GET_CUSTOM_TEMPLATE_RES:
      return action.user

    case types.UPDATE_CUSTOM_TEMPLATE:
      return action.user
    case types.UPDATE_CUSTOM_TEMPLATE_RES:
      return action.user

    case types.GET_SINGLE_CUSTOM_TEMPLATE:
      return action.user
    case types.GET_SINGLE_CUSTOM_TEMPLATE_RES:
      return action.user
    

    case types.GET_GLOBAL_TEMPLATE:
      return action.user
    case types.GET_GLOBAL_TEMPLATE_RES:
      return action.user

    case types.UPDATE_GLOBAL_TEMPLATE:
      return action.user
    case types.UPDATE_GLOBAL_TEMPLATE_RES:
      return action.user

    case types.GET_SINGLE_GLOBAL_TEMPLATE:
      return action.user
    case types.GET_SINGLE_GLOBAL_TEMPLATE_RES:
      return action.user

    default:
      return state
  }
}