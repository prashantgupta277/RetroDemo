import React from 'react';
import {Row,Col} from 'react-bootstrap';

/* eslint-disable react/prefer-stateless-function */
class Sidebaruser extends React.Component {
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
                                <ul class="nav flex-column sidebarMenu">
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Account Information</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link  active" href="#">Users</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Projects</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Billing <span className="error pull-right "><i class="fas fa-exclamation-circle"></i></span></a>
                                    </li>
                                
                                </ul>
                            </Row>
                    </div>
                </Row>
                <Row>
                    <Col className="downloadAllData text-center col-12 mt-4 mb-4">
                    <i class="fa fa-download" aria-hidden="true"></i>  download all Data
                    </Col>
                </Row>
              
         </React.Fragment>
    );
  }
}

export default Sidebaruser;