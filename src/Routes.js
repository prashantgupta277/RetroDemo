import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";



import { ToastContainer, ToastStore } from 'react-toastify';

import LoginComponent from './component/login/login';
import verifyemail from './component/verify-email/verifyemail';

import EditTemplate from './component/edit-template/editTemplate';
import AddTemplate from './component/add-template/addTemplate';
import Template from './component/template/template';
import CreateRetroComponent from './component/create-retro/createretro';
import MyRetro from './component/my-retro/myretro';
import EditRetro from './component/edit-retro/editretro';
import StartRetro from './component/start-retro/startretro';
import myProfile from './component/my-profile/myprofile';
import ChangePassword from './component/change-password/changepwd';
import termsCondition from './component/terms-condition/termscondition';
import privacyPolicy from './component/privacy-policy/privacypolicy'
// ****  Company ****///
import AccountInformation from './component/account-information/accountinformation';
import Addcard from './component/add-card/addcard';

import Users from './component/users/users';
import RetroSummary from './component/retro-summary/retrosummary';
import Projects from './component/projects/projects';
import Billing from './component/billing/billing';
import edituser from './component/edit-user/edituser';
import adduser from './component/add-user/adduser';


// SuperAdmin Pages
import createpromo from './component/create-promo/createpromo';
import editpromocode from './component/edit-promocode/editpromocode';
import AllAccounts from './component/all-account/allaccount';
import PromoCodes from './component/promo-codes/promocodes';
import AdminUsers from './component/admin-users/adminusers';

import SuperAdminTemplates from './component/superadmin-templates/superadmintemplates';
import SuperAdminEditTemplate from './component/superadmin-edittemplate/superadminedittemplate';
import SuperAdminAccountInformation from './component/superadmin-accountinformation/superadminaccountinformation';
import accountretros from './component/account-retros/accountretros';
import SuperAdminUsers from './component/superadmin-users/superadminusers';
import SuperAdminAdduser from './component/superadmin-adduser/superadminadduser';
import SuperAdminEditAdduser from './component/superadmin-edituser/superadminedituser';
import SuperAdminBilling from './component/superadmin-billing/superadminbilling';
import superadmineditretro from './component/superadmin-editretro/superadmineditretro';
import superadminlogin from './component/superadmin-login/superadminlogin';
import superadminForgetpwd from './component/superadmin-Forgetpwd/superadminForgetpwd'
import SuperadminAddcardard from './component/superadmin-addcard/superadminaddcard';
import SuperAdminEditGlobalTemplate from './component/superadmin-editglobaltemplate/superadmineditGlobalTemplate';


import AddCustomTemplate from './component/add-customTemplate/addCustomTemplate';
import AddGlobalTemplate from './component/add-globaltemplate/addGlobalTemplate';

import Plan from './component/plan/plan';
import createplan from './component/create-plan/createplan';
import editplan from './component/edit-plan/editplan';


class Routes extends React.Component{
  constructor(props,context){
    super(props,context);
    this.state = {
      isAdmin : false,
      userlogin: false,
      companylogin: false,
      isUser: false,
      superadmin: false
    }
  }
  componentWillMount() {

    let userInfo= localStorage.getItem('logindata');

    if(userInfo){
      let res= JSON.parse(userInfo);
      console.log(res)
      if(res.isGuest==="true"){
        this.setState({
          userlogin: true
        })
      }
      if(res.isCompanyAdmin==="true"){
        this.setState({
          companylogin: true
        })
      }

      if(res.role==="admin"){
        this.setState({
          superadmin: true
        })
      }
       
    }
    

  }
  componentDidMount() { 

  }
  render(){


    return(
      <Router>
        <div>

           <Route path="/superadmin-login" component={superadminlogin}/>
           <Route path="/termscondition" component={termsCondition} />
           <Route path="/privacypolicy" component={privacyPolicy} />

           <Route exact  path={`/`} component={ LoginComponent }/>
           <Route path="/verifyemail/:id" component={verifyemail}/>

           
        
           {(this.state.userlogin && !this.state.companylogin)  &&<div>
            <Route path="/editTemplate/:id" component={EditTemplate} />
            <Route path="/addTemplate" component={AddTemplate} />
            <Route path="/template" component={Template} />
            <Route path="/createretro" component={CreateRetroComponent} />
            <Route exact  path="/myretro" component={MyRetro} />
            <Route path="/editretro/:id" component={EditRetro} />
            <Route path="/startretro/:roomid/:id" component={StartRetro} />
            <Route path="/myprofile" component={myProfile} />
            <Route path="/changepwd" component={ChangePassword} />
            <Route path="/retrosummary/:id" component={RetroSummary} />
      
          </div>}
          {(this.state.companylogin && !this.state.userlogin) &&<div>
              <Route exact path="/accountinformation" component={AccountInformation} />
              <Route path="/users" component={Users} />
              <Route path="/retrosummary/:id" component={RetroSummary} />
              <Route path="/projects" component={Projects} />
              <Route path="/billing" component={Billing} />
              <Route path="/addcard" component={Addcard} />
              <Route path="/edituser/:id" component={edituser} />
              <Route path="/adduser" component={adduser} />
              <Route path="/myprofile" component={myProfile} />
              <Route path="/changepwd" component={ChangePassword} />
          </div>}
          

          {(this.state.companylogin && this.state.userlogin) && <div>
            <Route path="/editTemplate/:id" component={EditTemplate} />
            <Route path="/addTemplate" component={AddTemplate} />
            <Route path="/template" component={Template} />
            <Route path="/createretro" component={CreateRetroComponent} />
            <Route path="/myretro" component={MyRetro} />
            <Route path="/editretro/:id" component={EditRetro} />
            <Route path="/startretro/:roomid/:id" component={StartRetro} />
            <Route path="/myprofile" component={myProfile} />
            <Route path="/changepwd" component={ChangePassword} />
            <Route path="/retrosummary/:id" component={RetroSummary} />
            <Route path="/accountinformation" component={AccountInformation} />
            <Route path="/users" component={Users} />
            <Route path="/projects" component={Projects} />
            <Route path="/billing" component={Billing} />
            <Route path="/addcard" component={Addcard} />
            <Route path="/edituser/:id" component={edituser} />
            <Route path="/adduser" component={adduser} />
          </div>}



          {this.state.superadmin &&<div>
              <Route path="/createpromo" component={createpromo} />
              <Route path="/editpromocode/:id" component={editpromocode} />
              <Route exact path="/allaccounts" component={AllAccounts} />
              <Route path="/promocodes" component={PromoCodes} />
              <Route path="/admin-users" component={AdminUsers} />

              

              <Route path="/super-admin-templates" component={SuperAdminTemplates} />
              <Route path="/super-admin-edittemplates/:id" component={SuperAdminEditTemplate} />
              <Route path="/super-admin-editglobaltemplates/:id" component={SuperAdminEditGlobalTemplate} />
              <Route path="/superadmin-addCustomTemplates" component={AddCustomTemplate} />
              <Route path="/superadmin-addGlobalTemplates" component={AddGlobalTemplate} />



              
              <Route path="/superadmin-account-information" component={SuperAdminAccountInformation} />
              <Route path="/superadmin-retros" component={accountretros} />
              <Route path="/superadmin-users" component={SuperAdminUsers} />
              <Route path="/superadmin-adduser" component={SuperAdminAdduser} />
              <Route path="/superadmin-edituser" component={SuperAdminEditAdduser} />
              <Route path="/superadmin-billing" component={SuperAdminBilling} />
              <Route path="/superadmin-editretro" component={superadmineditretro} />
              <Route path="/superadmin-login" component={superadminlogin} />
              <Route path="/superadminForgetpwd" component={superadminForgetpwd} />
              <Route path="/superadmin-addcard" component={SuperadminAddcardard} />

              <Route path="/plan" component={Plan} />
              <Route path="/createplan" component={createplan} />
              <Route path="/editplan/:id" component={editplan} /> 
            
         </div>} 
          <ToastContainer store={ToastStore} />
        </div>
      </Router>
    );    
  }
}


export default   Routes;
