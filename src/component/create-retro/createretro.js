import React from 'react';
import './createretro.css';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { submit_CreteRetro, doCreateRetroRes, getAllProject, getAllProjectsRes, getSpecificTemplate, getAllSpecifictemplateRes, getMytemplate, getAllMyTemplateRes } from '../../actions/createRetroAction';
import { submit_CreateTemplate, doCreateNewTempRes } from '../../actions/newCreateTemplateActions';
import Invite from '../invite-retro/InviteRetro';
import 'react-perfect-scrollbar/dist/css/styles.css';
import fullscreenIcon from "./img/full_screen_icon.jpg";


import HeaderComponent from './../../commonComponent/header';


const getProjectRequest = {
    "operationName": null,
    "variables": {},
    "query": "{\n  getAllProject {\n    id\n    projectName\n   \n  }\n}\n"
}
const getSpecificTemplateRequest = {
    "operationName": null,
    "variables": {},
    "query": "{\n  specificTemplate {\n    id\n    templateName\n    category1\n    category2\n    category3\n    category4\n   }\n}\n"
}


class CreateRetroComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: {},
            sprint: "",
            edit: false,
            projectname: false,
            nameofproject: '',
            show: false,
            show1: false,
            templatename: '',
            whatdidwelearn: 'What did we learn',
            whatwentwell: 'what went well1',
            whatcanweimprove: 'what can we improve',
            whatpuzzleus: 'what puzzle us',
            reset: false,
            newtemplatename: '',
            selectedproject: '',
            navigation: true,
            EditableStatus: true,
            retroCate: [],
            typeTemple: 'default',
            showsavefordefault: false,
            defaultTemplateNewValue: '',
            retroTempId: null,
            tags: [{ id: '', name: '' }],
            suggestions: [],
            showsection: "createretro",
            // showsection:'inviteretro',
            retrodata: {},
            allProjectList: [],
            mytemplateList: [],
            specificTemplateList: [],
            newtemplateid: '',
            createRetroInfo: [],
            loaderState: false,
            defaultSelectedTemplate:'Sprint Ceremonies'
        }

    }

    componentWillMount() {
        alert("yh")
        let url= window.location.href
        console.log(url);
        alert(url.toString().split("createretro")[0])

        this.props.fetchSpecificTemplate(getSpecificTemplateRequest);
        this.props.fetchAllProjects(getProjectRequest);
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        this.setState({ userinfo: userdata })
        console.log(userdata.id)


        let sendRequest = { "operationName": null, "variables": {}, "query": "{\n  fetchUserTemplate(userId: \"" + userdata.id + "\") {\n    id\n  archive\n  templateName\n  category1\n    category2\n    category3\n    category4\n    userId {\n      id\n      email\n    }\n  }\n}\n" }
        this.props.fetchMyTemplate(sendRequest)
    }


    componentWillReceiveProps(nextProps) {


        if (nextProps) {

            if (nextProps.createRetroResponse && nextProps.createRetroResponse.data.createRetroReducer.errors) {
                this.setState({
                    loaderState: false
                })
            }

            if (nextProps.createRetroResponse && nextProps.createRetroResponse.data.createRetroReducer.data) {
                let retroResponse = nextProps.createRetroResponse.data.createRetroReducer.data.createRetro
                this.setState({
                    createRetroInfo: retroResponse
                }, () => {
                    this.setState({
                        showsection: 'inviteretro',
                        loaderState: false
                    })
                })
            }

            if (nextProps.specificTemplateList && nextProps.specificTemplateList.data.specifictemplate.data && nextProps.specificTemplateList.data.specifictemplate.data.specificTemplate) {
                let templist = nextProps.specificTemplateList.data.specifictemplate.data.specificTemplate
                this.setState({
                    specificTemplateList: nextProps.specificTemplateList.data.specifictemplate.data.specificTemplate
                })
                if (templist && templist.length > 0) {
                    console.log(templist);
                    this.setState({
                        defaultSelectedTemplate: templist[0].templateName
                    },()=>{
                        console.log(this.state.defaultSelectedTemplate)
                    })
                    for (let items of templist) {
                        if (items.templateName === this.state.defaultSelectedTemplate) {
                            this.setState({
                                newtemplateid: items.id,
                                newtemplatename: items.templateName,
                                whatdidwelearn: items.category1,
                                whatwentwell: items.category2,
                                whatcanweimprove: items.category3,
                                whatpuzzleus: items.category4,
                            });
                        }
                    }
                }
            }

            if (nextProps.projectList && nextProps.projectList.data.projectList.data) {
                
                console.log(nextProps.projectList.data.projectList.data)
                this.setState({
                    allProjectList: nextProps.projectList.data.projectList.data.getAllProject
                })
            }

            if (nextProps.myTemplateList && nextProps.myTemplateList.data.mytemplate.data) {

                let templates=[];
                let getResponse= nextProps.myTemplateList.data.mytemplate.data.fetchUserTemplate;

                for(let items of getResponse){
                    if(items.archive!="1"){
                        templates.push(items);
                    }   
                }
                this.setState({
                    mytemplateList:templates
                })
            }

            if (nextProps.submitTemplate) {
                if (nextProps.submitTemplate.data.newCreateTemplateReducer) {

                    if (nextProps.submitTemplate.data.newCreateTemplateReducer.data && nextProps.submitTemplate.data.newCreateTemplateReducer.data.createUserTemplate) {
                        let submitTemplateData = nextProps.submitTemplate.data.newCreateTemplateReducer.data.createUserTemplate;

                        console.log(submitTemplateData);
                        if (submitTemplateData) {
;
                            this.setState({
                                mytemplateList: this.state.mytemplateList.concat(submitTemplateData)
                            }, () => {
                                console.log(this.state.mytemplateList)
                                this.setState({
                                    retroCate: [],
                                    newtemplateid: submitTemplateData.id,
                                    newtemplatename: submitTemplateData.templateName,
                                    whatdidwelearn: submitTemplateData.category1,
                                    whatwentwell: submitTemplateData.category2,
                                    whatcanweimprove: submitTemplateData.category3,
                                    whatpuzzleus: submitTemplateData.category4,
                                    typeTemple: 'new',
                                    EditableStatus: true
                                }, () => {
                                    console.log(this.state.newtemplateid)
                                })
                            })


                        }

                    }
                }

            }

        }
    }

    selectedValue(value) {
        let selectedTag = [{ id: value.id, name: value.projectName }]
        this.setState({
            tags: selectedTag,
            isSearch: false,
            selectedproject: value.projectName
        }, () => {
            console.log(this.state.selectedproject)
        })
    }


    searchString(e) {
        console.log(e.target.value)
        let value = [{ id: '', name: e.target.value }]
        this.setState({
            tags: value,
            isSearch: true,
            selectedproject: e.target.value
        }, () => {
            console.log(this.state.tags)
        })
    }

    newtemplatevalue() {
        var newtemplatename = document.getElementById("savetemplate");
        console.log(newtemplatename)
      

        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  createUserTemplate(userId: \"" + this.state.userinfo.id + "\", templateName: \"" + this.state.newtemplatename + "\", category1: \"" + this.state.whatdidwelearn + "\", category2: \"" + this.state.whatwentwell + "\", category3: \"" + this.state.whatcanweimprove + "\", category4: \"" + this.state.whatpuzzleus + "\") {\n    templateName\n    category1\n    category2\n    category3\n    category4\n    id\n    userId {\n      email\n    }\n  }\n}\n"
        }

        console.log(sendRequest)
        this.setState({
            EditableStatus: true,
            typeTemple: "user",
            showsavefordefault: false,
        })
        this.props.handleFormSubmitTemplate(sendRequest);
    }

    reset() {
        for (let items of this.state.specificTemplateList) {
            if (items.id === this.state.newtemplateid) {
                this.setState({
                    retroCate: [],
                    newtemplateid: items.id,
                    newtemplatename: items.templateName,
                    whatdidwelearn: items.category1,
                    whatwentwell: items.category2,
                    whatcanweimprove: items.category3,
                    whatpuzzleus: items.category4,
                    typeTemple: 'new',
                    EditableStatus: true
                });
            }
        }
        for (let items of this.state.mytemplateList) {
            if (items.id === this.state.newtemplateid) {
                this.setState({
                    retroCate: [],
                    newtemplateid: items.id,
                    newtemplatename: items.templateName,
                    whatdidwelearn: items.category1,
                    whatwentwell: items.category2,
                    whatcanweimprove: items.category3,
                    whatpuzzleus: items.category4,
                    typeTemple: 'new',
                    EditableStatus: true
                });
            }
        }
    }

    onNext() {


        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  createRetro(templateName: \"" + this.state.newtemplatename + "\", templateId: \"" + this.state.newtemplateid + "\", userId: \"" + this.state.userinfo.id + "\", projectName: \"" + this.state.selectedproject + "\", projectId: \"" + this.state.tags[0].id + "\", retroAdmin: \"" + this.state.userinfo.email + "\", retroCategory1: \"" + this.state.whatdidwelearn + "\", retroCategory2: \"" + this.state.whatwentwell + "\", retroCategory3: \"" + this.state.whatcanweimprove + "\", retroCategory4: \"" + this.state.whatpuzzleus + "\", sprintNumber: \"" + this.state.sprint + "\") {\n    templateName\n  projects {\n      projectName\n    }\n  templateId\n   projectId\n retroCategory3\n    retroCategory1\n    id\n    userId {\n      email\n    }\n  }\n}\n"
        }

        this.setState({
            loaderState: true
        })
        this.props.handleFormSubmit(sendRequest);

    }

    gettemplatename(value) {
        console.log(value)
        if (value === "New") {

            this.setState({
                EditableStatus: false,
                typeTemple: 'new',
                retroCate: [],
                newtemplateid: "",
                newtemplatename: "",
                whatdidwelearn: "",
                whatwentwell: "",
                whatcanweimprove: "",
                whatpuzzleus: "",
                // EditableStatus: true
            })


        } else {


            for (let items of this.state.specificTemplateList) {
                if (items.id === value) {
                    this.setState({
                        retroCate: [],
                        newtemplateid: items.id,
                        newtemplatename: items.templateName,
                        whatdidwelearn: items.category1,
                        whatwentwell: items.category2,
                        whatcanweimprove: items.category3,
                        whatpuzzleus: items.category4,
                        typeTemple: '',
                        EditableStatus: true
                    });
                }
            }
            for (let items of this.state.mytemplateList) {
                if (items.id === value) {
                    this.setState({
                        retroCate: [],
                        newtemplateid: items.id,
                        newtemplatename: items.templateName,
                        whatdidwelearn: items.category1,
                        whatwentwell: items.category2,
                        whatcanweimprove: items.category3,
                        whatpuzzleus: items.category4,
                        typeTemple: '',
                        EditableStatus: true
                    });
                }
            }
        }
    }
    sprintValues(e){
        const re = /^[0-9\b]+$/;
        if (re.test(e.target.value)) {
            this.setState({ sprint: e.target.value })
        }
    }

    savetemplateEnable() {
        if (this.state.typeTemple === 'new') {
            this.setState({ showsavefordefault: true, newtemplatename: this.state.templatename });
        } else {
            this.setState({ showsavefordefault: false, newtemplatename: '' });
        }
    }

    render() {
        const { openlogin } = this.state;
        let filterData = this.state.tags[0].name ? this.state.allProjectList.filter(row => row.projectName.toLowerCase().indexOf(this.state.tags[0].name.toLowerCase()) > -1) : this.state.allProjectList;

        const checkDisabled = (!this.state.EditableStatus || this.state.selectedproject === "" || this.state.newtemplatename === "")
        

        return (

            <div className="App">


                <HeaderComponent />
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div>
                    <div className="body-content" id={"createretro" + (this.state.showsection == "createretro" ? '' : '1')}>
                        <div className="main-content">
                            <div className={"" + (this.state.showsection === "createretro" ? 'show' : 'hidden')}>
                                <div className="row">
                                    <div className="col-md-4 offset-md-4 pr-5 pl-5">
                                        <nav className="nav nav-pills nav-justified">
                                            <a to="/createretro" className={this.state.showsection === "createretro" ? "nav-item nav-link active" : "nav-item nav-link fw-n c-g"}> Create Retro</a>
                                            <a to="/invite" className={this.state.showsection === "inviteretro" ? "nav-item nav-link active" : "nav-item nav-link fw-n c-g"} >Invite Team</a>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div id="createretropage" className={this.state.showsection === "inviteretro" ? 'hidden' : 'showing'}>
                                
                                <div className="section" >
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <h4 className="">Project Information</h4>
                                                <div className="row">
                                                    <div className="col-md-8 pr-1">
                                                        <input className="mb0 projectAddinput project-info-text" type="text" value={this.state.tags[0].name} onChange={(text) => this.searchString(text)} />
                                                        {this.state.isSearch && <div className="searchDiv searchDivDropdownContent">
                                                            {filterData && filterData.length > 0 && filterData.map((res, index) =>

                                                                <div key={index} onClick={() => { this.selectedValue(res) }}>{res.projectName}</div>)}
                                                           

                                                        </div>}
                                                    </div>
                                                    <div className="col-md-4 pl-0">

                                                        <input type="text" className="form-control sprint-code" name="sprint_name" value={this.state.sprint}
                                                            onChange={(e) => this.sprintValues(e)}
                                                            placeholder="Sprint Number" />
                                                        <span className="float-right optional">optional</span>
                                                    </div>
                                                </div>
                                                <h4 className="">Choose a Template:</h4>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <select onChange={(evt) => this.gettemplatename(evt.target.value)} id="saveteamplate" className="form-control minimal" >

                                                            <optgroup id="selectbox" label="Default Templates">
                                                                {/* {options} */}
                                                                {this.state.specificTemplateList && this.state.specificTemplateList.length > 0 && this.state.specificTemplateList.map((item, index) => {
                                                                    if (item.templateName === this.state.defaultSelectedTemplate) {
                                                                        // newtemplateid
                                                                        
                                                                        return <option value={item.id} key={index} selected>{item.templateName}</option>
                                                                    } else {
                                                                        return <option value={item.id} key={index}>{item.templateName}</option>
                                                                    }
                                                                })
                                                                }
                                                            </optgroup>
                                                            <optgroup id="selectbox" label="My Templates" id="savetemplate">
                                                                {this.state.mytemplateList && this.state.mytemplateList.length > 0 && this.state.mytemplateList.map((item, index) => {
                                                                    if (item.id === this.state.newtemplateid) {
                                                                        return <option className="optionStyle" value={item.id} key={index} selected>{item.templateName}</option>
                                                                    } else {
                                                                        return <option  className="optionStyle"  value={item.id} key={index}>{item.templateName}</option>
                                                                    }
                                                                })
                                                                }

                                                            </optgroup>
                                                            <option id="newtemplate" value="New" >+ New Template</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"cat-bg1 pl-3 pr-3 " + (this.state.EditableStatus ? 'showcategory' : 'editcategory')}>
                                                    <div className="retrocategory">
                                                        <h4>Retro Categories</h4>
                                                        
                                                        <div id="editbutton " className="col-md-12">
                                                            {this.state.EditableStatus ?
                                                                <button className="btn btn-sm btn-primary float-right btn-cat-edit1" onClick={() => this.setState({ EditableStatus: false })}>Edit</button> :
                                                                <button onClick={() => this.reset()}
                                                                    className="btn btn-sm btn-outline-primary float-right btn-cat-reset">Reset</button>
                                                            }
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="">
                                                        <div className="retro-categories-content">
                                                            <input type="text" className="form-control mt-3" value={this.state.whatdidwelearn} disabled={this.state.EditableStatus}
                                                                onChange={(evt) => { this.setState({ whatdidwelearn: evt.target.value }); this.savetemplateEnable() }}
                                                                placeholder="" />
                                                            <input type="text" className="form-control mt-3" value={this.state.whatwentwell} disabled={this.state.EditableStatus}
                                                                onChange={(evt) => { this.setState({ whatwentwell: evt.target.value }); this.savetemplateEnable() }}
                                                                placeholder="" />
                                                            <input type="text" className="form-control mt-3" value={this.state.whatcanweimprove} disabled={this.state.EditableStatus}
                                                                onChange={(evt) => { this.savetemplateEnable(); this.setState({ whatcanweimprove: evt.target.value }) }}
                                                                placeholder="" />
                                                            <input type="text" className="form-control mt-3" value={this.state.whatpuzzleus} disabled={this.state.EditableStatus}
                                                                onChange={(evt) => { this.setState({ whatpuzzleus: evt.target.value }); this.savetemplateEnable() }}
                                                                placeholder="" />
                                                        </div>
                                                    </div>
                                                    {
                                                        this.state.EditableStatus === false ?
                                                            <div className="new-template">
                                                                <h4 className="">Name This Template:</h4>
                                                                <div className="row mb-3">
                                                                    <div className="col-md-9 pr-1">
                                                                        <input type="text" className="form-control bg-white border save-retro-name-field"
                                                                            onChange={(e) => this.setState({ newtemplatename: e.target.value })}
                                                                            name="template_name" placeholder="" value={this.state.newtemplatename} />
                                                                    </div>
                                                                    <div className="col-md-1 pl-0">
                                                                        <button disabled={(this.state.newtemplatename.trim() === '' && (this.state.typeTemple === "new" || this.state.showsavefordefault === true))} className="btn btn-primary btn-block category-update-btn" onClick={() => this.newtemplatevalue()}>Save</button>
                                                                    </div>
                                                                </div>
                                                            </div> : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-7 pt-5 right-section createretro-four-boxes">
                                                <div className="row">
                                                    <div className="col-md-3 bars">
                                                        <div className=" bg-light">
                                                            <h4>{this.state.whatdidwelearn}</h4>
                                                            <img src={fullscreenIcon} className="fullscreen_icon_img" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 bars">
                                                        <div className=" bg-light">
                                                            <h4>{this.state.whatwentwell}</h4>
                                                            <img src={fullscreenIcon} className="fullscreen_icon_img" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 bars">
                                                        <div className=" bg-light">
                                                            <h4>{this.state.whatcanweimprove}</h4>
                                                            <img src={fullscreenIcon} className="fullscreen_icon_img" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 bars">
                                                        <div className=" bg-light">
                                                            <h4>{this.state.whatpuzzleus}</h4>
                                                            <img src={fullscreenIcon} className="fullscreen_icon_img" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 next-button">
                                            <button
                                                onClick={() => this.onNext()}
                                                disabled={checkDisabled}
                                                className={"btn btn-default btn-next btn-block " + (checkDisabled ? '' : 'disabledOpacity')}>Next
                                                </button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div id="inviteretro" className={this.state.showsection === "createretro" ? 'hidden' : 'showing'}>
                                <Invite retrofetchdata={this.state.createRetroInfo} />
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateRetroComponent.propTypes = {
    handleFormSubmit: PropTypes.func,
    handleFormSubmitRegister: PropTypes.func,
    projectList: PropTypes.any,
    specificTemplateList: PropTypes.any,
    createRetroResponse: PropTypes.any,
    submitTemplate: PropTypes.any

};

const mapStateToProps = createStructuredSelector({
    projectList: getAllProjectsRes,
    specificTemplateList: getAllSpecifictemplateRes,
    myTemplateList: getAllMyTemplateRes,
    createRetroResponse: doCreateRetroRes,
    submitTemplate: doCreateNewTempRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submit_CreteRetro(data)),
        handleFormSubmitTemplate: (data) => dispatch(submit_CreateTemplate(data)),
        fetchAllProjects: (data) => dispatch(getAllProject(data)),
        fetchSpecificTemplate: (data) => dispatch(getSpecificTemplate(data)),
        fetchMyTemplate: (data) => dispatch(getMytemplate(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateRetroComponent);
