import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import './myretro.css';
import { submit_Template, doTemplateRes } from '../../actions/templateActions';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { createStructuredSelector } from 'reselect';
import { getAllProject, getAllProjectsRes } from '../../actions/createRetroAction';
import { getRetroListing, retroListRes, retroStarted, doJoinRetro ,doDeleteRetro} from '../../actions/myRetroActions';
import { getFindUserListing, findusersListRes } from '../../actions/userActions';


const getProjectRequest = {
    "operationName": null,
    "variables": {},
    "query": "{\n  getAllProject {\n    id\n    projectName\n   }\n}\n"
}

const alluserListRequest = {
    "operationName": null,
    "variables": {},
    "query": "{\n  fetchAllUser {\n    email\n    id\n    lastName\n    firstName\n    password\n    lastName\n  }\n}\n"
}

class MyRetro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateList: [],
            projectList: [],
            allretrosdata: [],
            allretros: [],
            alluser: [],
            datetimesorttype: 'desc',
            interVal: [],
            userInfo: [],
            loaderState: false,
            isMyRetro: false,
            isUpcoming: false,
            isHistory: false,
            ispublish: false

        }
        this.handleChangeMyretro = this.handleChangeMyretro.bind(this);
        this.handleChangeUpcoming = this.handleChangeUpcoming.bind(this);
        this.handleChangeHistory = this.handleChangeHistory.bind(this);
    }

    componentWillMount() {

        this.props.fetchAllProjects(getProjectRequest);
        this.props.fetchUserList(alluserListRequest);

        let data1 = localStorage.getItem('logindata');
        localStorage.setItem("isDownloadPDF","")
        let values1 = JSON.parse(data1);

        if (values1) {
            this.setState({
                userInfo: values1,
                loaderState: true

            }, () => {
                this.fetchRetro();
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interVal)
    }

    fetchRetro() {
      
        let sendRequest={
            "operationName":null,
            "variables":{},
            "query":"{\n  fetchAndMatchInviteLink(userId: \"" + this.state.userInfo.id + "\", isMyRetro: \""+this.state.isMyRetro.toString()+"\", isUpcoming: \""+this.state.isUpcoming.toString()+"\", isHistory: \""+this.state.isHistory.toString()+"\") {\n    id\n    email\n    isAdmin\n    retro {\n    activity\n  id\n      startDate\n      endDate\n      userId {\n        id\n        firstName\n      }\n   createdAt\n      updatedAt\n  projectId\n    projects {\n        id\n        projectName\n      }\n      roomCode\n      sprintNumber\n      startDate\n      retroAdmin\n      templateName\n      retroCategory1\n      retroCategory2\n      retroCategory3\n      retroCategory4\n      id\n      published\n      createdAt\n      updatedAt\n    }\n  }\n}\n"}
        this.props.fetchRetroList(sendRequest)
     
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.allUserList && nextProps.allUserList.data.users.data) {
                this.setState({
                    alluser: nextProps.allUserList.data.users.data.fetchAllUser
                })
            }

            if (nextProps.projectList && nextProps.projectList.data.projectList.data) {
                // console.log(nextProps.projectList.data.projectList.data.getallproject);

                this.setState({
                    projectList: nextProps.projectList.data.projectList.data.getAllProject
                })
            }
            if (nextProps.retroList && nextProps.retroList.data.myRetroReducer.data) {
                console.log(nextProps.retroList.data.myRetroReducer.data)
                let tempData = [];
                if (nextProps.retroList.data.myRetroReducer.data.fetchAndMatchInviteLink) {
                    for (let items of nextProps.retroList.data.myRetroReducer.data.fetchAndMatchInviteLink) {
                        if (items) {
                            items.retro.newstartDate = moment(new Date(items.retro.startDate)).format('MMM D, YYYY     hh:mm a')
                            tempData.push(items)
                            if(items.retro.projects){
                                for(let proj of items.retro.projects){
                                    if(proj.id===items.retro.projectId){
                                        items.retro.projectName=proj.projectName
                                    }

                                }
                            }
                        
                        }
                    }
                    console.log(tempData);
                }

                let retroList = tempData.sort((a, b) => Date.parse(new Date(b.retro.startDate)) - Date.parse(new Date(a.retro.startDate)));

                if (retroList) {
                    for (let items of retroList) {
                        if (!items.retro.activity || !items.retro.published) {
                                items.ispublish = "false";
                        }
                        if (!items.retro.activity && !items.retro.published) {
                            items.ispublish = "false";
                        }
                        if (items.retro.activity && items.retro.published) {
                            items.ispublish = "true";
                        }
                    }
                    console.log(tempData);
                }

                this.setState({
                    allretros: retroList,
                    allretrosdata: retroList,
                    loaderState: false
                })

                //    this.setState({
                //          allretrosdata:nextProps.retroList.data.myretroReducer.data.findallretro
                //    })
            }
        }
    }


    shortretrodata() {
        if (this.state.datetimesorttype === "desc") {
            this.setState({ allretrosdata: this.state.allretrosdata.sort(this.ascsort) })
        } else {
            this.setState({ allretrosdata: this.state.allretrosdata.sort(this.descsort) })
        }
        if (this.state.datetimesorttype === "desc") {
            this.state.datetimesorttype = "asc";
        } else {
            this.state.datetimesorttype = "desc";
        }
    }

    descsort(a, b) {
        if (new Date(a.retro.startDate) < new Date(b.retro.startDate))
            return -1;
        if (new Date(a.retro.startDate) > new Date(b.retro.startDate))
            return 1;
        return 0;
    }

    ascsort(a, b) {
        if (new Date(a.retro.startDate) > new Date(b.retro.startDate))
            return -1;
        if (new Date(a.retro.startDate) < new Date(b.retro.startDate))
            return 1;
        return 0;
    }

    fetchretrobyuser(id, obj) {
        if (id) {
            this.setState({
                allretrosdata: obj.filter(val => {
                    if (val.retro.userid) {
                        return val.retro.userid.id === id;
                    }

                })
            })
            if (this.state.selectedproject) {
                this.setState({
                    allretrosdata: obj.filter(val => {
                        if (val.retro.projects && val.retro.projects.length > 0) {
                            return val.retro.projects[0].id === this.state.selectedproject;

                        }
                    })
                })
            }
        } else {
            this.setState({ allretrosdata: this.state.allretros });
        }
    }
    fetchretrobyproject(name, obj) {
        if (name) {
            this.setState({
                allretrosdata: obj.filter(val => {

                    // if(val.retro.projects){
                    if (val.retro.projects && val.retro.projects.length > 0) {

                        return val.retro.projects[0].id === name;

                    }
                    // return val.retro.projects[0].id == name;
                })
            })
        }
        else {
            if (this.state.selecteduser) {
                this.setState({
                    allretrosdata: obj.filter(val => {
                        return val.retro.userid.id === this.state.selecteduser;
                    })
                })
            } else {
                this.setState({ allretrosdata: this.state.allretros });
            }
        }
    }

    deleteRetro(retro){
        this.setState({
            loaderState:true
        })

        let sendRequest={"operationName":null,
                        "variables":{},
                        "query":"mutation {\n  deleteRetro(id: \""+retro.retro.id+"\") {\n    id\n  }\n}\n"}
        console.log(sendRequest)
        this.props.deleteRetro(sendRequest);
        setTimeout(()=>{
            this.setState({
                loaderState:false
            })
        },2000)

    }

    downloadPDF(retro){
        localStorage.setItem("isDownloadPDF","true")
        this.props.history.push('/retrosummary/'+retro.retro.id)
    }

    goStartRetro(retro) {
        if(retro.retro.activity && retro.retro.published){
            this.props.history.push('/retrosummary/'+retro.retro.id)

        }else{

            this.setState({
                loaderState: true
            })
    
            let sendRequest = {
                "operationName": null,
                "variables": {},
                "query": "mutation {\n  startRetro(retroId: \"" + retro.retro.id + "\", userId: \"" + this.state.userInfo.id + "\") {\n    id\n  roomCode\n   inviteToJointRetros {\n      id\n    }\n    startedBy\n  }\n}\n"
            }
    
            let isJoinRetro = {
                "operationName": null,
                "variables": {},
                "query": "mutation {\n  updateIsJoinFieldInvite(retroId: \"" + retro.retro.id + "\", email: \"" + this.state.userInfo.email + "\", isJoined: \"true\") {\n    id\n    email\n    isJoined\n  }\n}\n"
            }
    
            this.props.doInviteRetro(isJoinRetro);
    
    
            setTimeout(() => {
                this.props.doStartedRetro(sendRequest)
    
            }, 1000)

        }


        

    }

    handleChangeMyretro() {
        this.setState({
            isMyRetro:  !this.state.isMyRetro,

        },()=>{
            this.fetchRetro();
        })
    }
    handleChangeUpcoming() {
        this.setState({
            isUpcoming:  !this.state.isUpcoming,
        },()=>{
            this.fetchRetro();
        })
    }
    handleChangeHistory() {
        this.setState({
            isHistory:  !this.state.isHistory,
        },()=>{
            this.fetchRetro();
        })
    }




    render() {


        return (
            <div className="App">
                <div id="myretro" className="mainContent containerBg">
                    <div className="myretro-inner-bg">
                        <HeaderComponent />
                        <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                            <div className={this.state.loaderState ? "loader" : ""}></div>
                        </div>

                        <div className="container-fluid containerHolder pb-5">
                            <div className="maxWidth-1260px">
                                {/* Main Page Structure Begin */}


                                <div className="row">
                                    <div className="col-md-3">
                                    </div>
                                    <div className="col-md-6">
                                        <div className="page-title">
                                            <h2>My Retros</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <Link to="/createretro"> <button className="orange-btn">Create Retro</button></Link>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="box-1">
                                            <h1>{this.state.allretros ? this.state.allretros.length : 0}</h1>
                                            <span>Retros Created</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="box-1">
                                            <h1>0</h1>
                                            <span>Completed Retros</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="box-1">
                                            <h1>{this.state.allretros ? this.state.allretros.length : 0}</h1>
                                            <span>Scheduled Retros</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="box-1">
                                            <h1>0</h1>
                                            <span>Avg. Retros per Week</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="all-retro">
                                            <h4 className="text-left">All Retros</h4>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div className="row">
                                                        <div className="col-md-6 cust-pt text-left">
                                                            <label htmlFor="retroAdmin" >Retro Admin</label><br />
                                                            <select name="retroAdmin" className="cust minimal w-100" onChange={(text) => { this.setState({ selecteduser: text.target.value }); this.fetchretrobyuser(text.target.value, this.state.allretros) }}>
                                                                <option value=''>All Users</option>
                                                                {this.state.alluser && this.state.alluser.map(
                                                                    function iterator(user, index) {
                                                                        return (<option key={index} value={user.id} >{user.firstName} {user.lastName}</option>)
                                                                    })}
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6  cust-pt text-left">
                                                            <label htmlFor="retroProject">Project</label>
                                                            <br />
                                                            <select name="retroProject" className="cust minimal w-100" value={this.state.selectedproject} onChange={(text) => { this.setState({ selectedproject: text.target.value }); this.fetchretrobyproject(text.target.value, this.state.allretros) }}>
                                                                <option value=''>All Projects</option>
                                                                {this.state.projectList ? this.state.projectList.map(
                                                                    function iterator(project, index) {
                                                                        return (<option value={project.id} key={index}>{project.projectName}</option>)
                                                                    }) : ''}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <ul className="check-user">
                                                        <li>
                                                            <input className="styled-checkbox" id="styled-checkbox-1" type="checkbox" defaultChecked={this.state.isMyRetro}  value={this.state.isMyRetro} onChange={this.handleChangeMyretro} checked={this.state.isMyRetro}/>
                                                            <label htmlFor="styled-checkbox-1">My Retros Only</label>
                                                        </li>
                                                        <li>
                                                            <input className="styled-checkbox" id="styled-checkbox-2" type="checkbox" defaultChecked={this.state.isHistory} value={this.state.isHistory} onChange={this.handleChangeHistory} checked={this.state.isHistory}/>
                                                            <label htmlFor="styled-checkbox-2">Show History</label>
                                                        </li>
                                                        <li>
                                                            <input className="styled-checkbox" id="styled-checkbox-3" type="checkbox" defaultChecked={this.state.isUpcoming}  value={this.state.isUpcoming} onChange={this.handleChangeUpcoming} checked={this.state.isUpcoming}/>
                                                            <label htmlFor="styled-checkbox-3">Show Upcoming</label>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="user-data">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="cust-field">Date & Time &nbsp;<span className="icon-chevrlet-up" onClick={(e) => { this.shortretrodata(); }} >({this.state.datetimesorttype === "asc" ? "↓" : "↑"})</span></th>
                                                        <th scope="col">Retro Admin</th>
                                                        <th scope="col">Project Name</th>
                                                        <th scope="col">Sprint</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="upcoming">
                                                        <td colSpan="5">Upcoming</td>
                                                    </tr>

                                                    {(this.state.allretrosdata && this.state.allretrosdata.length > 0) ? this.state.allretrosdata.map((retro, index) => {
                                                        return (<tr key={index} className="upcoming-list withHover">
                                                            <td>{retro.retro.newstartDate && <span>{retro.retro.newstartDate}</span>}</td>
                                                            <td> {retro.retro.retroAdmin && <span>{retro.retro.retroAdmin}    </span>}</td>
                                                            <td>
                                                                {retro.retro.projectName?retro.retro.projectName:""}
                                                                
                                                            </td>
                                                            <td>{retro.retro.sprintNumber ? retro.retro.sprintNumber : 0}</td>
                                                            <td>

                                                              

                                                                {retro.ispublish != "false" &&
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            Actions
                                                                        </button>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                            <a className="dropdown-item" onClick={()=>this.downloadPDF(retro)}>Download PDF</a>
                                                                            <a className="dropdown-item" onClick={() => this.goStartRetro(retro)} >View Summary</a>
                                                                            <a className="dropdown-item" onClick={() => this.deleteRetro(retro)}>Delete</a>
                                                                        </div>
                                                                    </div>
                                                                }

                                                                {retro.ispublish === "false" &&
                                                                <div className="dropdown">
                                                                    <Link to={{
                                                                        pathname: `/editretro/${retro.retro.id}`,
                                                                        state: { retroid: retro.retro.id } }} >
                                                                        <button className="icon-button">
                                                                        <i className="fa fa-pen"></i>
                                                                        </button>
                                                                    </Link>
                                                                    
                                                                    <button onClick={() => this.goStartRetro(retro)} className="icon-button">
                                                                        <i className="fas fa-sign-in-alt"></i>
                                                                    </button>
                                                                </div>}

                                                            </td>
                                                        </tr>);
                                                    },

                                                    ) :
                                                        <tr className="upcoming-list">
                                                            <td colSpan="5" className="text_center">Data Not Found</td></tr>}


                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>


                                {/* Main Page Structure End */}
                            </div>
                            <div className="spacer"></div>
                            <div className="spacer"></div>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        );
    }
}


MyRetro.propTypes = {
    handleFormSubmit: PropTypes.func,
    projectList: PropTypes.any,
    retroList: PropTypes.any,
    allUserList: PropTypes.any,

};

const mapStateToProps = createStructuredSelector({
    templateList: doTemplateRes,
    projectList: getAllProjectsRes,
    retroList: retroListRes,
    allUserList: findusersListRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submit_Template(data)),
        fetchAllProjects: (data) => dispatch(getAllProject(data)),
        fetchRetroList: (data) => dispatch(getRetroListing(data)),
        fetchUserList: (data) => dispatch(getFindUserListing(data)),
        doStartedRetro: (data) => dispatch(retroStarted(data)),
        doInviteRetro: (data) => dispatch(doJoinRetro(data)),
        deleteRetro: (data) => dispatch(doDeleteRetro(data)),


        
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyRetro);
