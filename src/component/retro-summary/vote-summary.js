import React, { Component } from 'react';
import './retrosummary.css';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';



class VoteSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TopVoted: [],
            retrocategory1:'',
            retrocategory2:'',
            retrocategory3:'',
            retrocategory4:'',
            
        }

    }
    componentWillMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {

            if(nextProps.voteSummary){
                console.log(nextProps.voteSummary)
                this.setState({
                    TopVoted: nextProps.voteSummary
                })
            }
            if(nextProps.retrocategory1){
                this.setState({
                    retrocategory1: nextProps.retrocategory1
                })
            }
            if(nextProps.retrocategory2){
                this.setState({
                    retrocategory2: nextProps.retrocategory2
                })
            }
            if(nextProps.retrocategory3){
                this.setState({
                    retrocategory3: nextProps.retrocategory3
                })
            }if(nextProps.retrocategory4){
                this.setState({
                    retrocategory4: nextProps.retrocategory4
                })
            }
           
        }
    }

    
    

    openCollapse(item){
        this.setState({
            isRender: false
        })
        if(item.isOpen===true){
            item.isOpen=false
        }else{
            item.isOpen=true
        }
        this.setState({
            isRender: true
        })
    }

   

    render() {
        return (
            <div>
                    {(this.state.TopVoted && this.state.TopVoted.length > 0) && this.state.TopVoted.map((item, index) => {
                        return (
                            <div className="top-voted-thoughts clearfix" key={index}>
                                {item.grouping ==="" &&<div className="top-voted-thoughts-left">
                                    
                                    {item.getlikeList  ? item.getlikeList.length:0}
                                </div>}
                                {item.grouping!=="" &&<div className="top-voted-thoughts-left">
                                    
                                    {item.grouping[0].likeCount  ? item.grouping[0].likeCount.length:0}
                                </div>}
                                <div className="top-voted-thoughts-right clearfix" onClick={()=>this.openCollapse(item)}  style={{ 'backgroundImage': (item.grouping!=="") ? '' : 'none' }}>
                                    <div className="top-voted-thoughts-content-top">
                                    {item.grouping==="" && <div className="top-voted-thoughts-right-title">
                                            {item.category==="1" ? this.state.retrocategory1:''}
                                            {item.category==="2" ? this.state.retrocategory2:''}
                                            {item.category==="3" ? this.state.retrocategory3:''}{item.category==="4" ? this.state.retrocategory4:''}
                                        </div>}
                                        {item.grouping!=="" && <div className="top-voted-thoughts-right-title">
                                            {item.grouping[0].category==="1" ? this.state.retrocategory1:''}
                                            {item.grouping[0].category==="2" ? this.state.retrocategory2:''}
                                            {item.grouping[0].category==="3" ? this.state.retrocategory3:''}
                                            {item.grouping[0].category==="4" ? this.state.retrocategory4:''}
                                        </div>}
                                        {item.grouping==="" &&<div className="top-voted-thoughts-right-text">
                                            {item.thought}
                                        </div>}
                                        {item.grouping!=="" &&<div className="top-voted-thoughts-right-text">
                                            {item.groupName}
                                        </div>}
                                        {item.isOpen && item.grouping && item.grouping.length>0 && item.grouping.map((grp,ind)=>{
                                            return (
                                            <div key={ind}>
                                            {<div className="top-voted-thoughts-right-text subThought" >
                                                {grp.thought}
                                            </div>}
                                            </div>
                                            )})}
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
                           
        );
    }
}

VoteSummary.propTypes = {
    voteSummary: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
    return {
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(VoteSummary);