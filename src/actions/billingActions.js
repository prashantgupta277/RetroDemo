import * as types from './actionTypes';  
import billingApi from '../api/billingAPI';
// import { submit_profile } from '../actions/editProfileActions';

export function getPlanList(data) {
  return {
    type: types.GET_PLAN_LIST, 
    data
  };
}

export function getPlanListRes(data) {  
  return {
    type: types.GET_PLAN_LIST_RES, 
    data
  };
}

export function getAllPlanListing(data) {
  return function(dispatch) {
    billingApi.getPlanList(data).then(res => {
      dispatch(getPlanListRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function getCard(card) {
  return {
    type: types.GET_CARD_DETAIL, 
    card
  };
}

export function getCardRes(card) {  
  return {
    type: types.GET_CARD_DETAIL_RES, 
    card
  };
}

export function getCardDetailList(data) {
  return function(dispatch) {
    billingApi.getCardDetail(data).then(res => {
      dispatch(getCardRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function createBilling(user) {
  return {
    type: types.CREATE_BILLING, 
    user
  };
}

export function createBillingRes(user) {  
  return {
    type: types.CREATE_BILLING_RES, 
    user
  };
}


export function createBillingSummarydata(data) {
  return function(dispatch) {
    billingApi.createBillingSummary(data).then(user => {
      dispatch(createBillingRes(user));
      // console.log(user)
      // alert('Add Successfully')
      // window.location.href="/billing"
    }).catch(error => {
      console.log(error);
    });
  };
}



export function invoiceHistory(user) {
  return {
    type: types.INVOICE_LIST, 
    user
  };
}

export function invoiceHistoryRes(user) {  

  return {
    type: types.INVOICE_LIST_RES, 
    user
  };
}


export function fetchInvoiceHistory(data) {
  return function(dispatch) {
    billingApi.getinvoiceHistory(data).then(user => {
      // console.log(user)

      dispatch(invoiceHistoryRes(user));
    }).catch(error => {
      console.log(error);
    });
  };
}












