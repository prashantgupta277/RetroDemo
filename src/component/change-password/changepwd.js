import React, { Component } from 'react';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import  HeaderComponent from './../../commonComponent/header';
import  FooterComponent from './../../commonComponent/footer';
import './changepwd.css';
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";
import { updatePassword, doChangepwdRes} from '../../actions/userActions';
import { createNotification} from './../../commonComponent/notificationbox/index';

const CHANGE_PASSWORD = gql`
mutation changePassword($oldPwd: String!,$newPwd: String!, $userId: ID!){
    changePassword(oldPwd: $oldPwd, newPwd:$newPwd, userId:$userId){
    id
    email

  }
}
`;

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpwd:'',
            newpwd:'',
            confirmpwd:'',
            loaderState:false,
            loginUserInfo:[]
        }
    }

    componentWillReceiveProps(nextProps){   
        console.log(nextProps)
    }

    componentWillMount(){
        let userInfo=JSON.parse(localStorage.getItem("logindata"));
        console.log(userInfo)
        if(userInfo){
            this.setState({
                loginUserInfo: userInfo
            })
        }
    }

    render() {
        return (
            <div className="App">
            <HeaderComponent/> 
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA" }  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="scroll-assist" id="changepwd-page-wrapper">

                    <div className="container-fluid">
                        <div className="form-box-wrapper">
                            <div className="form-box">
                                <div className="form-box-header">
                                    <h3>Change Password</h3>
                                </div>

                                <ApolloConsumer>
                                    {client => (
                                        <Mutation mutation={CHANGE_PASSWORD}  >
                                        {(doUpdate, { error }) => {
                                            return (
                                                <div>
                                                
                                                <div className="form-box-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-feild-box">
                                                            <label htmlFor="first-name">Old Password</label>
                                                            <input type="password" value={this.state.oldpwd} placeholder="Enter Old Password" id="first-name"  onChange={(evt) => { this.setState({ oldpwd: evt.target.value })} }/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-feild-box">
                                                            <label>New Password</label>
                                                            <input  value={this.state.newpwd}  type="password" placeholder="Enter New Password" onChange={(evt) => { this.setState({ newpwd: evt.target.value })} }/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-feild-box">
                                                            <label >Confrim Password</label>
                                                            <input type="password"  value={this.state.confirmpwd}  placeholder="Re-enter Password" onChange={(evt) => { this.setState({ confirmpwd: evt.target.value })} }/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                 
                                            <div className="form-box-footer">
                                                <div className="buttons-box">
                                                    {/* <button onClick={()=>{this.props.history.goBack()}} className="cancel-btn">Cancel</button> */}
                                                    <button className="saveChanges-btn"
                                                     onClick={
                                                        async (e) => {
                                                          e.preventDefault();
                                                          console.log(this.state);
                                                          if(this.state.oldpwd===""){
                                                            createNotification("error","Please enter Old Password")
                                                            return false;
                                                        } if(this.state.newpwd===""){
                                                            createNotification("error","Please enter New Password")
                                                            return false;
                                                        }
                                                        if(this.state.confirmpwd===""){
                                                            createNotification("error","Please enter Confirm Password")
                                                            return false;
                                                        }
                                                        var regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;         
                                                                   
                                                        if(!regex.test(this.state.newpwd)){      
                                                            createNotification("error","Please enter at least 8 characters long and use 1 uppercase 1 lowercase & 1 number")
                                                            return false; 
                                                        }
                                                        if(this.state.newpwd!==this.state.confirmpwd){
                                                            createNotification("error","Password did not match")
                                                            return false;
                                                        }

                                                        this.setState({
                                                            loaderState:true
                                                        })
                                                  
                                                          
                                                          
                                                        await client.mutate({
                                                            mutation: CHANGE_PASSWORD,
                                                            variables: { 
                                                                userId:this.state.loginUserInfo.id,
                                                                oldPwd: this.state.oldpwd ,
                                                                newPwd: this.state.newpwd ,
                                                              }
                                                          }).then(({ data }) => {
                                                            console.log(data)
                                                            createNotification("success","Password Successfully")
                                                                  this.setState({
                                                                      loaderState:false,  
                                                                      oldpwd:"",
                                                                      newpwd:"",
                                                                      confirmpwd:""

                                                                  })
                                                              
                                                            })
                                                            .catch(({ graphQLErrors }) => {
                                                            //This variable returns an array of errors
                                                              console.log(graphQLErrors)
                                                              if(graphQLErrors){
                                                                createNotification("error",graphQLErrors[0].message)
                                                                console.log( graphQLErrors[0].message );
                                                                this.setState({
                                                                  loaderState:false
                                                                })
                                                              }
                                                              
                                                            })
                                                        
                                                      } }>Updates Password</button>
                                                </div>
                                            </div>
                                        </div>

                                        )}}
                                        </Mutation>
                                    )}
                                </ApolloConsumer>
                            </div>
                        </div>
                    </div>

                    <FooterComponent/>
                </div>
            </div>
        );
    }
}

// export default ChangePassword;
ChangePassword.propTypes = {
    handleFormSubmit: PropTypes.func,
  };
  
  const mapStateToProps = createStructuredSelector({
    userDetail: doChangepwdRes,
  });
  
  function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(updatePassword(data)),
    };
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  export default compose(withConnect)(ChangePassword);