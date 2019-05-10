import React, { Component } from 'react';
import {  Row, Col} from 'react-bootstrap';
import './billing.css';
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import TopCardsBilling from './TopCardsBilling';
import InvoiceHistory from './InvoiceHistory';
import Sidebar from './../../commonComponent/sidebar/Sidebar';
import { Link } from 'react-router-dom';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAllPlanListing, getPlanListRes, getCardDetailList, getCardRes, createBillingSummarydata ,createBillingRes,fetchInvoiceHistory,invoiceHistoryRes} from './../../actions/billingActions';
import {getAccountInfoDetail,accountInfoDetailRes} from './../../actions/userActions';
import { createNotification} from './../../commonComponent/notificationbox/index';
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";



const ADD_BILLING = gql`
    mutation createBillingSummary($userId: String!,$planId: String!,$paymentMethodId: String!, $directPay: String!,  $companyId: String!){
        createBillingSummary(userId: $userId, planId:$planId, paymentMethodId:$paymentMethodId, directPay: $directPay,  companyId:$companyId){
            userId
            paymentMethodId
            planId
            directPay
            companyId

    }
    }
    `;

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlan: "",
            planList: [],
            paymentDetailList: [],
            loaderState: false,
            Directpay:'',
            Getpromocode:'',
            promocode:'',
            discountOff: false,
            whatsInclude:false,
            selectedCard: '',
            directPay:'false',
            userinfo:'',
            InvoiceHistoryList:[]
        }
    }

    componentWillMount() {
            let userinfo=localStorage.getItem("logindata")
            let userDetail=JSON.parse(userinfo)

            console.log(userDetail)
            if(userDetail){
                this.setState({
                    companyId: userDetail.companyId,
                    userinfo: userDetail
                },()=>{
                    console.log(this.state.userinfo.id)
                    this.loadBillingDetail();
                    this.loadInvoice();
                })


                let sendRequestCardGet = {
                    "operationName":null,
                    "variables":{},
                    "query":"{\n  fetchAddCardByCompanyId(companyId: \""+userDetail.companyId+"\") {\n    id\n    cardType\n    cardNumber\n    nameOnCard\n  }\n}\n"}
                this.props.fetchCardDetail(sendRequestCardGet);
        
            }
           
            let sendRequest = {
                "operationName": null,
                "variables": {},
                "query": "{\n  fetchAllPlans {\n    id\n    planName\n    amount\n    maxRetro\n    maxRetroAdmin\n    maxCompanyAdmin\n  }\n}\n"
            }
            this.props.fetchPlanList(sendRequest);

       

        this.setState({
            loaderState: true
          })
    }

    loadBillingDetail(){
        let sendReques1={"operationName":null,"variables":{},"query":"{\n  adminUserBar(companyId: \""+this.state.userinfo.companyId+"\") {\n    id\n    companyAdminCount\n    retroAdminCount\n    retroAdminCount\n    registeredAttendesCount\n    guestCount\n    amount\n    companyName\n    currentPlanId\n    planInfo\n    user {\n      id\n      email\n    }\n  }\n}\n"}
        this.props.loadAccountInfoDetails(sendReques1)
    }

    loadInvoice(){
        let getInvoice={
            "operationName":null,
            "variables":{},
            "query":"{\n  fetchAllVoiceHistory(companyId: \""+this.state.userinfo.companyId+"\") {\n    id\n    planId\n    promoCodeId\n    paymentMethodId\n    companyId\n    planInfo\n    paymentInfo\n    directPay\n  }\n}\n"}
        this.props.fetchInvoiceHistory(getInvoice);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.planList && nextProps.planList.data.billingReducer) {
                if(nextProps.planList.data.billingReducer.data && nextProps.planList.data.billingReducer.data.fetchAllPlans){
                    let PlanList = nextProps.planList.data.billingReducer.data.fetchAllPlans;
                    this.setState({
                        planList: PlanList,
                        loaderState: false
                    }, () => {
                    })
                }
            }

            if (nextProps.cardDetail && nextProps.cardDetail.card.billingReducer ) {
                if(nextProps.cardDetail.card.billingReducer.data && nextProps.cardDetail.card.billingReducer.data.fetchAddCardByCompanyId){
                    let paymentDetail = nextProps.cardDetail.card.billingReducer.data.fetchAddCardByCompanyId;
                    this.setState({
                        paymentDetailList: paymentDetail,
                        loaderState: false
                    }, () => {
                    })
                }
            }


            if (nextProps.createBill && nextProps.createBill.user.billingReducer ) {

                if(nextProps.createBill.user.billingReducer.errors && nextProps.createBill.user.billingReducer.errors.length>0){
                    createNotification("error",nextProps.createBill.user.billingReducer.errors[0].message)
                }
                if(nextProps.createBill.user.billingReducer.data && nextProps.createBill.user.billingReducer.data.createBillingSummary){
                    createNotification("success","Bill added Successfully")
                }   

            }
            if (nextProps.invoiceHistory && nextProps.invoiceHistory.user.billingReducer ) {
                if(nextProps.invoiceHistory.user.billingReducer.errors && nextProps.invoiceHistory.user.billingReducer.errors.length>0){
                    createNotification("error",nextProps.createBill.user.billingReducer.errors[0].message)
                }
                if(nextProps.invoiceHistory.user.billingReducer.data && nextProps.invoiceHistory.user.billingReducer.data.fetchAllVoiceHistory){
                    
                    let invoiceList=nextProps.invoiceHistory.user.billingReducer.data.fetchAllVoiceHistory
                    if(invoiceList){
                        for(let item  of invoiceList){
                            item.planInfo1=JSON.parse(item.planInfo);
                            item.paymentInfo1=JSON.parse(item.paymentInfo)
    
                        }
                        this.setState({
                            InvoiceHistoryList:invoiceList
                        },()=>{
                        })
                    }

                   
                    
                  
                }   
            }
        }
    }

    getplan(value) {
        if(value){

            for(let item of this.state.planList){
                if(item.id==value){
                    this.setState({
                        selectedPlan: item,
                        whatsInclude:true
                    },()=>{
                    })
                }
            }
           
        }
    }
    onSelectCard(value){
        console.log(value)
        if(value){
            this.setState({
                selectedCard:value
            })
        }

    }

    GetDiscount(){
        if(this.state.promocode){
            this.setState({
                discountOff: true
            })
        }else{
            createNotification("error","please Enter Promocode");
        }
    }

    addBill(){
        let sendRequest={
            "operationName":null,
            "variables":{},
            "query":"mutation {\n  createBillingSummary(userId: \""+this.state.userinfo.id+"\", planId: \""+this.state.selectedPlan.id+"\", paymentMethodId: \""+this.state.selectedCard+"\", companyId: \""+this.state.userinfo.companyId+"\", directPay: \""+this.state.directPay+"\") {\n    id\n    planId\n    promoCodeId\n    paymentMethodId\n    finalAmount\n    companyId\n  }\n}\n"}
        this.props.handleFormSubmit(sendRequest);
    }

    render() {
        if (this.state.planList) {
            console.log(this.state.planList)
        }

        if (this.state.paymentDetailList) {
            console.log(this.state.paymentDetailList)
        }
        return (
            
            <div id="billing" className="body-content cust-bg newBg">
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <HeaderComponent />
                <div className="zIndexTop container-fluid pb-5">
                    <div className="maxWidth-1260px">
                        <Row >
                            <Col md={3} className="sideBar">
                                <Sidebar />
                            </Col>
                            <Col md={9} className="data-right redBg">
                                <Row>
                                    <TopCardsBilling AccountInfo={this.props.accountInfoDetailRes}/>

                                </Row>
                                <Row className="spacerRow mb-2">
                                    <Col xs={12}></Col>
                                </Row>
                                <ApolloConsumer>
                                {client => (
                                    <Mutation mutation={ADD_BILLING}  >
                                    {(DoCreate, { error }) => {
                                        return (  
                                    <Row>
                                        <Col md={12} >
                                            <div className="infoCard  pt-4 pb-5 pl-3 pr-3 d-flex flexWrap">
                                                <Col md={6}>
                                                    <div>
                                                        <h4 className="text-db-blue billing_page_title">Billing Summary</h4>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                </Col>
                                                <Col md={6} className="pr-4">
                                                    <div className="biliingcontact">
                                                        <p className="text-dk-grey">Plan</p>
                                                    </div>
                                                    <div className="select-plan-dropdown">
                                                        <div className="dropdown">
                                                            <select onChange={(evt) => this.getplan(evt.target.value)} id="saveteamplate" className="form-control minimal plans-select-field" >
                                                                <option>Select Plan</option>
                                                                {this.state.planList && this.state.planList.length>0 &&<optgroup id="selectbox" label="Enterprise Plan">
                                                                    {(this.state.planList && this.state.planList.length > 0) && this.state.planList.map((item, index) => {
                                                                        return <option value={item.id} key={index} >{item.planName}</option>
                                                                    })}
                                                                </optgroup>}
                                                                {this.state.planList && this.state.planList.length==0 &&<optgroup id="selectbox" label="No Plan Available">
                                                                    
                                                                </optgroup>}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {this.state.selectedPlan && <div className="greyBox mt-3 d-flex">
                                                        <Col md={6} className="text-center biliingcontact text-dk-grey">What's include:</Col>
                                                        <Col md={6} className="text-center text-lg-grey">
                                                            <div className="text-left">$ {this.state.selectedPlan.amount} amount </div>
                                                            <div className="text-left">{this.state.selectedPlan.maxCompanyAdmin} Retro Admins </div>
                                                            <div className="text-left">{this.state.selectedPlan.maxRetro} Retros</div>
                                                        </Col>
                                                    </div>}
                                                    <div className="mt-3 biliingcontact" >
                                                        <p className="text-dk-grey">Promo Code</p>
                                                    </div>
                                                    <div className="fontGreySmall">
                                                        <p>
                                                            <span>Active Promo Code :</span>
                                                            {this.state.Getpromocode && <span>
                                                                <span className="colorDarkBlue">Bluth Company </span> <span className="colorLightBlue">DISABLE</span>
                                                            </span>}
                                                            {!this.state.Getpromocode && <span>
                                                                <span className="colorDarkBlue">
                                                                    <input style={{width:"50%"}} type="text" value={this.state.promocode} onChange={(e) => this.setState({ promocode: e.target.value })} placeholder="Enter Promocode" id="template-title" />
                                                                </span> <span onClick={()=>this.GetDiscount()} className="ApplyButton">APPLY</span>
                                                            </span>}
                                                            
                                                        </p>
                                                        {this.state.discountOff == true &&
                                                            <span className="d-block">15% Off every month</span>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md={6} className="pl-4">
                                                    <div className="biliingcontact text-dk-grey">
                                                        Payment Method
                                                        <Link to="/addcard"> <button type="button" className="btn btn-warning d-block paymentMethodButton" >Add Card</button></Link>
                                                    </div>
                                                    <p></p>
                                                    <div className="biliingcontact text-dk-grey">
                                                    Select Payment Method
                                                    
                                                            <select onChange={(evt) => this.onSelectCard(evt.target.value)} id="saveteamplate" className="form-control minimal plans-select-field" >
                                                                <option>Select Card</option>
                                                                
                                                                    {(this.state.paymentDetailList && this.state.paymentDetailList.length > 0) && this.state.paymentDetailList.map((item, index) => {
                                                                        return <option value={item.id} key={index} >{item.nameOnCard} {item.cardNumber}</option>
                                                                    })}
                                                            </select>
                                                    </div>
                                                    
                                                    <div className="biliingcontact mt-4 text-dk-grey">
                                                        Direct Pay
                                                    </div>
                                                    <div className="graybox1 max-width-125px">
                                                        <div className="account-type-dropdown width-100">
                                                            <div className="dropdown">
                                                                <button className="btn btn-secondary dropdown-toggle bdr-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                {this.state.directPay==="false"&& <span>Off</span>}
                                                                {this.state.directPay!=="false"&& <span>On</span>}
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item handPointer" onClick={()=>this.setState({directPay: "false"})}>Off</a>
                                                                    <a className="dropdown-item handPointer"  onClick={()=>this.setState({directPay: "true"})}>On</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <div className="row" style={{ width: "100%", margin: "18px 0px" }}>
                                                    <button type="button" className="updateChanges-btn" style={{ margin: "auto" }}  onClick={
                                            async (e) => {
                                              e.preventDefault();
                                              console.log(this.state);
                                           

                                            if(this.state.selectedPlan===""){
                                                createNotification("error","Please select plan");
                                                return false;
                                            }
                                            if(this.state.selectedCard===""){
                                                createNotification("error","Please select card ");
                                                return false;
                                            }
                                      
                                            this.setState({
                                                loaderState:true
                                            })
                                            
                                            await client.mutate({
                                                mutation: ADD_BILLING,
                                                variables: { 
                                                    userId:this.state.userinfo.id,
                                                    planId:this.state.selectedPlan.id ,
                                                    paymentMethodId: this.state.selectedCard  ,
                                                    companyId: this.state.userinfo.companyId ,
                                                    directPay: this.state.directPay
                                                  }
                                              }).then(({ data }) => {
                                                console.log(data)
                                                createNotification("success","Bill Added Successfully")
                                                this.loadInvoice();
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
                                            
                                          } }>Submit</button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                 )  }}
                                 </Mutation>
                                )}
                            </ApolloConsumer>
                                <Row className="spacerRow mb-2">
                                    <Col xs={12}></Col>
                                </Row>
                                <Row>
                                    <Col md={12} >
                                        <InvoiceHistory InvoiceHistoryList={this.state.InvoiceHistoryList}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* End Main Page Structure Begin */}
                <div className="spacer"></div>
                <div className="spacer"></div>
                <FooterComponent />
            </div>
        );
    }
}

Billing.propTypes = {
    cardDetail: PropTypes.any,
    getPlanListRes: PropTypes.any,
    createBill: PropTypes.any,
    invoiceHistory:PropTypes.any,
    accountInfoDetailRes:  PropTypes.any


};

const mapStateToProps = createStructuredSelector({
    cardDetail: getCardRes,
    planList: getPlanListRes,
    createBill: createBillingRes,
    invoiceHistory:invoiceHistoryRes,
    accountInfoDetailRes:accountInfoDetailRes

});

function mapDispatchToProps(dispatch) {
    return {
        fetchCardDetail: (data) => dispatch(getCardDetailList(data)),
        fetchPlanList: (data) => dispatch(getAllPlanListing(data)),
        handleFormSubmit: (data) => dispatch(createBillingSummarydata(data)),
        fetchInvoiceHistory: (data) => dispatch(fetchInvoiceHistory(data)),
        loadAccountInfoDetails: (data) => dispatch(getAccountInfoDetail(data)),

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Billing);