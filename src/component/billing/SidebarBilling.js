import React from 'react';
import {Row,Col} from 'react-bootstrap';

/* eslint-disable react/prefer-stateless-function */
class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment> 
                <Row>
                    <div className="sidebar-top col-12">
                        <Row>
                            <Col md={12} className="pt-4 pr-1 pl-3 text-left"><h3>The Bluth Company</h3></Col>
                        </Row>
                        <Row className="spacerRow mb-3">
                            <Col xs={12}></Col>
                        </Row>
                        <Row>
                            <ul className="nav flex-column sidebarMenu">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Account Information</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Projects</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Billing <span className="error pull-right "><i className="fas fa-exclamation-circle"></i></span></a>
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