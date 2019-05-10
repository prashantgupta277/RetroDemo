import React from 'react';
import { Col } from 'react-bootstrap';
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
class TopCards extends React.Component {

    constructor(props){
        super(props)
        this.state={
            billingAmount:"",
            accountType:"",
            retroAdmin:"",
            planInfo:[],
            dueDate:[]


        }


    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)

        if(nextProps.AccountInfo && nextProps.AccountInfo.data.users.data && nextProps.AccountInfo.data.users.data.adminUserBar){
            console.log( nextProps.AccountInfo.data.users.data.adminUserBar)
            let getAccountInfo= nextProps.AccountInfo.data.users.data.adminUserBar;
            this.setState({
                billingAmount: getAccountInfo.amount,
                planInfo: JSON.parse(getAccountInfo.planInfo),
                retroAdmin: getAccountInfo,
               
            },()=>{
                this.setState({
                    dueDate: getAccountInfo = moment(new Date(this.state.planInfo.createdAt)).format('D MMM  YYYY')
                })
                console.log(this.state.planInfo)
            })

        }
    }
    render() {
        return (
            <React.Fragment>
                <Col md={4} className="pr-0" >
                    <div className="infoCard d-flex fd-Column p-2 pb-4">
                        <div className="al-Self text-db-blue">Billing</div>
                        <div className="al-Self"><span className="rate-num">${this.state.billingAmount}</span></div>
                        <div className="al-Self self-bold text-db-blue2"><span className="error"><i className="fas fa-exclamation-circle"></i> Failed </span> on 11 Oct 18</div>
                    </div>

                </Col>
                <Col md={4} className="pr-0 pl-1">
                    <div className="infoCard d-flex fd-Column p-2 pb-4">
                        <div className="al-Self text-db-blue">Account</div>
                        <div className="al-Self"><span className="rate-num">{this.state.planInfo.planName}</span></div>
                        <div className="al-Self self-bold text-db-blue2">${this.state.billingAmount} Due on {this.state.dueDate}</div>
                    </div>
                </Col>
                <Col md={4} className="pl-1">
                    <div className="infoCard d-flex fd-Column p-2 pb-4">
                        <div className="al-Self text-db-blue">Users</div>
                        <div className="al-Self"><span className="rate-num">{this.state.retroAdmin.retroAdminCount} <span style={{ fontSize: "40%", fontWeight: "400" }}>/{this.state.planInfo.maxRetroAdmin}</span></span></div>
                        <div className="al-Self self-bold mt-0 text-db-blue2">Retro Admins</div>
                    </div>
                </Col>


            </React.Fragment>
        );
    }
}

export default TopCards;