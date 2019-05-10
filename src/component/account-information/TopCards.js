import React from 'react';
import {Col} from 'react-bootstrap';

/* eslint-disable react/prefer-stateless-function */
class TopCards extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            AccountInfo:[],
            planInfo:[]
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)

        if(nextProps){
                if(nextProps.AccountInfo && nextProps.AccountInfo.data.users.data ){

                        if(nextProps.AccountInfo.data.users.data.adminUserBar){
                            let response=nextProps.AccountInfo.data.users.data.adminUserBar;
                            this.setState({
                                AccountInfo:response,
                                planInfo:JSON.parse(response.planInfo)
                            },()=>{
                                console.log(this.state.planInfo)
                            })
                        }

                }
        }
    }
  render() {
    return (
    <React.Fragment> 
           <Col md={4} className="pr-0" >
                        <div className="infoCard d-flex fd-Column p-2 pb-4">
                            <div className="al-Self">Users</div>
                            <div className="al-Self">
                                <span className="rate-num">{this.state.AccountInfo.retroAdminCount?this.state.AccountInfo.retroAdminCount:0}
                                </span>/{this.state.planInfo.maxRetroAdmin?this.state.planInfo.maxRetroAdmin:0}</div>
                            <div className="al-Self self-bold">Retro Admins</div>
                        </div> 
                          
                    </Col>
                    <Col md={4} className="pr-0 pl-1">
                        <div className="infoCard d-flex fd-Column p-2 pb-4">
                            <div className="al-Self">Retros</div>
                            <div className="al-Self"><span className="rate-num">{this.state.planInfo.maxRetro?this.state.planInfo.maxRetro:0}</span></div>
                            <div className="al-Self self-bold">Retrospective to date</div>
                        </div>       
                    </Col>
                    <Col md={4} className="pl-1">
                        <div className="infoCard d-flex fd-Column p-2 pb-4">
                            <div className="al-Self">Billing</div>
                            <div className="al-Self"><span className="rate-num">${this.state.planInfo.amount?this.state.planInfo.amount:0}</span></div>
                            <div className="al-Self self-bold"><span className="error"><i className="fas fa-exclamation-circle"></i> Failed </span> on 11 Oct 18</div>
                        </div>      
                    </Col>
               
              
    </React.Fragment>
    );
  }
}

export default TopCards;