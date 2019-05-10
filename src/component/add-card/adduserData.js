import React from 'react';
import { submit_User } from '../../actions/userActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import {fetch_CompanyList, getCompanyRes} from '../../actions/loginActions';
import { createNotification} from '../../commonComponent/notificationbox/index';

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
            accountType: ''
        }
    }

    componentWillMount(){
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
          console.log(nextProps)
            
        }
      }

    AddUser() {
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(this.state.email).toLowerCase())) {
            if (this.state.password === this.state.confirmpassword) {
                let sendRequest={
                    "operationName":null,
                    "variables":{},
                    "query":"mutation {\n  signupUser(firstName: \"" + this.state.firstName + "\", lastName: \"" + this.state.lastName + "\", email: \"" + this.state.email + "\", password: \"" + this.state.password + "\", companyId: \"" + userdata.companyId + "\", accountType: \"" + this.state.accountType + "\") {\n    id\n    firstName\n    lastName\n    email\n    companyId\n    isCompanyAdmin\n  }\n}\n"
                }
                console.log(sendRequest)
                this.props.handleFormSubmit(sendRequest)
            }else {
                this.setState({ loaderState: false })
                createNotification("error","Password did not match");
            }
        }else {
            this.setState({ loaderState: false })
            createNotification("error","Invalid email address");
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="userList" className="infoCard adduser_content_box">
                    <div className="form-box-wrapper account-details-box">
                        <h4 className="add_user_page_title">Add user</h4>
                        <div className="form-box">
                            <div className="form-box-header">

                            </div>
                            <div className="form-box-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label htmlFor="first-name">First-Name</label>
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
                                            <input className="input" type="password" onChange={(e) => this.setState({ password: e.target.value })} name="password" title="Password" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label >Confirm Password</label>
                                            <input className="input" type="password" onChange={(e) => this.setState({ confirmpassword: e.target.value })} name="confirm_password" title="Password" required />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="form-feild-box">
                                    <label htmlFor="category1">Company Name</label>
                                    <div className="account-type-dropdown">
                                        <select onChange={(e) => this.setState({ companyId: e.target.value })}id="saveteamplate" className="form-control minimal" >
                                            <option value="">Select Company</option>
                                            {this.state.companyList && this.state.companyList.length > 0 && this.state.companyList.map((item, index) => {
                                                return <option value={item.id} key={index}>{item.companyName}</option>
                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className="mail">
                                        <p className="text-lg-grey">User will need to verify their mail</p>
                                    </div>
                                </div> */}
                                <div className="form-feild-box  form-phonenumber-feild-box">
                                    <label htmlFor="category4">Account Type</label>
                                    <div className="account-type-dropdown">
                                        <select id="saveteamplate" className="form-control minimal" value={this.state.accountType} onChange={(e) => this.setState({ accountType: e.target.value })}>
                                            <option value="User" >User</option>

                                        </select>
                                        {/* <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Retro Admin
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Action</a>
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                                <div className="ra">
                                    <p className="text-lg-grey">Retro Admins can create and run sprint retrospectives,as well as see their own retrospective history.</p>
                                </div>
                            </div>
                            <div className="form-box-footer">
                                <div className="buttons-box">
                                    <button onClick={() => this.AddUser()} type="button" className="saveChanges-btn">Invite users</button>
                                </div>
                            </div>
                        </div>
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