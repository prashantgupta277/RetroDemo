import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import './template.css';
import { submit_Template, doTemplateRes, delete_Template ,doArchiveTemplate} from '../../actions/templateActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import moment from 'moment';

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateList: [],
            open: false,
            DeleteId: "",
            loaderState: false,
            datetimesorttype: "desc"
        }
        this.loginId = JSON.parse(localStorage.getItem("logindata"))
        console.log(this.loginId.id)
    }

    componentWillMount() {
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "{\n  fetchUsertemplate(userid: \"" + this.loginId.id + "\")  {\n    id\n  archive\n  templatename\n    createdAt\n    category1\n    category2\n    category3\n    category4\n     retro {\n      id\n    }\n  userid {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.handleFormSubmit(sendRequest)
        this.setState({
            loaderState: true
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps) {
            if (nextProps.templateList && nextProps.templateList.user.templateReducer.data && nextProps.templateList.user.templateReducer.data.fetchUsertemplate) {
                console.log(nextProps.templateList)
                let tempData = [];
                for (let items of nextProps.templateList.user.templateReducer.data.fetchUsertemplate) {
                    if (items) {
                        items.createdAt = moment(new Date(items.createdAt)).format('MMM D, YYYY     hh:mm a')
                        tempData.push(items)
                    }
                }
                this.setState({
                    templateList: tempData,
                    loaderState: false
                })
            }
        }
    }

    shortretrodata() {
        if (this.state.datetimesorttype === "desc") {
            this.setState({ templateList: this.state.templateList.sort(this.ascsort) })
        } else {
            this.setState({ templateList: this.state.templateList.sort(this.descsort) })
        }
        if (this.state.datetimesorttype === "desc") {
            this.setState({ datetimesorttype: "asc"})
            // this.state.datetimesorttype = "asc";
        } else {
            this.setState({ datetimesorttype: "desc"})

            // this.state.datetimesorttype = "desc";
        }
    }

    descsort(a, b) {
        if (new Date(a.createdAt) < new Date(b.createdAt))
            return -1;
        if (new Date(a.createdAt) > new Date(b.createdAt))
            return 1;
        return 0;
    }

    ascsort(a, b) {
        if (new Date(a.createdAt) > new Date(b.createdAt))
            return -1;
        if (new Date(a.createdAt) < new Date(b.createdAt))
            return 1;
        return 0;
    }

    DeleteTemplate() {
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  deleteTemplate(id: \"" + this.state.DeleteId + "\") {\n    id\n    templatename\n    category1\n    category2\n    category3\n    category4\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.DeleteData(sendRequest)
    }

    onOpenModal = (id) => {
        this.setState({
            open: true,
            DeleteId: id
        });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    archive(template,status){
        this.setState({
            loaderState: true
        })
        setTimeout(()=>{
            this.setState({
                loaderState: false
            }) 
        },2000)

        let sendRequest={"operationName":null,"variables":{},"query":"mutation {\n  updateUserTemplate(templateId: \""+template+"\", archive: \""+status+"\") {\n    id\n    archive\n    templatename\n    category1\n    category2\n    category3\n    category4\n  }\n}\n"}

        this.props.doArchiveTemplate(sendRequest);

    }

    render() {
        const { open } = this.state;
        return (
            <div className="App">
                <HeaderComponent />
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div id="allTemplates" className="mainContent  containerBg user-templates-page-wrapper">
                    <div className="container-fluid containerHolder pt-5 pb-5">
                        {/* Main Page Structure Begin */}
                        <div className="maxWidth-1260px mt-0">
                            <Row >
                                <Col md={12} >
                                    <h3 className="text-center blueColorDark fontBold mb-5">Templates</h3>
                                    <Col md={12} className="data-main-container  p-4">
                                        <Row>
                                            <Col md={6}>
                                                <h5 className="text-left blueColorDark fontBold">Company Templates</h5>
                                            </Col>
                                            <Col md={6} className="text-right">
                                                <Link to={'/addTemplate'} >
                                                    <button type="button" className="add-custom-templates-btn">+ Add Custom</button>
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <div className="user-data-table mt-4 user-template-page-data-table">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Template Name</th>
                                                                <th scope="col">Categories</th>
                                                                <th scope="col">Created By</th>
                                                                <th scope="col" width="110"># of Retros</th>
                                                                <th scope="col" className="text-dk-grey fw-600">Date Added <span className="icon-chevrlet-up handpointer" onClick={(e) => { this.shortretrodata(); }} >({this.state.datetimesorttype === "asc" ? "↓" : "↑"})</span></th>
                                                                <th scope="col">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(this.state.templateList && this.state.templateList.length > 0) && this.state.templateList.map((item, index) => {

                                                                return <tr key={index}>
                                                                    <td scope="col">{item.templatename}</td>
                                                                    <td scope="col"> <ul>
                                                                        <li>{item.category1}</li>
                                                                        <li>{item.category2}</li>
                                                                        <li>{item.category3}</li>
                                                                        <li>{item.category4}</li>
                                                                    </ul></td>
                                                                    <td scope="col">{item.userid.firstName} {item.userid.lastName}</td>
                                                                    <td scope="col">{item.retro ? item.retro.length : 0}</td>
                                                                    <td scope="col">{item.createdAt}</td>
                                                                    <td scope="col " className="actions-dropdown">
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-primary dropdown-toggle btn-sm rounded" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                Actions
                                                                            </button>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                            
                                                                                <Link to={'/editTemplate/' + item.id + '/'} className="dropdown-item">Edit</Link>
                                                                                <a className="dropdown-item" onClick={() => { this.onOpenModal(item.id) }}>Delete</a>
                                                                                {item.archive==="1" &&<a className="dropdown-item" onClick={() => { this.archive(item.id,"0") }}>Unarchive</a>}
                                                                                {item.archive!=="1" &&<a className="dropdown-item" onClick={() => { this.archive(item.id,"1") }}>Archive</a>}
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </div>

                        

                        <div className="spacer"></div>
                        <div className="spacer"></div>
                    </div>
                    <div className="delete_template_modal">
                        <Modal open={open} onClose={this.onCloseModal}  closeIconSize={0}  center >
                            <div className="customeModal" >                
                                <div className="modal-body">
                                    <div style={{textAlign: 'right'}}>
                                        <button  className="btn btn-danger closebutton"  onClick={() => { this.onCloseModal() }}> <span aria-hidden="true">&times;</span></button>
                                    </div>
                                    <p>
                                        Are you sure You Want to Delete?
                                    </p>
                                    <div className="modal-footer" style={{    display: 'inline'}}>
                                        <button type="button" data-dismiss="modal" className="btn btn-danger" id="delete" onClick={() => { this.DeleteTemplate() }}>Delete</button>
                                        <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => { this.onCloseModal() }}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <FooterComponent />
                </div>
            </div>


        );
    }
}

const mapStateToProps = createStructuredSelector({
    templateList: doTemplateRes,
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmit: (data) => dispatch(submit_Template(data)),
        DeleteData: (data) => dispatch(delete_Template(data)),
        doArchiveTemplate: (data) => dispatch(doArchiveTemplate(data)),


        
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Template);
