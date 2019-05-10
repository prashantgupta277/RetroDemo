import React, { Component } from 'react';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNotification} from './../../commonComponent/notificationbox/index';
import { getVerifyEmail, verifyDetailRes} from './../../actions/verifyEmailActions';

class verifyemail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount(){
        const id = this.props.match.params.id
        console.log(id)
        let sendRequest = {
            "operationName":null,
            "variables":{},
            "query":"mutation {\n  updateUser(id: \""+id+"\", isEmailVerify: true) {\n    id\n    email\n    isEmailVerify\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.handleFormSubmit(sendRequest)
    }
  
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps)
            if (nextProps.verifyDetail && nextProps.verifyDetail.user.verifyemailReducer.data && nextProps.verifyDetail.user.verifyemailReducer.data.updateUser) {
                createNotification("success","Email Verify Successfully");
                setTimeout(() => {
                    window.location.href='/';   
                }, 1000);
            }
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

verifyemail.propTypes = {
    handleFormSubmit: PropTypes.func,
    verifyDetailRes: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    verifyDetail: verifyDetailRes,
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(getVerifyEmail(data))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(verifyemail);