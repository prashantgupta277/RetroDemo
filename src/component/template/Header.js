import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            userdata: {}
        }
    }
    componentDidMount() {
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        this.setState({userdata:userdata})
    }

    logout() {
        localStorage.clear();
        window.location.href="/"
      }
  render() {
    
    return (
      <React.Fragment> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-header">
            <a className="navbar-brand" >
                <img src={require("./img/retro-logo.png")} alt="Retro" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hi, <b>{this.state.userdata.firstName}</b><span className="sr-only">(current)</span>
                            <img className="user-image" src={require("./img/user.svg")} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right bg-primary" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/myprofile">My Profile</Link>
                            <a className="dropdown-item" href="#">Enterprise Account</a>
                            <a className="dropdown-item" href="#">My Retros</a>
                            <Link className="dropdown-item" to="/template">My Templates</Link>
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

export default Header;