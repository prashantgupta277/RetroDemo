import React, { Component } from 'react';

import './superadminedituser.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';

class SuperAdminEditAdduser extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="scroll-assist" id="superadminedituser-page-wrapper">
               
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
                                <div className="row mb-3">
                                    <div className="col-md-12 pl-pr-2-5px">
                                        <div className="form-box-wrapper account-details-box">
                                            <div className="form-box">
                                                <div className="form-box-header">
                                                    <h4>Edit user</h4>
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
                                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Retro Admin</button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Retro Admin</a>
                                                                    <a className="dropdown-item" href="#">Retro Admin</a>
                                                                    <a className="dropdown-item" href="#">Retro Admin</a>
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

                                <div className="row mb-3">
                                    <div className="col-md-12 pl-pr-2-5px">
                                        <div className="edit-user-page-retros pad-25px-imp">
                                            <div className="edit-user-page-retros-header">
                                                <h4 className="text-db-blue">Ann Egg's Retros</h4>
                                            </div>
                                            <div className="edit-user-page-retros-body">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <td><b className="down_arrow date-time-text w-135 d-ib">Date &amp; Time</b></td>
                                                                <td>Retro Admin</td>
                                                                <td>Project Name</td>
                                                                <td>Sprint</td>
                                                                <td>Action</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="bg-dark-orange">
                                                                <td colSpan="5" className="upcoming-text">Upcoming</td>
                                                            </tr>
                                                            <tr className="bg-light-orange">
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td><a href="/superadmin-editretro"><i className="fa fa-pencil-alt"></i></a></td>
                                                            </tr>
                                                            <tr className="bg-light-orange">
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td><a href="/superadmin-editretro"><i className="fa fa-pencil-alt"></i></a></td>
                                                            </tr>
                                                            <tr className="bg-light-orange">
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td><a href="/superadmin-editretro"><i className="fa fa-pencil-alt"></i></a></td>
                                                            </tr>
                                                            <tr className="bg-light-orange">
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td><a href="/superadmin-editretro"><i className="fa fa-pencil-alt"></i></a></td>
                                                            </tr>
                                                            <tr>
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td width="100" className="actions-dropdown">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            Actions
                                                                    </button>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                            <a className="dropdown-item" href="#">Edit</a>
                                                                            <a className="dropdown-item" href="#">Archive</a>
                                                                            <a className="dropdown-item" href="#">Delete</a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="edit-user-page-retros-foot">
                                                <nav aria-label="edit-user-page-retros-foot-inner navigation">
                                                    <ul className="pagination">
                                                        
                                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                                                        <li className="page-item">
                                                            <a className="page-link" href="#" aria-label="Next">
                                                                <span aria-hidden="true">&raquo;</span>
                                                                <span className="sr-only">Next</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row mt-15px">
                                    <div className="col-md-12 pl-pr-2-5px">
                                        <div className="form-box-wrapper disable-account">
                                            <div className="form-box">
                                                <div className="form-box-header mb-1">
                                                    <h4>Disable Account</h4>
                                                </div>
                                                <div className="form-box-body">
                                                    <p className="text-lg-grey">Accounts that have been disabled will disable all their associated users, and they will no longer be able to access their retross.</p>
                                                </div>
                                                <div className="form-box-footer">
                                                    <div className="buttons-box super-admin-accountinfo-buttons-box">
                                                        <button type="button" className="disableaccount-btn">Archive User</button>
                                                        <button type="button" className="deleteaccount-btn">Delete User</button>
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
export default SuperAdminEditAdduser;