import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './superadmintemplates.css';

import SuperHeaderComponent from '../../commonComponent/superHeader';
import { submit_Custom_Template, doCustomTemplateRes, delete_Custom_Template, submit_Global_Template, getGlobalTemplateRes, delete_Global_Template} from '../../actions/superAdminTemplateActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-responsive-modal';
import moment from 'moment';

class SuperAdminTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GlobaltemplateList: [],
            CustomtemplateList: [],
            openCustom: false,
            openGlobal:false,
            DeleteCustomId: "",
            DeleteGlobalId: "",
            loaderState: false,
        }
        this.loginId = JSON.parse(localStorage.getItem("logindata"))
        console.log(this.loginId.id)
    }

    componentWillMount() {
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "{\n  singleDefaultTemplate(userid: \"" + this.loginId.id + "\")  {\n    id\n    templateName\n    createdAt\n    category1\n    category2\n    category3\n    category4\n     retro {\n      id\n    }\n  userid {\n      id\n      email\n      firstName\n      lastName\n    createdAt\n }\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.handleFormSubmitCustom(sendRequest)

        let sendRequestForGlobal = {
            "operationName":null,
            "variables":{},
            "query":"{\n  specificTemplate {\n    templateName\n    category1\n    category2\n    category3\n    category4\n  id\n retroCount\n}\n}\n"}
        console.log(sendRequestForGlobal)
        this.props.handleFormSubmitGlobal(sendRequestForGlobal)


        this.setState({
            loaderState: true
        })

        
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps) {
            if (nextProps.CustomtemplateList && nextProps.CustomtemplateList.user.superAdminTemplateReducer.data && nextProps.CustomtemplateList.user.superAdminTemplateReducer.data.fetchUsertemplate) {
                console.log(nextProps.CustomtemplateList)
                let tempData = [];
                for (let items of nextProps.CustomtemplateList.user.superAdminTemplateReducer.data.fetchUsertemplate) {
                    if (items) {
                        items.createdAt = moment(new Date(items.createdAt)).format('MMM D, YYYY     hh:mm a')
                        tempData.push(items)
                    }
                }
                this.setState({
                    CustomtemplateList: tempData,
                    loaderState: false
                })
            }

            if(nextProps.GlobaltemplateList && nextProps.GlobaltemplateList.user.superAdminTemplateReducer.data && nextProps.GlobaltemplateList.user.superAdminTemplateReducer.data.specifictemplate) {
                console.log(nextProps.GlobaltemplateList)
                let tempDataglobal = [];
                for (let items of nextProps.GlobaltemplateList.user.superAdminTemplateReducer.data.specifictemplate) {
                    if (items) {
                        items.createdAt = moment(new Date(items.createdAt)).format('MMM D, YYYY     hh:mm a')
                        tempDataglobal.push(items)
                    }
                }
                this.setState({
                    GlobaltemplateList: tempDataglobal,
                    loaderState: false
                })
            }
        }
    }

    DeleteCustomTemplate() {
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  deleteTemplate(id: \"" + this.state.DeleteCustomId + "\") {\n    id\n    templatename\n    category1\n    category2\n    category3\n    category4\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.DeleteCustomData(sendRequest)
    }

    onOpenModalCustom = (id) => {
        this.setState({
            openCustom: true,
            DeleteCustomId: id
        });
    };

    onCloseModalCustom = () => {
        this.setState({ openCustom: false });
    };

    DeleteGlobalTemplate() {
        let sendRequest = {
            "operationName":null,
            "variables":{},
            "query":"mutation {\n  deleteDefaultTemplate(id: \""+this.state.DeleteGlobalId+"\") {\n    id\n    isDeleted\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.DeleteGlobalData(sendRequest)
    }

    onOpenModalGlobal = (id) => {
        this.setState({
            openGlobal: true,
            DeleteGlobalId: id
        });
    };

    onCloseModalGlobal = () => {
        this.setState({ openGlobal: false });
    };

    render() {
        console.log(this.state)
        const { openCustom,openGlobal } = this.state;
        return (
            <div className="scroll-assist" id="superadmintemplates-page-wrapper">
                <div className="nav-container super-admin-menu-container">
                    <SuperHeaderComponent />
                </div>
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="container-fuild pb-50px">
                    <div className="maxWidth-1260px">
                        <div className="account-headar mb-50px">
                            Templates
                        </div>
                    </div>
                    <div className="bg-white company-templates company-templates-orange">
                        <div className="row">
                            <div className="col-12">
                                <div className="company-templates-head">
                                    <div className="row">
                                        <div className="col-6">
                                            <h4>Global Templates</h4>
                                        </div>
                                        <div className="col-6 text-right">
                                            <Link to={'/superadmin-addGlobalTemplates'} >
                                                <button type="button" className="add-custom-templates-btn">+ Add Global</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td width="235">Template Name</td>
                                                <td width="450">Categories</td>
                                                {/* <td width="240">Company Name</td> */}
                                                <td width="110"># of Retros</td>
                                                {/* <td width="115" className="down_arrow"><b>Order</b></td> */}
                                                <td width="150">Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.GlobaltemplateList && this.state.GlobaltemplateList.length > 0) && this.state.GlobaltemplateList.map((item, index) => {
                                                return <tr key={index}>
                                                    <td scope="col">{item.templatename}</td>
                                                    <td scope="col"> <ul>
                                                        <li>{item.category1}</li>
                                                        <li>{item.category2}</li>
                                                        <li>{item.category3}</li>
                                                        <li>{item.category4}</li>
                                                    </ul></td>
                                                    <td>{item.retroCount}</td>
                                                    
                                                    <td scope="col " className="actions-dropdown">
                                                        <div className="dropdown">
                                                            <button className="btn btn-primary dropdown-toggle btn-sm rounded" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Actions
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <Link to={'/super-admin-editglobaltemplates/' + item.id + '/'} className="dropdown-item">Edit</Link>
                                                                <a className="dropdown-item" onClick={() => { this.onOpenModalGlobal(item.id) }}>Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white company-templates">
                        <div className="row">
                            <div className="col-12">
                                <div className="company-templates-head">
                                    <div className="row">
                                        <div className="col-6">
                                            <h4>Custom Templates</h4>
                                        </div>
                                        <div className="col-6 text-right">
                                            <Link to={'/superadmin-addCustomTemplates'} >
                                                <button type="button" className="add-custom-templates-btn">+ Add Custom</button>
                                            </Link>
                                            {/* <a href="javascript:void(0)" className="add-custom-templates-btn blue-btn"><i className="fa fa-plus"></i> Add Custom</a> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td width="235">Template Name</td>
                                                <td width="450">Categories</td>
                                                <td width="210">Created By</td>
                                                <td width="110"># of Retros</td>
                                                <td width="145" className="down_arrow"><b>Date Added</b></td>
                                                <td width="150">Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.CustomtemplateList && this.state.CustomtemplateList.length > 0) && this.state.CustomtemplateList.map((item, index) => {
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
                                                                <Link to={'/super-admin-edittemplates/' + item.id + '/'} className="dropdown-item">Edit</Link>
                                                                <a className="dropdown-item" onClick={() => { this.onOpenModalCustom(item.id) }}>Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="company-templates-foot">
                                    <nav aria-label="company templates navigation">
                                        <ul className="pagination">
                                           
                                            <li className="page-item active"><a className="page-link" >1</a></li>
                                            <li className="page-item"><a className="page-link" >2</a></li>
                                            <li className="page-item"><a className="page-link" >3</a></li>
                                            <li className="page-item"><a className="page-link" >4</a></li>
                                            <li className="page-item">
                                                <a className="page-link"  aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="delete_template_modal">
                    <Modal open={openCustom} onClose={this.onCloseModalCustom}  closeIconSize={0}  center >
                        <div className="customeModal" >                
                            <div className="modal-body">
                                <div style={{textAlign: 'right'}}>
                                    <button  className="btn btn-danger closebutton"  onClick={() => { this.onCloseModalCustom() }}> <span aria-hidden="true">&times;</span></button>
                                </div>
                                <p>
                                    Are you sure You Want to Delete?
                                </p>
                                <div className="modal-footer" style={{    display: 'inline'}}>
                                    <button type="button" data-dismiss="modal" className="btn btn-danger" id="delete" onClick={() => { this.DeleteCustomTemplate() }}>Delete</button>
                                    <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => { this.onCloseModalCustom() }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="delete_template_modal">
                    <Modal open={openGlobal} onClose={this.onCloseModalGlobal}  closeIconSize={0}  center >
                        <div className="customeModal" >                
                            <div className="modal-body">
                                <div style={{textAlign: 'right'}}>
                                    <button  className="btn btn-danger closebutton"  onClick={() => { this.onCloseModalGlobal() }}> <span aria-hidden="true">&times;</span></button>
                                </div>
                                <p>
                                    Are you sure You Want to Delete?
                                </p>
                                <div className="modal-footer" style={{    display: 'inline'}}>
                                    <button type="button" data-dismiss="modal" className="btn btn-danger" id="delete" onClick={() => { this.DeleteGlobalTemplate() }}>Delete</button>
                                    <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => { this.onCloseModalGlobal() }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    CustomtemplateList: doCustomTemplateRes,
    GlobaltemplateList: getGlobalTemplateRes
});

function mapDispatchToProps(dispatch) {
    return {
        handleFormSubmitCustom: (data) => dispatch(submit_Custom_Template(data)),
        DeleteCustomData: (data) => dispatch(delete_Custom_Template(data)),
        handleFormSubmitGlobal: (data) => dispatch(submit_Global_Template(data)),
        DeleteGlobalData: (data) => dispatch(delete_Global_Template(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SuperAdminTemplates);
