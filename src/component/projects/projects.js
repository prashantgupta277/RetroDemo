import React, { Component } from 'react';
import {Row, Col } from 'react-bootstrap';
import './projects.css';
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import ProjectsData from './projectsData';
import Sidebar from './../../commonComponent/sidebar/Sidebar';


class projects extends Component {
    render() {
        return (

            <div id="adduser" className="body-content cust-bg newBg">
                <HeaderComponent />
                <div className="zIndexTop container-fluid">
                    <div className="maxWidth-1260px pb-5">
                        <Row >
                            <Col md={3} className="sideBar">
                                <Sidebar />
                            </Col>
                            <Col md={9} className="data-right redBg">
                                <Row>
                                    <Col md={12} >
                                        <ProjectsData />
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

export default projects;