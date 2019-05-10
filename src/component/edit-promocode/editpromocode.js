import React, { Component } from 'react';
import './editpromocode.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPromocodeDetail, PromocodeDetailRes, updatePromocodeData, doUpdatePromocodeRes } from '../../actions/promoCodeActions';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createNotification} from './../../commonComponent/notificationbox/index';

class editpromocode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promoCode: '',
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
        const id = this.props.match.params.id
        console.log(id)
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "{\n  fetchSinglePromoCode(id: \"" + id + "\") {\n    id\n    promoCode\n    startDate\n    endDate\n  target\n  unit\n    discountValue\n  limitValue\n    repeat\n    limit\n    user {\n      id\n      email\n    }\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.handleFormSubmit(sendRequest)
        this.setState({
            loaderState: true
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps)
            if (nextProps.promoDetail && nextProps.promoDetail.data.promoCodeReducer.data && nextProps.promoDetail.data.promoCodeReducer.data.fetchSinglePromoCode) {
                console.log(nextProps.promoDetail)
                let tempInfo = nextProps.promoDetail.data.promoCodeReducer.data.fetchSinglePromoCode
                this.setState({
                    planName: tempInfo.planName,
                    promoCode: tempInfo.promoCode,
                    target: tempInfo.target,
                    repeat: tempInfo.repeat,
                    discountValue: tempInfo.discountValue ? tempInfo.discountValue :"0",
                    limitValue: tempInfo.limitValue ? tempInfo.limitValue : "0",
                    // startDate: tempInfo.startDate,
                    // endDate: tempInfo.endDate,
                    startDate: tempInfo.startDate ? new Date(tempInfo.startDate) : "",
                    endDate: tempInfo.endDate ? new Date(tempInfo.endDate) : "",
                    unit: tempInfo.unit,
                    limit: tempInfo.limit,
                    usedBy: tempInfo.usedBy,
                    loaderState: false
                });
            }

            if (nextProps.updatepromo && nextProps.updatepromo.data.promoCodeReducer.data && nextProps.updatepromo.data.promoCodeReducer.data.updatePromoCode) {
                this.setState({
                    loaderState: false
                })
                this.BackOnCancel();
            }

        }
    }

    UpdatePromoData() {
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        const id = this.props.match.params.id
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
            "query": "mutation {\n  updatePromoCode(PromoCodeId: \"" + id + "\", promoCode: \"" + this.state.promoCode + "\", userId: \"" + userdata.id + "\", target: \"" + this.state.target + "\", startDate: \"" + this.state.startDate + "\", endDate: \"" + this.state.endDate + "\", unit: \"" + this.state.unit + "\", discountValue: \"" + this.state.discountValue + "\", limitValue: \"" + this.state.limitValue + "\", repeat: \"" + this.state.repeat + "\", limit: \"" + this.state.limit + "\") {\n    id\n   target\n  promoCode\n    startDate\n    endDate\n    unit\n    discountValue\n  limitValue\n    repeat\n    limit\n    user {\n      id\n      email\n    }\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.updateFormSubmit(sendRequest)
        this.setState({
            loaderState: true
        })
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
            <div className="scroll-assist" id="editpromocode-page-wrapper">
                <div className="nav-container super-admin-menu-container">
                    <SuperHeaderComponent />
                </div>
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="container-fluid">
                    <div className="col-md-12 text-left">
                        <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                            <li><a href="#">Promo Codes</a></li>
                            <li><a href="#" className="breadcrumb-current">Edit Promo Codes</a></li>
                        </ol>
                    </div>
                    <div className="form-box-wrapper">
                        <div className="form-box">
                            <div className="form-box-header">
                                <h5 className="mb-4">Edit Promo Code</h5>
                            </div>
                            <div className="form-box-header">
                                <h6>Code information</h6>
                            </div>
                            <div className="form-box-body promo-code-fields-wrapper">
                                <div className="form-feild-box-1 mb-2">
                                    <label htmlFor="promo-code">Promo Code</label>
                                    <p className="btn-style">
                                        <span style={{ float: 'left' }}>{this.state.promoCode}</span>
                                        <button type="button" className="revertChanges-btn" onClick={() => this.createNewCode()}>Generate</button>
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box-1 promocode-datepicker-wrapper">
                                            <label htmlFor="start-date">Start Date</label>
                                            
                                            <DatePicker
                                                popperPlacement="right"
                                                value={this.state.startDate}
                                                minDate={this.formatDate(new Date())}
                                                selected={this.state.startDate} //when day is clicked
                                                onChange={this.handleChange} //when date is changed
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-feild-box-1 promocode-datepicker-wrapper">
                                            <label htmlFor="end-date" className="w-auto">End Date</label>
                                            <label className="opt float-right w-auto" htmlFor="optional">Optional</label>
                                            
                                            <DatePicker
                                                popperPlacement="right"
                                                value={this.state.endDate}
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
                                            <select onChange={(evt) => this.getunit(evt.target.value)} id="saveteamplate" className="form-control minimal underline_select" value={this.state.unit}>
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

                                            <select onChange={(evt) => this.getMonth(evt.target.value)} id="saveteamplate" className="form-control minimal underline_select" value={this.state.repeat}>
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
                                            
                                            <select onChange={(evt) => this.getlimit(evt.target.value)} id="saveteamplate" className="form-control minimal underline_select" value={this.state.limit} >
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
                                <div className="buttons-box promocode-buttons-box">
                                    <button type="button" className="cancel-btn" onClick={() => this.BackOnCancel()}>Cancel</button>
                                    <button type="button" className="saveChanges-btn" onClick={() => this.UpdatePromoData()}>Update Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

editpromocode.propTypes = {
    promoDetail: PropTypes.any,
    updatepromo: PropTypes.any,

};

const mapStateToProps = createStructuredSelector({
    promoDetail: PromocodeDetailRes,
    updatepromo: doUpdatePromocodeRes,
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(getPromocodeDetail(data)),
        updateFormSubmit: (data) => dispatch(updatePromocodeData(data))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(editpromocode);