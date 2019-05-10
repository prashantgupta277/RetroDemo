import React from 'react';
import './header.css';
import { Link } from "react-router-dom";
import logo from './img/retro-logo.png';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-responsive-modal';
import {  graphql, Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { createNotification } from './../commonComponent/notificationbox/index';
import $ from 'jquery';
import { doLoginRes, doLoginError, doRegisterRes } from './../actions/loginActions';


const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password:$password) {
      email
      id
      lastName
      firstName
      password
      isCompanyAdmin
      companyId
      isGuest
      company{
        id
        companyName
      }
    }
  }
`;

const SIGNUP_USER = gql`
mutation signupUser($email: String!, $password: String!,$firstName: String!,$lastName: String!, $accountType: String!, $userType: String!, $companyName: String!, $companyId: ID!){
  signupUser(email: $email, password:$password, firstName: $firstName, lastName: $lastName, accountType:$accountType, userType:$userType, companyName:$companyName, companyId:$companyId){
  email
  id
  firstName
  lastName
  password
  companyId
  accountType
  isCompanyAdmin
  isGuest
  company{
    id
    companyName
  }
  }
}
`;

const fetchAllCompanies = gql`
  query{
    fetchAllCompanies{
      id
      companyName
  }}
`
class MainHeaderComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            joinretro: false,
            show: false,
            join: false,
            login: false,
            signupUser:false,
            email: '',
            password: '',
            createuseremail: '',
            createaccountfirstname: '',
            createaccountsecondname: '',
            createaccountpassword: '',
            createaccountconfirmpassword: '',
            businessUser: '',
            profession: '',
            userType: '',
            accountType: '',
            companyId: '',
            companyName: '',
            skills: [],
            status: '',
            checkstatus: false,
            signupError: false,
            signinError: false,
            loaderState: false,
            openlogin: false,
            openRegister: false,
            isType: "",
            companyList:[],
            roomcode:'',
            isCompanyAdmin: false,
            activeClass:"retroJoin",
            passwordValid:false
        }

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onOpenRegisterModal = this.onOpenRegisterModal.bind(this);
    }



    componentWillMount() {
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        console.log(userdata)
    

        if(userdata){
          if(userdata.isCompanyAdmin=="true"){
              this.setState({
                isCompanyAdmin: true
              })
          }

        }
        this.setState({ userinfo: userdata })
       
            
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
          console.log(nextProps)

          if(nextProps.data){
            if(nextProps.data && nextProps.data.fetchAllCompanies){
              this.setState({
                companyList:nextProps.data.fetchAllCompanies
              })
            }
            if(nextProps.data && nextProps.data.error){
              createNotification('error',nextProps.data.error);
            }            
          }
          if (this.state.isType == "Signup") {
            console.log(nextProps)
            if (nextProps.registerInfo && nextProps.registerInfo.user.user) {
              localStorage.setItem('logindata', JSON.stringify(nextProps.registerInfo.user.user.signupUser));
              createNotification('success', "Register Successfully");
                let res=nextProps.registerInfo.user.user.signupUser;
                console.log(res)
                if(res.isCompanyAdmin==="true"){
                    window.location.href='/billing';
                }else{
                    window.location.href='/myretro';             
                }    
            }else{
              this.setState({ loaderState: false })
              createNotification('error', nextProps.userInfo.user.user.errors[0].message);
            }
          
          }
    
          if (this.state.isType == "Login") {
            if (nextProps.userInfo && nextProps.userInfo.user.user) {
                localStorage.setItem('logindata', JSON.stringify(nextProps.userInfo.user.user.login));
                createNotification('success', "Login Successfully");
                  let res=nextProps.registerInfo.user.user.login;
                  console.log(res)
                  console.log(res.isCompanyAdmin)
                  if(res.isCompanyAdmin==="true"){
                      window.location.href='/billing';
                  }else{
                      window.location.href='/myretro';             
                  }    
              }else{
                this.setState({ loaderState: false })
                createNotification('error', nextProps.userInfo.user.user.errors[0].message);
              }
    
            }
        }
    
    }
    
    
    
      onCloseModal = () => {
        this.setState({ openlogin: false });
      };
    
      onCloseRegisterModal = () => {
        this.setState({ openRegister: false });
      };
    
  

    logout() {
        localStorage.clear();
        window.location.href = "/"
    }

    onOpenModal() {
        this.setState({
          openRegister: false,
          openlogin: true
        });
      };
    
      onOpenRegisterModal() {
        this.setState({
          openlogin: false,
          openRegister: true
        });
      };

      scrollPrice(){
        this.setState({
          activeClass: "planspricing"
        })
        $('html, body').animate({
            scrollTop: $("#planspricing").offset().top
        }, 1000);
      }
      scrollFeature(){
        this.setState({
          activeClass: "features"
        })
        $('html, body').animate({
            scrollTop: $("#features").offset().top
        }, 1000);
      }

      scrollRetro(){
        this.setState({
          activeClass: "retroJoin"
        })
        $('html, body').animate({
            scrollTop: $("#retroJoin").offset().top
        }, 1000);
      }

      scrollBeeta(){
        this.setState({
          activeClass: "get-the-beta"
        })
        $('html, body').animate({
            scrollTop: $("#get-the-beta").offset().top
        }, 1000);
      }


      
    
      checkPassword(value){
        var regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
          // regex.test(value)
          // console.log(regex.test(value))
          if(regex.test(value)){
            this.setState({
              passwordValid:true
            })
          }else{
            this.setState({
              passwordValid:false
            })
            console.log("False")
          }
          this.setState({ createaccountpassword: value,password:value, signupError: false })
        
      } 


    render() {
        const { email, password,createaccountsecondname, createaccountconfirmpassword, createaccountfirstname, createuseremail, createaccountpassword, status,passwordValid} = this.state;
        const isValid = email === '' || password === '';
        const isValid2 = createaccountfirstname==='' || createaccountsecondname==='' || status === '' || createaccountconfirmpassword === '' || createaccountfirstname === '' || createuseremail === '' || createaccountconfirmpassword === '' || createaccountpassword === '' || passwordValid===false;
      
      
        return (
            <React.Fragment>

               

              
                <div id="mainheader">
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                  <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light bg-header sticky" style={{ backgroundColor: '#ffffffde !important' }}>
                <Link className="navbar-brand" to="/"> <img src={logo} alt="Retro" /> </Link> 

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                    <li   className={"nav-item   " + (this.state.activeClass=="retroJoin" ? 'active' : '')} >
                        <a className="nav-link handPointer" onClick={()=>this.scrollRetro()}>Join/Create <span className="sr-only">(current)</span></a>
                    </li>
                    <li  className={"nav-item   " + (this.state.activeClass=="features" ? 'active' : '')}>
                        <a className="nav-link handPointer" onClick={()=>this.scrollFeature()}>Features</a>
                    </li>
                    <li className={"nav-item   " + (this.state.activeClass=="get-the-beta" ? 'active' : '')}>
                        <a className="nav-link handPointer" onClick={()=>this.scrollBeeta()}>Get the Beta</a>
                    </li>
                    <li   className={"nav-item   " + (this.state.activeClass=="planspricing" ? 'active' : '')}>
                        <a className="nav-link handPointer" onClick={()=>this.scrollPrice()}>Plans &amp; Pricing</a>
                    </li>
                    <li   className="nav-item   " >
                        <button onClick={() => this.onOpenModal()} className="btn btn-md btn-filled hidden-xs hidden-sm hidden-md btn-rounded nav-link "  >
                        <b>Log In</b> / Sign Up
                        </button>
                    </li>
                    </ul>
                </div>
                </nav>
            
            {/* Login Modal */}
            <Modal open={this.state.openlogin} onClose={this.onCloseModal} center>
              {/* <div className="modal fade"> */}
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.onCloseModal()}>
                      <span aria-hidden="true" ref={this.crossBtn}>&times;</span>
                    </button>
                    <h5 className="modal-title" id="exampleModalLabel">
                      <span>New to Retro App?</span><br />
                      <a onClick={this.onOpenRegisterModal}>Create Account</a>
                    </h5>
                  </div>
                  <div className="modal-body">
                  <ApolloConsumer>
                  {client => (
                    <Mutation mutation={LOGIN_USER}  >
                      {(loginDo, { error }) => {
                        // this loading state will probably never show, but it's helpful to
                        // have for testing
                        // console.log(error)
                        return (
                          <div>
                            <h4 className="content-heading2">To create a  retro for your team</h4>
                            <h4 className="content-heading"><strong>Please log in:</strong></h4>
                            <div id="loginForm">
                              <div className="row">
                                <div className="col-md-4"><label>Your Email:</label></div>
                                <div className="col-md-8">
                                  <input type="email" name="email" title="Email" required onChange={(e) => this.setState({ email: e.target.value, signinError: false })} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4"><label>Your Password:<br /><span><a >Requirements</a></span></label></div>
                                <div className="col-md-8">
                                  <input type="password" onChange={(e) => this.setState({ password: e.target.value, signinError: false })} name="password" title="Password" required />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-8">
                                    <button  className="btn btn-default btn-orange btn-submit" disabled={isValid} onClick={
                                    async (e) => {
                                      e.preventDefault();
                                      console.log(this.state);
                                      if (this.state.email === "") {
                                        createNotification("error","Please Enter email")
                                        return false;
                                      }if (this.state.password === "") {
                                        createNotification("error","Please Enter password")
                                        return false;
                                      }
                                      this.setState({
                                        loaderState:true,
                                        isType: 'Login'
                                      })
                                     await client.mutate({
                                        mutation: LOGIN_USER,
                                        variables: { email: this.state.email ,password : this.state.password }
                                      }).then(({ data }) => {
                                          this.setState({
                                            loaderState:false,                                            
                                          })
                                          localStorage.setItem('auth_token',"byugyug/feiufjeuij");
                                          this.props.doLoginRes(data)
                                          alert("Login")
                                        })
                                        .catch(({ graphQLErrors }) => {                                       
                                          if(graphQLErrors){
                                            createNotification("error",graphQLErrors[0].message)
                                            this.setState({
                                              loaderState:false
                                            })
                                          }
                                          
                                        })
                                     
                                  } }> Log In</button>
                                </div>
                                <p className={this.state.signinError ? "showError" : "hideError"}>{this.state.signinError}</p>
                              </div>
                            </div>
                          </div>
                        )
                      }}
                      </Mutation>
                    )}
                  </ApolloConsumer>
                  </div>
                </div>
              </div>
              {/* </div> */}
             
            </Modal>

            {/* register Modal */}
            <Modal open={this.state.openRegister} onClose={this.onCloseRegisterModal} center>
            
               <div id="registerModal" >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" aria-label="Close" onClick={() => this.onCloseRegisterModal()}>
                        <span aria-hidden="true" ref={this.crossBtnUp}>&times;</span>
                      </button>
                      <h5 className="modal-title" id="exampleModalLabel">
                        <span>Already have an account?</span><br />
                        <a onClick={() => this.onOpenModal()}>Login</a>
                      </h5>
                    </div>
                    <div className="modal-body">
                      <ApolloConsumer>
                      {client => (
                        <Mutation 
                          mutation={SIGNUP_USER} 
                        >
                          {(DoRegister, { error }) => {
                            return (
                              <div>
                                <h4 className="content-heading">To Create an account,<br />
                                <b>tell us about yourself:</b></h4>
                                <div id="registerForm">
                                  <div className="row">
                                    <div className="col-md-3"><label>Your Name:</label></div>
                                    <div className="col-md-9">
                                      <div className="row mb-0">
                                        <div className="col-md-6">
                                          <input className="input" type="text" name="firstName" onChange={(e) => this.setState({ createaccountfirstname: e.target.value, signupError: false })}
                                            title="First Name" placeholder="First Name" required />
                                        </div>
                                        <div className="col-md-6">
                                          <input className="input" type="text" name="lastName" onChange={(e) => this.setState({ createaccountsecondname: e.target.value, signupError: false })}
                                            title="Last Name" placeholder="Last Name" required />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-3"><label>Your Email:</label></div>
                                    <div className="col-md-9">
                                      <input className="input" required type="email" onChange={(e) => this.setState({ createuseremail: e.target.value, signupError: false })} name="email" title="Email" />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-3"><label>Your Password:<br /><span><a>Requirements</a></span></label></div>
                                    <div className="col-md-9">
                                      <div className="row mb-0">
                                        <div className="col-md-6">
                                          <input className="input" type="password" onChange={(e) => this.checkPassword( e.target.value)} name="password" title="Password" required />
                                        </div>
                                        <div className="col-md-6">
                                          <input className="input" type="password"  onChange={(e) => this.setState({ createaccountconfirmpassword: e.target.value, signupError: false })} name="confirm_password" title="Password" required />
                                        </div>
                                      </div>
                                      {!this.state.passwordValid && this.state.createaccountpassword &&<p style={{color: "#FF0000"}}> Please enter at least 8 characters long and use 1 uppercase 1 lowercase & 1 number </p>}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-3"><label>I'm a:</label></div>
                                    <div className="col-md-9">
                                      <ul>
                                        <li> <input type="checkbox" className="checkbox" checked={this.state.checkstatus === 1 ? true : false} onClick={() => this.setState({ checkstatus: 1, status: "Bussiness_Owner" ,userType:"Bussiness_Owner"})} value="Bussiness_Owner" />  Business User</li>
                                        {this.state.checkstatus && this.state.checkstatus === 1 &&
                                          <div style={{marginBottom: "11px"}}>
                                            <input className="input" type="text" placeholder="Enter Company Name" onChange={(e) => this.setState({ companyName: e.target.value })} required />
                                          </div>
                                        }
          
                                        <li> <input type="checkbox" className="checkbox" checked={this.state.checkstatus === 2 ? true : false} onClick={() => this.setState({ checkstatus: 2, status: "Freelance" ,userType:"Freelance"})} name="profession" value="Freelance" />  Freelance Professional</li>
                                        {this.state.checkstatus && this.state.checkstatus === 2 &&
                                          <div style={{marginBottom: "11px"}}>
                                            <input className="input" type="text" placeholder="Enter Company Name" onChange={(e) => this.setState({ companyName: e.target.value })} required />
                                          </div>
                                        }
          
                                        <li> <input type="checkbox" className="checkbox" checked={this.state.checkstatus === 3 ? true : false} onClick={() => this.setState({ checkstatus: 3, status: "As User" ,userType:"As User"})} value="As User" />  As User</li>
                                        {this.state.checkstatus && this.state.checkstatus === 3 &&
                                          <div style={{marginBottom: "11px"}}>
          
                                            {/* <input className="input" type="text" placeholder="Enter Name" onClick={(e) => this.setState({ companyName: e.target.value })} required /> */}
          
          
                                            <select onChange={(e) => this.setState({ companyId: e.target.value })}id="saveteamplate" className="form-control minimal" >
                                              <option value="">Select Company</option>
                                              {this.state.companyList && this.state.companyList.length > 0 && this.state.companyList.map((item, index) => {
                                                  return <option value={item.id} key={index}>{item.companyName}</option>
                                              })
                                              }
                                            </select>
          
                                          </div>
                                        }
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-9">
                                        <button disabled={isValid2}  className="btn btn-default btn-orange btn-submit" onClick={
                                          async (e) => {
                                            e.preventDefault();
                                            console.log(this.state);
                                            if(this.state.createaccountfirstname === ""){
                                              createNotification("error","Please Enter FirstName")
                                              return false;
                                            }
                                            if(this.state.createaccountsecondname === ""){
                                              createNotification("error","Please Enter lastName")
                                              return false;
                                            }
                                            if(this.state.createuseremail === ""){
                                              createNotification("error","Please Enter email")
                                              return false;
                                            }
                                            var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                            if(!pattern.test(this.state.createuseremail)){
                                                createNotification("error","Invalid email address");
                                                return false;
                                            }
                                            if (this.state.createaccountpassword === "") {
                                              createNotification("error","Please Enter password")
                                              return false;
                                            }
                                            if (this.state.createaccountconfirmpassword === "") {
                                              createNotification("error","Please Re-Enter password")
                                              return false;
                                            }
                                            if (this.state.createaccountpassword !== this.state.createaccountconfirmpassword) {
                                              this.setState({ signupError: "Password did not match" })
                                              createNotification("error","Password did not match")
                                              return false;
                                            }
                                            if (this.state.checkstatus === false) {
                                              createNotification("error","Please Select User Type")
                                              return false;
                                            }
                                            if (this.state.checkstatus === 1 ){
                                              console.log(this.state.checkstatus)
                                              if(this.state.companyName === ''){
                                                this.setState({ signupError: "Company Name is Required" })
                                                return false;
                                              }
                                            }
                                            if (this.state.checkstatus === 2){
                                              console.log(this.state.checkstatus)
                                              if(this.state.companyName === ''){
                                                this.setState({ signupError: "Enter Company Name is Required" })
                                                return false;
                                              
                                              }
                                            }
                                            if (this.state.checkstatus === 3){
                                              console.log(this.state.checkstatus)
                                              if(this.state.companyId === ''){
                                  
                                                this.setState({ signupError: "Select Company Name is Required" })
                                                return false;
                                              }
                                            }
                                            this.setState({
                                              loaderState:true,
                                              isType: 'Signup'
                                            })
                                          await client.mutate({
                                              mutation: SIGNUP_USER,
                                              variables: { email: this.state.createuseremail ,password : this.state.createaccountpassword,firstName: this.state.createaccountfirstname, lastName: this.state.createaccountsecondname, userStatus: this.state.userStatus, accountType: this.state.accountType, userType: this.state.userType, companyName: this.state.companyName, companyId: this.state.companyId}
                                            }).then(({ data }) => {
                                              console.log(data)
                                                this.setState({
                                                  loaderState:false,                                            
                                                })
                                                this.props.doRegisterRes(data)
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
                                          
                                        } }> Create Account</button>
                                    </div>
                                    <p className={this.state.signupError ? "showError" : "hideError"}>{this.state.signupError}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          }}
                          </Mutation>
                        )}
                      </ApolloConsumer>
                    </div>
                  </div>
                </div>
              </div>
          </Modal>
           
          </div>
            </React.Fragment>
        );
    }
}

MainHeaderComponent.propTypes = {
    userInfo: PropTypes.any,
    registerInfo: PropTypes.any,
    errorLoginInfo: PropTypes.any,
  
  };
  
  const mapStateToProps = createStructuredSelector({
    userInfo: doLoginRes,
    registerInfo: doRegisterRes,
    errorLoginInfo: doLoginError,
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      doLoginRes: (data) => dispatch(doLoginRes(data)),
      doRegisterRes: (data) => dispatch(doRegisterRes(data)),
    };
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  // export default compose(withConnect)(MainHeaderComponent);

  export default compose(withConnect,
    graphql(fetchAllCompanies, {
      options: (props) => ({ variables: {  } })
    }),
  )(MainHeaderComponent);


