import React from 'react';
import './header.css';
import { Link } from "react-router-dom";

class HeaderComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCompany: false,
            isUser: false,

        }
    }

    componentWillMount() {
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);

        if(userdata){
            if(userdata.isCompanyAdmin=="true"){
                this.setState({
                    isCompany: true
                })
            }
            if(userdata.isGuest==="true"){
                this.setState({
                    userlogin: true
                })
            }
        }
    
        console.log(userdata)
        this.setState({ userinfo: userdata })
    }

    logout() {
        // this.props.history.push('/');
        localStorage.clear();
        window.location.href = "/"
    }

    render() {
        return (

            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light bg-header">
                    <Link className="navbar-brand" to="/myretro"><img src={require("./img/retro-logo.png")} alt="Retro" /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

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
                                     {this.state.userlogin &&<Link className="dropdown-item" to="/myprofile">My Profile</Link>}
                                    {this.state.isCompany && <Link className="dropdown-item" to="/accountinformation">Account Information</Link>}
                                    {this.state.isCompany && <a className="dropdown-item handPointer" >Enterprise Account</a>}
                                    {this.state.userlogin && <Link className="dropdown-item" to="/myretro">My Retros</Link>}
                                    {this.state.userlogin &&<Link className="dropdown-item" to="/template">My Templates</Link>}
                                    <a className="dropdown-item sign-out handPointer" onClick={() => this.logout()}>Sign Out</a>
                                </div>
                            </li>
                        </ul>

                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default HeaderComponent;
