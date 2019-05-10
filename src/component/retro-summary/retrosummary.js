import React, { Component } from 'react';
import './retrosummary.css';
import HeaderComponent from './../../commonComponent/header';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getThoughts, fetchThoughtRes } from './../../actions/createThought';

import { getInvite, getAllInviteRes } from './../../actions/inviteRetorActions';
import moment from 'moment';
import VoteSummary from './vote-summary';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



class RetroSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TopVoted: [],
            retroInfo: [],
            retroDate: '',
            tempAllVote: [],
            isShowmore: false,
            retroNote: '',
            loaderState: false,
            joinUsers: [],
            retrocategory1:'',
            retrocategory2:'',
            retrocategory3:'',
            retrocategory4:'',
            retroName:""
        }

    }
    componentWillMount() {
        let id = this.props.match.params.id;

       
        this.setState({
            loaderState: true
        })
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "{\n  fetchSingleRetro(id: \"" + id + "\") {\n    id\n    startDate\n    retroAdmin\n    sprintNumber\n    templateName\n  projectId\n    projects {\n      id\n      projectName\n    }\n  retroCategory1\n retroCategory2\n retroCategory3\n retroCategory4\n   published\n    createdAt\n    updatedAt\n    templateName\n  timer\n    roomCode\n notes\n   published\n    activity\n  userId {\n      id\n    }\n   thoughts {\n       groupId\n  groupName\n   id\n      Like\n   thought\n    category\n   userId {\n  id\n     firstName\n        lastName\n     }\n  }\n  }\n}\n"
        }

        console.log(sendRequest)
        this.props.getThoughtList(sendRequest);
        



        let sendRequestinvite={
            "operationName":null,
            "variables":{},
            "query":"{\n  fetchAllInviteLink(retroId: \"" + id + "\") {\n    id\n    isJoined\n    email\n    retroId\n    url\n    createdAt\n    retro {\n      id\n      retroAdmin\n      userId {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n}\n"}
        this.props.fetchInvite(sendRequestinvite)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.thougthList.data.thougthReducer.data && nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro) {
                this.setState({
                    retroInfo: nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro,
                    retroDate: moment(new Date(nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro.createdAt)).format('MMM D, YYYY     hh:mm a'),
                    retroNote: nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro.notes

                })
                let retroDetail=nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro;
                console.log(retroDetail)
                // let selectProject=[];
                if(retroDetail.projects){
                    for(let item of retroDetail.projects){
                        if(item.id===retroDetail.projectId){
                            this.setState({
                                retroName:item.projectname
                            })
                        }
                    }
                }
                
                this.setState({
                    retrocategory1:retroDetail.retroCategory1,
                    retrocategory2:retroDetail.retroCategory2,
                    retrocategory3:retroDetail.retroCategory3,
                    retrocategory4:retroDetail.retroCategory4,
                })
                let thougthData = nextProps.thougthList.data.thougthReducer.data.fetchSingleRetro.thoughts;
                if(thougthData){
                    let groupThought=[];
                    let singleThought=[];
                    if(thougthData && thougthData.length>0){
                        for(let items of thougthData){
                            if(items.Like){
                                items.getlikeList=JSON.parse(items.Like);
                                items.voteCount=JSON.parse(items.Like).length;
                            }else{
                                items.getlikeList=[]
                                items.voteCount=0;
                            }
                            if(items.groupId!="" && items.groupId!=null && items.groupId!="null"){
                                groupThought.push(items);
                            }else{
                                items.grouping="";
                                singleThought.push(items);
                            }

                        }

                        if(groupThought && groupThought.length>0){
                            this.setState({ thoughtgroups: this.makeGrouping(groupThought)},()=>{
                                
                                let newGrpArray=[];
                                for(let items of thougthData){
                                    if(this.state.thoughtgroups[items.id]){
                                        newGrpArray.push({"grouping":this.state.thoughtgroups[items.id]})
                                    }
                                }
                                let tmpGrpArray=[];
                                for(let tmp of newGrpArray){
                                    tmp.grouping[0].isGrp=true;
                                    tmp.grouping[0].grouping=tmp.grouping;
                                    tmpGrpArray.push(tmp.grouping[0])
                                }
                                let FinalRetro=singleThought.concat(tmpGrpArray)
                                let sortArray= FinalRetro.sort(this.sortingVotes);
                                this.setState({
                                    TopVoted:sortArray
                                })                               
                            })
                            
                        }else{
                            let sortArray= singleThought.sort(this.sortingVotes);
                            this.setState({
                                TopVoted:sortArray
                            })  
                        }
                    } 
                }
                this.setState({
                    loaderState: false
                })
                let checkDownload=localStorage.getItem("isDownloadPDF");
                if(checkDownload==="true"){
                    this.setState({
                        loaderState: true
                    })
                    this.downloadPdf()
                }
                setTimeout(()=>{
                    if(checkDownload==="true"){
                    localStorage.setItem("isDownloadPDF","")

                        this.props.history.push("/myretro")
                    }
                },1000)

            }

            if (nextProps.myInviteList && nextProps.myInviteList.data.inviteRetroReducer.data) {
                if (nextProps.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink) {

                    let getInvestorList = nextProps.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink
                    let joinerList = [];
                    for (let items of getInvestorList) {
                        if (items.isJoined === "true" || items.isJoined === true) {
                            joinerList.push(items);
                        }
                    }
                    this.setState({
                        allmyInviteList: nextProps.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink,
                        joinUsers: joinerList
                    }, () => {
                        console.log(this.state.joinUsers)
                    })
                }
            }

        }
    }

    sortingVotes(a, b) {
        if (a.voteCount > b.voteCount)
            return -1;
        if (a.voteCount > b.voteCount)
            return 1;
        return 0;

    }

      /* Make Grouping Start */
      makeGrouping(thoughtList){
            var newarray = [];
            for(var i=0; i<thoughtList.length; i++){
                var newIndex = 0;
                var data = {"id": thoughtList[i].id, "thought": thoughtList[i].thought, "groupId": thoughtList[i].groupId,"groupName": thoughtList[i].groupName,userLike:thoughtList[i].userLike,likeCount:thoughtList[i].getlikeList,category: thoughtList[i].category,voteCount:thoughtList[i].voteCount};
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

    componentDidMount() {
       
    }
    openMore() {
        this.setState({
            TopVoted: this.state.tempAllVote
        })
    }

    downloadPdf() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("topVoted.pdf");
          })
        ;
    }

    render() {
        // console.log(this.state.TopVoted)
        return (
            <div className="scroll-assist" id="retrosummary-page-wrapper">
                <HeaderComponent />

                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="container">
                    <div className="summary">
                        SUMMARY
                    </div>
                    <div className="row">
                        <div className="col-md-12 strip">
                            <div className="row">

                                {this.state.retroInfo && <div className="col-md-6">
                                    <div className="lecet">
                                        {this.state.retroName}
                                    </div>
                                    <div className="sprint">
                                        Sprint {this.state.retroInfo.sprintNumber}
                                    </div>
                                </div>}

                                {this.state.retroInfo && <div className="col-md-6 text-right">
                                    <div className="date">
                                        {this.state.retroDate}
                                    </div>
                                    <div className="minit">
                                        {/* 39 Minutes */}
                                    </div>
                                </div>}

                            </div>
                        </div>
                    </div>

                    <div className="row margin">
                        <div className="col-md-8 pl-0">
                            <div id="divToPrint" className="strip1">
                                <div className="clearfix">
                                    <div className="top">
                                        Top Voted Thoughts
                                    </div>
                                    <div className="ofvotes">
                                        # Of Votes
                                    </div>
                                    <div className="group">
                                        Thought/Group
                                    </div>
                                </div>

                                <VoteSummary  voteSummary={this.state.TopVoted} retrocategory1={this.state.retrocategory1} retrocategory2={this.state.retrocategory2} retrocategory3={this.state.retrocategory3} retrocategory4={this.state.retrocategory4}/>
                               
                            </div>
                            <div id="editor"></div>

                            {this.state.isShowmore && <div className="strip2 show_more_retrosummary">
                                <div className="show" onClick={() => this.openMore()}>
                                    <a>  Show More   </a>

                                </div>
                            </div>}
                        </div>
                        <div className="col-md-4 pr-0">
                            <div className="strip3">

                                <div className="clearfix">
                                    <div className="ateen">
                                        Attendees {this.state.joinUsers && <span style={{ float: "right" }}> {this.state.joinUsers.length}</span>}
                                    </div>
                                    <div className="eight">
                                    </div>
                                </div>

                                {(this.state.joinUsers && this.state.joinUsers.length > 0) && this.state.joinUsers.map((item, index) => {
                                    return (<div className="attendees-list clearfix" key={index}>
                                        <div className="float-left">
                                            <div className="bob"> <span>{item.retro.userId.firstName} {item.retro.userId.lastName}</span></div>
                                        </div>
                                    </div>)
                                })
                                }
                            </div>

                            <div className="strip4">

                                <div className="note">
                                    Notes
                                </div>
                                <div className="note1">
                                    {this.state.retroNote}

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="fotar">
                    <div className="container">
                        <div className="row align-items-center pt-1 pb-1">
                            <div className="col-md-4">
                                <div className="feedback">
                                    <button type="button" className="retro-summary-feedback-popup-btn" data-toggle="modal" data-target="#retro-summary-feedback-popup">
                                        buttonFeedback
                                    </button>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <a  className="send-email handpointer">  Send Email</a>
                                <a  className="downpdf handpointer" onClick={() => { this.downloadPdf() }}>  Download PDF    </a>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className="modal fade" id="retro-summary-feedback-popup" tabIndex="-1" role="dialog" aria-labelledby="retro-summary-feedback" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h3>We'd like your feedback!</h3>
                                <p>Please take our short, 3-minutes survey and let us know about your experience with Retro App!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary not-now-btn">Not Now</button>
                                <button type="button" className="btn btn-primary take-survey-btn">Take the Survey</button>
                            </div>
                            <a className="dont-ask-link">don't ask me again</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RetroSummary.propTypes = {
    thougthList: PropTypes.any,
    myInviteList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
    thougthList: fetchThoughtRes,
    myInviteList: getAllInviteRes,
});

function mapDispatchToProps(dispatch) {
    return {
        getThoughtList: (data) => dispatch(getThoughts(data)),
        fetchInvite: (data) => dispatch(getInvite(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RetroSummary);