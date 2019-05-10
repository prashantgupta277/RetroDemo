import React from 'react';
import { submit_User } from '../../actions/userActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNotification} from '../../commonComponent/notificationbox/index';

import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";


const ADD_USER = gql`
mutation signupUser($companyId: ID!,$firstName: String!,$lastName: String!, $email: String!, $isCompanyAdmin: String!, $password: String!,){
    signupUser(companyId: $companyId, firstName:$firstName, lastName:$lastName, email: $email, isCompanyAdmin: $isCompanyAdmin, password:$password,){
   
    firstName
    lastName
    email
    companyId
    isCompanyAdmin

  }
}
`;

/* eslint-disable react/prefer-stateless-function */
class UserData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetail: [],
            companyList:[],
            firstName: '',
            lastName: '',
            email:'',
            password:'',
            confirmpassword:'',
            companyId:'',
            companyName: '',
            accountType: '',
            isCompanyAdmin:'',
            passwordValid: false
        }
    }

    componentWillMount(){

        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);

        if(userdata){
            this.setState({
                userDetail: userdata
            })
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
          console.log(nextProps)
           
        }
      }

    checkPassword(value){
        var regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
      
        if(regex.test(value)){
            this.setState({
                passwordValid:true
            })
        }else{
            this.setState({
                passwordValid:false
            })
        }
        this.setState({ password: value })
        
    } 


    render() {
        return (
            <React.Fragment>
                <div id="userList" className="infoCard adduser_content_box">
                    <div className="form-box-wrapper account-details-box">
                        <h4 className="add_user_page_title">Add user</h4>
                        <ApolloConsumer>
                            {client => (
                                <Mutation mutation={ADD_USER}  >
                                {(doUpdate, { error }) => {
                                    return (
                        <div className="form-box">
                            <div className="form-box-header">

                            </div>
                            <div className="form-box-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label htmlFor="first-name">First Name</label>
                                            <input type="text" placeholder="Ann Egg" id="first-name" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label htmlFor="last-name">Last Name</label>
                                            <input type="text" placeholder="Veal" id="last-name" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-feild-box">
                                    <label htmlFor="email">Your Email:</label>
                                    <input className="inputEmail" id="email" required type="email" onChange={(e) => this.setState({ email: e.target.value })} name="email" title="Email" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label >Your Password</label>
                                            <input className="input" type="password"   onChange={(e) => this.checkPassword( e.target.value)} name="password" title="Password" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label >Confirm Password</label>
                                            <input className="input" type="password" onChange={(e) => this.setState({ confirmpassword: e.target.value })} name="confirm_password" title="Password" required />
                                        </div>
                                    </div>
                                </div>
                                {!this.state.passwordValid && this.state.password &&<p style={{color: "#FF0000"}}> Please enter at least 8 characters long and use 1 uppercase 1 lowercase & 1 number </p>}
                                <div className="form-feild-box  form-phonenumber-feild-box">
                                    <label htmlFor="category4">Account Type</label>
                                    <div className="account-type-dropdown">
                                        <select id="saveteamplate" className="form-control minimal" value={this.state.isCompanyAdmin} onChange={(e) => this.setState({ isCompanyAdmin: e.target.value })}>
                                            <option value="" >Select Account Type</option>
                                            <option value="false" >Guest</option>
                                            <option value="true" >Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="ra">
                                    <p className="text-lg-grey">Retro Admins can create and run sprint retrospectives,as well as see their own retrospective history.</p>
                                </div>
                            </div>
                            <div className="form-box-footer">
                                <div className="buttons-box">
                                
                                    <button  type="button" className="saveChanges-btn" 
                                    onClick={
                                        async (e) => {
                                          e.preventDefault();
                                        
                                        if(this.state.firstName===""){
                                            createNotification("error","Please enter first name");
                                            return false;
                                        }
                                        if(this.state.lastName===""){
                                            createNotification("error","Please enter last name");
                                            return false;
                                        }
                                        if(this.state.email===""){
                                            createNotification("error","Please enter email address");
                                            return false;
                                        }
                                        console.log(this.state.email)
                                        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        if(!pattern.test(this.state.email)){
                                            createNotification("error","Invalid email address");
                                            return false;
                                        }
                                        if (this.state.password === "") {
                                            createNotification("error","Please enter password");
                                            return false;
                                        }
                                        if (this.state.confirmpassword === "") {
                                            createNotification("error","Please enter confirm  password");
                                            return false;
                                        }
                                        if (this.state.password !== this.state.confirmpassword) {
                                            createNotification("error","Password did not match");
                                            return false;
                                        }if (this.state.isCompanyAdmin === "") {
                                            createNotification("error","Please select account type");
                                            return false;
                                        }
                                        if(!this.state.passwordValid){
                                            createNotification("error","Please enter at least 8 characters long and use 1 uppercase 1 lowercase & 1 number");
                                            return false;
                                        }
                                       
                                        
                                  
                                          this.setState({
                                              loaderState:true
                                          })
                                          

                                        await client.mutate({
                                            mutation: ADD_USER,
                                            variables: { 
                                                  firstName: this.state.firstName ,
                                                  lastName: this.state.lastName ,
                                                  companyId: this.state.userDetail.companyId ,
                                                  isCompanyAdmin: this.state.isCompanyAdmin,
                                                  email:this.state.email,
                                                  password: this.state.password

                                              }
                                          }).then(({ data }) => {
                                            console.log(data)
                                            createNotification("success", "User Added Successfully")
                                              setTimeout(()=>{
                                                  this.setState({
                                                    loaderState:false,                                     
                                                  })
                                                  window.location.href="/users"
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
                                        
                                      } } > Invite users</button>
                                </div>
                            </div>
                        </div>
                         )  }}
                         </Mutation>
                         )}
                    </ApolloConsumer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = createStructuredSelector({
   
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submit_User(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserData);