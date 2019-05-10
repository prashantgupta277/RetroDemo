import React, { Component } from 'react';

import './superadminbilling.css';
import infoIcon from './img/info_icon.png';
import Info from './img/info_icon-white.png';
import downloadArrow from './img/download_icon.png';
import SuperHeaderComponent from '../../commonComponent/superHeader';

class SuperAdminBilling extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="scroll-assist" id="superadminbilling-page-wrapper">
               
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
                                        <li><a href="/superadmin-retros">Retros</a></li>
                                        <li className="active"><a href="/superadmin-billing" className="billing-link">Billing</a></li>
                                    </ul>
                                    <div className="download-data-icon">
                                        <a href="#">Downlaod all Data</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-4 stripcc pr-2px">
                                        {/*
                                        <!-- Billing -->*/}
                                        <div className="stripe">

                                            <div className="user2">
                                                Users
                                            </div>

                                            <div className="count">
                                                32<span>/100</span>
                                            </div>

                                            <div className="user3">
                                                Retro Admins
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-4 stripcc pl-2px pr-2px">
                                        {/*
                                        <!-- users -->*/}
                                        <div className="stripc">

                                            <div className="user2">
                                                Billing
                                            </div>

                                            <div className="count">
                                                $291.33
                                            </div>

                                            <div className="useraa3">
                                                <img src={infoIcon} className="info_icon" /><span> Failed </span> on 11 Oct 2019
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-4 stripcc pl-2px">
                                        {/*
                                        <!-- Retros -->*/}
                                        <div className="stripd">

                                            <div className="user2">
                                                Account
                                            </div>
                                            <div className="count">
                                                Enterprise
                                            </div>

                                            <div className="user3">
                                                $291.33 Due on 11/10/2108
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-12 stripcc">
                                        <div className="stripf">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="acdetalbilling">
                                                        Billing Summary
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="plan">
                                                        Plan
                                                    </div>
                                                    <div className="enterprise">
                                                        <div className="select-plan-dropdown">
                                                            <div className="dropdown">
                                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Enterprise Plan - $299.00/ month</button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*
                                                    <div className="enterline"></div> */}
                                                    <div className="graybox">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="whats">
                                                                    What's include:
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="retrohundred float-left">
                                                                    100 Retro Admins Unlimited Retros
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="promocode">
                                                            Promo Code
                                                        </div>
                                                        <div className="activepromocode">
                                                            Active Promo Code :<span>Bluth Company</span>
                                                            <a href="#"> DISABLE</a>
                                                        </div>
                                                        <div className="fifmonth">
                                                            15% Off every month
                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="col-md-6">
                                                    <div className="payment">

                                                        Payment Method
                                                        <a href="/superadmin-addcard" className="add-card">Add Card</a>

                                                    </div>
                                                    <div className="visa">
                                                        Visa - 1234
                                                        <a href="#"> DELETE</a>
                                                    </div>
                                                    <div className="fifmonth">
                                                        Card Charged on the 11th of each month.
                                                    </div>
                                                    <div className="biliingcontact">
                                                        Billing Contact
                                                    </div>
                                                    <div className="graybox1">
                                                        <div className="account-type-dropdown width-100">
                                                            <div className="dropdown">
                                                                <button className="btn btn-secondary dropdown-toggle bdr-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bob Loblaw</button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Bob Loblaw</a>
                                                                    <a className="dropdown-item" href="#">Bob Loblaw</a>
                                                                    <a className="dropdown-item" href="#">Bob Loblaw</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="biliingcontact">
                                                        Direct Pay
                                                    </div>
                                                    <div className="graybox1 w-135">
                                                        <div className="account-type-dropdown">
                                                            <div className="dropdown">
                                                                <button className="btn btn-secondary dropdown-toggle bdr-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Off</button>
                                                                <div className="dropdown-menu w-135" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Off</a>
                                                                    <a className="dropdown-item" href="#">On</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="due float-right">
                                                    <div className="cardfailed">
                                                        <img src={Info} className="info_icon_white" /> Card Failed on 10/10/2019
                                                        </div>
                                                </div>
                                                {/* <div className="due float-right">
                                                    <div className="cardfailed">
                                                        <img src={Info} className="info_icon_white" /> Missing Payment Method
                                                        </div>
                                                </div> */}
                                            </div>
                                        </div>

                                        <div className="invoice-history">
                                            <div className="invoice">
                                                Invoice History
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Date</td>
                                                            <td>Amount</td>
                                                            <td>Payment Method</td>
                                                            <td>Status</td>
                                                            <td>Invoice</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td className="text-red">Payment Failed</td>
                                                            <td><a href="#" className="text-red">Re-run Card</a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/28</td>
                                                            <td>254$</td>
                                                            <td>Visa - 1234</td>
                                                            <td>Paid</td>
                                                            <td><a href="#"><img src={downloadArrow} className="download-icon" /></a></td>
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer2" id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <ul>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div className="col-md-5 footer-intro">
                                <img src={require("./img/dt_logo_robot2.png")} />
                                <div className="intro-text">
                                    <h4>Built by Dom &amp; Tom.</h4>
                                    <p>Agile teams running retros every sprint.</p>
                                </div>
                            </div>
                            <div className="col-md-2 copyright">
                                <p>© Dom &amp; Tom 2019</p>
                                <p><a href="#">Visit our Website</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuperAdminBilling;