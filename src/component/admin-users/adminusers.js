import React, { Component } from 'react';
import './adminusers.css';
import logo from './img/retro-logo.png';
import avatar from './img/user.svg';


class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="scroll-assist" id="adminusers-page-wrapper">
                <div className="nav-container super-admin-menu-container">
                    <nav className="bg-light" id="nav-bar-wrapper">
                        <div className="nav-bar">
                            <div className="module left">
                                <a href="index.html">
                                    <img className="logo" alt="Retro" src={logo} />
                                </a>
                            </div>
                            <div className="module-middle">
                                <ul>
                                    <li><a href="/allaccounts">Accounts</a></li>
                                    <li><a href="/super-admin-templates">Templates</a></li>
                                    <li><a href="/promocodes">Promo Codes</a></li>
                                </ul>
                            </div>
                            <div className="module widget-handle language right pull-right">
                                <ul className="menu">
                                    <li className="">
                                        <a href="#" className="user_name">Hi, <span>Bob</span>!<img src={avatar} /></a>
                                        <ul>
                                            <li><a href="/admin-users">Manage Admins</a></li>
                                            <li><a href="#">Sign Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="container-fuild pb-5">
                    <div className="maxWidth-1260px">
                        <div className="account-headar mb-50px">
                            Retro App Dashboard users
                        </div>
                        <div className="row bg-white pad-25px">
                            <div className="col-12">
                                <div className="section-header clearfix">
                                    <div className="section-title float-left">
                                        <h4>Retro App Administrators</h4>
                                    </div>
                                    <div className="section-btn float-right">
                                        <a href="#" className="orange-btn"><i className="fa fa-plus"></i> Add User</a>
                                    </div>
                                </div>
                                <div className="section-body">
                                    <div className="table-responsive">
                                        <table className="table cst-table">
                                            <thead>
                                                <tr>
                                                    <td className="down_arrow"><b>Name</b></td>
                                                    <td>Email</td>
                                                    <td>Date Added</td>
                                                    <td>Status</td>
                                                    <td>Actions</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Barry Zukerkorn</td>
                                                    <td>Barry.zukerkorn@thebluthcompany.com</td>
                                                    <td>10/31/2017</td>
                                                    <td>Active</td>
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
                                                    <td>Barry Zukerkorn</td>
                                                    <td>Barry.zukerkorn@thebluthcompany.com</td>
                                                    <td>10/31/2017</td>
                                                    <td>Active</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Barry Zukerkorn</td>
                                                    <td>Barry.zukerkorn@thebluthcompany.com</td>
                                                    <td>10/31/2017</td>
                                                    <td>Active</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Barry Zukerkorn</td>
                                                    <td>Barry.zukerkorn@thebluthcompany.com</td>
                                                    <td>10/31/2017</td>
                                                    <td>Active</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Barry Zukerkorn</td>
                                                    <td>Barry.zukerkorn@thebluthcompany.com</td>
                                                    <td>10/31/2017</td>
                                                    <td>Active</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Barry Zukerkorn</td>
                                                    <td>Barry.zukerkorn@thebluthcompany.com</td>
                                                    <td>10/31/2017</td>
                                                    <td>Active</td>
                                                    <td></td>
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

export default AdminUsers;