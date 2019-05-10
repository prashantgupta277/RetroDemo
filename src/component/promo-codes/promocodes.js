import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './promocodes.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAllPromoCodeListing, PromocodeListRes, delete_Promocode} from './../../actions/promoCodeActions';
import Modal from 'react-responsive-modal';

class PromoCodes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorttype: 'desc',
            allPromoList: [],
            loaderState: false,
            open: false,
            DeleteId: "",
        }
    }

    componentWillMount() {
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "{\n  fetchAllPromoCodes {\n    id\n    promoCode\n    repeat\n    target\n    repeat\n    startDate\n    endDate\n    usedBy\n    limit\n   discountValue\n  limitValue\n  user {\n      email\n      id\n    }\n  }\n}\n"
        }
        this.props.fetchList(sendRequest);
        this.setState({
            loaderState: true
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps)
            if (nextProps.allPromoList && nextProps.allPromoList.data.promoCodeReducer.data) {
                let getList = nextProps.allPromoList.data.promoCodeReducer.data.fetchAllPromoCodes;
                this.setState({
                    allPromoList: getList,
                    loaderState: false
                })
            }
        }
    }

    descsort(a, b) {

        if (a.startDate > b.startDate)
            return -1;
        if (a.startDate < b.startDate)
            return 1;

        return 0;
    }

    ascsort(a, b) {

        if (a.startDate < b.startDate)
            return -1;
        if (a.startDate > b.startDate)
            return 1;
        return 0;
    }

    shortdata() {
        if (this.state.sorttype === "desc") {
            this.setState({ allPromoList: this.state.allPromoList.sort(this.ascsort) })
        } else {
            this.setState({ allPromoList: this.state.allPromoList.sort(this.descsort) })
        }
        if (this.state.sorttype === "desc") {
            this.setState({ alluser: "asc" })
        } else {
            this.setState({ alluser: "desc" })
        }
    }

    Deletedata() {
        let sendRequest = {
            "operationName":null,
            "variables":{},
            "query":"mutation {\n  deletePromoCode(id: \"" + this.state.DeleteId + "\") {\n    id\n    isDeleted\n  }\n}\n"
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
        console.log(this.state.allPromoList)
        const { open } = this.state;
        return (
            <div className="scroll-assist" id="promocodes-page-wrapper">
                <SuperHeaderComponent />
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="container-fluid pb-5">
                    <div className="maxWidth-1260px">
                        <div className="account-headar mb-50px">
                            Promo Codes
                        </div>
                        <div className="row bg-white pad-25px">
                            <div className="col-12">
                                <div className="section-header clearfix">
                                    <div className="section-title float-left">
                                        <h4>Active Promo Codes</h4>
                                    </div>
                                    <div className="section-btn float-right">
                                        <a href="/createpromo" className="orange-btn"><i className="fa fa-plus"></i> Create New</a>
                                    </div>
                                </div>
                                <div className="section-body">
                                    <div className="table-responsive">
                                        <table className="table cst-table">
                                            <thead>
                                                <tr>
                                                    <td>Promo Code</td>
                                                    <td>Target</td>
                                                    <td>Value</td>
                                                    <td>Reapeat</td>
                                                    {/* <td className="down_arrow"><b>Start Date</b></td> */}
                                                    <td scope="col">Start Date&nbsp;<span className="icon-chevrlet-up" onClick={(e) => { this.shortdata(); }} >({this.state.sorttype === "asc" ? "↓" : "↑"})</span></td>
                                                    <td>End Date</td>
                                                    <td>Used By</td>
                                                    <td>Limit</td>
                                                    <td>Actions</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(this.state.allPromoList && this.state.allPromoList.length > 0) && this.state.allPromoList.map((item, index) => {

                                                    return <tr key={index}>
                                                        {/* <tr> */}
                                                        <td>{item.promoCode}</td>
                                                        <td>{item.target}</td>
                                                        <td>{item.discountValue}% Off</td>
                                                        <td>{item.repeat}</td>
                                                        <td>{item.startDate}</td>
                                                        <td>{item.endDate}</td>
                                                        <td>{item.usedBy}</td>
                                                        <td>{item.limit}</td>
                                                        <td width="100" className="actions-dropdown">
                                                            <div className="dropdown">
                                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Actions
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <Link to={'/editpromocode/' + item.id + '/'} className="dropdown-item">Edit</Link>
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

PromoCodes.propTypes = {
    allPromoList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    allPromoList: PromocodeListRes,
});

function mapDispatchToProps(dispatch) {
    return {
        fetchList: (data) => dispatch(getAllPromoCodeListing(data)),
        DeleteData: (data) => dispatch(delete_Promocode(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PromoCodes);
