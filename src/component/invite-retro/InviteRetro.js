import React, { Component } from 'react';
import './invite.css';
import { compose } from 'redux';
import { ic_close } from 'react-icons-kit/md/ic_close';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Clipboard from 'react-clipboard.js';
import Icon from 'react-icons-kit';
import { exclamationCircle } from 'react-icons-kit/fa/exclamationCircle';
import { submit_InviteRetro, InviteUsersRetro, doInviteUsersRes, deletedUsers, deleteUsersRes, getInvite, getAllInviteRes,updateRetro } from '../../actions/inviteRetorActions';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { BASE_URL } from "./../../constants";

class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: this.randomString(),
            timeFrom: "",
            timeTo: "",
            showtimeFrom: "",
            showtimeTo: "",
            inputDate: "",
            inputWeek: "",
            endOnDate: "",
            repeatEvery: "false",
            sendInViteEmail: "",
            sendInViteEmailDisplay: [],
            sharedlink: "",
            createretroinfo: {},
            userinfo: {},
            inputtypetime: false,
            retrodata: [],
            repeatEnable: false,
            shareLink: BASE_URL +'startretro/' + this.randomString(),
            invitedUserList: [],
            isUserListShow: true,
            isInvited: true,
            showTimeSlot:false,
            showTimeSlotFrom: false,
            loaderState: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.selectedToTime=this.selectedToTime.bind(this);
    }

    randomString() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 6;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }

    componentDidMount() {
        let data1 = localStorage.getItem('logindata');
        let values1 = JSON.parse(data1);
        // console.log(values1)

       

        this.setState({
            createretroinfo: {},
            userinfo: values1,
            sendInViteEmail: values1.email
        }, () => {
           
        })
       

    }

    fetchInvitedRetro() {

        console.log(this.state.retrodata)

        let sendRequestinvite = { "operationName": null, "variables": {}, "query": "{\n  fetchAllInviteLink(retroId: \"" + this.state.retrodata.id + "\") {\n    id\n    email\n    retroId\n    url\n    createdAt\n    isAdmin\n    retro {\n      id\n      retroAdmin\n    }\n  }\n}\n" }
        this.props.fetchInvite(sendRequestinvite)
    }

    logout() {
        this.props.history.push('/');
        localStorage.clear();
    }

    clear() {
        this.setState({
            timeFrom: "",
            timeTo: "",
            inputDate: "",
            inputWeek: "",
            endOnDate: "",
            repeatEvery: false,
            showtimeFrom:"",
            showtimeTo:"",
        })
    }

    componentWillReceiveProps(props) {
        console.log(props)

        if (props) {

            if (props.myInviteList && props.myInviteList.data.inviteRetroReducer.data && props.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink) {
                let getInvestorList = props.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink;
                this.setState({
                    invitedUserList: getInvestorList,
                })
            }

            if (props.deletedUserRes && props.deletedUserRes.data.inviteRetroReducer.data && props.deletedUserRes.data.inviteRetroReducer.data.updateInvite) {

            }

            if (props.invitedUsers.data.inviteRetroReducer && props.invitedUsers.data.inviteRetroReducer.data && props.invitedUsers.data.inviteRetroReducer.data.createInvite) {
                let addedUserList = props.invitedUsers.data.inviteRetroReducer.data.createInvite;
                let addedUser = [];
                addedUser = this.state.invitedUserList;
                addedUser.push(addedUserList)
                this.setState({
                    invitedUserList: addedUser,
                    sendInViteEmail: ""
                }, () => {
                    // console.log(this.state.invitedUserList);
                })
            }


        }

        if (props.retrofetchdata && props.retrofetchdata != "") {

            console.log(props.retrofetchdata)

            this.setState({
                retrodata: props.retrofetchdata,
                shareLink: BASE_URL +'startretro/' + this.randomString() + "/" + props.retrofetchdata.id,
            }, () => {
                if (this.state.isInvited) {
                    this.setState({
                        isInvited: false,
                        sendInViteEmail: this.state.userinfo.email
                    }, () => {
                        this.sendInviteUser("true");
                    })
                }

            });
        }
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }


    changeAdmin(index, res) {
        if (res.isAdmin == true || res.isAdmin == "true") {
            res.isAdmin = "false"
        } else {
            res.isAdmin = "true"
        }
        console.log(res)
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  updateInvite(inviteId: \"" + res.id + "\", isAdmin: \"" + res.isAdmin + "\") {\n    id\n    email\n    isAdmin\n  }\n}\n"
        }
        this.props.deleteUserInvited(sendRequest);
        setTimeout(() => {
            this.fetchInvitedRetro();
        }, 1000);
    }

    deleteInviteRetro(index, res) {

        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  deleteInvite(id: \"" + res.id + "\") {\n    id\n  }\n}\n"
        }
        // this.state.invitedUserList

        this.state.invitedUserList.splice(index, 1);
        console.log(this.state.invitedUserList)
        this.setState({
            isRender: true
        })
        this.props.deleteUserInvited(sendRequest);
        setTimeout(() => {
            this.fetchInvitedRetro();
        }, 1000);
    }

    adminstatus(index) {
        let oldArray = this.state.invitedUserList
        oldArray[index]['adminStatus'] = !oldArray[index]['adminStatus']
        this.setState({ invitedUserList: oldArray });
    }

    handleChange(date) {
        console.log(date)

        let newDate=moment(date).format("YYYY-MM-DD");
        let newTime=moment(new Date).format("HH:mm:ss");
       
        this.setState({
            inputDate: new Date(moment(newDate +" "+ newTime, 'YYYY-MM-DD HH:mm:ss').format()),
            endOnDate: "",
            isRender: true
        });
    }

    handleChange2(date) {
        let newDate=moment(date).format("YYYY-MM-DD");
        let newTime=moment(new Date).format("HH:mm:ss");
        this.setState({
            endOnDate: new Date(moment(newDate +" "+ newTime, 'YYYY-MM-DD HH:mm:ss').format())
        });
        console.log(this.state.endOnDate)
    }

    onInviteSubmit() {
        var retroObj = this.state.retrodata;

        this.setState({
            isUserListShow: false,
            loaderState: true
        })

        let payload = {
            useruid: retroObj.useruid,
            retroadmin: retroObj.userId.email,
            retroid: retroObj.id,
            roomcode: this.state.roomCode,
            templatename: retroObj.templatename,
            shareablelink: this.state.sharedlink,
            startTime: this.state.timeFrom,
            Endtime: this.state.timeTo,
            startdate: this.state.inputDate,
            Enddate: this.state.endOnDate,
            repeatevery: this.state.repeatEvery,
            inputWeek: this.state.inputWeek,
            email: this.state.userinfo.email
        }
        let pageStatus = true;
        if (this.state.timeFrom == "" && this.state.timeTo == "" && this.state.inputDate == "") {
            payload.startdate = new Date();
            pageStatus = false
        }
        var newStartDate=new Date();
        var day = 60 * 60 * 24 * 1000;
        var newEndDate=new Date( new Date().getTime() + day);


        let startDate =this.state.inputDate ? this.state.inputDate : newStartDate;
        let endDate =this.state.endOnDate ? this.state.endOnDate : newEndDate;

        console.log(startDate +" ==" + endDate + "inputDate" + new Date(this.state.inputDate))
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  createInvite(retroId: \"" + retroObj.id + "\", email: \"" + this.state.userinfo.email + "\", roomCode: \"" + this.state.roomCode + "\", startDate: \"" + startDate + "\", startTime: \"" + this.state.timeFrom + "\", endTime: \"" + this.state.timeTo + "\", endDate: \"" + endDate + "\", repeatEvery: \"" + this.state.repeatEvery + "\", inputWeek: \"" + this.state.inputWeek + "\", shareLink: \"" + this.state.shareLink + "\") {\n    email\n    id\n    retroId\n    url\n    createdAt\n    retro {\n      id\n      templateName\n    }\n    startTime\n    endTime\n    startDate\n    endDate\n    repeatEvery\n    inputWeek\n    shareLink\n    roomCode\n  }\n}\n"
        }
        

        let sendUpdateRetroRequest = {

            "operationName": null,
            "variables": {},
            "query": "mutation {\n  updateRetro(retroId: \"" + retroObj.id  + "\",userId: \"" + this.state.userinfo.id + "\",startDate: \"" + startDate + "\", roomCode: \"" + this.state.roomCode + "\",endDate: \"" + endDate + "\", startTime: \"" + this.state.timeFrom + "\", endTime: \"" + this.state.timeTo + "\", inputWeek: \"" + this.state.inputWeek + "\" ,isEditRetro: \""+"true"+"\",  projectName: \""+retroObj.projects[0].projectName+"\") {\n    retroAdmin\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n    projectId\n    roomCode\n    sprintNumber\n      startDate\n    inviteToJointRetros {\n      id\n      startDate\n      endDate\n      startTime\n      endTime\n      inputWeek\n      repeatEvery\n      email\n    }\n  }\n}\n"
        }

        let sendPayloadContorl = {
            roomcode: this.state.roomCode,
            retroid: this.state.retrodata.id,
            pageStatus: pageStatus,
            userid: this.state.userinfo.id,
        }

        let sendPayloadRequest = {
            retroadmin: payload.retroadmin,
            payload: sendRequest
        }

        //   console.log(sendPayloadRequest)

        this.props.updateRetro(sendUpdateRetroRequest);

        setTimeout(() => {
            this.props.handleFormSubmit(sendPayloadRequest, sendPayloadContorl);            
        }, 500);




    }

    sendInviteUser(isAdmin) {
        console.log(this.state.retrodata)
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.sendInViteEmail == "") {
            alert("Please Enter Email");
            return false;
        }
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  createInvite(retroId: \"" + this.state.retrodata.id + "\", email: \"" + this.state.sendInViteEmail + "\", isAdmin: \"" + isAdmin + "\") {\n id\n    email\n    retroId\n    createdAt\n    retro {\n      id\n      templateName\n    }\n    isAdmin\n  }\n}\n"
        }

        this.props.inviteUser(sendRequest);

        setTimeout(() => {
            this.fetchInvitedRetro();
        }, 1000);

    }

    selectedToTime(time,showtime){
        this.setState({ 
            timeTo: time,
            showtimeTo:showtime,
            showTimeSlot: false,
            showTimeSlotFrom: false
        },()=>{
         
        })
    }

    selectedFromTime(time,showtime){
        this.setState({ 
            timeFrom: time,
            showtimeFrom:showtime,
            showTimeSlotFrom: false,
            showTimeSlot: false,

        },()=>{
            
        })
    }


    render() {
        const { timeFrom, timeTo, inputDate } = this.state;
        const validinput = timeFrom === "" || timeTo === "" || inputDate === "";

        const CheckValid = (this.state.timeFrom == "" || this.state.timeTo == "" || this.state.inputDate == "" || this.state.roomCode == "");
        console.log(CheckValid)
        return (
            <div id="inviteretro">
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA" }  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="body-content text_left" id="invite-retro">
                    {/* <HeaderComponent/>  */}
                    <div className="main-content">
                        <div className="">
                            <div className="row">
                                <div className="col-md-4 offset-md-4 pr-5 pl-5">
                                    <nav className="nav nav-pills nav-justified">
                                        <a to="/createretro" className={this.state.showsection == "createretro" ? "nav-item nav-link active" : "nav-item nav-link fw-n c-g"}> Create Retro</a>
                                        <a to="/invite" className={this.state.showsection == "inviteretro" ? "nav-item nav-link active" : "nav-item nav-link active"} >Invite Team</a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="container">
                                <div className="row mb-3">
                                    <div className="col-md-12 ">
                                        <h3 className="page-title" style={{ textAlign: 'left' }}>Invite Your Team</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 pr-3  invite-cust">
                                     
                                        <div>
                                            <h4 className="fw-600 section-heading">Room Code</h4>
                                            <div className="row mb-3">
                                                <div className="col-md-4 pr-0">
                                                    <input type="text"
                                                        className="" name="room_code" placeholder="Room Code" value={this.state.roomCode} onChange={(text) => this.setState({ roomCode: text.target.value })} />
                                                   
                                                </div>
                                                <div className="col-md-8 align-left push-left pl-2">
                                                    <h5 className="float-right tip mr-auto">
                                                        <span><Icon icon={exclamationCircle} /></span>Tip
                                                                    <br />
                                                        <span className="text-grey">Customize your room code!</span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <h4 className="fw-600 section-heading">Share Link</h4>
                                        <div className="row">
                                            <div className="col-md-10">
                                                <div className="input-group mb-3 share-link">
                                                    <input type="text" className="form-control"
                                                        onChange={(e) => this.setState({ sharedlink: e.target.value })}
                                                        aria-label="https://www.retroapp.com/ABCDE" aria-describedby="basic-addon2" value={this.state.shareLink} disabled />
                                                    <div className="input-group-append">
                                                        <Clipboard component="button" data-clipboard-text={this.state.shareLink} className="btn btn-outline-secondary btn-orange btn-copy-link" style={{ color: '#fff !important' }}>
                                                            Copy Link
                                                                </Clipboard>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 10 }}>
                                            <h4 className="fw-600 section-heading">Schedule Date & Time <span className="ml-auto">
                                                {this.state.timeFrom && this.state.timeTo &&<button className="btn btn-sm btn-outline-primary float-right btn-cat-reset" onClick={() => this.clear()}>Clear</button>}
                                            </span></h4>
                                            <h5 className="message-leave">Leave this blank if you are starting a retro immediately</h5>
                                            <div className="row mb-2">
                                                <div className="col-md-7 pr-0">

                                                    <div className="tap2dropdown">
                                                      
                                                        <div className="time_dropdown_wrapper">
                                                        <button className="time_dropdown_btn" onClick={()=>this.setState({showTimeSlotFrom:!this.state.showTimeSlotFrom,showTimeSlot: false})}>{this.state.showtimeFrom}</button>
                                                            {this.state.showTimeSlotFrom && <ul>
                                                                <li  onClick={()=>this.selectedFromTime(1,'9:00 AM')}>9:00 AM</li>
                                                                <li onClick={()=>this.selectedFromTime(2,'9:30 AM')}>9:30 AM</li>
                                                                <li onClick={()=>this.selectedFromTime(3,'10:00 AM')}>10:00 AM</li>
                                                                <li onClick={()=>this.selectedFromTime(4,'10:30 AM')}>10:30 AM</li>
                                                                <li onClick={()=>this.selectedFromTime(5,'11:00 AM')}>11:00 AM</li>
                                                                <li onClick={()=>this.selectedFromTime(6,'11:30 AM')}>11:30 AM</li>
                                                                <li onClick={()=>this.selectedFromTime(7,'12:00 PM')}>12:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(8,'12:30 PM')}>12:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(9,'1:00 PM')}>1:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(10,'1:30 PM')}>1:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(11,'2:00 PM')}>2:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(12,'2:30 PM')}>2:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(13,'3:00 PM')}>3:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(14,'3:30 PM')}>3:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(15,'4:00 PM')}>4:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(16,'4:30 PM')}>4:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(17,'5:00 PM')}>5:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(18,'5:30 PM')}>5:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(19,'6:00 PM')}>6:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(20,'6:30 PM')}>6:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(21,'7:00 PM')}>7:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(22,'7:30 PM')}>7:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(23,'8:00 PM')}>8:00 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(24,'8:30 PM')}>8:30 PM</li>
                                                                <li onClick={()=>this.selectedFromTime(25,'9:00 PM')}>9:00 PM</li>
                                                            </ul>}
                                                        </div>
                                                        
                                                        <span className="tap2to">to</span>

                                                        <div className="time_dropdown_wrapper">
                                                            <button className="time_dropdown_btn" onClick={()=>this.setState({showTimeSlot:!this.state.showTimeSlot,showTimeSlotFrom:false})}>{this.state.showtimeTo}</button>
                                                            {this.state.showTimeSlot && <ul>
                                                                <li  onClick={()=>this.selectedToTime(1,'9:00 AM')} disabled={this.state.timeFrom < 1 ? false : true}>9:00 AM</li>
                                                                <li onClick={()=>this.selectedToTime(2,'9:30 AM')}>9:30 AM</li>
                                                                <li onClick={()=>this.selectedToTime(3,'10:00 AM')}>10:00 AM</li>
                                                                <li onClick={()=>this.selectedToTime(4,'10:30 AM')}>10:30 AM</li>
                                                                <li onClick={()=>this.selectedToTime(5,'11:00 AM')}>11:00 AM</li>
                                                                <li onClick={()=>this.selectedToTime(6,'11:30 AM')}>11:30 AM</li>
                                                                <li onClick={()=>this.selectedToTime(7,'12:00 PM')}>12:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(8,'12:30 PM')}>12:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(9,'1:00 PM')}>1:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(10,'1:30 PM')}>1:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(11,'2:00 PM')}>2:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(12,'2:30 PM')}>2:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(13,'3:00 PM')}>3:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(14,'3:30 PM')}>3:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(15,'4:00 PM')}>4:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(16,'4:30 PM')}>4:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(17,'5:00 PM')}>5:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(18,'5:30 PM')}>5:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(19,'6:00 PM')}>6:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(20,'6:30 PM')}>6:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(21,'7:00 PM')}>7:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(22,'7:30 PM')}>7:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(23,'8:00 PM')}>8:00 PM</li>
                                                                <li onClick={()=>this.selectedToTime(24,'8:30 PM')}>8:30 PM</li>
                                                                <li onClick={()=>this.selectedToTime(25,'9:00 PM')}>9:00 PM</li>
                                                            </ul>}
                                                        </div>
                                                        &nbsp;&nbsp;
                                                            <DatePicker


                                                            popperPlacement="right"
                                                            minDate={this.formatDate(new Date())}
                                                            selected={this.state.inputDate} //when day is clicked
                                                            onChange={this.handleChange} //when date is changed
                                                        />

                                                      

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        {
                                            !validinput ?
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="remember">
                                                            <input type="checkbox" value={this.state.repeatEvery} id="remember-me" onChange={() => this.setState({ repeatEvery: "true" })} />
                                                            <label htmlFor="remember-me" className="block" onClick={(e) => { this.state.inputWeek = this.state.inputWeek == false ? true : false }}>Repeat every</label>
                                                        </div>
                                                    </div>
                                                    {
                                                        this.state.inputWeek ?
                                                            <div className="row temp-fix">
                                                                <div className="col-md-4">
                                                                    <select value={this.state.inputWeek} className="form-control minimal" onChange={(text) => this.setState({ inputWeek: text.target.value })}>
                                                                        <option value={1}>Week</option>
                                                                        <option value={2}>2 Weeks</option>
                                                                        <option value={3}>3 Weeks</option>
                                                                        <option value={4}>4 Weeks</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4 pl-0">
                                                                    <label className="repeat-label" style={{float:"right",paddingRight:"15px"}}>On Monday</label>
                                                                </div>
                                                                <div className="row mt-2">
                                                                    <div className="col-md-4 pr-0">

                                                                    </div>
                                                                    <div className="col-md-3 pt-2">
                                                                        Ends On
                                                                        </div>
                                                                    <div className="col-md-5  pl-0">
                                                                        <DatePicker
                                                                            popperPlacement="right"
                                                                            minDate={this.formatDate(new Date(this.state.inputDate))}
                                                                            selected={this.state.endOnDate} //when day is clicked
                                                                            onChange={this.handleChange2} //when date is changed
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div> : ""
                                                    }

                                                </div>
                                                : ""
                                        }

                                        
                                    </div>
                                    <div className="col-md-7 pl-5 right-section">
                                        <div className="row ml-5 mb-3">
                                            <div className="col-md-9">
                                                <h5 className="mb10 fw-600 section-heading">Send Invite</h5>
                                                <div className="row mb-4">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control right-area" placeholder="Recipient's username" value={this.state.sendInViteEmail}
                                                                aria-label="https://www.retroapp.com/ABCDE" aria-describedby="basic-addon2" onChange={(text) => this.setState({ sendInViteEmail: text.target.value })} />
                                                            <div className="input-group-append">
                                                                <button className="btn btn-outline-secondary btn-orange email-btn" type="button" onClick={() => this.sendInviteUser("false")}>Send Invite</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5 className="fw-600 section-heading">Who's invited</h5>
                                                <div className="row invite-head">
                                                    <div className="col-md-9">
                                                        <h5 className="invite-title fw-600">Email</h5>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h5 className="invite-title fw-600">Admin</h5>
                                                    </div>
                                                </div>

                                                {this.state.isUserListShow && this.state.invitedUserList.map((value, index) => {
                                                    return <div className="row" key={index}>
                                                        <div className="sendInvideDiv">
                                                            {value.email && <p className="sendInvideP">{value.email}

                                                                {(value.email) && (this.state.userinfo.email == value.email) && <span>(you)</span>
                                                                }
                                                            </p>}
                                                           
                                                            <div className="sendInvideDiv2">
                                                                <input style={{ marginTop: 10 }} type="checkbox" value={value.isAdmin} checked={value.isAdmin == "true"} onClick={() => this.changeAdmin(index, value)} id={"email-text"+ index} />
                                                                <label htmlFor={"email-text"+ index} ></label>
                                                                <p onClick={() => this.deleteInviteRetro(index, value)}><span className="sendInvideIcon"><Icon size="1.5em" icon={ic_close} /></span></p>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="offset-md-4 done-button">
                                    
                                    {this.state.timeFrom == "" && this.state.timeTo == "" && this.state.inputDate == "" && <button onClick={() => this.onInviteSubmit()}
                                        className={"btn btn-default btn-done btn-block "}
                                    >Start Retro
                                        </button>}

                                    {(this.state.timeFrom != "" || this.state.timeTo != "" || this.state.inputDate != "") && <button onClick={() => this.onInviteSubmit()}
                                        className={"btn btn-default btn-done btn-block " + (CheckValid ? '' : 'disabledOpacity')}
                                        disabled={CheckValid}>Done
                                        </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


Invite.propTypes = {
    createRetroInfo: PropTypes.any,
    retrofetchdata: PropTypes.any,
    invitedUsers: PropTypes.any,
    deletedUserRes: PropTypes.any,
    myInviteList: PropTypes.any

};

const mapStateToProps = createStructuredSelector({
    invitedUsers: doInviteUsersRes,
    deletedUserRes: deleteUsersRes,
    myInviteList: getAllInviteRes,

});


function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data, redirectStatus) => dispatch(submit_InviteRetro(data, redirectStatus)),
        inviteUser: (data) => dispatch(InviteUsersRetro(data)),
        deleteUserInvited: (data) => dispatch(deletedUsers(data)),
        fetchInvite: (data) => dispatch(getInvite(data)),
        updateRetro: (data) => dispatch(updateRetro(data)),
        

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Invite);