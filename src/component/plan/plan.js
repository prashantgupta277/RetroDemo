import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './plan.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAllPlanListing, getPlanListRes, delete_plan } from './../../actions/planActions';
import Modal from 'react-responsive-modal';

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPlanList: [],
            loaderState: false,
            open: false,
            DeleteId: "",
        }
    }

    componentWillMount() {
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "{\n  fetchAllPlans {\n    id\n    planName\n    amount\n    maxRetro\n    maxRetroAdmin\n    maxCompanyAdmin\n  }\n}\n"
        }
        this.props.fetchList(sendRequest);
        this.setState({
            loaderState: true
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps)
            if (nextProps.allPlanList && nextProps.allPlanList.data.planReducer) {
                if (nextProps.allPlanList.data.planReducer.data && nextProps.allPlanList.data.planReducer.data.fetchAllPlans) {
                    let getList = nextProps.allPlanList.data.planReducer.data.fetchAllPlans;
                    this.setState({
                        allPlanList: getList,
                        loaderState: false
                    })
                }
            }
        }
    }

    Deletedata() {
        let sendRequest = {"operationName":null,
        "variables":{},
        "query":"mutation {\n  deletePlan(id: \"" + this.state.DeleteId + "\") {\n    id\n    isDeleted\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.DeleteData(sendRequest)
    }

    onOpenModal = (id) => {
        this.setState({
            open: true,
            DeleteId: id
        });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    render() {
        console.log(this.state.allPlanList)
        const { open } = this.state;
        return (
            <div className="scroll-assist" id="promocodes-page-wrapper">
                <SuperHeaderComponent />
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="container-fuild pb-5">
                    <div className="maxWidth-1260px">
                        <div className="account-headar mb-50px">
                            Plans
                        </div>
                        <div className="row bg-white pad-25px">
                            <div className="col-12">
                                <div className="section-header clearfix">
                                    <div className="section-title float-left">
                                        <h4>Plan List</h4>
                                    </div>
                                    <div className="section-btn float-right">
                                        <a href="/createplan" className="orange-btn"><i className="fa fa-plus"></i> Create New</a>
                                    </div>
                                </div>
                                <div className="section-body">
                                    <div className="table-responsive">
                                        <table className="table cst-table">
                                            <thead>
                                                <tr>
                                                    <td>Plan Name</td>
                                                    <td>Amount</td>
                                                    <td>Max Retro</td>
                                                    <td>Max Retro Admin</td>
                                                    <td>Max Company Admin</td>
                                                    <td>Actions</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(this.state.allPlanList && this.state.allPlanList.length > 0) && this.state.allPlanList.map((item, index) => {

                                                    return <tr key={index}>
                                                        <td>{item.planName}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.maxRetro}</td>
                                                        <td>{item.maxRetroAdmin}</td>
                                                        <td>{item.maxCompanyAdmin}</td>
                                                        <td width="100" className="actions-dropdown">
                                                            <div className="dropdown">
                                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Actions
                                                            </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <Link to={'/editplan/' + item.id + '/'} className="dropdown-item">Edit</Link>
                                                                    <a className="dropdown-item" onClick={() => { this.onOpenModal(item.id) }}>Delete</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cst-pagination">
                                        <nav aria-label="cst-pagination-inner navigation">
                                            <ul className="pagination">
                                                
                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Next">
                                                        <span aria-hidden="true">&raquo;</span>
                                                        <span className="sr-only">Next</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="delete_template_modal">
                    <Modal open={open} onClose={this.onCloseModal}  closeIconSize={0}  center >
                        <div className="customeModal" >                
                            <div className="modal-body">
                                <div style={{textAlign: 'right'}}>
                                    <button  className="btn btn-danger closebutton"  onClick={() => { this.onCloseModal() }}> <span aria-hidden="true">&times;</span></button>
                                </div>
                                <p>
                                    Are you sure You Want to Delete?
                                </p>
                                <div className="modal-footer" style={{    display: 'inline'}}>
                                    <button type="button" data-dismiss="modal" className="btn btn-danger" id="delete" onClick={() => { this.Deletedata() }}>Delete</button>
                                    <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => { this.onCloseModal() }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

Plan.propTypes = {
    allPlanList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    allPlanList: getPlanListRes,
});

function mapDispatchToProps(dispatch) {
    return {
        fetchList: (data) => dispatch(getAllPlanListing(data)),
        DeleteData: (data) => dispatch(delete_plan(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Plan);
