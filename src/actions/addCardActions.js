import * as types from './actionTypes';  
import addCardAPI from '../api/addCardAPI';
import { createNotification} from './../commonComponent/notificationbox/index';

export function CreateCard(data) {

  return {
    type: types.ADD_CARD, 
    data
  };
}

export function CreateCardRes(data) {  
  return {
    type: types.ADD_CARD_RES, 
    data
  };
}

export function submit_CreteCard(data) {
    return function(dispatch) {
      addCardAPI.submit_CreteCard(data).then(res => {
        if(res.data){
          createNotification("success","Card Added Successfully");
          dispatch(CreateCardRes(res));
        }
        if(res.errors){
            createNotification("error",res.errors[0].message);
        }
         
      }).catch(error => {
        console.log(error);
      });
    };
}


