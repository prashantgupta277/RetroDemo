import React, { Component } from 'react';
import './superadminaddcard.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';

class SuperadminAddcard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="scroll-assist" id="addcart-page-wrapper">
                <SuperHeaderComponent />

                <div className="container-fluid">
                    <div className="col-md-12 text-left">
                        <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                            <li><a href="/superadmin-billing">Billing</a></li>
                            <li><a href="#" className="breadcrumb-current">Add Payment Method</a></li>
                        </ol>
                    </div>
                    <div className="form-box-wrapper">
                        <div className="form-box">
                            <div className="form-box-header">
                                <h5 className="add-payment-page-title">Add payment Method</h5>
                            </div>
                            <div className="form-box-header">
                                <h6 className="add-payment-page-subtitle">Credit card information</h6>
                            </div>
                            <div className="form-box-body">
                                <div className="form-feild-box">
                                    <label htmlFor="card-number">Card Number</label>
                                    <input type="text" value={this.state.cardNumber} onChange={(e) => this.setState({ cardNumber: e.target.value })} placeholder="1923 2222 2222 2222" id="card-number" />
                                </div>
                                <div className="form-feild-box">
                                    <label htmlFor="card-type">Card Type</label>
                                    <input type="text" value={this.state.cardType} onChange={(e) => this.setState({ cardType: e.target.value })} placeholder="visa" id="card-type" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label htmlFor="expiration-date">Expiration Date</label>
                                            <input type="text" value={this.state.expirationDate} onChange={(e) => this.setState({ expirationDate: e.target.value })} placeholder="10/20" id="expiration-date" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label htmlFor="security-code">Security Code</label>
                                            <input type="text" value={this.state.securityCode} onChange={(e) => this.setState({ securityCode: e.target.value })} placeholder="222" id="security-code" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-box-header">
                                    <h6>Billing Address</h6>
                                </div>
                                <div className="form-feild-box">
                                    <label htmlFor="name-on-card">Name on Card</label>
                                    <input type="text" value={this.state.nameOnCard} onChange={(e) => this.setState({ nameOnCard: e.target.value })} placeholder="1923 2222 2222 2222" id="name-on-card" />
                                </div>
                                <div className="form-feild-box">
                                    <label htmlFor="address-line-1">Address Line 1</label>
                                    <input type="text" value={this.state.addressLine1} onChange={(e) => this.setState({ addressLine1: e.target.value })} placeholder="Address1" id="address-line-1" />
                                </div>
                                <div className="form-feild-box">
                                    <label htmlFor="address-line-2">Address Line 2</label>
                                    <input type="text" value={this.state.addressLine2} onChange={(e) => this.setState({ addressLine2: e.target.value })} placeholder="Address2" id="address-line-2" />
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="form-feild-box">
                                            <label>City</label>
                                            <input type="text" value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} placeholder="New York" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 pl-0px">
                                        <div className="form-feild-box form-feild-box2">
                                            <label>State</label>
                                            <input type="text" value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })} placeholder="NY" />
                                        </div>
                                    </div>
                                    <div className="col-md-4 pl-0px">
                                        <div className="form-feild-box form-feild-box3">
                                            <label>Zip Code</label>
                                            <input type="text" value={this.state.zipCode} onChange={(e) => this.setState({ zipCode: e.target.value })} placeholder="zip" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-box-footer">
                                <div className="buttons-box">
                                    <button type="button" className="cancel-btn" onClick={() => this.BackOnCancel()}>Cancel</button>
                                    <button type="button" className="saveChanges-btn" onClick={() => this.AddCard()}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer2" id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <ul>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div className="col-md-5 footer-intro">
                                <img src={require("./img/dt_logo_robot2.png")} />
                                <div className="intro-text">
                                    <h4>Built by Dom &amp; Tom.</h4>
                                    <p>Agile teams running retros every sprint.</p>
                                </div>
                            </div>
                            <div className="col-md-2 copyright">
                                <p>© Dom &amp; Tom 2019</p>
                                <p><a href="#">Visit our Website</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuperadminAddcard;