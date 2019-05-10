import * as types from '../actions/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {
    case types.FIND_USERS_LIST:
      return action.data
    case types.FIND_USERS_LIST_RES:
      return action.data
    case types.ALL_USERS_LIST:
      return action.data
    case types.ALL_USERS_LIST_RES:
      return action.data
    case types.DO_UPDATE_USERS:
      return action.data
    case types.DO_UPDATE_USERS_RES:
      return action.data
    case types.GET_SINGLE_USER:
      return action.data
    case types.GET_SINGLE_USER_RES:
      return action.data
    case types.DELETE_USER:
      return action.data
    case types.DELETE_USER_RES:
      return action.data
    case types.GET_USER_COUNT:
      return action.data
    case types.GET_USER_COUNT_RES:
      return action.data
    case types.GET_ACCOUNT_DETAIL:
      return action.data
    case types.GET_ACCOUNT_DETAIL_RES:
      return action.data


      
    
    default:
      return state
  }
}
