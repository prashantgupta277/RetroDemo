import React from 'react';
import {  Col, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {deleteUserFromList} from './../../actions/userActions';

/* eslint-disable react/prefer-stateless-function */
class DisableAccounts extends React.Component {

  constructor(props){
    super(props)
    this.state={
      userdata:''
    }
  }
  componentWillMount(){
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        console.log(userdata.companyId)

        if(userdata){
          this.setState({
            userdata: userdata
          })

        }

  }

  doDisable(){
    let sendRequest={
      "operationName":null,
      "variables":{},
      "query":"mutation {\n  updateUser(id: \""+this.state.userdata.id+"\", userStatus: \""+"0"+"\") {\n    firstName\n    lastName\n    id\n    userStatus\n    companyName\n    addressLine1\n    addressLine2\n    city\n    state\n    zipCode\n  }\n}\n"}
      console.log(sendRequest)
      this.props.deleteUser(sendRequest);

      setTimeout(()=>{
        localStorage.clear()
        window.location.href="/"
      },1000)

  }

  doDelete(){
    let sendRequest = {
        "operationName": null,
        "variables": {},
        "query": "mutation {\n  singleUserDelete(id: \"" + this.state.userdata.id  + "\") {\n    id\n    email\n  }\n}\n"
    }
    console.log(sendRequest)
    this.props.deleteUser(sendRequest);
  }
  render() {
    return (
      <React.Fragment>
        <div className="infoCard pt-5 pb-5 pl-3 pr-3">
          <Col md={12}>
            <h3 className="text-db-blue section-title" >Disable Account</h3>
            <p className="text-lg-grey">Accounts have being disabled will disable all their associated users, and they will no longer be able to access their renderToStringWithData. </p>
          </Col>
          <Col md={12} >
            <div className="text-center">
              <Button onClick={()=>{this.doDisable()}} className="mr-2 btn-outline-warning orangeBtn">Disable Account</Button>
              <Button  onClick={()=>{this.doDelete()}} className="btn-outline-warning orangeBtn">Delete Account</Button></div>

          </Col>
        </div>
      </React.Fragment>
    );
  }
}


DisableAccounts.propTypes = {
};

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
      deleteUser: (data) => dispatch(deleteUserFromList(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DisableAccounts);

// export default DisableAccounts;