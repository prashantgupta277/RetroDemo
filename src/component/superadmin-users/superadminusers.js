import React, { Component } from 'react';
import './superadminusers.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';

class SuperAdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="scroll-assist" id="superadminusers-page-wrapper">
               
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
                                    <div className="col-md-3 stripcc pr-2px"> {/* */}
                                        <div className="stripc mt-0px">
                                            <div className="count1"> 2</div>
                                            <div className="user4"> Company Admins</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc pl-2px pr-2px"> {/* */}
                                        <div className="stripd mt-0px">
                                            <div className="count1"> 24</div>
                                            <div className="user4"> Retro Admins</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc pl-2px pr-2px"> {/* */}
                                        <div className="stripe mt-0px">
                                            <div className="count1"> 193</div>
                                            <div className="user4"> Registered Attendees</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc pl-2px"> {/* */}
                                        <div className="stripg mt-0px">
                                            <div className="count1"> 124</div>
                                            <div className="user4"> Guest Users</div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 striphh"> {/* */}
                                        <div className="striph">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="acuser"> Users <span className="box392">392</span> <span className="t32">32/100</span> <span className="radmin">Retro Admin</span> <span className="upgrade"><a href="/superadmin-billing" className="upgrade">Upgrade</a></span></p>
                                                </div>
                                                <div className="col-md-3">
                                                    <p className="hide">
                                                        <input type="checkbox" name="vehicle1" value="Hide Archived" id="hide-archived" className="styled-checkbox hide-checkbox" />
                                                        <label htmlFor="hide-archived"></label> Hide Archived

                                                    </p>
                                                    <p className="hide">
                                                        <input type="checkbox" name="vehicle1" value="Hide Guest" id="hide-guest" className="styled-checkbox hide-checkbox" />
                                                        <label htmlFor="hide-guest"></label> Hide Guest
                                                    </p>
                                                </div>
                                                <div className="col-md-3">
                                                    
                                                    <a href="/superadmin-adduser" className="adduser"><i className="fa fa-plus"></i> Add User</a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="search">
                                                        <input type="text" placeholder="Search Users" className="search-field" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab">
                                                <table className="table table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="down_arrow">User Name</th>
                                                            <td scope="col"> Email</td>
                                                            <td scope="col"> User Role</td>
                                                            <td scope="col"> Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td scope="row"> Ann Egg Veal</td>
                                                            <td> ann.veal@thebluthcompany.com</td>
                                                            <td> Retro Admin</td>
                                                            <td> Active</td>
                                                            <td className="actions-dropdown">
                                                                <div className="dropdown">
                                                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        Actions
                                                                    </button>
                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <a className="dropdown-item" href="/superadmin-edituser">Edit</a>
                                                                        <a className="dropdown-item" href="#">Archive</a>
                                                                        <a className="dropdown-item" href="#">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row"> Ann Egg Veal</td>
                                                            <td> ann.veal@thebluthcompany.com</td>
                                                            <td> Retro Admin</td>
                                                            <td> Active</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row"> Ann Egg Veal</td>
                                                            <td> ann.veal@thebluthcompany.com</td>
                                                            <td> Retro Admin</td>
                                                            <td> Active</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row"> Ann Egg Veal</td>
                                                            <td> ann.veal@thebluthcompany.com</td>
                                                            <td> Retro Admin</td>
                                                            <td> Active</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row"> Ann Egg Veal</td>
                                                            <td> ann.veal@thebluthcompany.com</td>
                                                            <td> Retro Admin</td>
                                                            <td> Active</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row"> Ann Egg Veal</td>
                                                            <td> ann.veal@thebluthcompany.com</td>
                                                            <td> Retro Admin</td>
                                                            <td> Active</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row"> Ann Egg Veal</td>
                                                            <td> ann.veal@thebluthcompany.com</td>
                                                            <td> Retro Admin</td>
                                                            <td> Active</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row"> Ann Egg Veal</td>
                                                            <td> ann.veal@thebluthcompany.com</td>
                                                            <td> Retro Admin</td>
                                                            <td> Active</td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="pagination">
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination">
                                                        <li className="page-item">
                                                            <a className="page-link" href="#" aria-label="Previous"> <span aria-hidden="true">&laquo;</span> <span className="sr-only">Previous</span> </a>
                                                        </li>
                                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                        <li className="page-item">
                                                            <a className="page-link" href="#" aria-label="Next"> <span aria-hidden="true">&raquo;</span> <span className="sr-only">Next</span> </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SuperAdminUsers;