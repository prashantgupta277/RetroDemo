import React, { Component } from 'react';
import './allaccount.css';
import graf from './img/graf.PNG';
import downloadImage from './img/downlode-image.PNG';
import  SuperHeaderComponent from '../../commonComponent/superHeader';


class AllAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="scroll-assist" id="allaccounts-page-wrapper">
                <SuperHeaderComponent/>
                <div className="container-fluid">
                    <div className="maxWidth-1260px">
                        <div className="account-headar">
                            All Accounts
                        </div>
                        <div className="row">
                            <div className="col-md-5 pr-2px">
                                <div className="account-strip-1">
                                    <div className="registerd-user-amount">
                                        203,399
                                    </div>
                                    <div className="registerd-user">
                                        Ragistered User
                                    </div>
                                </div>
                                <div className="account-strip-2">
                                    <div className="registerd-user-amount">
                                        290,000,000
                                    </div>
                                    <div className="registerd-user">
                                        Ragistered User + Guests
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 pr-2px">
                                        <div className="daily-strip">
                                            <div className="daily-392">
                                                392
                                            </div>
                                            <div className="daily">
                                                Daily
                                            </div>
                                            <div className="daily-active-user">
                                                Active User
                                            </div>
                                        </div>
                                    </div>
                
                                    <div className="col-md-4 pl-2px pr-2px">
                                        <div className="daily-strip">
                                            <div className="daily-392">
                                                1,824
                                            </div>
                                            <div className="daily">
                                                Weekly
                                            </div>
                                            <div className="daily-active-user">
                                                Active User
                                            </div>
                                        </div>
                                    </div>
                
                                    <div className="col-md-4 pl-2px ">
                                        <div className="daily-strip">
                                            <div className="daily-392">
                                                2,933
                                            </div>
                                            <div className="daily">
                                                Monthly
                                            </div>
                                            <div className="daily-active-user">
                                                Active User
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                            <div className="col-md-3 pl-2px pr-2px">
                                <div className="account-strip-3">
                                    <div className="retro-complete">
                                        99,300
                                    </div>
                                    <div className="ratro-completed-date">
                                        Ratro Completed Date
                                    </div>
                                </div>
                                <div className="account-strip-4">
                                    <div className="active-account-219">
                                        219
                                    </div>
                                    <div className="active-account">
                                        Active Account
                                    </div>
                                </div>
                
                            </div>
                            <div className="col-md-4 pl-2px">
                                <div className="graf">
                                <div className="plan-graf">
                                <img src={graf} />
                                </div>
                                <div className="graf-image">
                                </div>
                                
                                </div>
                            </div>
                        </div>
                
                        <div className="row ">
                            <div className="col-md-12 paddingg-2">
                                <div className="account-down-strip ">
                                <div className="account-box ">
                                <div className="search-account">
                                <input type="text"  placeholder="Account Name" ></input>
                                
                                <div className="hide-inactive  float-right">
                                    <input type="checkbox"  name="vehicle1" value="Hide Inactive" className="styled-checkbox invisible mb-0px-imp" id="hide-inactive" />
                                    <label htmlFor="hide-inactive" className="mb-0px-imp"></label> Hide Inactive
                                    
                                    <a href="javascript:void(0)" className="downlaod-image-wrapper" ><img src={downloadImage} /></a>
                                </div>
                                                        
                                </div>
                                
                                
                                </div>
                
                                    <div className="tab">
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="down_arrow"><b className="fw-600">Company Name</b></th>
                                                    <td scope="col">Account ID</td>
                                                    <td scope="col">Retro Admins</td>
                                                    <td scope="col">Plan</td>
                                                    <td scope="col">Payment Status</td>
                                                    <td scope="col">Account Status</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td>Paid</td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                                                <tr className="status-inactive">
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td>Paid</td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td><div className="failed-tr">Failed</div></td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                
                                                <tr>
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td>Paid</td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                
                                                <tr>
                                                    <td scope="row"><div className="failed-tr1">The Bluth Company </div> </td>
                                                    <td><div className="failed-tr1">83200123  </div></td>
                                                    <td><div className="failed-tr1">13 </div></td>
                                                    <td><div className="failed-tr1">Enterprise </div></td>
                                                    <td><div className="failed-tr1">Paid </div></td>
                                                    <td><div className="failed-tr1">Active </div></td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                
                                                <tr>
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td><div className="failed-tr2">Unpaid</div></td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                
                                                <tr>
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td>Paid</td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                
                                                <tr>
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td>Paid</td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                
                                                <tr>
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td>Paid</td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                
                                                <tr>
                                                    <td scope="row">The Bluth Company</td>
                                                    <td>83200123</td>
                                                    <td>13</td>
                                                    <td>Enterprise</td>
                                                    <td>Paid</td>
                                                    <td>Active</td>
                                                    <td><a href="/superadmin-account-information" className="right-arrow"><i className="fa fa-angle-right"></i></a></td>
                                                </tr>
                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllAccount;