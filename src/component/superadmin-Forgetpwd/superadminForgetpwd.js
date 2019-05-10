import React, { Component } from 'react'
import logo from './img/retro-logo.png'
import './superadminForgetpwd.css'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';



class superadminForgetpwd extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          isType:""
        }
      }
    
    componentWillReceiveProps(nextProps){
        if(nextProps){
          console.log(nextProps)
          
        }
    }
    
    ResetPassword(){
        if (this.state.email === "") {
            alert("Please Enter Email");
        }
        else {
            
        }
    }

    render() {
        return (
            <div className="App">
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
                                    <h2 className="page_title">Forget Password</h2>
                                </div>
                                <div className="superadmin_login_box_body">
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email"  className="form-control" name="email" title="Email" required onChange={(e) => this.setState({email:e.target.value})} />
                                    </div>
                                </div>
                                <div className="superadmin_login_box_footer">
                                    <button onClick={()=>this.ResetPassword()} className="orange-btn">Reset Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

superadminForgetpwd.propTypes = {
  };
  
  const mapStateToProps = createStructuredSelector({
  });
  
  function mapDispatchToProps(dispatch) {
    return {
    };
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  export default compose(withConnect)(superadminForgetpwd);
