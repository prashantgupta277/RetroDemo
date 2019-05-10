import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './adduser.css';
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import AddUserData from './adduserData';
import Sidebar from '../../commonComponent/sidebar/Sidebar';

class Adduser extends Component {

    constructor(props){
        super(props);
        this.state={
            userinfo:''
        }
    }
    componentWillMount(){
        let userinfo=localStorage.getItem("logindata")
            var user=JSON.parse(userinfo)

            if(user){
                this.setState({
                    userinfo:user
                })
            }
    }
    render() {
        return (

            <div id="adduser" className="body-content cust-bg newBg">
                <HeaderComponent />
                {/* Main Page Structure Begin */}
                <div className="container-fluid">
                    <div className="maxWidth-1260px mt-0">
                        <div className="col-md-12 text-left">
                            <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                                <li><a href="/users">{this.state.userinfo? this.state.userinfo.companyName:""} </a></li>
                                <li><a className="breadcrumb-current">Add User</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="zIndexTop container-fluid">
                    <div className="maxWidth-1260px mt-0">
                        <Row >
                            <Col md={3} className="sideBar">
                                <Sidebar />
                            </Col>
                            <Col md={9} className="data-right redBg">
                                <Row>
                                    <Col md={12} >
                                        <AddUserData />
                                    </Col>
                                </Row>
                                <Row className="spacerRow mb-2">
                                    <Col xs={12}></Col>
                                </Row>
                                <Row>
                                    <Col md={12} >

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>


                {/* End Main Page Structure Begin */}
                <div className="spacer"></div>
                <div className="spacer"></div>
                <FooterComponent />

            </div>
        );
    }
}

export default Adduser;