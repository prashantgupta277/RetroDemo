import React, { Component } from 'react'
import logo from './img/retro-logo.png'
import './superadminlogin.css'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Link } from "react-router-dom";
import { createNotification} from './../../commonComponent/notificationbox/index';

import { submit_Super_login, dosuperLoginRes} from '../../actions/superLoginActions';

class superadminlogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
          login: false,
          email: '',
          password: '',
          isType:"",
          loaderState: false
        }
      }
    
    componentWillReceiveProps(nextProps){
        if(nextProps){
          console.log(nextProps)
            if(nextProps.userInfo && nextProps.userInfo.user.superloginReducer){
                if(nextProps.userInfo.user.superloginReducer.data!== null){
                  // console.log(nextProps.userInfo.user)
                  if(nextProps.userInfo.user.superloginReducer.data.login.role === "admin" || nextProps.userInfo.user.superloginReducer.data.login.role === "superadmin"){
                    createNotification('success',"Login Successfully");
                    localStorage.setItem('logindata', JSON.stringify(nextProps.userInfo.user.superloginReducer.data.login));
                    localStorage.setItem('usertype', "admin");
                    // this.props.history.push('/allaccounts');
                    window.location.href='/allaccounts';
                  }else{
                    this.setState({loaderState:false})
                    createNotification('error',"you are not admin");
                  }
                  
    
                }else{
                  this.setState({loaderState:false})
                  // alert("Email or password is incorrect");
                  createNotification('error',nextProps.userInfo.user.superloginReducer.errors[0].message);
                }    
            }
        }
    }
    
    doLogin(){
        if (this.state.email === "") {
            createNotification('error',"Please Enter Email");
        }
        if (this.state.password === "") {
            createNotification('error',"Please Enter Password");
        }
        else {
            let sendRequest = {
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  login(email: \""+this.state.email+"\", password: \""+this.state.password+"\") {\n    email\n    id\n    lastName\n    firstName\n    password\n   role\n }\n}\n"};
            console.log(sendRequest)
            this.setState({
                loaderState:true,
                isType:"Login"
            })
            this.props.handleFormSubmit(sendRequest);
        }
    }

    render() {
        return (
            <div className="App">
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA" }  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div id="superadmin_loginpage_wrapper" className="">
                    <div className="superadmin_loginpage_header">
                        <a href="/">
                            <img src={logo} alt="" className="company_logo" />
                        </a>
                    </div>
                    <div className="container-fluid superadmin_login_content_wrapper">
                        <div className="superadmin_login_box_wrapper">
                            <div className="superadmin_login_box">
                                <div className="superadmin_login_box_header">
                                    <h2 className="page_title">Log in</h2>
                                </div>
                                <div className="superadmin_login_box_body">
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email"  className="form-control" name="email" title="Email" required onChange={(e) => this.setState({email:e.target.value})} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control" onChange={(e) => this.setState({password:e.target.value})} name="password" title="Password" required />
                                    </div>
                                    <div className="text-right">
                                        <Link to={'/superadminForgetpwd/'} className="forgot_password_link">Forgot Password?</Link>
                                    </div>
                                </div>
                                <div className="superadmin_login_box_footer">
                                    <button onClick={()=>this.doLogin()} className="orange-btn">Log In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

superadminlogin.propTypes = {
    handleFormSubmit: PropTypes.func,
    userInfo: PropTypes.any
  };
  
  const mapStateToProps = createStructuredSelector({
    userInfo: dosuperLoginRes
  });
  
  function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submit_Super_login(data)),
    };
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  export default compose(withConnect)(superadminlogin);
