import * as types from '../actions/actionTypes'; 
import initialState from './initialState';

//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon

  switch(action.type) {

    case types.GET_PLAN_LIST:
      return action.data
    case types.GET_PLAN_LIST_RES:
      return action.data
    case types.GET_CARD_DETAIL:
      return action.card
    case types.GET_CARD_DETAIL_RES:
      return action.card
    case types.CREATE_BILLING:
      return action.user
    case types.CREATE_BILLING_RES:
      return action.user
    case types.INVOICE_LIST:
      return action.user
    case types.INVOICE_LIST_RES:
      return action.user

    
    default:
      return state
  }
}
