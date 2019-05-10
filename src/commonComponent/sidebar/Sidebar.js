import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Sidebar.css';

/* eslint-disable react/prefer-stateless-function */

let page = 'accountinformation';


class Sidebar extends React.Component {

    constructor(props){
        super(props)
        this.state={
            companyName:""
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.CompanyName){
            this.setState({
                companyName: nextProps.CompanyName
            })
        }
    }
    render() {

        if (window.location.pathname.includes('accountinformation')) {
            page = 'accountinformation';
        } if (window.location.pathname.includes('users') || window.location.pathname.includes('adduser') || window.location.pathname.includes('edituser')) {
            page = 'users';
        } if (window.location.pathname.includes('projects')) {
            page = 'projects';
        } if (window.location.pathname.includes('billing')) {
            page = 'billing';
        }
        return (
            <React.Fragment>
                <Row>
                    <div className="sidebar-top col-12">
                        <Row>
                            <Col md={12} className="pt-4 pr-1 pl-3 text-left"><h3 className="sideBar_Title">{this.state.companyName ? this.state.companyName:""}</h3></Col>
                        </Row>
                        <Row className="spacerRow mb-3">
                            <Col xs={12}></Col>
                        </Row>
                        <Row>
                            <ul className="nav flex-column sidebarMenu">
                                <li className="nav-item" className={page === 'accountinformation' ? 'sidebarActive' : ''}>
                                    <Link className="nav-link" to="/accountinformation">Account Information</Link>
                                </li>
                                <li className="nav-item" className={page === 'users' ? 'sidebarActive' : ''}>
                                    <Link className="nav-link" to="/users">Users</Link>
                                </li>
                                <li className="nav-item" className={page === 'projects' ? 'sidebarActive' : ''}>
                                    <Link className="nav-link" to="/projects">Projects</Link>
                                </li>
                                <li className="nav-item" className={page === 'billing' ? 'sidebarActive' : ''}>
                                    <Link className="nav-link" to="/billing">Billing <span className="error pull-right "></span></Link>                                   
                                </li>

                            </ul>
                        </Row>
                    </div>
                </Row>
                <Row>
                    <Col className="downloadAllData text-center col-12 mt-4 mb-4">
                        <i className="fa fa-download" aria-hidden="true"></i>  download all Data
                    </Col>
                </Row>

            </React.Fragment>
        );
    }
}

export default Sidebar;