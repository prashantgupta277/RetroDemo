import React from 'react';
import {Row,Col} from 'react-bootstrap';

/* eslint-disable react/prefer-stateless-function */
class TopCardsuser extends React.Component {
  render() {
    return (
    <React.Fragment> 
           <Col md={3} className="pr-0" >
                <div className="infoCard d-flex fd-Column p-2 pb-4">
                    <div className="al-Self"></div>
                    <div className="al-Self"><span className="rate-num">2</span></div>
                    <div className="al-Self self-bold">Company Admins</div>
                </div>                         
            </Col>
            <Col md={3} className="pr-0 pl-1">
                <div className="infoCard d-flex fd-Column p-2 pb-4">
                    <div className="al-Self"></div>
                    <div className="al-Self"><span className="rate-num">24</span></div>
                    <div className="al-Self self-bold">Retro Admins</div>
                </div>       
            </Col>
            <Col md={3} className="pr-0 pl-1">
                <div className="infoCard d-flex fd-Column p-2 pb-4">
                    <div className="al-Self"></div>
                    <div className="al-Self"><span className="rate-num">193</span></div>
                    <div className="al-Self self-bold">Registered Attendees</div>
                </div>      
            </Col>
            <Col md={3} className="pl-1">
                <div className="infoCard d-flex fd-Column p-2 pb-4">
                    <div className="al-Self"></div>
                    <div className="al-Self"><span className="rate-num">124</span></div>
                    <div className="al-Self self-bold">Guest Users</div>
                </div>      
            </Col>
               
              
    </React.Fragment>
    );
  }
}

export default TopCardsuser;