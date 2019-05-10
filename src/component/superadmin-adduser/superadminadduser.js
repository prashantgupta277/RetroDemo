import React, { Component } from 'react';
import './superadminadduser.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';

class SuperAdminAdduser extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="scroll-assist" id="superadminadduser-page-wrapper">
               
                <SuperHeaderComponent />

                <div className="container-fluid">
                    <div className="maxWidth-1260px mt-0">
                        <div className="col-md-12 text-left">
                            <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                                <li><a href="/allaccounts">Accounts</a></li>
                                <li><a href="/superadmin-account-information" className="breadcrumb-current">The Bluth Company</a></li>
                            </ol>
                        </div>
                        <div className="row">
                            {/* Left Side Bar */}
                            <div className="col-md-3 pl-2-5px">
                                <div className="comapanyadmin-left-sidebar">
                                    <h4 className="company-name">The Bluth Company</h4>
                                    <ul className="nav-links">
                                        <li><a href="/superadmin-account-information">Account Information</a></li>
                                        <li className="active"><a href="/superadmin-users">Users</a></li>
                                        <li><a href="/superadmin-retros">Retros</a></li>
                                        <li><a href="/superadmin-billing" className="billing-link">Billing</a></li>
                                    </ul>
                                    <div className="download-data-icon">
                                        <a href="#">Downlaod all Data</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-12 pl-pr-2-5px">
                                        <div className="form-box-wrapper account-details-box">
                                            <div className="form-box">
                                                <div className="form-box-header">
                                                    <h4>Add user</h4>
                                                </div>
                                                <div className="form-box-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-feild-box">
                                                                <label htmlFor="first-name">First-Name</label>
                                                                <input type="text" placeholder="Ann Egg" id="first-name" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-feild-box">
                                                                <label htmlFor="last-name">Last Name</label>
                                                                <input type="text" placeholder="Veal" id="last-name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-feild-box">
                                                        <label htmlFor="category1">Company Name</label>
                                                        <input type="text" placeholder="The Bluth Company" id="category1" />
                                                        <div className="mail">
                                                            <p>User will need to verify their mail</p>
                                                        </div>
                                                    </div>
                                                    <div className="form-feild-box  form-phonenumber-feild-box">
                                                        <label htmlFor="category4">Account Type</label>
                                                        <div className="account-type-dropdown">
                                                            <div className="dropdown">
                                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Retro Admin
                                                            </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ra">
                                                        <p>Retro Admins can create and run sprint retrospectives,as well as see their own retrospective history.</p>
                                                    </div>
                                                </div>
                                                <div className="form-box-footer">
                                                    <div className="buttons-box">
                                                        <button type="button" className="saveChanges-btn">Invite users</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
export default SuperAdminAdduser;