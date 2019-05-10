import { combineReducers } from 'redux';
import userReducer from './userReducer';
import registerReducer from './registerReducer';
import createRetroReducer from './createRetroReducer';
import templateReducer from './templateReducer';
import editTemplateReducer from './editTemplateReducer';
import updateTemplateReducer from './updateTemplateReducer';
import specificTemplateReducer from './specificTemplateReducer';
import projectListReducer from './projectListReducer';
import myTemplateReducer from './myTemplateReducer';
import inviteRetroReducer from './inviteRetroReducer';
import myRetroReducer from './myRetroReducer';
import usersReducer from './usersReducer';
import addCardReducer from './addCardReducer';
import invoiceHistoryReducer from './invoiceHistoryReducer';
import newCreateTemplateReducer from './newCreateTemplateReducer';
import billingReducer from './billingReducer';
import  thougthReducer from './createThougthReducer';
import { reducer as formReducer } from 'redux-form';

// ********** super admin Reducer

import superLoginReducer from './superLoginReducer';
import promoCodeReducer from './promoCodeReducer';
import planReducer from './planReducer';
import superAdminTemplateReducer from './superAdminTemplateReducer';

import verifyEmailReducer from './verifyEmailReducer';

export default combineReducers({
  form: formReducer,
  user: userReducer,
  signup: registerReducer,
  templateReducer:templateReducer,
  editTemplateReducer:editTemplateReducer,
  updateTemplateReducer:updateTemplateReducer,
  specifictemplate:specificTemplateReducer,
  projectList:projectListReducer,
  mytemplate: myTemplateReducer,
  inviteRetroReducer: inviteRetroReducer,
  myRetroReducer:myRetroReducer,
  users:usersReducer,
  newCreateTemplateReducer:newCreateTemplateReducer,
  thougthReducer:thougthReducer,
  createRetroReducer:createRetroReducer,
  addCardReducer:addCardReducer,
  invoiceHistoryReducer:invoiceHistoryReducer,
  billingReducer:billingReducer,

  // super admin 
  
  superloginReducer: superLoginReducer,
  promoCodeReducer:promoCodeReducer,
  planReducer:planReducer,
  superAdminTemplateReducer:superAdminTemplateReducer,

  //verify email

  verifyemailReducer:verifyEmailReducer
  
});