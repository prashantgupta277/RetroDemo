import React, { Component } from 'react';
import {Grid,Row,Col, FormControl,Button } from 'react-bootstrap';
import './user.css';
import  HeaderComponent from './../../commonComponent/header';
import  FooterComponent from './../../commonComponent/footer';
import TopCardsuser from './TopCardsuser';
import UserData from './userData';
import Sidebar from './../../commonComponent/sidebar/Sidebar';



class Billing extends Component {    
    render() {
        return (

        <div id="user" className="body-content cust-bg newBg">
                        <HeaderComponent/>                       
        {/* Main Page Structure Begin */}
            <Grid className="zIndexTop">
                <Row className="spacerRow">
                    <Col xs={12}>&nbsp;</Col>
                </Row>
                <Row >       
                    <Col md={3} className="sideBar">
                        <Sidebar/>
                    </Col>
                    <Col md={9} className="data-right redBg">
                        <Row>
                        <TopCardsuser/>                            
                        </Row>
                        <Row className="spacerRow mb-2">
                            <Col xs={12}></Col>
                        </Row>
                        <Row>
                            <Col md={12} >
                                <div className="infoCard  pt-3 pb-0 pl-3 pr-3 d-flex flexWrap">
                                    <Col md={6}>
                                        <span>Users </span>
                                        <span className="badge badge-pill badge-primary p-1 w-20">392</span>
                                        <span> 32/100 Retro Admins </span>
                                        <span> upgrade </span>
                                    </Col>
                                    <Col md={6} className="d-flex">
                                        <Col md={6} className="checkBoxSegment">
                                        <div>
                                        <ul className="check-user">
                                            <li>
                                                <input className="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="value1"/>
                                                <label htmlFor="styled-checkbox-1">Hide Archieved</label>
                                            </li>
                                            <li>
                                                <input className="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value1"/>
                                                <label htmlFor="styled-checkbox-2">Hide Guest</label>
                                            </li>
                                        </ul> 
                                        </div>   
                                        </Col>
                                        <Col md={6}>
                                            <button type="button" className="btn btn-warning paymentMethodButton"> + Add User</button>
                                        </Col>                                    
                                    </Col> 
                                    <Col md={6}>                                       
                                         <div className="search">
                                            <input type="text" placeholder="Search Users" className="search-field" />
                                        </div>                                                                          
                                    </Col>                                                              
                                    <UserData/>
                                </div>    
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
            </Grid>     
                
            
        {/* End Main Page Structure Begin */} 
        <div className="spacer"></div>
        <div className="spacer"></div>
        <FooterComponent/>       
                    
        </div>
);
}
}
        
export default Billing;