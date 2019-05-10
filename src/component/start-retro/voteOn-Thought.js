import React, { Component } from 'react';
import  FooterComponent from '../../commonComponent/footer';
import { Link } from "react-router-dom";
import timer from './img/timer.png';
import './startretro.css';
import Clipboard from 'react-clipboard.js';
import fullscreen_icon from './img/full_screen_icon.jpg';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import { createStructuredSelector } from 'reselect';
import { getInvite, getAllInviteRes,InviteUsersRetro} from '../../actions/inviteRetorActions';
import { createThoughts,createThoughtRes,getThoughts,fetchThoughtRes,doUpdateThought,updateThoughtRes,doUpdateActivity,updateRetroNote,deleteThought} from '../../actions/createThought';

import { BASE_URL } from '../../constants';
import { createNotification} from '../../commonComponent/notificationbox/index';
import Popover from 'react-simple-popover';
import Modal from 'react-responsive-modal';



class VoteOnThoughts extends Component {
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
            thoughtgroups1:[],
            thoughtgroups2:[],
            thoughtgroups3:[],
            thoughtgroups4:[],
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
            console.log(nextProps)
            
            if(nextProps.thoughtGroups1){
                console.log(nextProps.thoughtGroups1);
                this.setState({
                    thoughtgroups1:nextProps.thoughtGroups1
                }) 
            }
            if(nextProps.thoughtGroups2){
                this.setState({
                    thoughtgroups2:nextProps.thoughtGroups2
                }) 
            }
            if(nextProps.thoughtGroups3){
                this.setState({
                    thoughtgroups3:nextProps.thoughtGroups3
                }) 
            }
            if(nextProps.thoughtGroups4){
                this.setState({
                    thoughtgroups4:nextProps.thoughtGroups4
                }) 
            }
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

            if(nextProps.retroCategory1){
                this.setState({
                    retroCategory1: nextProps.retroCategory1
                })
            }
            if(nextProps.retroCategory2){
                this.setState({
                    retroCategory2: nextProps.retroCategory2
                })
            }if(nextProps.retroCategory3){
                this.setState({
                    retroCategory3: nextProps.retroCategory3
                })
            }if(nextProps.retroCategory4){
                this.setState({
                    retroCategory4: nextProps.retroCategory4
                })
            }
            // console.log(nextProps.thoughtList)
            
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

    isLikeThought(data){
        
        
        if(!data.userLike && this.props.voteUser>2){
            data.userLike=false;
              alert("You can't vote more than 3 ")
              return false;
        }else{
            this.setState({
                isRender: false
            })

            if(data.userLike==="true" || data.userLike===true){
                data.userLike=false;
            }else{
                data.userLike=true;
            }
        }
        this.setState({
            isRender: true
        })
        let sendRequest={
            "operationName":null,
            "variables":{},
            "query":"mutation {\n  updateLikeThought(thoughtId: \""+data.id+"\", isEdit: \""+"false"+"\", userId: \""+this.state.userinfo.id+"\") {\n    id\n    thought\n    Like\n   thought\n    category\n    userId {\n      id\n    }\n }\n}\n"}

        this.props.updateThought(sendRequest)
        this.props.totalVoteCount();       
       
    }



    render() {        
        return (
            <div className="tab-content-box-item" id="vote-on-thoughts">
            <div className="chat-boxes">
                <div className="chat-boxes-inner containers">
                    <h4>{this.state.retroCategory1}</h4>

                    {this.state.firstCatThought && this.state.firstCatThought.map((val,index)=>{
                        // console.log(val.groupId +"==="+ this.state.thoughtgroups1[val.id])
                        // console.log(this.state.thoughtgroups1)
                        var id = val.id;

                        return ( 
                                <div  key={index} className="thoughts-group-body-inner" style={{position:'relative'}}>
                                

                                
                               {(val.groupId && this.state.thoughtgroups1[val.id]) &&<div>
                                <div>
                                    <div className="thoughts-group-header" > 
                                        <h6 className="floatLeft" >{this.state.thoughtgroups1[id] ? this.state.thoughtgroups1[id][0].groupName:""}</h6>
                                        <p  className="floatRight">Group <span>{this.state.thoughtgroups1[val.id] ?this.state.thoughtgroups1[val.id].length:0}</span></p>
                                    </div>
                                    
                                    { this.state.thoughtgroups1[val.id] && this.state.showexpandthoughtid !== id && <div>
                                        <div  className="showThought"  key={index} >{this.state.thoughtgroups1[val.id][0].thought}</div>  
                                    { this.state.thoughtgroups1[val.id] && this.state.thoughtgroups1[val.id].map((data, ind) => {
                                            return (     
                                            <div  className="groupDiv"  key={ind}>
                                            </div>
                                            )
                                        })}
                                        <p></p>
                                    </div>}
                                 </div>
                                 
                                 
                                    {!this.state.thoughtgroups1[val.id][0].userLike &&<div className="thumb-icon" onClick={()=> {this.isLikeGroup(this.state.thoughtgroups1[val.id])}}>
                                                <button type="button"><i className="fa fa-thumbs-up "></i></button>
                                            </div>}
                                    {this.state.thoughtgroups1[val.id][0].userLike &&<div className="thumb-icon " onClick={()=> {this.isLikeGroup(this.state.thoughtgroups1[val.id])}}>
                                        <button type="button " className="activeLikeButton"><i className="fa fa-thumbs-up "></i></button>
                                    </div>}
                                </div>
                               }
                                {!val.groupId &&<div>
                                   <p >{val.thought}</p>

                                    {!val.userLike &&<div className="thumb-icon" onClick={()=> {this.isLikeThought(val)}}>
                                            <button type="button"><i className="fa fa-thumbs-up "></i></button>
                                        </div>}
                                    {val.userLike &&<div className="thumb-icon " onClick={()=> {this.isLikeThought(val)}}>
                                        <button type="button " className="activeLikeButton"><i className="fa fa-thumbs-up "></i></button>
                                    </div>}

                                </div>}

                                 
                            </div>)
                    })}
                        </div>
                        
                            <button className="full_screen_icon" onClick={()=>this.openModelDetail('1')}><img src={fullscreen_icon}  alt="fullscreen_icon"/></button>
                        
                    </div>
                    <div className="chat-boxes">
                        <div className="chat-boxes-inner containers">
                            <h4>{this.state.retroCategory2}</h4>
                            {this.state.secondCatThought && this.state.secondCatThought.map((val,index)=>{
                                var id =val.id;
                                return ( 
                                        <div  key={index} className="thoughts-group-body-inner" style={{position:'relative'}}>
                                        {(val.groupId && this.state.thoughtgroups2[val.id]) &&<div>
                                        <div>
                                            <div className="thoughts-group-header" > 
                                                <h6 className="floatLeft" >{this.state.thoughtgroups2[id] ? this.state.thoughtgroups2[id][0].groupName:""}</h6>
                                                <p  className="floatRight">Group <span>{this.state.thoughtgroups2[val.id] ?this.state.thoughtgroups2[val.id].length:0}</span></p>
                                            </div>
                                            
                                            { this.state.thoughtgroups2[val.id] && this.state.showexpandthoughtid !== id && <div>
                                                    <div  className="showThought" key={index} >{this.state.thoughtgroups2[val.id][0].thought}</div>  
                                                { this.state.thoughtgroups2[val.id] && this.state.thoughtgroups2[val.id].map((data, ind) => {
                                                        return (     
                                                        <div  className="groupDiv"  key={ind}>
                                                        </div>
                                                        )
                                                    })}
                                                    <p></p>
                                            </div>}
                                        </div>
                                            {!this.state.thoughtgroups2[val.id][0].userLike &&<div className="thumb-icon" onClick={()=> {this.isLikeGroup(this.state.thoughtgroups2[val.id])}}>
                                                        <button type="button"><i className="fa fa-thumbs-up "></i></button>
                                                    </div>}
                                            {this.state.thoughtgroups2[val.id][0].userLike &&<div className="thumb-icon " onClick={()=> {this.isLikeGroup(this.state.thoughtgroups2[val.id])}}>
                                                <button type="button " className="activeLikeButton"><i className="fa fa-thumbs-up "></i></button>
                                            </div>}
                                        </div>
                                    }
                                        {!val.groupId &&<div>
                                        <p >{val.thought}</p>

                                            {!val.userLike &&<div className="thumb-icon" onClick={()=> {this.isLikeThought(val)}}>
                                                    <button type="button"><i className="fa fa-thumbs-up "></i></button>
                                                </div>}
                                            {val.userLike &&<div className="thumb-icon " onClick={()=> {this.isLikeThought(val)}}>
                                                <button type="button " className="activeLikeButton"><i className="fa fa-thumbs-up "></i></button>
                                            </div>}

                                        </div>}
                                    </div>)
                            })}
                        </div>
                        
                            <button className="full_screen_icon" onClick={()=>this.openModelDetail('2')}><img src={fullscreen_icon}  alt="fullscreen_icon"/></button>
                        
                    </div>
                    <div className="chat-boxes">
                        <div className="chat-boxes-inner containers">
                            <h4>{this.state.retroCategory3}</h4>
                            {this.state.thirdCatThought && this.state.thirdCatThought.map((val,index)=>{
                                var id =val.id;
                                return ( 
                                        <div  key={index} className="thoughts-group-body-inner" style={{position:'relative'}}>
                                        {(val.groupId && this.state.thoughtgroups3[val.id]) &&<div>
                                        <div>
                                            <div className="thoughts-group-header" > 
                                                <h6 className="floatLeft" >{this.state.thoughtgroups3[id] ? this.state.thoughtgroups3[id][0].groupName:""}</h6>
                                                <p  className="floatRight">Group <span>{this.state.thoughtgroups3[val.id] ?this.state.thoughtgroups3[val.id].length:0}</span></p>
                                            </div>
                                            
                                            { this.state.thoughtgroups3[val.id] && this.state.showexpandthoughtid !== id && <div>
                                                    <div  className="showThought"  key={index} >{this.state.thoughtgroups3[val.id][0].thought}</div>  
                        { this.state.thoughtgroups3[val.id] && this.state.thoughtgroups3[val.id].map((data, ind) => {
                                return (     
                                <div  className="groupDiv"  key={ind}>
                                </div>
                                )
                            })}
                            <p></p>
                    </div>}
                    </div>
                    {!this.state.thoughtgroups3[val.id][0].userLike &&<div className="thumb-icon" onClick={()=> {this.isLikeGroup(this.state.thoughtgroups3[val.id])}}>
                                <button type="button"><i className="fa fa-thumbs-up "></i></button>
                            </div>}
                    {this.state.thoughtgroups3[val.id][0].userLike &&<div className="thumb-icon " onClick={()=> {this.isLikeGroup(this.state.thoughtgroups3[val.id])}}>
                        <button type="button " className="activeLikeButton"><i className="fa fa-thumbs-up "></i></button>
                    </div>}
                </div>
                }
                {!val.groupId &&<div>
                    <p >{val.thought}</p>

                    {!val.userLike &&<div className="thumb-icon" onClick={()=> {this.isLikeThought(val)}}>
                            <button type="button"><i className="fa fa-thumbs-up "></i></button>
                        </div>}
                    {val.userLike &&<div className="thumb-icon " onClick={()=> {this.isLikeThought(val)}}>
                        <button type="button " className="activeLikeButton"><i className="fa fa-thumbs-up "></i></button>
                    </div>}

                </div>}
            </div>)
        })}
        </div>

        <button className="full_screen_icon" onClick={()=>this.openModelDetail('3')}><img src={fullscreen_icon}  alt="fullscreen_icon"/></button>

        </div>
        <div className="chat-boxes">
        <div className="chat-boxes-inner ">
        <h4>{this.state.retroCategory4}</h4>
        {this.state.fourthCatThought && this.state.fourthCatThought.map((val,index)=>{
        var id =val.id;
        return ( 
                <div  key={index} className="thoughts-group-body-inner" style={{position:'relative'}}>
                {(val.groupId && this.state.thoughtgroups4[val.id]) &&<div>
                <div>
                    <div className="thoughts-group-header" > 
                        <h6 className="floatLeft" >{this.state.thoughtgroups4[id] ? this.state.thoughtgroups4[id][0].groupName:""}</h6>
                        <p  className="floatRight">Group <span>{this.state.thoughtgroups4[val.id] ?this.state.thoughtgroups4[val.id].length:0}</span></p>
                    </div>
                    
                    { this.state.thoughtgroups4[val.id] && this.state.showexpandthoughtid !== id && <div>
                            <div  className="showThought"  key={index} >{this.state.thoughtgroups4[val.id][0].thought}</div>  
                        { this.state.thoughtgroups4[val.id] && this.state.thoughtgroups4[val.id].map((data, ind) => {
                                return (     
                                <div  className="groupDiv"  key={ind}>
                                </div>
                                )
                            })}
                            <p></p>
                    </div>}
                    </div>
                    {!this.state.thoughtgroups4[val.id][0].userLike &&<div className="thumb-icon" onClick={()=> {this.isLikeGroup(this.state.thoughtgroups4[val.id])}}>
                                    <button type="button"><i className="fa fa-thumbs-up "></i></button>
                    </div>}
                    {this.state.thoughtgroups4[val.id][0].userLike &&<div className="thumb-icon " onClick={()=> {this.isLikeGroup(this.state.thoughtgroups4[val.id])}}>
                        <button type="button " className="activeLikeButton"><i className="fa fa-thumbs-up "></i></button>
                    </div>}
                </div>
                }
                {!val.groupId &&<div>
                    <p >{val.thought}</p>

                    {!val.userLike &&<div className="thumb-icon" onClick={()=> {this.isLikeThought(val)}}>
                            <button type="button"><i className="fa fa-thumbs-up "></i></button>
                        </div>}
                    {val.userLike &&<div className="thumb-icon " onClick={()=> {this.isLikeThought(val)}}>
                        <button type="button " className="activeLikeButton"><i className="fa fa-thumbs-up "></i></button>
                    </div>}

                </div>}
            </div>)
        })}
        </div>

        <button className="full_screen_icon" onClick={()=>this.openModelDetail('4')}><img src={fullscreen_icon}  alt="fullscreen_icon"/></button>

        </div>
        </div>
    
             
            )
    }     
}           

VoteOnThoughts.propTypes = {
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
                
export default compose(withConnect)(VoteOnThoughts);