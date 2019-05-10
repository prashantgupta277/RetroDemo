import React from 'react';
import './header.css';
import { Link } from "react-router-dom";


let page = 'allaccounts';

class SuperHeaderComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        this.setState({ userinfo: userdata })
    }

    logout() {
        // this.props.history.push('/');
        localStorage.clear();
        window.location.href = "/"
    }

    render() {
        if (window.location.pathname.includes('allaccounts')) {
            page = 'allaccounts';
        } if (window.location.pathname.includes('super-admin-templates')) {
            page = 'super-admin-templates';
        } if (window.location.pathname.includes('promocodes') || window.location.pathname.includes('createpromo') || window.location.pathname.includes('editpromo')) {
            page = 'promocodes';
        } if (window.location.pathname.includes('plan') || window.location.pathname.includes('createplan') || window.location.pathname.includes('editplan')) {
            page = 'plan';
        }

        // console.log(page)
        return (

            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-header">
                    <Link className="navbar-brand" to="/myretro"><img src={require("./img/retro-logo.png")} alt="Retro" /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="module-middle">
                        <ul>
                            <li className={page === 'allaccounts' ? 'sidebarActive' : ''}><Link to="/allaccounts">Accounts</Link></li>
                            <li className={page === 'super-admin-templates' ? 'sidebarActive' : ''}><Link to="/super-admin-templates">Templates</Link></li>
                            <li className={page === 'promocodes' ? 'sidebarActive' : ''}><Link to="/promocodes">Promo Codes</Link></li>
                            <li className={page === 'plan' ? 'sidebarActive' : ''}><Link to="/plan">Plans</Link></li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Hi,
                                {this.state.userinfo && this.state.userinfo.firstName && <b>{this.state.userinfo.firstName}</b>}
                                    <span className="sr-only">(current)</span>
                                    <img className="user-image" src={require("./img/user.svg")} />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbarDropdownContent" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/myprofile">My Profile</Link>
                                    <a className="dropdown-item sign-out" onClick={() => this.logout()}>Sign Out</a>
                                </div>
                            </li>
                        </ul>

                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default SuperHeaderComponent;
