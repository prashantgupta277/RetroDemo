import React, { Component } from 'react';
import './addcard.css';
import HeaderComponent from '../../commonComponent/header';
import FooterComponent from '../../commonComponent/footer';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { submit_CreteCard, CreateCardRes } from '../../actions/addCardActions';
import { createNotification } from '../../commonComponent/notificationbox';


import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";

const ADD_CARD = gql`
mutation createAddCard($cardNumber: String!,$cardType: String!,$expirationDate: String!, $nameOnCard: String!, $addressLine1: String!,$addressLine2: String!, $companyId: String!,$userId: ID!,$city: String!,$state: String!,$zipCode: String!){
    createAddCard(cardNumber: $cardNumber, cardType:$cardType, expirationDate:$expirationDate, nameOnCard: $nameOnCard, addressLine1: $addressLine1,addressLine2: $addressLine2, companyId:$companyId,userId:$userId,city:$city,state:$state,zipCode:$zipCode){
    cardType
    expirationDate
    cardNumber
    nameOnCard
    addressLine1
    addressLine2
    state
    zipCode

  }
}
`;



class Addcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
            cardType: "",
            expirationDate: "",
            securityCode: "",
            nameOnCard: "",
            addressLine1: '',
            addressLine2: '',
            city: "",
            state: "",
            zipCode: "",
            userInfo:"",
            loaderState: false
        }
    }

    componentWillMount(){
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);

        if(userdata){
            this.setState({
                userInfo: userdata
            },()=>{
                console.log(this.state.userInfo)
            })
        }
        // console.log(userdata)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps);
            if (nextProps.createResponse && nextProps.createResponse.data.addCardReducer.data) {
                let retroResponse = nextProps.createResponse.data.addCardReducer.data.createAddCard;
                this.setState({
                    loaderState: false
                })
                if (retroResponse) {
                    this.props.history.goBack();
                } else {
                    alert('something wents wrong')
                }

            }
        }
    }

    AddCard() {
        
        if(this.state.cardNumber===""){
            createNotification("error","Please enter card number");
            return false;
        }
        if(this.state.cardType===""){
            createNotification("error","Please enter card type");
            return false;
        }
        if(this.state.expirationDate===""){
            createNotification("error","Please enter expiration date");
            return false;
        }
        if(this.state.securityCode===""){
            createNotification("error","Please enter security Code");
            return false;
        }
        if(this.state.nameOnCard===""){
            createNotification("error","Please enter name on card");
            return false;
        }
        if(this.state.addressLine1===""){
            createNotification("error","Please enter addressLine1");
            return false;
        }
        if(this.state.addressLine2===""){
            createNotification("error","Please enter addressLine2");
            return false;
        }
        if(this.state.city===""){
            createNotification("error","Please enter city");
            return false;
        }
        if(this.state.state===""){
            createNotification("error","Please select state");
            return false;
        }if(this.state.zipCode===""){
            createNotification("error","Please enter zipcode");
            return false;
        }
       
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  createAddCard(companyId: \"" + this.state.userInfo.companyId + "\", userId: \"" + this.state.userInfo.id + "\",cardNumber: \"" + this.state.cardNumber + "\", cardType: \"" + this.state.cardType + "\", expirationDate: \"" + this.state.expirationDate + "\", securityCode: \"" + this.state.securityCode + "\", nameOnCard: \"" + this.state.nameOnCard + "\", addressLine1: \"" + this.state.addressLine1 + "\", addressLine2: \"" + this.state.addressLine2 + "\", city: \"" + this.state.city + "\", state: \"" + this.state.state + "\", zipCode: \"" + this.state.zipCode + "\") {\n    id\n    cardNumber\n    cardType\n    expirationDate\n    securityCode\n    nameOnCard\n    addressLine1\n    addressLine2\n    user {\n      id\n      email\n    }\n  }\n}\n"
        }
        console.log(sendRequest)
        this.setState({
            loaderState: true
        })
        this.props.handleFormSubmit(sendRequest)
    }

    BackOnCancel() {
        this.props.history.goBack();
    }

    check_Number(data, value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            if(data == "cardNumber"){
                this.setState({ cardNumber : value } )
            }
            if(data == "securityCode"){
                this.setState({ securityCode : value } )
            }
        }
    }


    render() {
        return (
            <div className="App">
                <HeaderComponent />
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                  <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="scroll-assist" id="addcart-page-wrapper">
                    <div className="container-fluid">
                        <div className="col-md-12 text-left">
                            <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                                <li><a href="/billing">Billing</a></li>
                                <li><a className="breadcrumb-current">Add Payment Method</a></li>
                            </ol>
                        </div>
                        <ApolloConsumer>
                            {client => (
                                <Mutation mutation={ADD_CARD}  >
                                {(DoCreate, { error }) => {
                                    return ( 
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
                                        <input type="text" value={this.state.cardNumber} onChange={(e) => this.check_Number("cardNumber",e.target.value )} minLength="16" maxLength="16" placeholder="2222 2222 2222 2222" id="card-number" />
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
                                                <input type="text" maxLength="3" value={this.state.securityCode} onChange={(e) => this.check_Number("securityCode", e.target.value )}placeholder="222" id="security-code" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-box-header">
                                        <h6>Billing Address</h6>
                                    </div>
                                    <div className="form-feild-box">
                                        <label htmlFor="name-on-card">Name on Card</label>
                                        <input type="text" value={this.state.nameOnCard} onChange={(e) => this.setState({ nameOnCard: e.target.value })} placeholder="Ann Veal" id="name-on-card" />
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
                                        <button type="button" className="saveChanges-btn" 
                                        onClick={
                                            async (e) => {
                                              e.preventDefault();
                                              console.log(this.state);
                                              if(this.state.cardNumber===""){
                                                createNotification("error","Please enter card number");
                                                return false;
                                            }
                                            if(this.state.cardType===""){
                                                createNotification("error","Please enter card type");
                                                return false;
                                            }
                                            if(this.state.expirationDate===""){
                                                createNotification("error","Please enter expiration date");
                                                return false;
                                            }
                                            if(this.state.securityCode===""){
                                                createNotification("error","Please enter security Code");
                                                return false;
                                            }
                                            if(this.state.nameOnCard===""){
                                                createNotification("error","Please enter name on card");
                                                return false;
                                            }
                                            if(this.state.addressLine1===""){
                                                createNotification("error","Please enter addressLine1");
                                                return false;
                                            }
                                            if(this.state.addressLine2===""){
                                                createNotification("error","Please enter addressLine2");
                                                return false;
                                            }
                                            if(this.state.city===""){
                                                createNotification("error","Please enter city");
                                                return false;
                                            }
                                            if(this.state.state===""){
                                                createNotification("error","Please select state");
                                                return false;
                                            }if(this.state.zipCode===""){
                                                createNotification("error","Please enter zipcode");
                                                return false;
                                            }
                                      
                                              this.setState({
                                                  loaderState:true
                                              })
                                              
                                              
                                            await client.mutate({
                                                mutation: ADD_CARD,
                                                variables: { 
                                                    userId:this.state.userInfo.id,
                                                    companyId:this.state.userInfo.companyId ,
                                                    cardNumber: this.state.cardNumber  ,
                                                    cardType: this.state.cardType ,
                                                    expirationDate: this.state.expirationDate ,
                                                    securityCode: this.state.securityCode ,
                                                    nameOnCard: this.state.nameOnCard ,
                                                    addressLine1: this.state.addressLine1 ,
                                                    addressLine2: this.state.addressLine2 ,
                                                    state: this.state.state ,
                                                    city: this.state.city ,
                                                    zipCode: this.state.zipCode ,


                                                  }
                                              }).then(({ data }) => {
                                                console.log(data)
                                                createNotification("success","Card Added Successfully")
                                                  setTimeout(()=>{
                                                      this.setState({
                                                          loaderState:false,                                            
                                                      })
                                                      this.props.history.goBack();
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
                                            
                                          } }>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    )  }}
                </Mutation>
                )}
                </ApolloConsumer>
                    </div>
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

Addcard.propTypes = {
    handleFormSubmit: PropTypes.func,
    createRetroResponse: PropTypes.any,
};


const mapStateToProps = createStructuredSelector({
    createResponse: CreateCardRes,
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submit_CreteCard(data))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Addcard);