import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
class InvoiceHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            InvoiceHistoryList:""
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps.InvoiceHistoryList)
            if(nextProps.InvoiceHistoryList){
                this.setState({
                    InvoiceHistoryList: nextProps.InvoiceHistoryList
                },()=>{
                    console.log(this.state.InvoiceHistoryList);
                })
            }
        
        }
    }

    timeConvert(item){
        let time=""
        if(item.paymentInfo){
            time= moment(new Date(item.paymentInfo.createdAt)).format('MM/DD/YYYY')      
        }
        
       return time;
    }

    render() {
        return (
            <React.Fragment>
                <div id="invoiceHistory" className="infoCard pt-4 pb-4 pl-3 pr-3 invoiceHistory-content">
                    <div className="invoice-history">
                        <div className="invoice invoice-history-title">
                            Invoice History
                </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Date</td>
                                        <td>Amount</td>
                                        <td>Payment Method</td>
                                        <td>Status</td>
                                        <td>Invoice</td>
                                    </tr>
                                </thead>
                                <tbody>
                                   
                                    {this.state.InvoiceHistoryList && this.state.InvoiceHistoryList.map((res,index) =>{
                                        return(<tr  key={index}>
                                            <td>{this.timeConvert(res)}</td>
                                            <td>{res.planInfo1&&<span>{res.planInfo1.amount? res.planInfo1.amount:0}</span>}$</td>
                                            <td>{res.paymentInfo1&& <span>{res.paymentInfo1.nameOnCard} - {res.paymentInfo1.cardNumber}</span>}</td>
                                            <td className="text-red">Payment Failed</td>
                                            <td className="text-red">Re-run Card</td>
                                        </tr>)})
                                    }
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

InvoiceHistory.propTypes = {
    InvoiceHistoryList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    // InvoiceHistoryList: getInoviceListRes,
});

function mapDispatchToProps(dispatch) {
    return {
        // fetchInvoiceList: (data) => dispatch(getAllInvoiceListing(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(InvoiceHistory);