import React from 'react';
import {Row,Col,nav} from 'react-bootstrap';

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  render() {
    return (
      <React.Fragment> 
          
          <div class="container">
                    <div class="row">
                      <div class="col-md-5">
                        <ul>
                          <li><a href="#">Contact Us</a></li>
                          <li><a href="#">Terms & Conditions</a></li>
                          <li><a href="#">Privacy Policy</a></li>
                        </ul>
                      </div>
                      <div class="col-md-5 footer-intro">
                          <img src={require("./img/dt_logo_robot2.png")} />
                          <div class="intro-text">
                            <h4>Built by Dom & Tom.</h4>
                            <p>Agile teams running retros every sprint.</p>
                          </div>
                      </div>
                      <div class="col-md-2 copyright">
                        <p>© Dom & Tom 2019</p>
                        <p><a href="#">Visit our Website</a></p>
                      </div>
                    </div>
                  </div>
              
         </React.Fragment>
    );
  }
}

export default Footer;