import React, { Component } from 'react';
import  FooterComponent from './../../commonComponent/footer';
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
import { getInvite, getAllInviteRes ,InviteUsersRetro} from '../../actions/inviteRetorActions';
import { createThoughts,createThoughtRes,getThoughts,fetchThoughtRes,doUpdateThought,updateThoughtRes,doUpdateActivity,updateRetroNote} from './../../actions/createThought';
import { BASE_URL } from './../../constants';
import { createNotification} from './../../commonComponent/notificationbox/index';
import Popover from 'react-simple-popover';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import SharedThoughts from './share-Thought';
import VoteOnThoughts from './voteOn-Thought';
import DiscussVotes from './discuss-Votes';

const PopoverInnerStyle = {
    width: 280,
    padding: '10px 14px',
    color: '#000',
    backgroundColor: '#fff',
    boxShadow: '0 0 30px rgba(39, 43, 55, 0.15)'
  };


class startretro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateList:[],
            userinfo:{},
            retroinfo:{},
            retroextradetails:{},
            sendInViteEmailDisplay: [],
            sendInViteEmail: "",
            notroomcode:this.randomString(),
            min: 3,
            sec: 0,
            enable:false,
            currentIvite:'',
            startTimerVal:180000,
                // startTimerVal:18000,
            timechangeDrop:true,
            firstCategory:[],
            secondCategory:[],
            thirdCategory:[],
            fourthCategory:[],
            isRender: false,
            selectedTab: '1',
            isStart:true,
            timerCount:"",
            // selectedTab: '1',
            // isStart:true,
            openModelStatus: '',
            voteUser:0,
            isRenderUpdate: true,
            isModelShow: false,
            showList:[],
            retroId:'',
            thoughtText:'',
            firstCatThought:[],
            secondCatThought:[],
            thirdCatThought:[],
            fourthCatThought:[],
            getAllThoughtList:[],
            templatename: '',
            retroadmin:'',
            activityStatus:'',
            CloseTime:false,
            getRetroUserInfo:[],
            sprintnumber:'',
            interval:[],
            showTimer:"",
            published: "false",
            projectname:'',
            isTimerStatus:'',
            StartTimerCount:60000 * 3 ,

            invitedUserList:[],
            isOpenModal: true,
            userStart: false,
            isAdminCheck: false,
            isAdminPause: false,
            isCheckUserInterval:true,
            serverURL:'',
            retroNote:"",
            isSummary:'',
            loaderState: false,
            joinUsers: [],
            showPopover: false,
            roomid:'',
            thoughtgroups1:[],
            thoughtgroups2:[],
            thoughtgroups3:[],
            thoughtgroups4:[],
            goroupingname:{},
            retrocategory1:'',
            retrocategory2:'',
            retrocategory3:'',
            retrocategory4:'',
            showexpandthoughtid: false,
            projectname:"",
            changeState: false,
            discussGrpCat1:[],
            discussGrpCat2:[],
            discussGrpCat3:[],
            discussGrpCat4:[],
            countDownTimers:0,
            catSelected:""
        }
       

        this.timerChange=this.timerChange.bind(this);
        this.openPopover=this.openPopover.bind(this);
        this.totalVoteCount=this.totalVoteCount.bind(this);
        this.loadThougthList=this.loadThougthList.bind(this);
    }

  
    

    /* Receive Data */

    componentWillReceiveProps(nextProps){
        // console.log(nextProps)
        if(nextProps){

            if(nextProps.myInviteList && nextProps.myInviteList.data.inviteRetroReducer.data  && nextProps.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink){
                let getInvestorList=nextProps.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink;
               
                let joinerList=[];
                for(let items of getInvestorList){
                    if(items.isJoined==="true" || items.isJoined===true){
                        joinerList.push(items);
                    }
                }
                this.setState({
                    invitedUserList:getInvestorList,
                    joinUsers:joinerList
                },()=>{

                })
            }


            if(nextProps.thougthList.data.thougthReducer && nextProps.thougthList.data.thougthReducer.errors){
                this.setState({
                    loaderState: false
                })
                createNotification("error",nextProps.thougthList.data.thougthReducer.errors[0].message)

            }

            if(nextProps.thougthList.data.thougthReducer && nextProps.thougthList.data.thougthReducer.data && nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro ){
        

                let retroDetail=nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro;
                this.setState({
                    retrocategory1:retroDetail.retroCategory1,
                    retrocategory2:retroDetail.retroCategory2,
                    retrocategory3:retroDetail.retroCategory3,
                    retrocategory4:retroDetail.retroCategory4,
                })

                if(retroDetail.projects && retroDetail.projects.length>0){
                    this.setState({
                        projectname: retroDetail.projects[0].projectName
                    },()=>{

                    })

                }else{
                    this.setState({
                        projectname: retroDetail.projects.projectName
                    },()=>{
                        
                    }) 
                }

                let thougthData=nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro.thoughts;
              
                let getRetroDetail=nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro;
                
                let firstCat=[]
                let secondCat=[]
                let thirdCat=[]
                let fourthCat=[]

                this.setState({
                    sprintnumber:getRetroDetail.sprintNumber,
                    retroNote:getRetroDetail.notes
                })
                

                if(thougthData){
                    // console.log(thougthData)
            
                    this.setState({
                        getRetroUserInfo:nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro.userId,
                        getAllThoughtList:thougthData,
                        templatename:nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro.templateName,
                        retroadmin: nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro.retroAdmin,
                       
                        
                    },()=>{
                        

                    })
                   
                    for(let item of thougthData){
                        if(item.category==="1"){
                            
                                if(item.Like){
                                    item.getlikeList=JSON.parse(item.Like);
                                    item.totalVoteCount=JSON.parse(item.Like).length;
                                }else{
                                    item.getlikeList=[]
                                    item.totalVoteCount=0;
                                }
                                for(let items of item.getlikeList){
                                    if(items===this.state.userinfo.id){
                                        item.userLike=true
                                    }
                                }
                            firstCat.push(item);
                        }
                        if(item.category==="2"){
                            // console.log(item.Like)
                           
                                if(item.Like){
                                    item.getlikeList=JSON.parse(item.Like);
                                    item.totalVoteCount=JSON.parse(item.Like).length;
                                }else{
                                    item.getlikeList=[]
                                    item.totalVoteCount=0;
                                }
                                for(let items of item.getlikeList){
                                    if(items===this.state.userinfo.id){
                                        item.userLike=true
                                    }
                                }
                            secondCat.push(item)
                        }
                        if(item.category==="3"){
                                if(item.Like){
                                    item.getlikeList=JSON.parse(item.Like);
                                    item.totalVoteCount=JSON.parse(item.Like).length;
                                }else{
                                    item.getlikeList=[]
                                    item.totalVoteCount=0;
                                }
                                for(let items of item.getlikeList){
                                    if(items===this.state.userinfo.id){
                                        item.userLike=true
                                    }
                                }
                            thirdCat.push(item)
                        }
                        if(item.category==="4"){

                                if(item.Like){
                                    item.getlikeList=JSON.parse(item.Like);
                                    item.totalVoteCount=JSON.parse(item.Like).length;
                                }else{
                                    item.getlikeList=[]
                                    item.totalVoteCount=0;
                                }

                                for(let items of item.getlikeList){
                                    if(items===this.state.userinfo.id){
                                        item.userLike=true
                                    }
                                }
                            fourthCat.push(item)
                        }
                    }
                    this.setState({
                        loaderState: false
                    })

                    if(firstCat && firstCat.length>0){
                        this.setState({ thoughtgroups1: this.makeGrouping(firstCat)},()=>{
                        })
                    } 
                    if(secondCat && secondCat.length>0){
                        this.setState({ thoughtgroups2: this.makeGrouping(secondCat)},()=>{
                            
                        })
                    }  
                    if(thirdCat && thirdCat.length>0){
                        this.setState({ thoughtgroups3: this.makeGrouping(thirdCat)})
                    }  
                    if(fourthCat && fourthCat.length>0){
                        this.setState({ thoughtgroups4: this.makeGrouping(fourthCat)})
                    } 
                    
                    // console.log(firstCat)


                    this.setState({
                        firstCatThought:firstCat,
                        secondCatThought:secondCat,
                        thirdCatThought:thirdCat,
                        fourthCatThought:fourthCat,
                        groupingFirstCatThought:this.checkGrouping(firstCat),
                        groupingSecondCatThought:this.checkGrouping(secondCat),
                        groupingThirdCatThought:this.checkGrouping(thirdCat),
                        groupingFourthCatThought:this.checkGrouping(fourthCat),
                        
                    },()=>{
                        
                        this.totalVoteCount();
                        


                        let discussGrp1=[];
                        if(this.state.firstCatThought && this.state.firstCatThought.length>0){
                            for(let items of this.state.firstCatThought){
                                if(this.state.thoughtgroups1[items.id]){
                                    discussGrp1.push({"grouping":this.state.thoughtgroups1[items.id]})
                                }
                            }
                        }
                        let tmpGrpArray1=[];
                        for(let tmp of discussGrp1){
                            tmp.grouping[0].isGrp=true;
                            tmp.grouping[0].grouping=tmp.grouping;
                            tmpGrpArray1.push(tmp.grouping[0])
                        }
                        let finalArray1=this.state.groupingFirstCatThought.concat(tmpGrpArray1)



                        let discussGrp2=[];
                        if(this.state.secondCatThought && this.state.secondCatThought.length>0){
                            for(let items of this.state.secondCatThought){
                                if(this.state.thoughtgroups2[items.id]){
                                    discussGrp2.push({"grouping":this.state.thoughtgroups2[items.id]})
                                }
                            }
                        }
                        let tmpGrpArray2=[];
                        for(let tmp of discussGrp2){
                            tmp.grouping[0].isGrp=true;
                            tmp.grouping[0].grouping=tmp.grouping;
                            tmpGrpArray2.push(tmp.grouping[0])
                        }
                        let finalArray2=this.state.groupingSecondCatThought.concat(tmpGrpArray2)

                        
                        let discussGrp3=[];
                        if(this.state.thirdCatThought && this.state.thirdCatThought.length>0){
                            for(let items of this.state.thirdCatThought){
                                if(this.state.thoughtgroups3[items.id]){
                                    discussGrp3.push({"grouping":this.state.thoughtgroups3[items.id]})
                                }
                            }
                        }
                        let tmpGrpArray3=[];
                        for(let tmp of discussGrp3){
                            tmp.grouping[0].isGrp=true;
                            tmp.grouping[0].grouping=tmp.grouping;
                            tmpGrpArray3.push(tmp.grouping[0])
                        }
                        let finalArray3=this.state.groupingThirdCatThought.concat(tmpGrpArray3)


                        


                        let discussGrp4=[];
                        if(this.state.fourthCatThought && this.state.fourthCatThought.length>0){
                            for(let items of this.state.fourthCatThought){
                                if(this.state.thoughtgroups4[items.id]){
                                    discussGrp4.push({"grouping":this.state.thoughtgroups4[items.id]})
                                }
                            }
                        }
                        let tmpGrpArray4=[];
                        for(let tmp of discussGrp4){
                            tmp.grouping[0].isGrp=true;
                            tmp.grouping[0].grouping=tmp.grouping;
                            tmpGrpArray4.push(tmp.grouping[0])
                        }
                        let finalArray4=this.state.groupingFourthCatThought.concat(tmpGrpArray4)

                        this.setState({
                            discussGrpCat1:finalArray1.sort(this.sortingVotes),
                            discussGrpCat2:finalArray2.sort(this.sortingVotes),
                            discussGrpCat3:finalArray3.sort(this.sortingVotes),
                            discussGrpCat4:finalArray4.sort(this.sortingVotes),


                        },()=>{
                           

                        })

                    })

                    

                   
                }
            }
            
        }
    }

    /* Receive Data Close*/

    /*  Sort Voting Start */
        sortingVotes(a, b) {
            if (a.totalVoteCount > b.totalVoteCount)
                return -1;
            if (a.totalVoteCount > b.totalVoteCount)
                return 1;
            return 0;

        }
    /*  Sort Voting End */

    /* Make Grouping Start */
        makeGrouping(thoughtList){
            // console.log(thoughtList)
                var newarray = [];
                for(var i=0; i<thoughtList.length; i++){
                    var newIndex = 0;
                    var data = {"id": thoughtList[i].id, "thought": thoughtList[i].thought, "groupId": thoughtList[i].groupId,"groupName": thoughtList[i].groupName,userLike:thoughtList[i].userLike,likeCount:thoughtList[i].getlikeList,totalVoteCount:thoughtList[i].totalVoteCount};
                    for (var k in newarray){
                        if(thoughtList[i].groupId === k){
                            newarray[thoughtList[i].groupId].push(data);
                            newIndex=1;
                        }   
                    }
                    if(newIndex===0){
                        newarray[thoughtList[i].groupId] = [data];
                    }
                }
                return  newarray;
        }
    /* Make Grouping End */

    /* Check  Grouping Thoughts */
        checkGrouping(thoughtList){
            var newarray = [];
            for(var i=0; i<thoughtList.length; i++){

                if(thoughtList[i].groupId==="" || thoughtList[i].groupId===null || thoughtList[i].groupId==="null"){
                    
                    newarray.push(thoughtList[i]);
                }
            }
            return  newarray;
        }
    /*Check  Grouping Thoughts */

    
    /* Will Load Data Start*/

    componentDidMount() {
        
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        let checkuser= localStorage.getItem("isAdminCheck")
        if(checkuser){
            if(checkuser==="true"){
                this.setState({
                    isAdminCheck: true,
                    isTimerStatus: "Pending",
                    showTimer: "Start"
                })
            }else{
                this.setState({
                    isAdminCheck: false,
                    showTimer: "Wait"
                })
            }               
        }
        
        let id = this.props.match.params.id
        let roomid=this.props.match.params.roomid
        
        if(id){
            this.setState({
                retroId: id,
                roomid:roomid,
                userinfo:userdata,
                serverURL: BASE_URL+this.props.match.url
            },()=>{

                this.loadThougthList();
                this.getRetroDetail();
                this.loadInviteList();
                
            }) 
         }
        
        if(userdata){
            this.setState({
                userinfo:userdata
            })

        }
      
        
    }

    loadInviteList(){
        let sendRequestinvite = {"operationName":null,"variables":{},"query":"{\n  fetchAllInviteLink(retroId: \""+this.state.retroId+"\") {\n    id\n    email\n    retroId\n email\n    url\n    createdAt\n    isAdmin\n  isJoined\n   retro {\n      id\n      retroAdmin\n   userId {\n        id\n        firstName\n        lastName\n      }\n     }\n  }\n}\n"}

        this.props.fetchInvite(sendRequestinvite);

        if(this.state.isAdminCheck){
            setTimeout(()=>{
                this.loadInviteList(); 
            },15000)
        }
    }
    /* Will Load Data Close*/

    openPopover(){
        this.loadInviteList();
        this.setState({
            showPopover: !this.state.showPopover
        })
    }

    onCloseModal(){
        this.setState({
            isOpenModal: false
        })
    }   
    openRetroModal(){
        this.setState({
            isOpenModal: true
        })
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    updateNote(){
        let sendNoteRequest={
            "operationName":null,
            "variables":{},
            "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\", notes: \""+this.state.retroNote+"\", isEditRetro: \""+"false"+"\") {\n    notes\n  }\n}\n"}

        this.props.updateRetroNote(sendNoteRequest);
    }

   


 /* Retro Detail Load Start*/  
    getRetroDetail(){
        let sendRequest={
            "operationName":null,
            "variables":{},
            "query":"{\n  fetchSingleRetro(id: \""+this.state.retroId+"\") {\n    id\n isTimerStatus\n    startDate\n    retroAdmin\n isSummary\n inviteToJointRetros {\n      id\n      isAdmin\n    }\n  sprintNumber\n    templateName\n  shareLink\n   published\n    createdAt\n    updatedAt\n    templateName\n  timer\n  projects {\n      id\n      projectName\n    }\n    roomCode\n    published\n    activity\n  userId {\n      id\n    }\n   thoughts {\n      id\n      Like\n   thought\n    category\n  userId {\n      id\n    }\n  }\n  }\n}\n"
        }

        axios.post(BASE_URL, sendRequest)
        .then(res => {
            if(res.data && res.data.data){
                let getResponse=res.data.data.fetchSingleRetro;
                
                this.setState({
                    getRetroUserInfo:getResponse.userId,
                    published: getResponse.published,
                    isSummary: getResponse.isSummary
                },()=>{

                })
        
                if(getResponse.isTimerStatus==="Pause"){
                    clearInterval(this.interval);
                    this.setState({
                        isCheckUserInterval: true,
                        showTimer: "Pause"
                    })
                }


                if(this.state.isAdminCheck===false){
                    this.setState({
                        isTimerStatus :  getResponse.isTimerStatus
                    },()=>{});
                    if(this.state.isSummary==="true"){
                        clearInterval(this.interval)
                        window.location.href="/retrosummary/"+this.state.retroId;
                    }
                    if(getResponse.isTimerStatus==="Start"){
                        

                        if(this.state.isCheckUserInterval){
                        
                            if(Number(getResponse.timer)>0){
                                this.setState({
                                    isCheckUserInterval: false,
                                    isOpenModal: false
                                })


                                clearInterval(this.interval);
                                let diff  = getResponse.timer;
                                this.interval=setInterval(()=>{
                                    diff -= 1000;
                                    this.setState({
                                        StartTimerCount:diff
                                    })
                                    let hours= Math.floor(diff / 36e5);
                                    let mins = Math.floor((diff % 36e5) / 6e4);
                                    let secs= Math.floor((diff % 6e4) / 1000);

                                    if(diff>0){
                                        this.setState({
                                            // showTimer: 0+""+mins +":"+ secs,
                                            showTimer:  mins>0? mins +" Minutes" :secs  +" Seconds",

                                            isTimerStatus: "Start",
                                            StartTimerCount:diff,
                                            countDownTimers: diff
                                        },()=>{
                                            if(this.state.StartTimerCount<=0){
                                                this.setState({
                                                    isTimerStatus: "Stop",
                                                    StartTimerCount:"0",
                                                    selectedTab:"2"
                                            },()=>{
                                                })
                                            }
                                        })

                                    }else{
                                        console.log("Stop")
                                        clearInterval(this.interval);
                                        this.setState({
                                            showTimer:"Stop",
                                            selectedTab:"2"
                                        })

                                    }
                                    
                                },1000)
                            }
                        }
                    }

                    if(getResponse.isTimerStatus==="Pending"){
                        this.setState({
                            showTimer: "Wait",
                        })
                    }
                    if(this.state.selectedTab !== getResponse.activity){
                        if(this.state.changeState){
                            createNotification('success',"State Change");
                        }
                        this.setState({
                            changeState: true
                        })

                    }
                    

                    this.setState({
                        selectedTab:getResponse.activity,
                        activityStatus:getResponse.activity
                    })
                    

                    setTimeout(()=>{
                        this.getRetroDetail();
                    },3000);
                }                
            }
        })
    }

    /* Retro Detail Load Close*/  

    /*  Timer Count Start*/

        selectTimer(time){
            let countdown=60000 * time;
            this.setState({
                StartTimerCount:countdown
            },()=>{
                // console.log(this.state.StartTimerCount)
                // this.retroStart();
            })
            
        }

        retroStart(){
            let diff  = this.state.StartTimerCount;
            
            this.interval = setInterval(()=>{
                diff -= 1000;
                this.state.StartTimerCount-=1000;
                let hours= Math.floor(diff / 36e5);
                let mins = Math.floor((diff % 36e5) / 6e4);
                let secs= Math.floor((diff % 6e4) / 1000);
                this.setState({
                    // showTimer: 0+""+mins +":"+ secs,
                    showTimer:  mins>0? mins +" Minutes" :secs  +" Seconds",
                    StartTimerCount:diff,
                    countDownTimers: diff
                },()=>{})

                if(diff<=0){
                    clearInterval(this.interval)
                    this.setState({
                        isTimerStatus: "Stop",
                        StartTimerCount:"0",
                        selectedTab:"2"
                },()=>{
                    let sendRequest={
                        "operationName":null,
                        "variables":{},
                        "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\" ,isEditRRetro: \""+"false"+"\",timer: \""+"0"+"\", activity: \""+"2"+"\",isTimerStatus: \""+"Stop"+"\", published: \""+"true"+"\") {\n    retroAdmin\n    published\n    activity\n    roomCode\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n isTimerStatus\n }\n}\n"}
                    
                    this.props.updateActivity(sendRequest);
                    })
                }
            },1000);
            
            let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\",isEditRetro: \""+"false"+"\",timer: \""+this.state.StartTimerCount+"\", activity: \""+"1"+"\",isTimerStatus: \""+"Start"+"\", published: \""+"true"+"\") {\n    retroAdmin\n    published\n    activity\n    roomCode\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n isTimerStatus\n }\n}\n"}
            
            this.props.updateActivity(sendRequest);
        }

        callTimmer(){
            let diff  = this.state.StartTimerCount;
            this.interval = setInterval(()=>{
                diff -= 1000;
                this.state.StartTimerCount-=1000;
                let hours= Math.floor(diff / 36e5);
                let mins = Math.floor((diff % 36e5) / 6e4);
                let secs= Math.floor((diff % 6e4) / 1000);
                this.setState({
                    // showTimer: 0+""+mins +":"+ secs,
                    showTimer:  mins>0? mins +" Minutes" :secs  +" Seconds",
                    StartTimerCount:diff
                },()=>{})

                if(diff<=0){
                    clearInterval(this.interval)
                    this.setState({
                        isTimerStatus: "Stop",
                        StartTimerCount:"0",
                        selectedTab:"2"
                },()=>{
                    let sendRequest={
                        "operationName":null,
                        "variables":{},
                        "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\",isEditRetro: \""+"false"+"\" ,timer: \""+"0"+"\", activity: \""+"2"+"\",isTimerStatus: \""+"Stop"+"\") {\n    retroAdmin\n    published\n    activity\n    roomCode\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n isTimerStatus\n }\n}\n"}
                    
                    this.props.updateActivity(sendRequest);
                    })
                }
            },1000);
        }

        timerChange(){
            
            if(this.state.isTimerStatus==="Start"){                
                this.setState({
                    isTimerStatus:"Pause",
                    showTimer:"Pause",
                    isOpenModal: false,

                },()=>{
                    clearInterval(this.interval);
                    this.UpdateTimer();
                })
            }
            if(this.state.isTimerStatus==="Pause"){
                this.setState({
                    isTimerStatus:"Start",
                    showTimer:"Start",
                    isOpenModal: false,
                },()=>{
                    this.callTimmer();
                    this.UpdateTimer();
                })
            }
            if(this.state.isTimerStatus==="" || this.state.isTimerStatus===null || this.state.isTimerStatus==="null" || this.state.isTimerStatus==="Pending"){
                this.setState({
                    isTimerStatus:"Start",
                    showTimer:"Start",
                    isOpenModal: false,

                },()=>{
                    let sendRequest={
                        "operationName":null,
                        "variables":{},
                        "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\",isEditRetro: \""+"false"+"\", published: \"true\") {\n    retroAdmin\n    published\n    activity\n    roomCode\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n  }\n}\n"}
                    this.props.updateActivity(sendRequest);
                    setTimeout(() => {
                        this.retroStart();
                    }, 2000);
                })
            }    
        }

        UpdateTimer(){
            let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\", timer: \""+this.state.StartTimerCount+"\",isEditRetro: \""+"false"+"\", isTimerStatus: \""+this.state.isTimerStatus+"\") {\n    retroAdmin\n    published\n    activity\n    roomCode\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n isTimerStatus\n }\n}\n"}
            this.props.updateActivity(sendRequest);
        }

    


    loadThougthList(){
        let sendRequest={
            "operationName":null,
            "variables":{},
            "query":"{\n  fetchSingleRetro(id: \""+this.state.retroId+"\") {\n    id\n    startDate\n    retroAdmin\n    sprintNumber\n notes\n retroCategory1\n retroCategory2\n retroCategory3\n retroCategory4\n templateName\n    published\n    createdAt\n    updatedAt\n    templateName\n  timer\n    roomCode\n    published\n    activity\n  userId {\n      id\n    }\n  projects {\n      projectName\n    }\n  thoughts {\n   groupId\n  groupName\n    id\n      Like\n   thought\n    category\n   userId {\n      id\n    }\n  }\n  }\n}\n"
        }
        this.props.getThoughtList(sendRequest);


        if(!this.state.isAdminCheck){
            setTimeout(()=>{
                this.loadThougthList();
            },5000);
        }
    }
    randomString() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 6;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }
    stop() {
        clearInterval(this.interval);
        this.setState({
          selectedTab: '2'
        })
    }
  
    thirdStep(){
        if(this.state.selectedTab==="2"){
            this.setState({
                selectedTab: '3'
            })     
        }
    }
    goFourthStep(){
        
        if(this.state.selectedTab==="3"){
            this.setState({
                selectedTab: '4'
            })     
        }
    }

    
    

    

  

    updateTabChange(tabvalue){

        if(this.state.isAdminCheck){
            let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\", activity: \""+tabvalue+"\", published: \"true\",isEditRetro: \""+"false"+"\") {\n    retroAdmin\n    published\n    activity\n    roomCode\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n  }\n}\n"}
                
                
            this.props.updateActivity(sendRequest);
        }
    }
  
    openModel(status){
        this.setState({
            openModelStatus: status,
        })
    }
      closeModal(){
        this.setState({
            openModelStatus: ''
        })
  
      }
 
      totalVoteCount(){
        
          let count=0;

          if(this.state.firstCatThought && this.state.firstCatThought.length>0){
              
              for(let item of this.state.firstCatThought){
                  if(item.groupId==="" || item.groupId==="null" || item.groupId===null){
                    if(item.userLike===true){
                        count++;
                    }
                  }
                  
              }
          }
          if(this.state.secondCatThought && this.state.secondCatThought.length>0){
              for(let item of this.state.secondCatThought){
                    if(item.groupId==="" || item.groupId==="null" || item.groupId===null){
                        if(item.userLike===true){
                            count++;
                        }
                    }
              }
          }
          if(this.state.thirdCatThought && this.state.thirdCatThought.length>0){
              for(let item of this.state.thirdCatThought){
                    if(item.groupId==="" || item.groupId==="null" || item.groupId===null){
                        if(item.userLike==true){
                            count++;
                        }
                    }
              }
          }
          if( this.state.fourthCatThought && this.state.fourthCatThought.length>0){
              for(let item of this.state.fourthCatThought){
                    if(item.groupId==="" || item.groupId==="null" || item.groupId===null){
                        if(item.userLike===true){
                            count++;
                        }
                    }
              }
          }
            if(this.state.thoughtgroups1){
                
                for(var column in this.state.thoughtgroups1){
                    if(column){
                        if(this.state.thoughtgroups1[column][0].userLike){
                            count++;
                        }
                    }
                }
            }
            if(this.state.thoughtgroups2){

                for(var column in this.state.thoughtgroups2){
                    if(column){
                        if(this.state.thoughtgroups2[column][0].userLike){
                            count++;
                        }
                    }
                }
            }
            if(this.state.thoughtgroups3){
                for(var column in this.state.thoughtgroups3){
                    if(column){
                        if(this.state.thoughtgroups3[column][0].userLike){
                            count++;
                        }
                    }
                }
            }
            if(this.state.thoughtgroups4){
                for(var column in this.state.thoughtgroups4){
                    if(column){
                        if(this.state.thoughtgroups4[column][0].userLike){
                            count++;
                        }
                    }
                }
            }

          
  
          this.setState({
              voteUser:count
          },()=>{
            //   console.log("Total Vote"+ count)
          })
  
      }
      openModelDetail(status){
          this.setState({
              isModelShow:true
          })
          if(status==="1"){
              this.setState({
                  showList:this.state.firstCatThought
              })
          }
          if(status==="2"){
              this.setState({
                  showList:this.state.secondCatThought
              })
          }
          if(status==="3"){
              this.setState({
                  showList:this.state.thirdCatThought
              })
          }
          if(status==="4"){
              this.setState({
                  showList:this.state.fourthCatThought
              })
          }
      }
      closeModelDetail(){
          this.setState({
              isModelShow:false
          })
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

        this.props.updateThought(sendRequest)
        this.loadThougthList();

    }

   

    goSummary(){
        if(this.state.isAdminCheck){
            clearInterval(this.interval)
            let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\" ,isSummary: \""+"true"+"\",isEditRetro: \""+"false"+"\") {\n    retroAdmin\n    published\n    activity\n    roomCode\n    isSummary\n isTimerStatus\n }\n}\n"}
            
            this.props.updateActivity(sendRequest);
            setTimeout(()=>{
                 window.location.href="/retrosummary/"+this.state.retroId;
            },500)
        }
       
    }



   
    tabChange(value){            

        if(this.state.isAdminCheck){
            if((value==="1" &&  this.state.isTimerStatus==="Stop")){
                return false;                
            }           
            this.setState({
                selectedTab: value
            })
            let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  updateRetro(retroId: \""+this.state.retroId+"\", activity: \""+value+"\",isEditRetro: \""+"false"+"\" ) {\n    retroAdmin\n    published\n    activity\n    roomCode\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n  }\n}\n"}    
            this.props.updateActivity(sendRequest);
            createNotification('success',"State Change");
            this.loadThougthList();
            this.loadInviteList();
        }
    }





    /*  Drag and Drop  */
    updateDropThought(thought,cat){
        
        let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  updateThought(thoughtId: \""+thought.thoughtid+"\", category: \""+cat+"\", groupId: \""+thought.groupId+"\", groupName: \""+""+"\") {\n    groupName\n    groupId\n    thought\n    userId {\n      id\n      email\n    }\n  }\n}\n"}
        this.props.updateThought(sendRequest)
        
    }

    //drag and drop
    dragElement = (ev, id) => {
        if(this.state.isAdminCheck){

            if (ev) {
                
                ev.dataTransfer.setData("text", ev.target.id);
                ev.dataTransfer.setData("id", id);
            }
        }
    }

    allowDrop(ev) {
        if(this.state.isAdminCheck){
    
            if (ev.stopPropagation) ev.stopPropagation();
            ev.preventDefault();
            ev.dataTransfer.setData("text", ev.target.id);
            var id = ev.target.parentNode.id;
            ev.dataTransfer.setData("id", id);
            ev.dataTransfer.dropEffect = 'move';
            return false;
        }
    }


    drop(ev,index) {
        if(this.state.isAdminCheck){

            var id = ev.target.parentNode.id;
            if (ev.dataTransfer.getData("id") === id) {
                ev.target.setAttribute('draggable', false)
                ev.preventDefault();
                var dataid = ev.dataTransfer.getData("text");
                var text = document.getElementById(dataid).innerText;
                // var datahtm = "<p value='"+dataid+"'>"+document.getElementById(dataid).innerText+"</p>";
                // $('p#'+targetId).parent('div').children('div').append(datahtm);
                console.log(this.state.thoughtgroups1[ev.target.id])
                switch (id) {
                    case "firstdropable":
                        if (!this.state.thoughtgroups1[ev.target.id]) {
                            this.state.thoughtgroups1[ev.target.id] = [{ id: dataid, thought: text }];
                            let prev = this.state.thoughtgroups1[ev.target.id].push({ id: dataid, thought: text })
                            this.setState({ thoughtgroups1: this.state.thoughtgroups1 },()=>{
                                console.log(this.state.thoughtgroups1);
                            });

                            
                        
                            let sendGroup=[{
                                groupId:ev.target.id,
                                thoughtid:dataid
                            },{
                                groupId:ev.target.id,
                                thoughtid:ev.target.id
                            }]
                            for(let item of sendGroup){
                                this.updateDropThought(item,"1")
                            }
                            

                        } else if (this.state.thoughtgroups1[ev.target.id].length > 0) {
                            let prev = this.state.thoughtgroups1[ev.target.id].push({ id: dataid, thought: text })


                            this.setState({ thoughtgroups1: this.state.thoughtgroups1 },()=>{
                                
                            });
                            let sendGroup={
                                groupId:ev.target.id,
                                thoughtid:dataid
                            }
                            this.updateDropThought(sendGroup,"1")
                        
                        }
                        break;
                    case "seconddropable":
                        if (!this.state.thoughtgroups2[ev.target.id]) {
                            this.state.thoughtgroups2[ev.target.id] = [{ id: dataid, thought: text }];

                            this.setState({ thoughtgroups2: this.state.thoughtgroups2 },()=>{
                                
                            });

                            let sendGroup=[{
                                groupId:ev.target.id,
                                thoughtid:dataid
                            },{
                                groupId:ev.target.id,
                                thoughtid:ev.target.id
                            }]
                            for(let item of sendGroup){
                                this.updateDropThought(item,"2")
                            }
                        } else if (this.state.thoughtgroups2[ev.target.id].length > 0) {
                            let prev = this.state.thoughtgroups2[ev.target.id].push({ id: dataid, thought: text })
                            this.setState({ thoughtgroups2: this.state.thoughtgroups2 },()=>{
                                
                            });
                            let sendGroup={
                                groupId:ev.target.id,
                                thoughtid:dataid
                            }
                            this.updateDropThought(sendGroup,"2")
                        }
                        break;
                    case "thirddropable":
                        if (!this.state.thoughtgroups3[ev.target.id]) {
                            this.state.thoughtgroups3[ev.target.id] = [{ id: dataid, thought: text }];

                            this.setState({ thoughtgroups3: this.state.thoughtgroups3 },()=>{
                                
                            });
                            let sendGroup=[{
                                groupId:ev.target.id,
                                thoughtid:dataid
                            },{
                                groupId:ev.target.id,
                                thoughtid:ev.target.id
                            }]
                            for(let item of sendGroup){
                                this.updateDropThought(item,"3")
                            }
                        } else if (this.state.thoughtgroups3[ev.target.id].length > 0) {
                            let prev = this.state.thoughtgroups3[ev.target.id].push({ id: dataid, thought: text })
                                    
                            this.setState({ thoughtgroups3: this.state.thoughtgroups3 },()=>{
                                
                            });
                            let sendGroup={
                                groupId:ev.target.id,
                                thoughtid:dataid
                            }
                            this.updateDropThought(sendGroup,"3")
                        }
                        break;
                    case "fourthdropable":
                        if (!this.state.thoughtgroups4[ev.target.id]) {
                            this.state.thoughtgroups4[ev.target.id] = [{ id: dataid, thought: text }];
                            this.setState({ thoughtgroups4: this.state.thoughtgroups4 },()=>{
                                
                            });
                            let sendGroup=[{
                                groupId:ev.target.id,
                                thoughtid:dataid
                            },{
                                groupId:ev.target.id,
                                thoughtid:ev.target.id
                            }]
                            for(let item of sendGroup){
                                this.updateDropThought(item,"4")
                            }
                        } else if (this.state.thoughtgroups4[ev.target.id].length > 0) {
                            let prev = this.state.thoughtgroups4[ev.target.id].push({ id: dataid, thought: text })
                            this.setState({ thoughtgroups4: this.state.thoughtgroups4 },()=>{
                                
                            });
                            let sendGroup={
                                groupId:ev.target.id,
                                thoughtid:dataid
                            }
                            this.updateDropThought(sendGroup,"4")
                        }
                        break;

                        
                }
                document.getElementById(dataid).innerText = '';
                ev.target.appendChild(document.getElementById(dataid));
            }
        }
        // this.loadThougthList();
    }

    ungroupthoughts(id,type) {
        if(this.state.isAdminCheck){
            switch (type) {
                case "firstdropable":


                    this.state.thoughtgroups1[id].forEach(
                        (item)=> {
                            $("div[value='"+item.id+"']").append('<p id="'+item.id+'" draggable="true"  >'+item.thought+'</p>');        
                        }
                        
                    )

                    
                    $("div[value='"+id+"'] p p").remove();
                 

                    let sendRequest={
                        groupId:'', 
                        thoughtid:id,
                        goroupingname:''
                    }
                    this.updateDropThought(sendRequest,"1")
                    for(let item of this.state.thoughtgroups1[id]){
                        item.groupId="";
                        item.goroupingname="";
                        item.thoughtid=item.id
                        this.updateDropThought(item,"1")
                    }
                    delete this.state.thoughtgroups1[id];
                    delete this.state.goroupingname[id]
                    this.setState({thoughtgroups1:this.state.thoughtgroups1});
                    break;
                case "seconddropable":
                    this.state.thoughtgroups2[id].forEach(
                        (item)=>{
                            $("div[value='"+item.id+"']").append('<p id="'+item.id+'" draggable="true">'+item.thought+'</p>');        
                        }
                    )
                    $("div[value='"+id+"'] p p").remove(); 
                    
                    let sendRequest2={
                        groupId:'', 
                        thoughtid:id,
                        goroupingname:''
                    }
                    this.updateDropThought(sendRequest2,"2")

                    for(let item of this.state.thoughtgroups2[id]){
                        item.groupId="";
                        item.goroupingname="";
                        item.thoughtid=item.id
                        this.updateDropThought(item,"2")
                    }
                    delete this.state.thoughtgroups2[id];
                    delete this.state.goroupingname[id]
                    this.setState({thoughtgroups2:this.state.thoughtgroups2});
                    break;
                case "thirddropable":
                    this.state.thoughtgroups3[id].forEach(
                        (item)=> {
                            $("div[value='"+item.id+"']").append('<p id="'+item.id+'" draggable="true">'+item.thought+'</p>');        
                        }
                    )
                    $("div[value='"+id+"'] p p").remove();

                    let sendRequest3={
                        groupId:'', 
                        thoughtid:id,
                        goroupingname:''
                    }
                    this.updateDropThought(sendRequest3,"3")


                    for(let item of this.state.thoughtgroups3[id]){
                        item.groupId="";
                        item.goroupingname="";
                        item.thoughtid=item.id
                        this.updateDropThought(item,"3")
                    }
                    delete this.state.thoughtgroups3[id];
                    delete this.state.goroupingname[id]
                    this.setState({thoughtgroups3:this.state.thoughtgroups3});
                    break;
                case "fourthdropable":
                    this.state.thoughtgroups4[id].forEach(
                        (item)=>{
                            $("div[value='"+item.id+"']").append('<p id="'+item.id+'" draggable="true">'+item.thought+'</p>');        
                        }
                    )
                    $("div[value='"+id+"'] p p").remove();

                    let sendRequest4={
                        groupId:'', 
                        thoughtid:id,
                        goroupingname:''
                    }
                    this.updateDropThought(sendRequest4,"4")


                    for(let item of this.state.thoughtgroups4[id]){
                        item.groupId="";
                        item.goroupingname="";
                        item.thoughtid=item.id
                        this.updateDropThought(item,"4")
                    }
                    delete this.state.thoughtgroups4[id];
                    delete this.state.goroupingname[id]
                    this.setState({thoughtgroups4:this.state.thoughtgroups4});
                    break;
            }
        }
    }


    updateGroupName(groupInfo,grpid){
        if(this.state.isAdminCheck){


            let group=groupInfo[grpid];
            for(let items of group){
                let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"mutation {\n  updateThought(thoughtId: \""+items.id+"\", groupId: \""+group[0].groupId+"\", groupName: \""+group[0].groupName+"\") {\n    groupName\n    groupId\n    thought\n    userid {\n      id\n      email\n    }\n  }\n}\n"}
                this.props.updateThought(sendRequest)
            }
        }


    }


    sendInviteUser() {
        if (this.state.sendInViteEmail === "") {
            alert("Please Enter Email");
            return false;
        }
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  createInvite(retroId: \"" + this.state.retroId+ "\", email: \"" + this.state.sendInViteEmail + "\", isAdmin: \"" + "false" + "\") {\n id\n    email\n    retroId\n    createdAt\n    retro {\n      id\n      templateName\n    }\n    isAdmin\n  }\n}\n"
        }

        this.props.inviteUser(sendRequest);

        setTimeout(() => {
            this.loadInviteList(); 
        }, 1000);

    }


    render() {

        
        return (
           
        <div className="App">
            {/* <HeaderComponent/> */}
            <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA" }  >
                <div className={this.state.loaderState ? "loader" : ""}></div>
            </div>

            <div className="scroll-assist" id="startretro">
            { !this.state.isStart && <div>
                <div id="start-retro-info-modal-verlay" className="show"></div>
                <div className="foundry_modal text-center image-bg overlay start-retro-pop reveal-modal" data-time-delay="0" id='start-retro-info-modal'>
                    
                    <ul>
                    <li>Click the timer to start the retro</li>
                    <li>Click<img src={timer}  alt={true}/> to add/reduce time</li>
                    <li><button>Dismiss</button></li>
                    </ul>
                </div>
            </div>}
        <div className="nav-container start-bg">
            <nav className="bg-light">
                <div className="nav-bar">
                    <div className="module left">
                  
                  <Link to="/myretro"><img className="logo" src={require("./img/retro-logo.png")} alt="Retro" /></Link>
                
            
              <div className="pull-left" style={{display:'inline-flex',paddingLeft:50}}>
                <h2 className="retro-title pull-left">{this.state.projectname}
                   <span id="sub-title">Sprint {this.state.sprintnumber?this.state.sprintnumber:0}</span>
                </h2>
               
              </div>
              </div>

               { this.state.isStart && <div id="sharethoughts-page-wrapper" className="module widget-handle language right pull-right">
                <ul className="menu">
                    {this.state.selectedTab==='2' &&<li className="next-vote-on-thoughts">
                        <a >NEXT<span>Vote on Thoughts</span></a>
                    </li>}
                    { this.state.selectedTab==='3' &&<div style={{display: 'inline-flex',float:'left'}}>
                        <li className="next-vote-on-left" >
                        <a >
                        {this.state.voteUser<=3? 3-this.state.voteUser:0} <span> Vote left</span></a>
                        </li>                    
                        <li className="votes-per-person" >
                            <a >3<span>Votes p/ Person</span></a>
                        </li>
                    </div>}
                    {this.state.selectedTab==='4' &&<li className="next-vote-on-thoughts " >
                        

                        <a onClick={()=>this.goSummary()}> Done</a>

                    </li>}
                    <li className="active-users" ref="target" onClick={this.openPopover.bind(this)}>
                        <a > {this.state.joinUsers.length} </a>
                    
                    </li>
                </ul>
            </div>}

              

        { this.state.selectedTab==='1' &&<div className="module widget-handle left pull-right" id="start-stop-timer-btn">

       
                
            {this.state.isAdminCheck&& <button className={'btn timer' + ((this.state.countDownTimers<30000 && this.state.countDownTimers>11000) ? ' warningColor' : (this.state.countDownTimers<=11000 && this.state.countDownTimers>1000) ? ' danger' : '')} 
             onClick={()=>this.timerChange()}>{this.state.showTimer}</button>}

            {!this.state.isAdminCheck && this.state.published==="false" &&<button className={'btn timer' + ((this.state.countDownTimers<30000 && this.state.countDownTimers>11000) ? ' warningColor' : (this.state.countDownTimers<=11000 && this.state.countDownTimers>1000) ? ' danger' : '')}   >Wait</button>}
            {!this.state.isAdminCheck && this.state.published==="true" &&<button className={'btn timer' + ((this.state.countDownTimers<30000 && this.state.countDownTimers>11000) ? ' warningColor' : (this.state.countDownTimers<=11000 && this.state.countDownTimers>1000) ? ' danger' : '')}   >{this.state.showTimer}</button>}
         

              {this.state.userStart &&this.state.published==="false" &&<div className="dropdown pull-right edit-time">
                <button className="dropdown-toggle add-time" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={timer} width="14px" height="14px"  alt={true}/>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" onClick={()=>this.selectTimer(3)}>03:00 min</a>
                  <a className="dropdown-item" onClick={()=>this.selectTimer(5)}>05:00 min</a>
                  <a className="dropdown-item"onClick={()=>this.selectTimer(10)}>10:00 min</a>
                </div>
              </div>}
            </div>}
          </div>
        </nav>
    </div>




    <Modal open={this.state.isOpenModal} onClose={()=>this.onCloseModal()} center>
        <div className="container-fluid  start-box-modal-wrapper">

          <div className="start-box" id="start-box-modal">
            <div className="row">
              <div className="col-md-6">
                <div className="box-area">
                  <div className="start-box-modal-form-fields-wrapper">
                    <h4>Room Code</h4>
                    <input type="text" value={this.state.roomid}  className="room-code" disabled/>
                  </div>
                  <div className="start-box-modal-form-fields-wrapper">
                    <h4>Share Link</h4>
                    <input className="mb0" type="text" value={this.state.serverURL} disabled />
                  
                    <Clipboard component="button"  data-clipboard-text={this.state.serverURL} className="btn btn-outline-secondary btn-orange btn-copy-link">Copy Link</Clipboard>
                  </div>
                  <div className="start-box-modal-form-fields-wrapper ">
                    <h4>Send Invite</h4>
                    <input className="mb0 sendinvite" type="text"  value={this.state.sendInViteEmail} placeholder="email@useremail.com" onChange={(text) => this.setState({ sendInViteEmail: text.target.value })}/>
                    <button type="button" name="button" className="btn copy-link-btn mb0" onClick={()=>this.sendInviteUser()}>Send Invite</button>
                  </div>
                  <div className="start-box-modal-form-fields-wrapper">{this.state.currentIvite!==""?this.state.currentIvite+" has been invited!":""}</div>
                </div>
              </div>
              <div className="col-md-6 pl-5 right-section" id="start-box-modal-right-section">
                    
                      <div id="start-box-modal-right-section-inner">
                        <h5 className="">Who's in the Retro? <span id="who-in-retro-count">{this.state.invitedUserList.length}</span></h5>
                        {this.state.invitedUserList.map((value, index) => {
                              return <div className="row ml-mr-0px" id="start-box-modal-right-section-inner-content" key={index}>
                                  <div className="sendInvideDiv left-0px" id="start-box-modal-right-section-inner-left">
                        <div className="sendInvideP">
                            {value.isAdmin==="true" &&<span style={{marginLeft:5}} className="sendInvideA" id="sendInvideA">A </span>}
                            {value.isAdmin!=="true" && <span style={{marginLeft:20}}> &nbsp; </span>}
                            {value.email}
                            {/* {this.state.userinfo.email==value.email?this.state.userinfo.firstname:"Guest"} */}
                            {value.isAdmin==="true" && <div id="start-box-modal-right-section-inner-right" className="sendInvideDiv2 width-auto checked" >
                            <p className="checked-link">
                            </p>
                            </div>}
                            </div>
                             
                                  </div>
                                </div>
                          })
                        }
                      </div>
              </div>
            </div>
        </div>
          <div className="row" id="retro-single-box-wrapper">
              <div className="col-sm-3 box-bg retro-single-box">
              {this.state.retroinfo.retroCategory1}
              </div>
              <div className="col-sm-3 box-bg retro-single-box">
              {this.state.retroinfo.retroCategory2}
              </div>
              <div className="col-sm-3 box-bg retro-single-box">
              {this.state.retroinfo.retroCategory3}
              </div>
              <div className="col-sm-3 box-bg retro-single-box">
              {this.state.retroinfo.retroCategory4}
              </div>
          </div>
        </div>
    </Modal>


       {/* Start Main Content */}
       { this.state.isStart &&<div className="container-fluid">
            <div className="tab-content-box">
                <div>

                    <Popover
                    placement='bottom'
                    container={this}
                    style={PopoverInnerStyle}
                    // positionright={100}
                    // positionTop={150}
                    // width={300}
                    // containerStyle={{width:300}}
                    target={this.refs.target}
                    show={this.state.showPopover}
                    onHide={this.openPopover.bind(this)} >
                    <div >
                        <div className="joinRetroTitle">Join Retro List</div>
                        {this.state.joinUsers && this.state.joinUsers.map((item,index)=>{
                            return(
                                <p key={index}>{item.retro.userId.firstName} {item.retro.userId.lastName}</p>
                            )}
                        
                        )}

                    </div>
                    
                    </Popover>
                </div>
                    
                    {this.state.isAdminCheck &&<div style={{height:100,textAlign:"right",marginTop:10,position:'absolute',top:81,right:30}}>
                        <textarea placeholder="Enter Note" value={this.state.retroNote} className="textareaResize" onChange={(e)=>this.setState({retroNote:e.target.value})} onBlur={()=>{this.updateNote()}}></textarea>
                    </div>}
                        <ul className="tab-nav-items" >
                            <li onClick={()=> {this.tabChange('1')}} className={ (this.state.selectedTab >= '1'  ? 'active' : '')}><a href="javascript:void(0)">Share Thoughts</a><span></span></li>
                            <li onClick={()=> {this.tabChange('2')}} className={ (this.state.selectedTab >= '2'  ? 'active' : '')}><a href="javascript:void(0)">Discuss Thoughts</a><span></span></li>
                            <li onClick={()=> {this.tabChange('3')}} className={ (this.state.selectedTab >= '3'  ? 'active' : '')}><a href="javascript:void(0)">Vote On Thoughts</a><span></span></li>
                            <li onClick={()=> {this.tabChange('4')}} className={ (this.state.selectedTab >= '4'  ? 'active' : '')}><a href="javascript:void(0)">Discuss Votes</a><span></span></li>
                        </ul>

                        {this.state.isModelShow && <div className="tab-content-box-inner">

                            <div className="tab-content-box-item" id="share-thoughts">
                                    <div className="chat-boxes" style={{ width: this.state.isModelShow ? '100%' :''}}>
                                        <div className=" chat-boxes-inner display_full_screen" >
                                            <button onClick={()=>this.closeModelDetail()} className="full_screen_close-icon">&times;</button>

                                            <div className="row" style={{marginTop:10}}>
                                                <div className="col-4 col-md-4">
                                                    {this.state.showList && this.state.showList.map((val,index)=>{
                                                    return ( 
                                                    <div  key={index} className="thoughts-group-body-inner showList" style={{position:'relative'}}>
                                                        <p >{val.thought}</p>
                                                        
                                                    </div>)
                                                })}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                            </div>
                        </div>}
                        {!this.state.isModelShow &&<div className="tab-content-box-inner">
                     
                            {
                                this.state.selectedTab === '1' &&
                                <SharedThoughts firstCatThought={this.state.firstCatThought} secondCatThought={this.state.secondCatThought} thirdCatThought={this.state.thirdCatThought} fourthCatThought={this.state.fourthCatThought} retroCategory1={this.state.retrocategory1} retroCategory2={this.state.retrocategory2} retroCategory3={this.state.retrocategory3} retroCategory4={this.state.retrocategory4} retroId={this.state.retroId}/>
                            
                            }
                            {
                                this.state.selectedTab === '2' &&

                                <div className="tab-content-box-item" id="discuss-thoughts">
                                    <div className="chat-boxes">
                                        <div className="chat-boxes-inner">
                                            <h4>{this.state.retrocategory1}</h4>
                                            <div className="thoughts-group clearfix">
                                        <div className="chat-boxes-inner containers"   ref={this.dragulaDecorator}>
                                            {this.state.firstCatThought && this.state.firstCatThought.map((values,index)=>{
                                                 var id = values.id;
                                                return ( 
                                                    // <p  key={index}>{val.thought}.</p>
                                                    <div id="firstdropable" value={id}  key={index}  onDrop={(e) => { this.drop(e,index) }} onDragOver={(e) => { this.allowDrop(e) }}>
                                                        <span style={{ display: (this.state.thoughtgroups1[values.id]) ? 'block' : 'none' }} className='showgroupdertails '  value={values.id}>
                                                            <div className={"thoughts-group-header groupNameInput " + (this.state.showexpandthoughtid === id ? 'openCollapseHeader':'')} >
                                                                <h6 className="floatLeft"  onClick={(e) => { this.setState({ showexpandthoughtid: id }) }}></h6>
                                                                <input disabled={!this.state.isAdminCheck}  type="text" value={this.state.thoughtgroups1[id]?this.state.thoughtgroups1[id][0].groupName:''} name="groupname" onChange={e=>{ this.state.thoughtgroups1[id][0].groupName = e.target.value;this.setState({goroupingname:this.state.goroupingname}) }} onBlur={()=>this.updateGroupName(this.state.thoughtgroups1,id)}/> 

                                                                <p  className="floatRight">Group <span>{this.state.thoughtgroups1[values.id] ?this.state.thoughtgroups1[values.id].length:0}</span></p>
                                                            </div>
                                                            
                                                                                                              
                                                        </span> 
                                                        { this.state.thoughtgroups1[values.id] && this.state.showexpandthoughtid !== id && <div>
                                                             <div   className={"shadowThought " + (this.state.isAdminCheck ? 'dragDropIndication':'')}  key={index} onDragStart={(e) => { this.dragElement(e, 'firstdropable') }}  draggable={this.state.thoughtgroups1[id] ? true : true}>{this.state.thoughtgroups1[values.id][0].thought}</div>  
                                                            { this.state.thoughtgroups1[values.id] && this.state.thoughtgroups1[values.id].map((data, ind) => {
                                                                    return (     
                                                                    <div  className="groupDiv" key={ind} >
                                                                    </div>
                                                                    )
                                                                })}
                                                                <p></p>
                                                        </div>}
                                                        

                                                        { !values.groupId && <p  className={"shadowThought " + (this.state.isAdminCheck ? 'dragDropIndication':'')} style={{ display: (this.state.showexpandthoughtid === id) ? 'none' : 'block' }} id={id} onDragStart={(e) => { this.dragElement(e, 'firstdropable') }} key={index} draggable={this.state.thoughtgroups1[id] ? false : true}>
                                                            {values.thought} 
                                                        </p>}

                                                        <div style={{ display: this.state.showexpandthoughtid === id ? 'block' : 'none', }} className={this.state.showexpandthoughtid === id ? 'openCollapse' : ''} id="expandgroups" value={id}>
                                                            {
                                                                this.state.thoughtgroups1[values.id] ? this.state.thoughtgroups1[values.id].map((data, ind) => {
                                                                    return (    
                                                                        <p key={ind} value={data.id} draggable="false">{data.thought}</p>
                                                                    );
                                                                }) : ''
                                                            }
                                                            <div className="openCollapseHeader">
                                                                <span onClick={(e) => { this.setState({ showexpandthoughtid: false }) }}  className="fa  fa-chevron-up"></span>&nbsp;&nbsp;
                                                               
                                                                <span className="ungroupButton" onClick={(e) => { this.setState({ showexpandthoughtid: false }); this.ungroupthoughts(id,'firstdropable') }}>Ungroup</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                               
                                        </div>
                                            
                                        </div>
                                       
                                            <button className="full_screen_icon" onClick={()=>this.openModelDetail('1')}><img src={fullscreen_icon} alt="fullscreen_icon"/></button>
                                    </div>
                                    <div className="chat-boxes">
                                        <div className="chat-boxes-inner containers"  ref={this.dragulaDecorator}>
                                            <h4>{this.state.retrocategory2}</h4>
                                            {this.state.secondCatThought && this.state.secondCatThought.map((values,index)=>{
                                                 var id = values.id;
                                                return ( 
                                                    // <p  key={index}>{val.thought}.</p>
                                                    <div id="seconddropable" value={id}  key={index}  onDrop={(e) => { this.drop(e,index) }} onDragOver={(e) => { this.allowDrop(e) }}>
                                                        <span style={{ display: (this.state.thoughtgroups2[values.id]) ? 'block' : 'none' }} className='showgroupdertails '  value={values.id}>
                                                            <div className={"thoughts-group-header groupNameInput " + (this.state.showexpandthoughtid === id ? 'openCollapseHeader':'')} >
                                                                <h6 className="floatLeft"  onClick={(e) => { this.setState({ showexpandthoughtid: id }) }}></h6>
                                                                <input disabled={!this.state.isAdminCheck}  type="text" value={this.state.thoughtgroups2[id]?this.state.thoughtgroups2[id][0].groupName:''} name="groupname" onChange={e=>{ this.state.thoughtgroups2[id][0].groupName = e.target.value;this.setState({goroupingname:this.state.goroupingname}) }} onBlur={()=>this.updateGroupName(this.state.thoughtgroups2,id)}/> 

                                                                <p  className="floatRight">Group <span>{this.state.thoughtgroups2[values.id] ?this.state.thoughtgroups2[values.id].length:0}</span></p>
                                                            </div>
                                                            
                                                                                                              
                                                        </span> 

                                                        { this.state.thoughtgroups2[values.id] && this.state.showexpandthoughtid !== id && <div>
                                                             <div   className={"shadowThought " + (this.state.isAdminCheck ? 'dragDropIndication':'')}  key={index} onDragStart={(e) => { this.dragElement(e, 'seconddropable') }}  draggable={this.state.thoughtgroups2[id] ? true : true}>{this.state.thoughtgroups2[values.id][0].thought}</div>  
                                                            { this.state.thoughtgroups2[values.id] && this.state.thoughtgroups2[values.id].map((data, ind) => {
                                                                    return (     
                                                                    <div  className="groupDiv" key={ind}>
                                                                    </div>
                                                                    )
                                                                })}
                                                                <p></p>
                                                        </div>}
                                                        

                                                        { !values.groupId && <p  className={"shadowThought " + (this.state.isAdminCheck ? 'dragDropIndication':'')} style={{ display: (this.state.showexpandthoughtid === id) ? 'none' : 'block' }} id={id} onDragStart={(e) => { this.dragElement(e, 'seconddropable') }} key={index} draggable={this.state.thoughtgroups2[id] ? false : true}>
                                                            {values.thought} 
                                                        </p>}

                                                        <div style={{ display: this.state.showexpandthoughtid === id ? 'block' : 'none', }} className={this.state.showexpandthoughtid === id ? 'openCollapse' : ''} id="expandgroups" value={id}>
                                                            {
                                                                this.state.thoughtgroups2[values.id] ? this.state.thoughtgroups2[values.id].map((data, ind) => {
                                                                    return (    
                                                                        <p key={ind} value={data.id}  draggable="false">{data.thought}</p>
                                                                    );
                                                                }) : ''
                                                            }
                                                            <div className="openCollapseHeader">
                                                                <span onClick={(e) => { this.setState({ showexpandthoughtid: false }) }}  className="fa  fa-chevron-up"></span>&nbsp;&nbsp;
                                                               
                                                                <span className="ungroupButton" onClick={(e) => { this.setState({ showexpandthoughtid: false }); this.ungroupthoughts(id,'seconddropable') }}>Ungroup</span>
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                                
                                                    
                                                )
                                            })}
                                            
                                        </div>
                                        <button className="full_screen_icon" onClick={()=>this.openModelDetail('2')}><img src={fullscreen_icon}  alt="fullscreen_icon"/></button>
                                    </div>
                                    <div className="chat-boxes">
                                        <div className="chat-boxes-inner containers"  ref={this.dragulaDecorator}>
                                            <h4>{this.state.retrocategory3}</h4>
                                            {this.state.thirdCatThought && this.state.thirdCatThought.map((values,index)=>{
                                                var id = values.id;
                                               return ( 
                                                <div id="thirddropable" value={id}  key={index}  onDrop={(e) => { this.drop(e,index) }} onDragOver={(e) => { this.allowDrop(e) }}>
                                                    
                                                    <span style={{ display: (this.state.thoughtgroups3[values.id]) ? 'block' : 'none' }} className='showgroupdertails '  value={values.id}>
                                                        <div className={"thoughts-group-header groupNameInput " + (this.state.showexpandthoughtid === id ? 'openCollapseHeader':'')} >
                                                            <h6 className="floatLeft"  onClick={(e) => { this.setState({ showexpandthoughtid: id }) }}></h6>
                                                            <input  disabled={!this.state.isAdminCheck}   type="text" value={this.state.thoughtgroups3[id]?this.state.thoughtgroups3[id][0].groupName:''} name="groupname" onChange={e=>{ this.state.thoughtgroups3[id][0].groupName = e.target.value;this.setState({goroupingname:this.state.goroupingname}) }} onBlur={()=>this.updateGroupName(this.state.thoughtgroups3,id)}/> 

                                                            <p  className="floatRight">Group <span>{this.state.thoughtgroups3[values.id] ?this.state.thoughtgroups3[values.id].length:0}</span></p>
                                                        </div>
                                                        
                                                                                                            
                                                    </span> 

                                                    { this.state.thoughtgroups3[values.id] && this.state.showexpandthoughtid !== id && <div>
                                                            <div   className={"shadowThought " + (this.state.isAdminCheck ? 'dragDropIndication':'')}  key={index} onDragStart={(e) => { this.dragElement(e, 'firstdropable') }}  draggable={this.state.thoughtgroups3[id] ? true : true}>{this.state.thoughtgroups3[values.id][0].thought}</div>  
                                                        { this.state.thoughtgroups3[values.id] && this.state.thoughtgroups3[values.id].map((data, ind) => {
                                                                return (     
                                                                <div  className="groupDiv"  key={ind}>
                                                                </div>
                                                                )
                                                            })}
                                                            <p></p>
                                                    </div>}
                                                    

                                                    { !values.groupId && <p  className={"shadowThought " + (this.state.isAdminCheck ? 'dragDropIndication':'')}  style={{ display: this.state.showexpandthoughtid === id ? 'none' : 'block' }} id={id} onDragStart={(e) => { this.dragElement(e, 'thirddropable') }} key={index} draggable={this.state.thoughtgroups3[id] ? false : true}>
                                                        {values.thought}
                                                    </p>}

                                                    <div style={{ display: this.state.showexpandthoughtid === id ? 'block' : 'none' }}  className={this.state.showexpandthoughtid === id ? 'openCollapse' : ''}  id="expandgroups" value={id}>
                                                        {
                                                            this.state.thoughtgroups3[values.id] ? this.state.thoughtgroups3[values.id].map((data, ind) => {
                                                                return (
                                                                    <p key={ind} value={data.id} draggable="false">{data.thought}</p>
                                                                );
                                                            }) : ''
                                                        }
                                                        <div className="openCollapseHeader">
                                                            <span onClick={(e) => { this.setState({ showexpandthoughtid: false }) }}  className="fa  fa-chevron-up"></span>&nbsp;&nbsp;
                                                            <span className="ungroupButton" onClick={(e) => { this.setState({ showexpandthoughtid: false }); this.ungroupthoughts(id,'thirddropable') }}>Ungroup</span>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                   
                                                    
                                                )
                                            })}
                                         </div>
                                            <button className="full_screen_icon" onClick={()=>this.openModelDetail('3')}><img src={fullscreen_icon} alt="fullscreen_icon" /></button>
                                       
                                    </div>
                                    <div className="chat-boxes">
                                        <div className="chat-boxes-inner containers"  ref={this.dragulaDecorator}>
                                            <h4>{this.state.retrocategory4}</h4>
                                            {this.state.fourthCatThought && this.state.fourthCatThought.map((values,index)=>{
                                                var id = values.id;
                                               
                                               return ( 

                                                    <div id="fourthdropable" value={id}  key={index}  onDrop={(e) => { this.drop(e,index) }} onDragOver={(e) => { this.allowDrop(e) }}>
                                                        

                                                         <span style={{ display: (this.state.thoughtgroups4[values.id]) ? 'block' : 'none' }} className='showgroupdertails '  value={values.id}>
                                                            <div className={"thoughts-group-header groupNameInput " + (this.state.showexpandthoughtid === id ? 'openCollapseHeader':'')} >
                                                                <h6 className="floatLeft"  onClick={(e) => { this.setState({ showexpandthoughtid: id }) }}></h6>
                                                                <input disabled={!this.state.isAdminCheck}  type="text" value={this.state.thoughtgroups4[id]?this.state.thoughtgroups4[id][0].groupName:''} name="groupname" onChange={e=>{ this.state.thoughtgroups4[id][0].groupName = e.target.value;this.setState({goroupingname:this.state.goroupingname}) }} onBlur={()=>this.updateGroupName(this.state.thoughtgroups4,id)}/> 

                                                                <p  className="floatRight">Group <span>{this.state.thoughtgroups4[values.id] ?this.state.thoughtgroups4[values.id].length:0}</span></p>
                                                            </div>
                                                            
                                                                                                                
                                                        </span> 
                                                        { this.state.thoughtgroups4[values.id] && this.state.showexpandthoughtid !== id && <div>
                                                                <div   className={"shadowThought " + (this.state.isAdminCheck ? 'dragDropIndication':'')}  key={index} onDragStart={(e) => { this.dragElement(e, 'firstdropable') }}  draggable={this.state.thoughtgroups4[id] ? true : true}>{this.state.thoughtgroups4[values.id][0].thought}</div>  
                                                            { this.state.thoughtgroups4[values.id] && this.state.thoughtgroups4[values.id].map((data, ind) => {
                                                                    return (     
                                                                    <div  className="groupDiv"  key={ind}>
                                                                    </div>
                                                                    )
                                                                })}
                                                                <p></p>
                                                        </div>}

                                                        { !values.groupId && <p  className={"shadowThought " + (this.state.isAdminCheck ? 'dragDropIndication':'')}  style={{ display: this.state.showexpandthoughtid === id ? 'none' : 'block' }} id={id} onDragStart={(e) => { this.dragElement(e, 'fourthdropable') }} key={index} draggable={this.state.thoughtgroups4[id] ? false : true}>
                                                            {values.thought}
                                                        </p>}

                                                        <div style={{ display: this.state.showexpandthoughtid === id ? 'block' : 'none' }} className={this.state.showexpandthoughtid === id ? 'openCollapse' : ''}  id="expandgroups" value={id}>
                                                            {
                                                                this.state.thoughtgroups4[values.id] ? this.state.thoughtgroups4[values.id].map((data, ind) => {
                                                                    return (
                                                                        <p key={ind} value={data.id} draggable="false">{data.thought}</p>
                                                                    );
                                                                }) : ''
                                                            }


                                                            <div className="openCollapseHeader">
                                                                <span onClick={(e) => { this.setState({ showexpandthoughtid: false }) }}  className="fa  fa-chevron-up"></span>&nbsp;&nbsp;
                                                                <span className="ungroupButton" onClick={(e) => { this.setState({ showexpandthoughtid: false }); this.ungroupthoughts(id,'fourthdropable') }}>Ungroup</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    // <p  key={index}>{val.thought}.</p>
                                                )
                                            })}
                                        </div>
                                            <button className="full_screen_icon" onClick={()=>this.openModelDetail('4')}><img src={fullscreen_icon} alt="fullscreen_icon"/></button>
                                        
                                    </div>
                                </div>
                            }
                            {
                                this.state.selectedTab === '3' &&
                                <VoteOnThoughts firstCatThought={this.state.firstCatThought} secondCatThought={this.state.secondCatThought} thirdCatThought={this.state.thirdCatThought} fourthCatThought={this.state.fourthCatThought} retroCategory1={this.state.retrocategory1}  retroCategory2={this.state.retrocategory2} retroCategory3={this.state.retrocategory3} retroCategory4={this.state.retrocategory4}   thoughtGroups1={this.state.thoughtgroups1} thoughtGroups2={this.state.thoughtgroups2} thoughtGroups3={this.state.thoughtgroups3} thoughtGroups4={this.state.thoughtgroups4}retroId={this.state.retroId} reloadThoughts={this.loadThougthList} voteUser={this.state.voteUser} adminCheck={this.state.isAdminCheck} totalVoteCount={this.totalVoteCount} />

                            }
                            {
                                this.state.selectedTab === '4' &&
                                <DiscussVotes discussGrpCat1={this.state.discussGrpCat1} discussGrpCat2={this.state.discussGrpCat2} discussGrpCat3={this.state.discussGrpCat3} discussGrpCat4={this.state.discussGrpCat4} retroCategory1={this.state.retrocategory1}  retroCategory2={this.state.retrocategory2} retroCategory3={this.state.retrocategory3} retroCategory4={this.state.retrocategory4} retroId={this.state.retroId} thoughtGroups1={this.state.thoughtgroups1} thoughtGroups2={this.state.thoughtgroups2} thoughtGroups3={this.state.thoughtgroups3} thoughtGroups4={this.state.thoughtgroups4}/>

                            }
                        </div>}
                    </div>
                </div>}
                {/* End Main Content */}
                

                        <div className="footer2">
                            <div className="container">

                                <div className="row" style={{marginRight: "0px"}}>
                                    <div className="col-6">
                                        <h1 className="pull-left" style={{float:"left"}}>THE PRIME DIRECTIVE</h1>
                                    </div>
                                    <div className="col-6">
                                        <span className="pull-right" style={{float:"right"}}>Read this at the beginning of each retrospective.</span>
                                    </div>
                                </div>
                                <div style={{marginTop: "14px",textAlign: "left"}}>
                                    <div className="clear"></div>
                                    <p>Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand.</p>
                                    <p>At the end of a project everyone knows so much more. Naturally we will discover decisions and actions we wish we could do over. This is wisdom to be celebrated, not judgement used to embarrass.</p>
                                </div>
                            </div>
                        </div>
                </div> 
            <FooterComponent/>
            </div>
            );
        }
    }                
// export default startretro;

startretro.propTypes = {
    handleFormSubmit: PropTypes.func,
    getAddThougthRes: PropTypes.any,
    thougthList: PropTypes.any,
    updateThoughtRes:PropTypes.any,
    myInviteList: PropTypes.any


};

const mapStateToProps = createStructuredSelector({
    getAddThougthRes:createThoughtRes,
    thougthList:fetchThoughtRes,
    updateThoughtRes:updateThoughtRes,
    myInviteList :getAllInviteRes,

});
    
function mapDispatchToProps(dispatch) {
    return {
        doCreatingThought: (data) => dispatch(createThoughts(data)),
        getThoughtList:(data) => dispatch(getThoughts(data)),
        updateThought:(data) => dispatch(doUpdateThought(data)),
        updateActivity:(data) => dispatch(doUpdateActivity(data)),
        fetchInvite: (data) => dispatch(getInvite(data)),
        updateRetroNote: (data) => dispatch(updateRetroNote(data)),
        inviteUser: (data) => dispatch(InviteUsersRetro(data)),

        
    };
}
    
const withConnect = connect(mapStateToProps, mapDispatchToProps);
                
export default compose(withConnect)(startretro);