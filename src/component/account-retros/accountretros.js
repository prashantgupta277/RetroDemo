import React, { Component } from 'react';
import './accountretros.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';


class accountretros extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="scroll-assist" id="accountretros-page-wrapper">
                
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
                                        <li><a href="/superadmin-users">Users</a></li>
                                        <li className="active"><a href="/superadmin-retros">Retros</a></li>
                                        <li><a href="/superadmin-billing" className="billing-link">Billing</a></li>
                                    </ul>
                                    <div className="download-data-icon">
                                        <a>Downlaod all Data</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row mb-15px">
                                    <div className="col-md-3 stripcc pr-2px"> {/* */}
                                        <div className="stripc mt-0px ac">
                                            <div className="count2"> 300</div>
                                            <div className="user4"> Retros Created</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc pl-2px pr-2px"> {/* */}
                                        <div className="stripd mt-0px ac">
                                            <div className="count2"> 263</div>
                                            <div className="user4"> Completed Retros</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc pl-2px pr-2px"> {/* */}
                                        <div className="stripe mt-0px ac">
                                            <div className="count2"> 37</div>
                                            <div className="user4"> Scheduled Retros</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc pl-2px"> {/* */}
                                        <div className="stripg mt-0px ac">
                                            <div className="count2"> 19</div>
                                            <div className="user4"> Avg. Retros per Week</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="row ml-0 mr-0">
                                        <div className="col-md-12 bg-white pad-25px-imp mb-3">
                                            <div className="section-header">
                                                <div className="section-title">
                                                    <h4>All Retros</h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label className="db width-100 mb-0">Retro Admin</label>
                                                    <div className="limit-type-dropdown db width-100">
                                                        <div className="dropdown width-100">
                                                            <button className="btn btn-secondary dropdown-toggle width-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                All Users
                                                            </button>
                                                            <div className="dropdown-menu width-100" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item">New Users</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="db width-100 mb-0">Project</label>
                                                    <div className="limit-type-dropdown width-100">
                                                        <div className="dropdown width-100">
                                                            <button className="btn btn-secondary dropdown-toggle width-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                All Projects
                                                            </button>
                                                            <div className="dropdown-menu width-100" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item" href="#">New Projects</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="cst-checkbox-wrapper">
                                                        <input type="checkbox" name="show-history" value="Show History" id="show-history" className="styled-checkbox hide-checkbox mb-0" />
                                                        <label htmlFor="show-history"> <b>Show History</b></label>
                                                    </div>
                                                    <div className="cst-checkbox-wrapper">
                                                        <input type="checkbox" name="show-upcoming" value="Show Upcoming" id="show-upcoming" className="styled-checkbox hide-checkbox mb-0" />
                                                        <label htmlFor="show-upcoming"> <b>Show Upcoming</b></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 pl-pr-2-5px">
                                        <div className="edit-user-page-retros">
                                            
                                            <div className="edit-user-page-retros-body">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <td><b className="down_arrow date-time-text d-ib w-135" >Date &amp; Time</b></td>
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
                                                                <td><a href="#"><i className="fa fa-pencil-alt"></i></a></td>
                                                            </tr>
                                                            <tr className="bg-light-orange">
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td><a href="#"><i className="fa fa-pencil-alt"></i></a></td>
                                                            </tr>
                                                            <tr className="bg-light-orange">
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td><a href="#"><i className="fa fa-pencil-alt"></i></a></td>
                                                            </tr>
                                                            <tr className="bg-light-orange">
                                                                <td>July 19th, 2018 4:00PM</td>
                                                                <td>Ann Veal</td>
                                                                <td>Turner//All Projects</td>
                                                                <td>3</td>
                                                                <td><a href="#"><i className="fa fa-pencil-alt"></i></a></td>
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
                                                                <td width="120" className="actions-dropdown">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            Actions
                                                                        </button>
                                                                        <div className="dropdown-menu width-120px-imp" aria-labelledby="dropdownMenuButton">
                                                                            <a className="dropdown-item" >Download PDF</a>
                                                                            <a className="dropdown-item" >View Summary</a>
                                                                            <a className="dropdown-item" >Delete</a>
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
                                                    <ul className="pagination justify-content-center">
                                                       
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default accountretros;