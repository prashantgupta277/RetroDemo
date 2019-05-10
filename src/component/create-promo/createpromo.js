import React, { Component } from 'react';
import './createpromo.css';

import SuperHeaderComponent from '../../commonComponent/superHeader';
import { submit_promocodes } from '../../actions/promoCodeActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createNotification} from './../../commonComponent/notificationbox/index';


class createpromo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promoCode: this.codeGenerator(),
            target: '',
            repeat: '',
            value: '',
            startDate: '',
            endDate: '',
            unit: '',
            limit: '',
            usedBy: '',
            discountValue: '',
            limitValue: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
    componentWillMount() {

    }

    codeGenerator() {
        var text = "";
        var string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += string.charAt(Math.floor(Math.random() * string.length));

        return text;
    }

    createNewCode() {
        this.setState({
            promoCode: this.codeGenerator(),
        })
    }

    AddPromo() {
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        if (this.state.promoCode === "") {
            createNotification("error","Please enter Promo Code")
            return false;
        } 
        if (this.state.target === "") {
            createNotification("error","Please enter Target")
            return false;
        } 
        if (this.state.discountValue === "") {
            createNotification("error","Please enter Discount Value")
            return false;
        } 
        if (this.state.limitValue === "") {
            createNotification("error","Please enter Limit Value")
            return false;
        } 
        if (this.state.repeat === "") {
            createNotification("error","Please enter repeat")
            return false;
        }
        if (this.state.startDate === "") {
            createNotification("error","Please startDate")
            return false;
        }
        if (this.state.endDate === "") {
            createNotification("error","Please enter endDate")
            return false;
        }
        if (this.state.limit === "") {
            createNotification("error","Please enter limit")
            return false;
        }
        if (this.state.unit === "") {
            createNotification("error","Please enter unit")
            return false;
        }

        this.setState({
            loaderState:true
        })
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  createPromoCode(userId: \"" + userdata.id + "\", promoCode: \"" + this.state.promoCode + "\", target: \"" + this.state.target + "\", discountValue: \"" + this.state.discountValue + "\", limitValue: \"" + this.state.limitValue + "\", repeat: \"" + this.state.repeat + "\", startDate: \"" + this.state.startDate + "\", endDate: \"" + this.state.endDate + "\", unit: \"" + this.state.unit + "\", limit: \"" + this.state.limit + "\") {\n    id\n    promoCode\n    target\n    repeat\n    target\n    discountValue\n  limitValue\n    startDate\n    endDate\n    unit\n    limit\n    usedBy\n  }\n}\n"
        }
        this.props.handleFormSubmit(sendRequest)
    }

    BackOnCancel() {
        this.props.history.goBack();
    }

    getMonth(value) {
        this.setState({
            repeat: value
        })
    }

    getunit(value) {
        this.setState({
            unit: value
        })
    }

    getlimit(value) {
        this.setState({
            limit: value
        })
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    handleChange(date) {
        this.setState({
            startDate: date,
            endDate: "",
            isRender: true
        });
    }

    handleChange2(date) {
        this.setState({
            endDate: date
        });
        console.log(this.state.endDate)
    }

    render() {
        return (
            <div className="scroll-assist" id="createpromo-page-wrapper">
                <div className="nav-container super-admin-menu-container">
                    <SuperHeaderComponent />
                </div>

                <div className="container-fluid">
                    <div className="col-md-12 text-left">
                        <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                            <li><a href="#">Promo Codes</a></li>
                            <li><a href="#" className="breadcrumb-current" >Create Promo Codes</a></li>
                        </ol>
                    </div>
                    <div className="form-box-wrapper">
                        <div className="form-box">
                            <div className="form-box-header">
                                <h5 className="mb-4">Create Promo Code</h5>
                            </div>
                            <div className="form-box-header">
                                <h6>Code information</h6>
                            </div>
                            <div className="form-box-body promo-code-fields-wrapper">
                                <div className="form-feild-box-1 mb-2">
                                    <label htmlFor="promo-code">Promo Code</label>
                                    <p className="btn-style">
                                        <span style={{ float: 'left', paddingLeft: '10px' }}>{this.state.promoCode}</span>
                                        <button type="button" className="revertChanges-btn" onClick={() => this.createNewCode()}>Generate</button>
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box-1 promocode-datepicker-wrapper">
                                            <label htmlFor="start-date">Start Date</label>
                                             <DatePicker
                                                popperPlacement="right"
                                                minDate={this.formatDate(new Date())}
                                                selected={this.state.startDate} //when day is clicked
                                                onChange={this.handleChange} //when date is changed
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="form-feild-box-1 promocode-datepicker-wrapper">
                                            <label htmlFor="end-date" className="w-auto">End Date</label>
                                            <label className="opt float-right w-auto" htmlFor="optional">Optional</label>
                                            <DatePicker
                                                popperPlacement="right"
                                                minDate={this.formatDate(new Date(this.state.startDate))}
                                                selected={this.state.endDate} //when day is clicked
                                                onChange={this.handleChange2} //when date is changed
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-feild-box-1">
                                    <label htmlFor="company">Company</label>
                                    <input type="text" value={this.state.target} onChange={(e) => this.setState({ target: e.target.value })} placeholder="" id="promo-code" />
                                </div>
                                <div className="form-box-header">
                                    <h6>Discount</h6>
                                </div>

                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="unit" className="d-b">Unit</label>
                                            <select onChange={(evt) => this.getunit(evt.target.value)} id="saveteamplate" className="form-control minimal underline_select" >
                                                <option value="">%</option>
                                                <option value="10"> 10</option>
                                                <option value="20"> 20</option>
                                                <option value="50"> 50</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-3 pl-0px">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="value">Value</label>
                                            <input type="text" value={this.state.discountValue} onChange={(e) => this.setState({ discountValue: e.target.value })} placeholder="" id="value" />
                                        </div>
                                    </div>
                                    <div className="col-md-4 pl-0px">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="repeat" className="d-b">Repeat</label>
                                            <select onChange={(evt) => this.getMonth(evt.target.value)} id="saveteamplate" className="form-control minimal underline_select" >
                                                <option value="">Select month</option>
                                                <option value="1"> 1 month</option>
                                                <option value="3"> 3 month</option>
                                                <option value="6"> 6 month</option>
                                                <option value="9"> 9 month</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="form-box-header">
                                    <h6>Limit</h6>
                                    <p className="text-center">Optional</p>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="limit" className="d-b">Limit</label>

                                           
                                            <select onChange={(evt) => this.getlimit(evt.target.value)} id="saveteamplate" className="form-control minimal underline_select" >
                                                <option value="">Select</option>
                                                <option value="100"> 100</option>
                                                <option value="200"> 200</option>
                                                <option value="500"> 500</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-md-3 pl-0px">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="value">Value</label>
                                            <input type="text" value={this.state.limitValue} onChange={(e) => this.setState({ limitValue: e.target.value })} placeholder="" id="value" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-box-footer">
                                <div className="buttons-box">
                                    <button type="button" className="cancel-btn" onClick={() => this.BackOnCancel()}>Cancel</button>
                                    <button type="button" className="saveChanges-btn" onClick={() => this.AddPromo()}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submit_promocodes(data))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(createpromo);