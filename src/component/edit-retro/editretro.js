import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import { compose,} from "react-apollo";
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import './editretro.css';
import './editretro_update.css';
import './style.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAllProject, getAllProjectsRes, getSpecificTemplate, getAllSpecifictemplateRes, getMytemplate, getAllMyTemplateRes } from '../../actions/createRetroAction';
import { submit_CreateTemplate, doCreateNewTempRes } from '../../actions/newCreateTemplateActions';
import { getRetroDetail, retroDetailRes, updateRetro, doUpdateRetroRes } from '../../actions/myRetroActions';

import { getInvite, getAllInviteRes } from './../../actions/inviteRetorActions';
import moment from 'moment';

const getProjectRequest = {
  "operationName": null,
  "variables": {},
  "query": "{\n  getAllProject {\n    id\n    projectName\n    }\n}\n"
}

const getSpecificTemplateRequest = {
  "operationName": null,
  "variables": {},
  "query": "{\n  specificTemplate {\n    id\n    templateName\n    category1\n    category2\n    category3\n    category4\n   }\n}\n"
}

class editretro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateList: [],
      tags: [{ id: '', projectName: '' }],
      templateName: '',
      whatdidwelearn: 'What did we learn',
      whatwentwell: 'what went well1',
      whatcanweimprove: 'what can we improve',
      whatpuzzleus: 'what puzzle us',
      allProjectList: [],
      specificTemplateList: [],
      allmyInviteList: [],
      mytemplateList: [],
      sprintNumber: '',
      projectName: false,
      nameofproject: '',
      newtemplateName: '',
      retroid: '',
      isGetData: true,
      Enddate: '',
      StartDate: '',
      loaderState: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
  sprintValues(e){
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value)) {
        this.setState({ sprintNumber: e.target.value })
    }
}
  handleChange(date) {
    let newDate=moment(date).format("YYYY-MM-DD");
    let ownDate=new Date();
    let newTime=moment(ownDate).format("HH:mm:ss");

    this.setState({
      StartDate:  new Date(moment(newDate +" "+ newTime, 'YYYY-MM-DD HH:mm:ss').format()),
      Enddate: ""
    });
  }

  handleChange2(date) {
    let newDate=moment(date).format("YYYY-MM-DD");
    let newTime=moment(new Date()).format("HH:mm:ss");
   
    this.setState({
      Enddate: new Date(moment(newDate +" "+ newTime, 'YYYY-MM-DD HH:mm:ss').format())
    });
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.setState({
        retroid: id
      })
    }
    var data = localStorage.getItem('logindata');
    var userdata = JSON.parse(data);
    this.setState({ userinfo: userdata, loaderState: true })


    this.props.fetchSpecificTemplate(getSpecificTemplateRequest)
    this.props.fetchAllProjects(getProjectRequest);

    let sendRequest =
      { "operationName": null, "variables": {}, "query": "{\n  fetchUserTemplate(userId: \"" + userdata.id + "\") {\n    id\n    templateName\n    category1\n    category2\n    category3\n    category4\n userId {\n      id\n      email\n    }\n  }\n}\n" }
    this.props.fetchMyTemplate(sendRequest)

    let sendRequestinvite = { "operationName": null, "variables": {}, "query": "{\n  fetchAllInviteLink(retroId: \"" + id + "\") {\n    id\n    email\n    retroId\n    url\n    createdAt\n    isAdmin\n    retro {\n      id\n      retroAdmin\n    }\n  }\n}\n" }
    this.props.fetchInvite(sendRequestinvite)



  }

  fetchRetroDetail() {
    let sendRequestfetch = {
      "operationName": null,
      "variables": {},
      "query": "{\n  fetchSingleRetro(id: \"" + this.state.retroid + "\") {\n    id\n    isAdmin\n    roomCode\n    isAdmin\n    sprintNumber\n  projectId\n projects {\n      id\n      projectName\n    }\n templateId\n  startDate\n endDate\n    retroAdmin\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n    id\n    published\n    createdAt\n    updatedAt\n    endTime\n    startTime\n    inputWeek\n    repeatEvery\n  }\n}\n"
    }
    this.props.fetchdetail(sendRequestfetch);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps) {

      if (nextProps.specificTemplateList && nextProps.specificTemplateList.data.specifictemplate.data && nextProps.projectList && nextProps.projectList.data.projectList.data) {

        if (this.state.isGetData) {
          // alert("ddd")

          this.setState({
            isGetData: false
          }, () => {
            this.fetchRetroDetail();
          })
        }
      }


      if (nextProps.specificTemplateList && nextProps.specificTemplateList.data.specifictemplate.data) {
        let templist = nextProps.specificTemplateList.data.specifictemplate.data.specificTemplate
        this.setState({
          specificTemplateList: templist
        })
      }
      if (nextProps.projectList && nextProps.projectList.data.projectList.data) {
        this.setState({
          allProjectList: nextProps.projectList.data.projectList.data.getAllProject
        },()=>{
          console.log(this.state.allProjectList)
        })
      }

      if (nextProps.myInviteList && nextProps.myInviteList.data.inviteRetroReducer.data) {

        if (nextProps.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink) {
          this.setState({
            allmyInviteList: nextProps.myInviteList.data.inviteRetroReducer.data.fetchAllInviteLink
          }, () => {
          })
        }
      }

      if (nextProps.myTemplateList && nextProps.myTemplateList.data.mytemplate.data) {
        this.setState({
          mytemplateList: nextProps.myTemplateList.data.mytemplate.data.fetchUserTemplate
        },()=>{
          console.log(this.state.mytemplateList)
        })
      }

      if (nextProps.submittemplate && nextProps.submittemplate.data.newCreateTemplateReducer.data) {
        let submitTemplateData = nextProps.submittemplate.data.newCreateTemplateReducer.data;
        this.setState({
          whatdidwelearn: submitTemplateData.category1,
          whatwentwell: submitTemplateData.category2,
          whatcanweimprove: submitTemplateData.category3,
          whatpuzzleus: submitTemplateData.category4,
        })
      }

      if (nextProps.submitTemplate) {
        if (nextProps.submitTemplate.data.newCreateTemplateReducer) {

          if (nextProps.submitTemplate.data.newCreateTemplateReducer.data && nextProps.submitTemplate.data.newCreateTemplateReducer.data.createUserTemplate) {
            let submitTemplateData = nextProps.submitTemplate.data.newCreateTemplateReducer.data.createUserTemplate;

            // console.log(submitTemplateData);
            if (submitTemplateData) {
              this.setState({
                mytemplateList: this.state.mytemplateList.concat(submitTemplateData)
              }, () => {
                console.log(this.state.mytemplateList)
                this.setState({
                  retroCate: [],
                  newtemplateid: submitTemplateData.id,
                  newtemplatename: submitTemplateData.templatename,
                  whatdidwelearn: submitTemplateData.category1,
                  whatwentwell: submitTemplateData.category2,
                  whatcanweimprove: submitTemplateData.category3,
                  whatpuzzleus: submitTemplateData.category4,
                  typeTemple: 'new',
                  EditableStatus: true
                }, () => {
                  console.log(this.state.newtemplateid)
                  // this.gettemplatename(this.state.newtemplateid)
                })
              })
            }
          }
        }

      }

      if (nextProps.retroDetail && nextProps.retroDetail.data.myRetroReducer.data) {

        if (nextProps.retroDetail.data.myRetroReducer.data.fetchSingleRetro) {
          let retroinfo = nextProps.retroDetail.data.myRetroReducer.data.fetchSingleRetro;

          let selectProject=[];
          for(let item of retroinfo.projects){
            if(item.id===retroinfo.projectId){
                selectProject.push(item)
            }
          }

          console.log(selectProject[0].projectName)
          this.setState({
            tags: selectProject,
            selectedproject: selectProject[0].projectName,
            retroinfo: retroinfo,
            projectName: selectProject[0].projectName,
            published: retroinfo.published,
            retroadmin: retroinfo.retroAdmin,
            whatdidwelearn: retroinfo.retroCategory1,
            whatwentwell: retroinfo.retroCategory2,
            whatcanweimprove: retroinfo.retroCategory3,
            whatpuzzleus: retroinfo.retroCategory4,
            sprintNumber: retroinfo.sprintNumber,
            templateName: retroinfo.templateName,
            startTime: retroinfo.startTime,
            Endtime: retroinfo.endTime,
            StartDate: retroinfo.startDate ? new Date(retroinfo.startDate) : "",
            Enddate: retroinfo.endDate ? new Date(retroinfo.endDate) : "",
            inputWeek: retroinfo.inputWeek,
            templateId: retroinfo.templateId,
            repeatevery: retroinfo.repeatEvery,
            loaderState: false



          }, () => {
            console.log(this.state.StartDate)
          })

          if (nextProps.specificTemplateList && nextProps.specificTemplateList.data.specifictemplate.data &&nextProps.specificTemplateList.data.specifictemplate.data.specificTemplate) {
            let templist = nextProps.specificTemplateList.data.specifictemplate.data.specificTemplate
            if (templist && templist.length > 0) {
              for (let items of templist) {
                if (items.templateName === retroinfo.templateName) {
                  this.setState({
                    whatdidwelearn: items.category1,
                    whatwentwell: items.category2,
                    whatcanweimprove: items.category3,
                    whatpuzzleus: items.category4,
                  });
                }
              }
            }

            if (nextProps.myTemplateList && nextProps.myTemplateList.data.mytemplate.data) {
              let templist = nextProps.myTemplateList.data.mytemplate.data.fetchUserTemplate
              if (templist && templist.length > 0) {
                for (let items of templist) {
                  if (items.templateName === retroinfo.templateName) {
                    console.log(items)
                    this.setState({
                      whatdidwelearn: items.category1,
                      whatwentwell: items.category2,
                      whatcanweimprove: items.category3,
                      whatpuzzleus: items.category4,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  updateRetrodetails() {
    console.log(this.state)
    let id = this.props.match.params.id

    console.log(this.state)



    let startDate =this.state.StartDate ? this.state.StartDate:'';
    let endDate =this.state.Enddate ? this.state.Enddate :'';



    let sendRequest = {

      "operationName": null,
      "variables": {},
      "query": "mutation {\n  updateRetro(retroId: \"" + id + "\", templateName: \"" + this.state.templateName + "\",, retroAdmin: \"" + this.state.retroadmin + "\", retroCategory1: \"" + this.state.whatdidwelearn + "\", retroCategory2: \"" + this.state.whatwentwell + "\", retroCategory3: \"" + this.state.whatcanweimprove + "\", retroCategory4: \"" + this.state.whatpuzzleus + "\", projectName: \"" +this.state.tags[0].projectName  + "\", projectId: \"" + this.state.tags[0].id + "\",, sprintNumber: \"" + this.state.sprintNumber + "\",userId: \"" + this.state.userinfo.id + "\",startDate: \"" + startDate + "\", endDate: \"" + endDate + "\", startTime: \"" + this.state.startTime + "\", endTime: \"" + this.state.Endtime + "\", inputWeek: \"" + this.state.inputWeek + "\", isEditRetro: \"" + "true" + "\",) {\n    retroAdmin\n    templateName\n    retroCategory1\n    retroCategory2\n    retroCategory3\n    retroCategory4\n    projectId\n   roomCode\n    sprintNumber\n      startDate\n  projects {\n      id\n      projectName\n    }\n    inviteToJointRetros {\n      id\n      startDate\n      endDate\n      startTime\n      endTime\n      inputWeek\n      repeatEvery\n      email\n    }\n  }\n}\n"
    }
    this.props.handleFormSubmit(sendRequest);
  
  }

  selectedValue(value) {
    console.log(value)
    let selectedTag = [{ id: value.id, projectName: value.projectName }]
    this.setState({
      tags: selectedTag,
      isSearch: false,
      selectedproject: value.projectName
    }, () => {
      console.log(this.state.selectedproject)
    })
  }


  searchString(e) {

    let value = [{ id: "", projectName: e.target.value }]
    this.setState({
      tags: value,
      isSearch: true,
    }, () => {
      console.log(this.state.tags)
    })
  }

  newtemplatevalue() {
    var newtemplateName = document.getElementById("savetemplate");
    console.log(newtemplateName)

    let sendRequest = {
      "operationName": null,
      "variables": {},
      "query": "mutation {\n  createUserTemplate(userId: \"" + this.state.userinfo.id + "\", templateName: \"" + this.state.newtemplateName + "\", category1: \"" + this.state.whatdidwelearn + "\", category2: \"" + this.state.whatwentwell + "\", category3: \"" + this.state.whatcanweimprove + "\", category4: \"" + this.state.whatpuzzleus + "\") {\n    templateName\n    category1\n    category2\n    category3\n    category4\n    id\n    userId {\n      email\n    }\n  }\n}\n"
    }

    console.log(sendRequest)
    this.setState({
      EditableStatus: true,
      typeTemple: "user",
      showsavefordefault: false,
      // templatename: this.state.newtemplatename
    })
    this.props.handleFormSubmitTemplate(sendRequest);
  }


  gettemplatename(value) {
    console.log(value)
    if (value === ",,,,,new") {
      this.setState({
        newtemplateName: '',
        whatdidwelearn: '',
        whatwentwell: '',
        whatcanweimprove: '',
        whatpuzzleus: '',
        EditableStatus: false
      });
    } else {
      for (let items of this.state.specificTemplateList) {
        if (items.id === value) {
          this.setState({
            retroCate: [],
            newtemplateName: '',
            whatdidwelearn: items.category1,
            whatwentwell: items.category2,
            whatcanweimprove: items.category3,
            whatpuzzleus: items.category4,
            typeTemple: 'new',
            EditableStatus: true,
            templateName:items.templateName
          });
        }
      }

      for (let items of this.state.mytemplateList) {
        console.log(items.id === value)
        if (items.id === value) {
          console.log(items)
          this.setState({
            retroCate: [],
            newtemplateName: '',
            whatdidwelearn: items.category1,
            whatwentwell: items.category2,
            whatcanweimprove: items.category3,
            whatpuzzleus: items.category4,
            typeTemple: 'new',
            EditableStatus: true,
            templateName:items.templateName

          });
        }
      }
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

  render() {
    // console.log(this.state)
    // let filterData =[];
    let filterData = this.state.tags[0].projectName ? this.state.allProjectList.filter(row => row.projectName.toLowerCase().indexOf(this.state.tags[0].projectName.toLowerCase()) > -1) : this.state.allProjectList;

    console.log(this.state.tags[0].name)
    return (
      <div className="App">
        <HeaderComponent />
        <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
          <div className={this.state.loaderState ? "loader" : ""}></div>
        </div>
        <div className="main-container edit-retro bgGrey" id="edit-retro-page-wrapper">
          <div class="container-fluid">
            <div class="col-md-6 text-left">
              <ol class="breadcrumb breadcrumb-2" id="bread-crumb">
                <li><a href="/myretro">My Retros</a></li>
                <li><a class="breadcrumb-current">Edit Retros</a></li>
              </ol>
            </div>
          </div>
          <div className="main-container edit-retro-container" id="edit-retro-container">
            <div className="container containerHolder ">

              {/* Main Page Structure Begin */}
              <Grid >
                <div class="edit-title" id="edit-title">
                  <div class="row flexAlignMiddle containerSeperator">
                    <div class="col-md-7">
                      <h2 className="text-left">Edit Upcoming Retro</h2>
                    </div>
                    <div class="col-md-5 btnTop_Holder">
                      {/* <button type="button" class="btn">Save Retro</button> */}
                    </div>
                  </div>
                </div>


                <Row id="edit-content">
                  <Col xs={12} md={6} className="">
                    <Row className="containerSeperator m-p-10">
                      <Col md={12}>
                        <h4 className="headingSandC text-left">Project information</h4>
                      </Col>
                      <Col md={8} className="text-left">
                        <div className="form-group mb-0">
                         <input className="mb0 project-info-field" type="text" value={this.state.tags[0].projectName} onChange={(text) => this.searchString(text)} />
                        </div>

                        {this.state.isSearch && filterData && filterData.length > 0 && filterData.map((res, index) => <div>
                          <div key={index} style={{ paddingLeft: 20, borderTop: '1px solid #ddd' }} onClick={() => { this.selectedValue(res) }}>{res.projectName}</div>
                        </div>)}
                      </Col>
                      <Col md={4} className="text-left ">
                        <div className="mbn-5 optional-link">optional</div>
                        <div className="form-group">
                          <input type="text" value={this.state.sprintNumber} className="form-control sprint-code" name="sprint_name"
                           onChange={(e) => this.sprintValues(e)}
                            placeholder="Sprint Number" />
                        </div>
                      </Col>
                    </Row>
                    <Row className="containerSeperator m-p-10">
                      <Col md={12} className="text-left">
                        <h4 className="headingSandC">Retro Setup</h4>
                        <div className="form-group">
                          <label >Template</label>
                          <div className="row">
                            <div className="col-md-12">
                              <select onChange={(evt) => this.gettemplatename(evt.target.value)} id="saveteamplate" className="form-control minimal" >

                                <optgroup id="selectbox" label="Default Templates">
                                  {/* {options} */}
                                  {this.state.specificTemplateList && this.state.specificTemplateList.length > 0 && this.state.specificTemplateList.map((item, index) => {
                                    if (item.templateName === this.state.templateName) {
                                      return <option key={index} value={item.id} selected>{item.templateName}</option>
                                    } else {
                                      return <option key={index} value={item.id}>{item.templateName}</option>
                                    }
                                  })
                                  }
                                </optgroup>
                                <optgroup id="selectbox" label="My Templates" id="savetemplate">
                                  {this.state.mytemplateList && this.state.mytemplateList.length > 0 && this.state.mytemplateList.map((item, index) => {
                                    console.log(item.templateName +" =="  + this.state.templateName)
                                    if (item.templateName === this.state.templateName) {
                                      return <option key={index} value={item.id} selected>{item.templateName}</option>
                                    } else {
                                      return <option key={index} value={item.id} >{item.templateName}</option>
                                    }
                                  })
                                  }
                                </optgroup>
                                <option id="newtemplate" value={["", "", "", "", "", "new"]} >+ New Template</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-2">
                          <label>Categories</label>
                          <input type="text" className="form-control mt-2 mb-0" value={this.state.whatdidwelearn}
                            onChange={(evt) => { this.setState({ whatdidwelearn: evt.target.value }) }}
                            placeholder="" />
                        </div>
                        <div className="form-group mb-2">
                          <input type="text" className="form-control  mt-2 mb-0" value={this.state.whatwentwell}
                            onChange={(evt) => { this.setState({ whatwentwell: evt.target.value }) }}
                            placeholder="" />
                        </div>
                        <div className="form-group mb-2">
                          <input type="text" className="form-control  mt-2 mb-0" value={this.state.whatcanweimprove}
                            onChange={(evt) => { this.setState({ whatcanweimprove: evt.target.value }) }}
                            placeholder="" />
                        </div>
                        <div className="form-group mb-2">
                          <input type="text" className="form-control  mt-2 mb-0" value={this.state.whatpuzzleus}
                            onChange={(evt) => { this.setState({ whatpuzzleus: evt.target.value }) }}
                            placeholder="" />
                        </div>
                        {
                          this.state.EditableStatus === false ?
                            <div className="new-template">
                              <h4 className="">Name New Template:</h4>
                              <div className="row mb-3">
                                <div className="col-md-9 pr-1">
                                  <input type="text" className="form-control bg-white border"
                                    onChange={(e) => this.setState({ newtemplateName: e.target.value })}
                                    name="template_name" placeholder="" value={this.state.newtemplateName} />
                                </div>
                                <div className="col-md-1 pl-0">
                                  <button disabled={(this.state.newtemplateName.trim() === '' && (this.state.typeTemple === "new" || this.state.showsavefordefault === true))} className="btn btn-primary btn-block category-update-btn" onClick={() => this.newtemplatevalue()}>Save</button>
                                </div>
                              </div>
                            </div> : ""
                        }
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={12} md={6}>
                    <div className="height-100 width-100 white-bg">
                      <Row className="containerSeperator m-p-10">
                        <Col md={12} className="text-left">
                          <h4 className="headingSandC">Attendees</h4>
                          <label>Invite</label>
                          <div className="input-group">

                            <input type="email" className="form-control invite-email-field" placeholder="Email" aria-label="Email" aria-describedby="Email2" />
                            <div className="input-group-append">
                              <button className="btn btn-warning" type="button">Send Invite</button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row className=" containerSeperator m-p-10">
                        <Col md={12} className=" containerSeperatorml-Minus15 invite-list text-left">
                          <div className="already-invited-text">Already Invited</div>
                          <div className="add-email">
                            <table className="table">
                              <tbody>
                                {this.state.allmyInviteList && this.state.allmyInviteList.length > 0 && this.state.allmyInviteList.map((item, index) => {
                                  return <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>
                                      <div className="round1">
                                        <input type="checkbox" id="checkbox" className="cst-checkbox-field" />
                                        <label htmlFor="checkbox" className="cst-checkbox-label"></label>
                                      </div>
                                    </td>
                                    <td><a ><i className="fa fa-times fa-sm" aria-hidden="true"></i></a></td>
                                  </tr>
                                })
                                }
                               
                              </tbody>
                            </table>
                          </div>


                        
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="date-edit" id="date-edit">
                      <div className="row">
                        <div className="col-md-12 text-left">
                          <h4 className="headingSandC">Date &amp; Time</h4>

                          <select value={this.state.startTime} onChange={(text) => this.setState({ startTime: text.target.value })}>
                            <option className="tap2option" />
                            <option className="tap2option" value={1}>9:00 AM</option>
                            <option className="tap2option" value={2}>9:30 AM</option>
                            <option className="tap2option" value={3}>10:00 AM</option>
                            <option className="tap2option" value={4}>10:30 AM</option>
                            <option className="tap2option" value={5}>11:00 AM</option>
                            <option className="tap2option" value={6}>11:30 AM</option>
                            <option className="tap2option" value={7}>12:00 PM</option>
                            <option className="tap2option" value={8}>12:30 PM</option>
                            <option className="tap2option" value={9}>1:00 PM</option>
                            <option className="tap2option" value={10}>1:30 PM</option>
                            <option className="tap2option" value={11}>2:00 PM</option>
                            <option className="tap2option" value={12}>2:30 PM</option>
                            <option className="tap2option" value={13}>3:00 PM</option>
                            <option className="tap2option" value={14}>3:30 PM</option>
                            <option className="tap2option" value={15}>4:00 PM</option>
                            <option className="tap2option" value={16}>4:30 PM</option>
                            <option className="tap2option" value={17}>5:00 PM</option>
                            <option className="tap2option" value={18}>5:30 PM</option>
                            <option className="tap2option" value={19}>6:00 PM</option>
                            <option className="tap2option" value={20}>6:30 PM</option>
                            <option className="tap2option" value={21}>7:00 PM</option>
                            <option className="tap2option" value={22}>7:30 PM</option>
                            <option className="tap2option" value={23}>8:00 PM</option>
                            <option className="tap2option" value={24}>8:30 PM</option>
                            <option className="tap2option" value={25}>9:00 PM</option>
                           
                          </select>
                          <span className="to-text">to</span>
                          <select value={this.state.Endtime} onChange={(text) => this.setState({ Endtime: text.target.value })}>
                            <option className="tap2option" />
                            <option className="tap2option" disabled={this.state.startTime < 1 ? false : true} value={1}>9:00 AM</option>
                            <option className="tap2option" disabled={this.state.startTime < 2 ? false : true} value={2}>9:30 AM</option>
                            <option className="tap2option" disabled={this.state.startTime < 3 ? false : true} value={3}>10:00 AM</option>
                            <option className="tap2option" disabled={this.state.startTime < 4 ? false : true} value={4}>10:30 AM</option>
                            <option className="tap2option" disabled={this.state.startTime < 5 ? false : true} value={5}>11:00 AM</option>
                            <option className="tap2option" disabled={this.state.startTime < 6 ? false : true} value={6}>11:30 AM</option>
                            <option className="tap2option" disabled={this.state.startTime < 7 ? false : true} value={7}>12:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 8 ? false : true} value={8}>12:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 9 ? false : true} value={9}>1:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 10 ? false : true} value={10}>1:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 11 ? false : true} value={11}>2:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 12 ? false : true} value={12}>2:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 13 ? false : true} value={13}>3:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 14 ? false : true} value={14}>3:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 15 ? false : true} value={15}>4:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 16 ? false : true} value={16}>4:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 17 ? false : true} value={17}>5:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 18 ? false : true} value={18}>5:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 19 ? false : true} value={19}>6:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 20 ? false : true} value={20}>6:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 21 ? false : true} value={21}>7:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 22 ? false : true} value={22}>7:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 23 ? false : true} value={23}>8:00 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 24 ? false : true} value={24}>8:30 PM</option>
                            <option className="tap2option" disabled={this.state.startTime < 25 ? false : true} value={25}>9:00 PM</option>
                           
                          </select>
                        
                          <DatePicker
                            popperPlacement="right"
                            value={this.state.StartDate}
                            minDate={this.formatDate(new Date())}
                            selected={this.state.StartDate} //when day is clicked
                            onChange={this.handleChange}
                          />
                          <br />
                           {
                            (this.state.repeatevery === true || this.state.repeatevery === "true") &&
                            <input type="checkbox" id="check1" hidden checked={true} />
                          }
                          {
                            (this.state.repeatevery === false || this.state.repeatevery === "false") &&
                            <input type="checkbox" id="check1" hidden />
                          }
                         
                          <label id="cst-check"></label>
                          <span>Reapeats every</span>
                          {/* <div id="no-border-wrapper"> */}
                          <select value={this.state.inputWeek} id="no-border" onChange={(text) => this.setState({ inputWeek: text.target.value })}>
                            <option value={1}>Week</option>
                            <option value={2}>2 Weeks</option>
                            <option value={3}>3 Weeks</option>
                            <option value={4}>4 Weeks</option>
                          </select>

                       
                          <br />

                          <span>on Mondays, Ending on</span>
                         
                          <DatePicker
                            popperPlacement="right"
                            value={this.state.Enddate}
                            minDate={this.formatDate(new Date())}
                            selected={this.state.Enddate} //when day is clicked
                            onChange={this.handleChange2} //when date is changed
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>


                <div className="save-retro">
                  <div className="row">
                    <div className="col-md-12">
                      
                      <button type="button" name="button" className="btn save-btn saveBtn" onClick={e => { this.updateRetrodetails(); }}>Save Retro</button>
                    </div>
                  </div>
                </div>
              </Grid>

              {/* Main Page Structure End */}
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

editretro.propTypes = {
  retroDetail: PropTypes.any,
  retroinfo: PropTypes.func,
  projectList: PropTypes.any,
  specificTemplateList: PropTypes.any,
  myInviteList: PropTypes.any,
  submitTemplate: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  retroDetail: retroDetailRes,
  updateRetroInfo: doUpdateRetroRes,
  projectList: getAllProjectsRes,
  specificTemplateList: getAllSpecifictemplateRes,
  myTemplateList: getAllMyTemplateRes,
  myInviteList: getAllInviteRes,
  submitTemplate: doCreateNewTempRes
});

function mapDispatchToProps(dispatch) {
  return {
    fetchdetail: (data) => dispatch(getRetroDetail(data)),
    handleFormSubmit: (data) => dispatch(updateRetro(data)),
    fetchAllProjects: (data) => dispatch(getAllProject(data)),
    fetchSpecificTemplate: (data) => dispatch(getSpecificTemplate(data)),
    fetchMyTemplate: (data) => dispatch(getMytemplate(data)),
    fetchInvite: (data) => dispatch(getInvite(data)),
    handleFormSubmitTemplate: (data) => dispatch(submit_CreateTemplate(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(editretro);
