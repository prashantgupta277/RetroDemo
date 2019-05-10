import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import  HeaderComponent from './../../commonComponent/header';
import  FooterComponent from './../../commonComponent/footer';
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";

import './myprofile.css';
import { doUpdateProfileRes} from '../../actions/userActions';
import { getUserDetail ,userDetailRes} from './../../actions/userActions';
import { createNotification} from './../../commonComponent/notificationbox/index';


const UPDATE_USER = gql`
mutation updateUser($id: ID!, $firstName: String!,$lastName: String!,$userStatus: String!, $companyName: String!, $addressLine1: String!, $addressLine2: String!){
    updateUser(id: $id, firstName:$firstName, lastName:$lastName, userStatus: $userStatus, companyName: $companyName, addressLine1:$addressLine1, addressLine2:$addressLine2){
    id
    firstName
    lastName
    email
    zipCode
    city
    companyName
    state
    accountType
    isCompanyAdmin
    isGuest
    companyId
    company{
        id
        companyName
      }

  }
}
`;


class myProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUserInfo:[],
            firstName:'',
            lastName:'',
            email:'',
            loaderState:false,
        }
    }

    componentWillReceiveProps(nextProps){   
        console.log(nextProps.userInfo.data.users.data)
        console.log(nextProps)

        if(nextProps){
            if(nextProps.userDetail && nextProps.userDetail.data.users.data && nextProps.userDetail.data.users.data.fetchSingleUser){
                let userInfo= nextProps.userDetail.data.users.data.fetchSingleUser;
                this.setState({
                    userDetail:userInfo,
                    firstName: userInfo.firstName,
                    lastName:userInfo.lastName,
                    companyName:userInfo.companyName,
                    accountType:userInfo.accountType,
                    email:userInfo.email,
                    loaderState:false
                },()=>{
                console.log(this.state.userDetail)
                })
            }

            if(nextProps.userInfo.data.users && nextProps.userInfo.data.users.updateUser){
                console.log(nextProps.userInfo.data.users.updateUser);
                localStorage.setItem("logindata" ,JSON.stringify(nextProps.userInfo.data.users.updateUser));
                this.setState({
                    loaderState:false
                })
                createNotification("success","Profile Update Successfully")
            }
            

        }
    }

    componentWillMount(){
        let userInfo=JSON.parse(localStorage.getItem("logindata"));
        console.log(userInfo)
        if(userInfo){
            this.setState({
                loginUserInfo: userInfo
            })
        }
        console.log(userInfo.id)    
        let sendRequest= {
            "operationName":null,
            "variables":{},
            "query":"{\n  fetchSingleUser(id: \""+userInfo.id+"\") {\n    firstName\n    lastName\n    id\n    email\n    addressLine1\n    addressLine2\n    state\n    city\n    companyName\n    zipCode\n    createdAt\n  accountType\n userStatus\n phoneNumber\n }\n}\n"}
        this.props.fetchdetail(sendRequest);
        this.setState({
            loaderState:true
        })
    }

    render() {
        return (
            <div className="App">
            <HeaderComponent/> 
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA" }  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="scroll-assist" id="myprofile-page-wrapper">
                <ApolloConsumer>
                  {client => (
                    <Mutation mutation={UPDATE_USER}  >
                      {(DoUpdate, { error }) => {
                           return (
                        <div className="container-fluid">
                            <div className="my-profile-page-title">
                                <h2>My Profile</h2>
                            </div>
                        <div className="form-box-wrapper">
                            <div className="form-box">
                                <div className="form-box-header">
                                    <h3>The Bluth Company</h3>
                                </div>

                                <div className="form-box-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-feild-box">
                                                <label htmlFor="first-name">First name</label>
                                                <input type="text" value={this.state.firstName} placeholder="First Name" id="first-name"  onChange={(evt) => { this.setState({ firstName: evt.target.value })} }/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-feild-box">
                                                <label htmlFor="last-name">Last name</label>
                                                <input  value={this.state.lastName}  type="text" placeholder="Last Name" id="last-name" onChange={(evt) => { this.setState({ lastName: evt.target.value })} }/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-feild-box">
                                                <label htmlFor="email-address">Email Address</label>
                                                <input type="text"  value={this.state.email}  placeholder="E-Mail" id="email-address" disabled={true}/>
                                            </div>
                                        </div>
                                    </div>    
                                    <div className="my-profile-change-password-links">
                                        <p><strong>Need to update your password?</strong></p>
                                        <p><Link to={'/changepwd/'} className="dropdown-item">Change your password</Link></p>
                                    </div>
                                </div>
                                <div className="form-box-footer">
                                    <div className="buttons-box">
                                        <button onClick={()=>{this.props.history.goBack()}} className="cancel-btn">Cancel</button>
                                        <button onClick={
                                          async (e) => {
                                            e.preventDefault();
                                            console.log(this.state);
                                            if(this.state.firstName===""){
                                                createNotification("error","Please enter first name")
                                                return false;
                                            } if(this.state.lastName===""){
                                                createNotification("error","Please enter last name")
                                                return false;
                                            }
                                    
                                            this.setState({
                                                loaderState:true
                                            })
                                            
                                          await client.mutate({
                                              mutation: UPDATE_USER,
                                              variables: { 
                                                    id:this.state.loginUserInfo.id,
                                                    email: this.state.createuseremail ,
                                                    companyName:this.state.userDetail.companyName?this.state.userDetail.companyName:"",
                                                    firstName: this.state.firstName,
                                                    lastName: this.state.lastName, 
                                                    userStatus: this.state.userDetail.userStatus?this.state.userDetail.userStatus:"", 
                                                    state:this.state.userDetail.state?this.state.userDetail.state:"", 
                                                    city:this.state.userDetail.city?this.state.userDetail.city:"",
                                                    addressLine1: this.state.userDetail.addressLine1?this.state.userDetail.addressLine1:"",
                                                    addressLine2: this.state.userDetail.addressLine2? this.state.userDetail.addressLine2:"",
                                                    phoneNumber:this.state.userDetail.phoneNumber?this.state.userDetail.phoneNumber:"",
                                                    zipCode:this.state.userDetail.zipCode ? this.state.userDetail.zipCode:"",
                                                }
                                            }).then(({ data }) => {
                                              console.log(data)
                                                this.setState({
                                                  loaderState:false,                                            
                                                })
                                                this.props.doUpdateProfile(data)
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
                                          
                                        } } className="saveChanges-btn">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        )

                        }}
                    </Mutation>
                    )}
                    </ApolloConsumer>
                    <FooterComponent/>
                </div>
            </div>
        );
    }
}

// export default myProfile;
myProfile.propTypes = {
    handleFormSubmit: PropTypes.func,
    handleFormSubmitRegister: PropTypes.func,
    userInfo: PropTypes.any,
    userDetail: PropTypes.any,
  };
  
  const mapStateToProps = createStructuredSelector({
    userInfo: doUpdateProfileRes,
    userDetail: userDetailRes,
  });
  
  function mapDispatchToProps(dispatch) {
    return {
        doUpdateProfile: (data) => dispatch(doUpdateProfileRes(data)),
        fetchdetail: (data) => dispatch(getUserDetail(data)),
    };
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  export default compose(withConnect)(myProfile);