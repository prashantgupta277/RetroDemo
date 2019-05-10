import React, { Component } from 'react';

import './startretro.css';
import fullscreen_icon from './img/full_screen_icon.jpg';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createThoughts,createThoughtRes,doUpdateThought,updateThoughtRes,deleteThought} from '../../actions/createThought';



class SharedThoughts extends Component {
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

        this.addFirstCategory=this.addFirstCategory.bind(this);
        this.addSecondCategory=this.addSecondCategory.bind(this);
        this.addthirdCategory=this.addthirdCategory.bind(this);
        this.addFourthCategory=this.addFourthCategory.bind(this);

        this.removeCategory=this.removeCategory.bind(this);
        this.removeSecondCategory=this.removeSecondCategory.bind(this);
        this.removeThirdCategory=this.removeThirdCategory.bind(this);
        this.removeFourthCategory=this.removeFourthCategory.bind(this);

        this.createThought=this.createThought.bind(this);

    
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
            console.log(nextProps.getAddThougthRes)
            if(nextProps.getAddThougthRes && nextProps.getAddThougthRes.data.thougthReducer && nextProps.getAddThougthRes.data.thougthReducer.data && nextProps.getAddThougthRes.data.thougthReducer.data.createThought){               
                let getResponse=nextProps.getAddThougthRes.data.thougthReducer.data.createThought;

                this.props.resetCreateThought();
                console.log(getResponse)
               
                if(getResponse.category==="1"){
                    this.state.firstCatThought.push({category:getResponse.category,id:getResponse.id,thought:getResponse.thought,userId:getResponse.userId})
                    this.setState({isAddFirst:false})
                }
                if(getResponse.category==="2"){
                    this.state.secondCatThought.push({category:getResponse.category,id:getResponse.id,thought:getResponse.thought,userId:getResponse.userId})
                    this.setState({isAddSecond:false})

                }
                if(getResponse.category==="3"){
                    this.state.thirdCatThought.push({category:getResponse.category,id:getResponse.id,thought:getResponse.thought,userId:getResponse.userId})
                    this.setState({isAddThird:false})

                }
                if(getResponse.category==="4"){
                    this.state.fourthCatThought.push({category:getResponse.category,id:getResponse.id,thought:getResponse.thought,userId:getResponse.userId})
                    this.setState({isAddFourth:false})

                }
                this.setState({
                    thoughtText:""
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

    addFirstCategory(){

        this.setState({
            isRender: true,
            isAddFirst:true,
            catSelected:"1"
        })
    }
    removeCategory(index){

        this.deleteThought(this.state.firstCatThought[index]);
        delete this.state.firstCatThought[index];
        this.setState({
            isRender: true,
        })
    }
    addSecondCategory(){

        this.setState({
            isRender: true,
            isAddSecond: true,
            catSelected:"2"

        })
    }
    removeSecondCategory(index){
        this.deleteThought(this.state.secondCatThought[index]);

        delete this.state.secondCatThought[index];
        this.setState({
            isRender: true
        })
    }
    addthirdCategory(){
        this.setState({
            isRender: true,
            isAddThird: true,
            catSelected:"3"

        })
    }
    removeThirdCategory(index){
        this.deleteThought(this.state.thirdCatThought[index]);
        delete this.state.thirdCatThought[index];
        this.setState({
            isRender: true
        })
    }
    addFourthCategory(){
        this.setState({
            isRender: true,
            isAddFourth: true,
            catSelected:"4"


        })
    }
    removeFourthCategory(index){
        this.deleteThought(this.state.fourthCatThought[index]);
        delete this.state.fourthCatThought[index];
        this.setState({
            isRender: true
        })
    }

    deleteThought(thought){
        let sendRequest={
            "operationName":null,
            "variables":{},
            "query":"mutation {\n  deleteThought(id: \""+thought.id+"\") {\n    id\n  }\n}\n"}
        console.log(thought)
        this.props.thoughtDeleted(sendRequest);
    }

    createThought(cat){
        
        if(this.state.thoughtText){
            let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  createThought(retroId: \""+this.props.retroId+"\", userId: \""+this.state.userinfo.id+"\", thought: \""+this.state.thoughtText+"\", category: \""+cat+"\") {\n    thought\n  category\n   id\n    userId {\n      id\n      email\n    }\n    retroId {\n      id\n    }\n  }\n}\n"}
            
            setTimeout(() => {
                this.setState({
                    thoughtText:''
                }) 
            }, 300);
            this.props.doCreatingThought(sendRequest);
        }
    }





    updateThought(data){

        if(data.isEdit==="false"){
            data.isEdit="false";
        }else{
            data.isEdit="true";

        }
        let sendRequest={
            "operationName":null,
            "variables":{},
            "query":"mutation {\n  updateLikeThought(thoughtId: \""+data.id+"\", thought: \""+data.thought+"\", isEdit: \""+data.isEdit+"\", userId: \""+this.state.userinfo.id+"\") {\n    id\n    thought\n    Like\n   thought\n    category\n    userId {\n      id\n    }\n }\n}\n"}

        this.props.updateThought(sendRequest);

        // this.loadThougthList();

    }

    updateRetroStates(index, newValue ,cat) {
        let temp=[];
        if(cat==="1"){
            this.state.firstCatThought[index].thought=newValue;
            temp=this.state.firstCatThought[index];
        }
        if(cat==="2"){
            this.state.secondCatThought[index].thought=newValue;
            temp=this.state.secondCatThought[index];
        }
        if(cat==="3"){
            this.state.thirdCatThought[index].thought=newValue;
            temp=this.state.thirdCatThought[index];
        }
        if(cat==="4"){
            this.state.fourthCatThought[index].thought=newValue;
            temp=this.state.fourthCatThought[index];
        }
        
        this.setState({ isRender: true})
    }




    render() {        
        return (
            <div className="tab-content-box-item" id="share-thoughts">
                                
                    <div className="chat-boxes">
                    <div className="chat-boxes-inner ">
                        <h4>{this.state.retroCategory1}</h4> 
                        {this.state.firstCatThought && this.state.firstCatThought.map((item,index)=>{ return(
                        <div key={index}>
                                {item.userId.id===this.state.userinfo.id &&
                                <div className="chat-boxes-inner-content-div">
                                    <div style={{textAlign: 'right'}}>
                                        <button className="removeButton" onClick={()=>this.removeCategory(index)}>X</button>
                                    </div>
                                    <textarea className="textareaResize" value={item.thought} onChange={(e)=>this.updateRetroStates(index,e.target.value,item.category)} onBlur={()=>{this.updateThought(item)}}></textarea>

                                </div>}
                            </div>) })} 
                            {this.state.isAddFirst && this.state.catSelected==="1" &&
                            <div className="chat-boxes-inner-content-div">
                                <textarea className="textareaResize" value={this.state.thoughtText} onChange={(e)=> this.setState({ thoughtText:e.target.value })} onBlur={()=>{this.createThought('1')}}></textarea>
                            </div>}
                            <div style={{textAlign: 'center'}}>
                                <button className="addButton" onClick={this.addFirstCategory}>
                                    <span className="addIcon"> + </span>
                                </button>
                                <span className="addThougthText"> Add Thoughts </span>
                            </div>

                        </div>
                        <button className="full_screen_icon" onClick={()=>this.openModelDetail('1')}><img src={fullscreen_icon} alt="fullscreen_icon"/></button>
                    </div>

                    <div className="chat-boxes">
                        <div className={ "chat-boxes-inner " +(this.state.openModelStatus==='2' ? "display_full_screen " : " ") }>
                            <h4>{this.state.retroCategory2}</h4>
                            

                            {this.state.secondCatThought && this.state.secondCatThought.map((item,index)=>{
                            return(
                                <div  key={index}>
                                {item.userId.id===this.state.userinfo.id &&<div  className="chat-boxes-inner-content-div">   
                                    <div style={{textAlign:'right'}}>
                                        <button className="removeButton" onClick={()=>this.removeSecondCategory(index)}>X</button>
                                    </div>
                                    <textarea className="textareaResize" value={item.thought}  onChange={(e)=>this.updateRetroStates(index,e.target.value,item.category)} onBlur={()=>{this.updateThought(item)}}></textarea>
                            </div>}</div>)
                            })}

                            {this.state.isAddSecond && this.state.catSelected==="2" &&<div className="chat-boxes-inner-content-div">
                                <textarea className="textareaResize" value={this.state.thoughtText} onChange={(e) => this.setState({
                                        thoughtText:e.target.value
                                    })}  onBlur={()=>{this.createThought('2')}}></textarea>
                            </div>}

                            <div style={{textAlign:'center'}}>
                            <button className="addButton" onClick={this.addSecondCategory}>
                            <span className="addIcon"> + </span>

                            </button> 
                            <span className="addThougthText"> Add Thoughts </span>
                            </div>
                            
                            <button className="full_screen_icon" onClick={()=>this.openModelDetail('2')}><img src={fullscreen_icon}  alt="fullscreen_icon" /></button>
                        </div>
                    </div>
                    <div className="chat-boxes">
                        <div className={ "chat-boxes-inner " +(this.state.openModelStatus==='3' ? "display_full_screen " : " ") }>
                            <h4>{this.state.retroCategory3}</h4>
                        

                            {this.state.thirdCatThought && this.state.thirdCatThought.map((item,index)=>{
                            return(
                                <div  key={index}>
                                {item.userId.id===this.state.userinfo.id &&
                                <div className="chat-boxes-inner-content-div">   
                                    <div style={{textAlign:'right'}}>
                                        <button className="removeButton" onClick={()=>this.removeThirdCategory(index)}>X</button>
                                    </div>
                                    <textarea  className="textareaResize" value={item.thought}  onChange={(e)=>this.updateRetroStates(index,e.target.value,item.category)} onBlur={()=>{this.updateThought(item)}}></textarea>
                                </div>}</div>)
                            })}

                            {this.state.isAddThird && this.state.catSelected==="3" &&<div className="chat-boxes-inner-content-div">
                                <textarea className="textareaResize" value={this.state.thoughtText} onChange={(e) => this.setState({
                                        thoughtText:e.target.value
                                    })} onBlur={()=>{this.createThought('3')}}></textarea>
                            </div>}

                            <div style={{textAlign:'center'}}>
                            <button className="addButton" onClick={this.addthirdCategory}>
                                <span className="addIcon"> + </span>

                                </button> 
                            <span className="addThougthText"> Add Thoughts </span>
                            </div>
                            <button className="full_screen_icon" onClick={()=>this.openModelDetail('3')}><img src={fullscreen_icon} alt="fullscreen_icon" /></button>
                        </div>
                    </div>
                    <div className="chat-boxes">
                        <div className={ "chat-boxes-inner " +(this.state.openModelStatus==='4' ? "display_full_screen " : " ") }>
                            <h4>{this.state.retroCategory4} </h4>                            

                            {this.state.fourthCatThought && this.state.fourthCatThought.map((item,index)=>{
                            return(
                                <div  key={index}>
                                {item.userId.id===this.state.userinfo.id &&
                                <div className="chat-boxes-inner-content-div">   
                                    <div style={{textAlign:'right'}}>
                                        <button className="removeButton" onClick={()=>this.removeFourthCategory(index)}>X</button>
                                    </div>
                                    <textarea className="textareaResize" value={item.thought}   onChange={(e)=>this.updateRetroStates(index,e.target.value,item.category)} onBlur={()=>{this.updateThought(item)}}></textarea>
                                </div>}</div>)
                            })}

                            {this.state.isAddFourth && this.state.catSelected==="4" &&<div className="chat-boxes-inner-content-div">
                                <textarea className="textareaResize" value={this.state.thoughtText} onChange={(e) => this.setState({
                                        thoughtText:e.target.value
                                    })} onBlur={()=>{this.createThought('4')}}></textarea>
                            </div>}
                            <div style={{textAlign:'center'}}>
                            <button className="addButton" onClick={this.addFourthCategory}>
                                    <span className="addIcon"> + </span>
                                </button> 
                            <span className="addThougthText"> Add Thoughts </span>
                            </div>
                            <button className="full_screen_icon" onClick={()=>this.openModelDetail('4')}><img src={fullscreen_icon}  alt="fullscreen_icon"/></button>
                        </div>
                    </div>
                </div>
    
             
            )
    }     
}           

SharedThoughts.propTypes = {
    getAddThougthRes: PropTypes.any,
    thoughtList:  PropTypes.any,
    category: PropTypes.any

};

const mapStateToProps = createStructuredSelector({
    getAddThougthRes:createThoughtRes,
    updateThoughtRes:updateThoughtRes,

});
    
function mapDispatchToProps(dispatch) {
    return {
        doCreatingThought: (data) => dispatch(createThoughts(data)),
        updateThought:(data) => dispatch(doUpdateThought(data)),
        thoughtDeleted:(data) => dispatch(deleteThought(data)),
        resetCreateThought:()=>dispatch(createThoughtRes(null)),

        
    };
}
    
const withConnect = connect(mapStateToProps, mapDispatchToProps);
                
export default compose(withConnect)(SharedThoughts);