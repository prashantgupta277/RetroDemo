import React, { Component } from 'react';
import { Row, Col} from 'react-bootstrap';
import './edituser.css';
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import EditData from './editData';
import Sidebar from '../../commonComponent/sidebar/Sidebar';
import { Link } from "react-router-dom";


import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getUserDetail, updateUserProfile, doUpdateProfileRes,userDetailRes } from './../../actions/userActions';


class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetail: [],
            firstName: '',
            lastName: '',
            email: '',
            companyName: '',
            accountType: '',
            loaderState: false,
            companyId:""
        }
    }


    componentWillMount() {

       
        let id = this.props.match.params.id
        console.log(id)
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "{\n  fetchSingleUser(id: \"" + id + "\") {\n    firstName\n    lastName\n    id\n    email\n    addressLine1\n    addressLine2\n    state\n    city\n   companyId\n  companyName\n    zipCode\n    createdAt\n  accountType\n isCompanyAdmin\n company {\n      id\n      companyName\n    }\n }\n}\n"
        }
        this.props.fetchdetail(sendRequest);
        this.setState({
            loaderState: true
        })
    }

    

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps) {
            console.log(nextProps)
            if (nextProps.userDetail && nextProps.userDetail.data.users.data.fetchSingleUser) {

                let userInfo = nextProps.userDetail.data.users.data.fetchSingleUser;
                console.log(userInfo)
                this.setState({
                    userDetail: userInfo,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    accountType: userInfo.accountType,
                    loaderState: false,
                    companyName: userInfo.companyName,
                    companyId: userInfo.companyId
                }, () => {
                    console.log(this.state.userDetail)
                })
            }
        }
    }


    render() {
        return (

            <div id="edituser" className="body-content cust-bg newBg">
                <HeaderComponent />
                <div className="container-fluid">
                    <div className="maxWidth-1260px mt-0">
                        <div className="col-md-12 text-left">
                            <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                                <li><Link to="/users">{this.state.companyName? this.state.companyName:""}</Link></li>
                                <li><Link to="/users" className="breadcrumb-current">Edit User</Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="zIndexTop container-fluid">
                    <div className="maxWidth-1260px mt-0">
                        <Row >
                            <Col md={3} className="sideBar">
                                <Sidebar />
                            </Col>
                            <Col md={9} className="data-right redBg">
                                <Row>
                                    <Col md={12} >
                                        <EditData />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} >

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <FooterComponent />

            </div>
        );
    }
}
EditUser.propTypes = {
    userDetail: PropTypes.any,
    updateUserInfo: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    updateUserInfo: doUpdateProfileRes,
    userDetail: userDetailRes,

});

function mapDispatchToProps(dispatch) {
    return {
        fetchdetail: (data) => dispatch(getUserDetail(data)),
        updateUserInfo: (data) => dispatch(updateUserProfile(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditUser);

// export default EditUser;