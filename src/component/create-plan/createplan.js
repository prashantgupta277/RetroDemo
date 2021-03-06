import React, { Component } from 'react';
import './createplan.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';
import { submit_plan } from '../../actions/planActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNotification} from './../../commonComponent/notificationbox/index';


class createplan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planName: '',
            amount: '',
            maxRetro: '',
            maxRetroAdmin: '',
            maxCompanyAdmin: '',
        }
    }

    AddPlan() {
        if (this.state.planName === "") {
            createNotification("error","Please enter first name")
            return false;
        } 
        if (this.state.amount === "") {
            createNotification("error","Please enter Amount")
            return false;
        } 
        if (this.state.maxRetro === "") {
            createNotification("error","Please enter maxRetro")
            return false;
        } 
        if (this.state.maxRetroAdmin === "") {
            createNotification("error","Please enter maxRetroAdmin")
            return false;
        } 
        if (this.state.maxCompanyAdmin === "") {
            createNotification("error","Please enter maxCompanyAdmin")
            return false;
        }

        this.setState({
            loaderState:true
        })

        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  createPlan(planName: \"" + this.state.planName + "\", amount: " + this.state.amount + ", maxRetro: " + this.state.maxRetro + ", maxRetroAdmin: " + this.state.maxRetroAdmin + ", maxCompanyAdmin: " + this.state.maxCompanyAdmin + ") {\n    id\n    planName\n    amount\n    maxRetro\n    maxRetroAdmin\n    maxCompanyAdmin\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.handleFormSubmit(sendRequest)
    }

    BackOnCancel() {
        this.props.history.goBack();
    }

    check_amount(value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            this.setState({ amount: value })
        }
    }

    max_retro_validation(value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            this.setState({ maxRetro: value })
        }
    }

    max_retro_admin_validation(value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            this.setState({ maxRetroAdmin: value })
        }
    }

    max_company_validation(value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            this.setState({ maxCompanyAdmin: value })
        }
    }

    render() {
        return (
            <div className="scroll-assist" id="createplan-page-wrapper">
                <div className="nav-container super-admin-menu-container">
                    <SuperHeaderComponent />
                </div>

                <div className="container-fluid">
                    <div className="form-box-wrapper">
                        <div className="form-box">
                            <div className="form-box-header">
                                <h5>Add Plan</h5>
                            </div>
                            <div className="form-box-header">
                                <h6>Plan information</h6>
                            </div>
                            <div className="form-box-body">
                                <div className="form-feild-box-1">
                                    <label htmlFor="promo-code">Plan Name</label>
                                    <input type="text" value={this.state.planName} onChange={(e) => this.setState({ planName: e.target.value })} placeholder="Enter Plan Name" id="template-title" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="start-date">Amount</label>
                                            <input type="text" value={this.state.amount} onChange={(e) => this.check_amount(e.target.value)} placeholder="Enter Amount" id="template-title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="end-date">Max Retro </label>
                                            <input type="text" value={this.state.maxRetro} onChange={(e) => this.max_retro_validation(e.target.value)} placeholder="" id="template-title" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="start-date">Max Retro Admin</label>
                                            <input type="text" value={this.state.maxRetroAdmin} onChange={(e) => this.max_retro_admin_validation(e.target.value)} placeholder="" id="template-title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-feild-box-1">
                                            <label htmlFor="end-date" className="w-auto">Max Company Admin </label>
                                            <input type="text" value={this.state.maxCompanyAdmin} onChange={(e) => this.max_company_validation(e.target.value)} placeholder="" id="template-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-box-footer">
                                <div className="buttons-box">
                                    <button type="button" className="cancel-btn" onClick={() => this.BackOnCancel()}>Cancel</button>
                                    <button type="button" className="saveChanges-btn" onClick={() => this.AddPlan()}>Save Changes</button>
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
        handleFormSubmit: (data) => dispatch(submit_plan(data))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(createplan);