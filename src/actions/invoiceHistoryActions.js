import * as types from './actionTypes';  
import invoiceHistoryApi from '../api/invoiceHistoryAPI';
// import { submit_profile } from '../actions/editProfileActions';

export function getInoviceList(data) {
  return {
    type: types.GET_INVOICE_HISTORY, 
    data
  };
}

export function getInoviceListRes(data) {  
  return {
    type: types.GET_INVOICE_HISTORY_RES, 
    data
  };
}

export function getAllInvoiceListing(data) {
  return function(dispatch) {
    invoiceHistoryApi.getInvoiceHistoryList(data).then(res => {
      dispatch(getInoviceListRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}









