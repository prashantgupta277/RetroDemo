import * as types from './actionTypes';  
import createThoughtApi from '../api/createThoughtAPI';
// import { submit_profile } from '../actions/editProfileActions';

export function createThought(data) {

  return {
    type: types.CREATE_THOUGHT, 
    data
  };
}

export function createThoughtRes(data) {  
  return {
    type: types.CREATE_THOUGHT_RES, 
    data
  };
}


export function createThoughts(data) {
  return function(dispatch) {
    createThoughtApi.createThought(data).then(res => {
      dispatch(createThoughtRes(res));
      // dispatch(createThoughtRes(null));

    }).catch(error => {
      console.log(error);
    });
  };
}



export function fetchThought(data) {

    return {
      type: types.GET_ALL_THOUGHT, 
      data
    };
  }
  
  export function fetchThoughtRes(data) {  
    return {
      type: types.GET_ALL_THOUGHT_RES, 
      data
    };
  }
  
  
  export function getThoughts(data) {
    return function(dispatch) {
      createThoughtApi.fetchThought(data).then(res => {
        dispatch(fetchThoughtRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
  }

  export function updateThought(data) {

    return {
      type: types.UPDATE_THOUGHT, 
      data
    };
  }
  
  export function updateThoughtRes(data) {  
    return {
      type: types.UPDATE_THOUGHT_RES, 
      data
    };
  }
  
  
  export function doUpdateThought(data) {
    return function(dispatch) {
      createThoughtApi.updateThought(data).then(res => {
        dispatch(updateThoughtRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
  }





  
  export function updateActivity(data) {

    return {
      type: types.UPDATE_ACTIVITY, 
      data
    };
  }
  
  export function updateActivityRes(data) {  
    return {
      type: types.UPDATE_ACTIVITY_RES, 
      data
    };
  }
  
  
  export function doUpdateActivity(data) {
    return function(dispatch) {
      createThoughtApi.updateActivity(data).then(res => {
        dispatch(updateActivityRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
  }



  export function doUpdateRetroNote(data) {

    return {
      type: types.UPDATE_NOTE, 
      data
    };
  }
  
  export function doUpdateRetroNoteRes(data) {  
    return {
      type: types.UPDATE_NOTE_RES, 
      data
    };
  }
  
  
  export function updateRetroNote(data) {
    return function(dispatch) {
      createThoughtApi.doUpdateRetroNote(data).then(res => {

        console.log(res)
        // dispatch(doUpdateRetroNoteRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
  }


  export function doDeleteThought(data) {

    return {
      type: types.DELETE_THOUGHT, 
      data
    };
  }
  
  export function doDeleteThoughtRes(data) {  
    return {
      type: types.DELETE_THOUGHT_RES, 
      data
    };
  }
  
  
  export function deleteThought(data) {
    return function(dispatch) {
      createThoughtApi.doDeleteThought(data).then(res => {

        console.log(res)
      }).catch(error => {
        console.log(error);
      });
    };
  }




  



  




  

  








