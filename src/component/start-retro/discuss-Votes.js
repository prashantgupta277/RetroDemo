import React, { Component } from 'react';
import './startretro.css';
import fullscreen_icon from './img/full_screen_icon.jpg';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { doUpdateThought,updateThoughtRes,} from '../../actions/createThought';




class DiscussVotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thoughtList:{},
            userid:'',
            RetroCategory:"",
            thoughtText:"",
            retroCategory1:"",
            retroCategory2:"",
            retroCategory3:"",
            retroCategory4:"",
        }


    
    }
    componentWillMount(){
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        this.setState({
            userinfo:userdata,
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            
            if(nextProps.firstCatThought){
                this.setState({
                    firstCatThought:nextProps.firstCatThought
                })
            }
            if(nextProps.secondCatThought){
                this.setState({
                    secondCatThought:nextProps.secondCatThought
                })
            }
            if(nextProps.thirdCatThought){
                this.setState({
                    thirdCatThought:nextProps.thirdCatThought
                })
            }
            if(nextProps.fourthCatThought){
                this.setState({
                    fourthCatThought:nextProps.fourthCatThought
                })
            }

            if(nextProps.discussGrpCat1){
                this.setState({
                    discussGrpCat1: nextProps.discussGrpCat1
                })
            }
            if(nextProps.discussGrpCat2){
                this.setState({
                    discussGrpCat2: nextProps.discussGrpCat2
                })
            }if(nextProps.discussGrpCat3){
                this.setState({
                    discussGrpCat3: nextProps.discussGrpCat3
                })
            }if(nextProps.discussGrpCat4){
                this.setState({
                    discussGrpCat4: nextProps.discussGrpCat4
                })
            }
            
        }
        
        
    }

    isLikeGroup(groupList){

        if(!groupList[0].userLike && this.props.voteUser>2){
              alert("You can't vote more than 3 ")
              return false;
        }

        if(groupList[0].userLike){
            groupList[0].userLike=false;
        }else{
            groupList[0].userLike=true;
        }
        for(let items of groupList){
            let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  updateLikeThought(thoughtId: \""+items.id+"\", isEdit: \""+"false"+"\", userId: \""+this.state.userinfo.id+"\") {\n    id\n    thought\n    Like\n   thought\n    category\n    userId {\n      id\n    }\n }\n}\n"}
    
            this.props.updateThought(sendRequest)
        }
        if(this.props.adminCheck){
            setTimeout(() => {
                this.props.reloadThoughts();
            }, 500);
        }
        
    }


    render() {        
        return (
            <div className="tab-content-box-item" id="discuss-votes">
                <div className="chat-boxes">
                    <div className="chat-boxes-inner">
                        <h4>{this.state.retrocategory1}</h4>
                        

                        {this.state.discussGrpCat1 && this.state.discussGrpCat1.map((val,index)=>{
                            return ( 
                                <div  key={index} className="thoughts-group-body-inner" style={{position:'relative'}}>
                                    <div>
                                        {val.isGrp &&<div className="thoughts-group-header" > 
                                            <h6 className="floatLeft" >{val.isGrp ? val.groupName:""}</h6>
                                            <p  className="floatRight">Group <span>{val.grouping ?val.grouping.length:0}</span></p>
                                        </div>}
                                        <p className="showThought">{val.thought}</p>

                                        {val.isGrp && val.grouping && val.grouping.map((data, ind) => {
                                            return (     
                                            <div  className="groupDiv"  key={ind}> </div>
                                            )
                                        })}
                                        <p></p>
                                    </div>
                                    <div className="thumb-icon active" >
                                        <button type="button" className="activeLikeButton discussVotebutton">
                                        {val.totalVoteCount? val.totalVoteCount: 0}  &nbsp;<i className="fa fa-thumbs-up "></i></button>
                                    </div>
                                </div>)
                        })}

                    </div>
                    
                        <button className="full_screen_icon" onClick={()=>this.openModelDetail('1')}><img src={fullscreen_icon} alt="fullscreen_icon"/></button>
                    
                </div>
                <div className="chat-boxes">
                    <div className="chat-boxes-inner">
                        <h4>{this.state.retrocategory2}</h4>
                        {this.state.discussGrpCat2 && this.state.discussGrpCat2.map((val,index)=>{
                            return ( 
                                    <div  key={index} className="thoughts-group-body-inner" style={{position:'relative'}}>
                                    <div>
                                        {val.isGrp &&<div className="thoughts-group-header" > 
                                            <h6 className="floatLeft" >{val.isGrp ? val.groupName:""}</h6>
                                            <p  className="floatRight">Group <span>{val.grouping ?val.grouping.length:0}</span></p>
                                        </div>}
                                        <p className="showThought">{val.thought}</p>

                                        {val.isGrp && val.grouping && val.grouping.map((data, ind) => {
                                            return (     
                                            <div  className="groupDiv"  key={ind}> </div>
                                            )
                                        })}
                                        <p></p>
                                    </div>
                                    <div className="thumb-icon active" >
                                        <button type="button" className="activeLikeButton discussVotebutton">
                                        {val.totalVoteCount? val.totalVoteCount: 0}  &nbsp;<i className="fa fa-thumbs-up "></i></button>
                                    </div>
                                </div>)
                        })}
                    </div>
                    
                        <button className="full_screen_icon" onClick={()=>this.openModelDetail('2')}><img src={fullscreen_icon}  alt="fullscreen_icon"/></button>
                    
                </div>
                <div className="chat-boxes">
                    <div className="chat-boxes-inner">
                        <h4>{this.state.retrocategory3}</h4>
                        {this.state.discussGrpCat3 && this.state.discussGrpCat3.map((val,index)=>{
                            
                            return ( 
                                    <div  key={index} className="thoughts-group-body-inner" style={{position:'relative'}}>
                                        <div>
                                            {val.isGrp &&<div className="thoughts-group-header" > 
                                                <h6 className="floatLeft" >{val.isGrp ? val.groupName:""}</h6>
                                                <p  className="floatRight">Group <span>{val.grouping ?val.grouping.length:0}</span></p>
                                            </div>}
                                            <p className="showThought">{val.thought}</p>

                                            {val.isGrp && val.grouping && val.grouping.map((data, ind) => {
                                                return (     
                                                <div  className="groupDiv"  key={ind}> </div>
                                                )
                                            })}
                                            <p></p>
                                        </div>
                                        <div className="thumb-icon active" >
                                            <button type="button" className="activeLikeButton discussVotebutton">
                                            {val.totalVoteCount? val.totalVoteCount: 0}  &nbsp;<i className="fa fa-thumbs-up "></i></button>
                                        </div>
                                </div>)
                        })}
                    </div>
                    
                        <button className="full_screen_icon" onClick={()=>this.openModelDetail('3')}><img src={fullscreen_icon}  alt="fullscreen_icon"/></button>
                    
                </div>
                <div className="chat-boxes">
                    <div className="chat-boxes-inner">
                        <h4>{this.state.retrocategory4}</h4>
                        {this.state.discussGrpCat4 && this.state.discussGrpCat4.map((val,index)=>{

                            return ( 
                                    <div  key={index} className="thoughts-group-body-inner" style={{position:'relative'}}>
                                    <div>
                                        {val.isGrp &&<div className="thoughts-group-header" > 
                                                <h6 className="floatLeft" >{val.isGrp ? val.groupName:""}</h6>
                                                <p  className="floatRight">Group <span>{val.grouping ?val.grouping.length:0}</span></p>
                                            </div>}
                                            <p className="showThought">{val.thought}</p>

                                            {val.isGrp && val.grouping && val.grouping.map((data, ind) => {
                                                return (     
                                                <div  className="groupDiv"  key={ind}> </div>
                                                )
                                            })}
                                            <p></p>
                                        </div>
                                        <div className="thumb-icon active" >
                                            <button type="button" className="activeLikeButton discussVotebutton">
                                            {val.totalVoteCount? val.totalVoteCount: 0}  &nbsp;<i className="fa fa-thumbs-up "></i></button>
                                        </div>
                                </div>)
                        })}
                    </div>
                    
                        <button className="full_screen_icon" onClick={()=>this.openModelDetail('4')}><img src={fullscreen_icon} alt="fullscreen_icon"/></button>
                    
                </div>
            </div>
            )
    }     
}           

DiscussVotes.propTypes = {
    getAddThougthRes: PropTypes.any,
    thoughtList:  PropTypes.any,
    category: PropTypes.any,
    voteUser: PropTypes.any,
    totalVoteCount: PropTypes.any

};

const mapStateToProps = createStructuredSelector({
    updateThoughtRes:updateThoughtRes,

});
    
function mapDispatchToProps(dispatch) {
    return {
        updateThought:(data) => dispatch(doUpdateThought(data)),
        
    };
}
    
const withConnect = connect(mapStateToProps, mapDispatchToProps);
                
export default compose(withConnect)(DiscussVotes);