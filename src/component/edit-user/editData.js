import React from 'react';
import { getUserDetail, userDetailRes, updateUserProfile, doUpdateProfileRes } from './../../actions/userActions';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNotification} from '../../commonComponent/notificationbox/index';

import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";




const UPDATE_USER = gql`
    mutation updateUser($id: ID!,$firstName: String!,$lastName: String!,  $isCompanyAdmin: String!){
        updateUser(id: $id, firstName:$firstName, lastName:$lastName,isCompanyAdmin: $isCompanyAdmin){
    
        firstName
        lastName
        email
        companyId
        isCompanyAdmin

    }
    }`;


/* eslint-disable react/prefer-stateless-function */
class EditData extends React.Component {

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
            isCompanyAdmin:""
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.userDetail && nextProps.userDetail.data.users.data.fetchSingleUser) {
                let userInfo = nextProps.userDetail.data.users.data.fetchSingleUser;
                this.setState({
                    userDetail: userInfo,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    isCompanyAdmin: userInfo.isCompanyAdmin,
                    loaderState: false,
                }, () => {
                    console.log(this.state.userDetail)
                })
            }
        }
    }

    BackOnCancel() {
        this.props.history.goBack();
    }


    render() {
        return (
            <React.Fragment>
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div id="userList" className="infoCard  edituser_content_box">
                    <div className="form-box-wrapper account-details-box">
                        <h4 className="edit_user_page_title">Edit user</h4>
                        <ApolloConsumer>
                            {client => (
                                <Mutation mutation={UPDATE_USER}  >
                                {(doUpdate, { error }) => {
                                    return (<div className="form-box">
                            <div className="form-box-header">

                            </div>
                            <div className="form-box-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label htmlFor="first-name">First Name</label>
                                            <input type="text" placeholder="Ann Egg" id="first-name" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-feild-box">
                                            <label htmlFor="last-name">Last Name</label>
                                            <input type="text" placeholder="Veal" id="last-name" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-feild-box">
                                    <label htmlFor="Email">Email</label>
                                    <input type="text" placeholder="Email" id="Email" value={this.state.email} readOnly={true}/>
                                </div>
                                <div className="form-feild-box  form-phonenumber-feild-box">
                                    <label htmlFor="category4">Account Type</label>
                                    <div className="account-type-dropdown">

                                        <select id="saveteamplate" className="form-control minimal" value={this.state.isCompanyAdmin} onChange={(e) => this.setState({ isCompanyAdmin: e.target.value })}>
                                            <option value="" >Select Account Type</option>
                                            <option value="false" >Guest</option>
                                            <option value="true" >Admin</option>
                                        </select>
                                        
                                    </div>
                                </div>
                                <div className="ra">
                                    <p className="text-lg-grey">Retro Admins can create and run sprint retrospectives,as well as see their own retrospective history.</p>
                                </div>
                            </div>
                            <div className="form-box-footer">
                                <div className="buttons-box">
                                    <button  onClick={
                                        async (e) => {
                                          e.preventDefault();
                                        
                                        if(this.state.firstName===""){
                                            createNotification("error","Please enter first name");
                                            return false;
                                        }
                                        if(this.state.lastName===""){
                                            createNotification("error","Please enter last name");
                                            return false;
                                        }
                                       
                                        if (this.state.isCompanyAdmin === "") {
                                            createNotification("error","Please select account type");
                                            return false;
                                        }
                                        // console.log( this.state)
                                        // var data = localStorage.getItem('logindata');
                                        // var userdata = JSON.parse(data);

                                        
                                  
                                          this.setState({
                                              loaderState:true
                                          })
                                          

                                        await client.mutate({
                                            mutation: UPDATE_USER,
                                            variables: { 
                                                    id: this.state.userDetail.id,
                                                    firstName: this.state.firstName ,
                                                    lastName: this.state.lastName ,   
                                                    isCompanyAdmin: this.state.isCompanyAdmin,
                                              }
                                          }).then(({ data }) => {
                                            console.log(data)
                                            createNotification("success", "User Update Successfully")
                                              setTimeout(()=>{
                                                  this.setState({
                                                    loaderState:false,                                     
                                                  })
                                              },1000)
                                              
                                            })
                                            .catch(({ graphQLErrors }) => {
                                            //This variable returns an array of errors
                                              console.log(graphQLErrors)
                                              if(graphQLErrors){
                                                createNotification("error",graphQLErrors[0].message)
                                                console.log( graphQLErrors[0].message );
                                                this.setState({
                                                  loaderState:false
                                                })
                                              }
                                              
                                            })
                                        
                                      } } className="saveChanges-btn">Update User</button>
                                </div>
                            </div>
                        </div>
                        )  }}
                        </Mutation>
                        )}
                   </ApolloConsumer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


EditData.propTypes = {
    userDetail: PropTypes.any,
    updateUserInfo: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    userDetail: userDetailRes,
    updateUserInfo: doUpdateProfileRes
});

function mapDispatchToProps(dispatch) {
    return {
        fetchdetail: (data) => dispatch(getUserDetail(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditData);

// export default ;