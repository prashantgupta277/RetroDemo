import React, { Component } from 'react';

import './superadminaccountinformation.css';
import infoicon from './img/info_icon.png';
import SuperHeaderComponent from '../../commonComponent/superHeader';
import FooterComponent from './../../commonComponent/footer';

class SuperAdminAccountInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="scroll-assist" id="superadminaccountinformation-page-wrapper">
                
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
                                        <li className="active"><a href="/superadmin-account-information">Account Information</a></li>
                                        <li><a href="/superadmin-users">Users</a></li>
                                        <li><a href="/superadmin-retros">Retros</a></li>
                                        <li><a href="/superadmin-billing" className="billing-link">Billing</a></li>
                                    </ul>
                                    <div className="download-data-icon">
                                        <a href="#">Downlaod all Data</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row three-cols">
                                    <div className="col-md-4 pr-2px">
                                        <div className="one-col">
                                            <p>Users</p>
                                            <h1>32 <span>/100</span></h1>
                                            <p><b>Retro Admins</b></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 pl-2px pr-2px">
                                        <div className="one-col">
                                            <p>Retros</p>
                                            <h1>2933</h1>
                                            <p><b>Retrospectives to date</b></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 pl-2px">
                                        <div className="one-col">
                                            <p>Billing</p>
                                            <h1>$291.33</h1>
                                            <p><b><img src={infoicon} /><span className="red-text">Failed</span> on 11 Oct 2018</b></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-15px-imp">
                                    <div className="col-md-12 pl-pr-2-5px">
                                        <div className="form-box-wrapper account-details-box">
                                            <div className="form-box">
                                                <div className="form-box-header">
                                                    <h4>Account Details</h4>
                                                </div>
                                                <div className="form-box-body">
                                                    <div className="form-feild-box">
                                                        <label htmlFor="category1">Company Name</label>
                                                        <input type="text" placeholder="The Bluth Company" id="category1" />
                                                    </div>
                                                    <div className="form-feild-box">
                                                        <label htmlFor="category2">Address Line 1</label>
                                                        <input type="text" placeholder="2 Wall Street" id="category2" />
                                                    </div>
                                                    <div className="form-feild-box">
                                                        <label htmlFor="category3">Address Line 2</label>
                                                        <input type="text" placeholder="4th Floor" id="category3" />
                                                    </div>
                                                    <div className="form-three-feild-box">
                                                        <div className="form-feild-box form-city-feild-box">
                                                            <label htmlFor="city">City</label>
                                                            <input type="text" placeholder="New York" id="city" />
                                                        </div>
                                                        <div className="form-feild-box form-state-feild-box">
                                                            <label htmlFor="state">State</label>
                                                            <select id="state">
                                                                <option>NY</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-feild-box form-zipcode-feild-box">
                                                            <label htmlFor="zipcode">Zip Code</label>
                                                            <input type="text" placeholder="10011" id="zipcode" />
                                                        </div>
                                                    </div>
                                                    <div className="form-feild-box  form-phonenumber-feild-box">
                                                        <label htmlFor="category4">Phone Number</label>
                                                        <input type="text" placeholder="212-333-3333" id="category4" />
                                                    </div>
                                                </div>
                                                <div className="form-box-footer">
                                                    <div className="buttons-box">
                                                        <button type="button" className="saveChanges-btn">Save Changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-15px-imp">
                                    <div className="col-md-12 striphh">
                                        {/*
                                        <!-- Account Details -->*/}

                                        <div className="striph1">
                                            <div className="projects1">
                                                Projects
                                            </div>
                                            <div className="tab table-responsive">
                                                <table className="table table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="down_arrow">Project Name</th>
                                                            <td scope="col">Created By</td>
                                                            <td scope="col">Date Added</td>
                                                            <td scope="col"># of Retros</td>
                                                            <td scope="col">Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
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
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Turner // All Projects</td>
                                                            <td>Ann veal</td>
                                                            <td>June 11th, 2018 2:15 PM</td>
                                                            <td>14</td>
                                                            <td></td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="pagination">
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination">
                                                        <li className="page-item">
                                                            <a className="page-link" href="#" aria-label="Previous">
                                                                <span aria-hidden="true">&laquo;</span>
                                                                <span className="sr-only">Previous</span>
                                                            </a>
                                                        </li>
                                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
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

                                <div className="row">
                                    <div className="col-md-12 pl-pr-2-5px">
                                        <div className="form-box-wrapper disable-account">
                                            <div className="form-box">
                                                <div className="form-box-header">
                                                    <h4>Disable Account</h4>
                                                </div>
                                                <div className="form-box-body">
                                                    <p>Accounts that have been disabled will disable all their associated users, and they will no longer be able to access their retross.</p>
                                                </div>
                                                <div className="form-box-footer">
                                                    <div className="buttons-box super-admin-accountinfo-buttons-box">
                                                        <button type="button" className="disableaccount-btn">Disable Account</button>
                                                        <button type="button" className="deleteaccount-btn">Delete Account</button>
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

                <FooterComponent />
               
            </div>
        );
    };
};
export default SuperAdminAccountInformation;