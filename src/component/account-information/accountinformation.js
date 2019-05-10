import React, { Component } from 'react';
import {  Row, Col, FormControl, Button } from 'react-bootstrap';
import './accountinformation.css';
import PropTypes from 'prop-types';

import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import TopCards from './TopCards';

import Sidebar from './../../commonComponent/sidebar/Sidebar';

import DisableAccounts from './DisableAccounts';


import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNotification } from './../../commonComponent/notificationbox/index';
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";


import { getUserDetail, userDetailRes, doUpdateProfileRes ,getAccountInfoDetail,accountInfoDetailRes} from './../../actions/userActions';


const UPDATE_COMPANY = gql`
mutation updateUser($id: ID!,$companyName: String!,$addressLine1: String!, $addressLine2: String!, $city: String!, $state: String!,$zipCode: Int!,$phoneNumber: String!){
    updateUser(id: $id, companyName:$companyName, addressLine1:$addressLine1, addressLine2: $addressLine2, city: $city, state:$state,zipCode:$zipCode,phoneNumber:$phoneNumber){
    id
    companyName
    addressLine1
    addressLine2
    city
    state
    zipCode
    accountType
    phoneNumber

  }
}
`;


class AccountInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: [],
            firstName: '',
            lastName: '',
            companyName: '',
            accountType: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            city: '',
            zipCode: '',
            email: '',
            phoneNumber: '',
            loaderState: false,
            AccountInfo:[]
        }
    }


    componentWillMount() {

        let loginUserInfo = JSON.parse(localStorage.getItem('logindata'));

        if(loginUserInfo){
            this.setState({
                companyName: loginUserInfo.companyName
            })
        }

        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "{\n  fetchSingleUser(id: \"" + loginUserInfo.id + "\") {\n    firstName\n    lastName\n    id\n    email\n    addressLine1\n    addressLine2\n    state\n    city\n    companyName\n    zipCode\n    createdAt\n  accountType\n  phoneNumber \n company {\n      id\n      companyName\n    }\n  }\n}\n"
        }
        this.props.fetchdetail(sendRequest);
        
        let sendReques1={"operationName":null,"variables":{},"query":"{\n  adminUserBar(companyId: \""+loginUserInfo.companyId+"\") {\n    id\n    companyAdminCount\n    retroAdminCount\n    retroAdminCount\n    registeredAttendesCount\n    guestCount\n    amount\n    companyName\n    currentPlanId\n    planInfo\n    user {\n      id\n      email\n    }\n  }\n}\n"}
        this.props.loadAccountInfoDetails(sendReques1)
        this.setState({
            loaderState: true
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (nextProps) {

            
            if (nextProps.userDetail && nextProps.userDetail.data.users.data && nextProps.userDetail.data.users.data.fetchSingleUser) {

                let userInfo = nextProps.userDetail.data.users.data.fetchSingleUser;
               
               
                this.setState({
                    userDetail: userInfo,
                    firstName: userInfo.firstName ? userInfo.firstName : '',
                    lastName: userInfo.lastName ? userInfo.lastName : '',
                    accountType: userInfo.accountType ? userInfo.accountType : '',
                    addressLine1: userInfo.addressLine1 ? userInfo.addressLine1 : '',
                    addressLine2: userInfo.addressLine2 ? userInfo.addressLine2 : '',
                    state: userInfo.state ? userInfo.state : '',
                    city: userInfo.city ? userInfo.city : '',
                    zipCode: userInfo.zipCode ? userInfo.zipCode : null,
                    email: userInfo.email ? userInfo.email : '',
                    phoneNumber: userInfo.phoneNumber ? userInfo.phoneNumber : '',
                    loaderState: false
                }, () => {
                })
            }

            if (nextProps.userDetail && nextProps.userDetail.data.users.data && nextProps.userDetail.data.users.data.updateUser) {
                createNotification("success", "Update Successfully")
                this.setState({
                    loaderState: false
                })
            }
        }
    }

   
    render() {
        return (

            <div id="accountInformation" className="body-content cust-bg newBg">
                <HeaderComponent />
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                {/* Main Page Structure Begin */}
                <div className="zIndexTop container-fluid">
                    <div className="maxWidth-1260px pb-5">
                        
                        <Row >
                            <Col md={3} className="sideBar">
                                <Sidebar CompanyName={this.state.companyName} />
                            </Col>
                            <Col md={9} className="data-right redBg">
                                <Row>
                                    <TopCards AccountInfo={this.props.accountInfoDetailRes}/>

                                </Row>
                                <Row className="spacerRow mb-2">
                                    <Col xs={12}></Col>
                                </Row>
                                <Row>
                                    <Col md={12} >
                                        <div className="infoCard  pt-4 pb-5 pl-3 pr-3">
                                            <Col md={12}>
                                                <h3 className="text-db-blue section-title">Account Details</h3>
                                            </Col>
                                            <ApolloConsumer>
                                            {client => (
                                                <Mutation mutation={UPDATE_COMPANY}  >
                                                {(doUpdate, { error }) => {
                                                    return (
                                                        <Col md={12} >
                                                    <div className="formContainer text-center">
                                                       
                                                        <div className="form-group row">
                                                            <label htmlFor="companyName" className="col-sm-3 col-form-label text-right pr-0">Company Name</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" id="companyName" placeholder="The Bluth Company" value={this.state.companyName} onChange={(e) => this.setState({ companyName: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="addressL1" className="col-sm-3 col-form-label text-right pr-0">Address Line 1</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" id="addressL1" placeholder="2 wall Street" value={this.state.addressLine1} onChange={(e) => this.setState({ addressLine1: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="addressL2" className="col-sm-3 col-form-label text-right pr-0">Address Line2</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" id="addressL2" placeholder="4th Floar" value={this.state.addressLine2} onChange={(e) => this.setState({ addressLine2: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row fld-group">
                                                            <div className="col-md-12 d-flex formInlineValues">

                                                                <label htmlFor="city" className=" col-sm-3 col-form-label text-right pr-0">City</label>
                                                                <input type="text" className="form-control mr-4 w-128 ml-10px" id="city" placeholder="New York" value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />


                                                                <label htmlFor="inputPassword" className=" col-form-label text-right pr-0 mr-3">State</label>

                                                                <FormControl componentClass="select" placeholder="select" className="mr-4 w-110" value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })}>
                                                                    <option value="">select</option>
                                                                    <option value="NY"  >NY</option>
                                                                    <option value="US"  >US</option>
                                                                    <option value="South US"  >South US</option>
                                                                </FormControl>

                                                                <label htmlFor="inputPassword" className=" col-form-label text-right pr-0 mr-3">Zipcode</label>

                                                                <input type="text" className="form-control w-90" id="inputPassword" placeholder="10011" value={this.state.zipCode} onChange={(e) => this.setState({ zipCode: e.target.value })} />

                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="phoneNum" className="col-sm-3 col-form-label text-right pr-0">Phone Number</label>
                                                            <div className="col-sm-9">
                                                                <input type="phone" className="form-control" id="phoneNum" placeholder="212-222-333" value={this.state.phoneNumber} onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                        <Button className="pinkBtn btn-lg "
                                                         onClick={
                                                            async (e) => {
                                                              e.preventDefault();
                                                              console.log(this.state);
                                                              if(this.state.companyName===""){
                                                                  createNotification("error","Please enter company name")
                                                                  return false;
                                                              } if(this.state.addressLine1===""){
                                                                  createNotification("error","Please enter first address")
                                                                  return false;
                                                              }if(this.state.addressLine2===""){
                                                                  createNotification("error","Please enter second address")
                                                                  return false;
                                                              }
                                                              if(this.state.city===""){
                                                                  createNotification("error","Please enter city ")
                                                                  return false;
                                                              }
                                                              if(this.state.state===""){
                                                                  createNotification("error","Please enter state")
                                                                  return false;
                                                              }
                                                              if(this.state.zipCode===""){
                                                                    createNotification("error","Please enter zipcode")
                                                                    return false;
                                                                }
                                                                if(this.state.phoneNumber===""){
                                                                    createNotification("error","Please enter phone number")
                                                                    return false;
                                                                }
                                                              
                                                      
                                                              this.setState({
                                                                  loaderState:true
                                                              })
                                                              

                                                            await client.mutate({
                                                                mutation: UPDATE_COMPANY,
                                                                variables: { 
                                                                      id:this.state.userDetail.id,
                                                                      companyName: this.state.companyName ,
                                                                      addressLine1: this.state.addressLine1 ,
                                                                      addressLine2: this.state.addressLine2 ,
                                                                      city: this.state.city ,
                                                                      state: this.state.state ,
                                                                      zipCode: Number(this.state.zipCode) ,
                                                                      phoneNumber: this.state.phoneNumber ,
                                                                      city: this.state.city ,

                                                                  }
                                                              }).then(({ data }) => {
                                                                console.log(data)
                                                                createNotification("success", "Update Successfully")
                                                                  setTimeout(()=>{
                                                                      this.setState({
                                                                        loaderState:false,                                     
                                                                      })
                                                                  },1000)
                                                                  
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
                                                            
                                                          } }>Save Changes</Button></div>
                                                       
                                                </div>
                                            </Col>
                                         )  }}
                                         </Mutation>
                                         )}
                                         </ApolloConsumer>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="spacerRow mb-2">
                                    <Col xs={12}></Col>
                                </Row>
                                <Row>
                                    <Col md={12} >
                                        <DisableAccounts />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* End Main Page Structure Begin */}
                <div className="spacer"></div>
                <div className="spacer"></div>
                <FooterComponent />
            </div>
        );
    }
}

AccountInformation.propTypes = {
    userDetail: PropTypes.any,
    updateUserInfo: PropTypes.any,
    accountInfoDetailRes:  PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    userDetail: userDetailRes,
    updateUserInfo: doUpdateProfileRes,
    accountInfoDetailRes:accountInfoDetailRes

});

function mapDispatchToProps(dispatch) {
    return {
        fetchdetail: (data) => dispatch(getUserDetail(data)),
        loadAccountInfoDetails: (data) => dispatch(getAccountInfoDetail(data)),

        
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AccountInformation);

// export default AccountInformation;