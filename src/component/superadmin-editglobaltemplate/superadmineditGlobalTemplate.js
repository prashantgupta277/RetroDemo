import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './superadmineditGlobalTemplate.css';
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import { submit_get_global_Template, getEditGlobalTemplateRes, submit_update_global_Template, updateEditGlobalTemplateRes } from '../../actions/superAdminTemplateActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

class SuperAdminEditGlobalTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editTemplateDetail: [],
          updateTemplate: [],
          templatename: '',
          category1: "",
          category2: "",
          category3: "",
          category4: "",
          userid: '',
          loaderState: false,
        }
        this.revertChanges = this.revertChanges.bind(this);
    }
    
    componentWillMount() {
        const id = this.props.match.params.id
        console.log(id)
        let sendRequest = {
            "operationName":null,
            "variables":{},
            "query":"{\n  singleDefaultTemplate(id: \""+id+"\") {\n    templatename\n    category1\n    category2\n    category3\n    category4\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.handleFormSubmit(sendRequest)
        this.setState({
          loaderState: true
        })
    }
    
    updatetemplate() {
        const id = this.props.match.params.id
        let sendRequest = {
        "operationName": null,
        "variables": {},
        "query":"mutation {\n  updateDefaultTemplate(defaultTempId: \""+id+"\", templatename: \"" + this.state.templatename + "\", category1: \"" + this.state.category1 + "\", category2: \"" + this.state.category2 + "\", category3: \"" + this.state.category3 + "\", category4: \"" + this.state.category4 + "\", isDeleted: \"false\") {\n    id\n    templatename\n    category1\n    category2\n    category3\n    category4\n    isDeleted\n }\n}\n"
        }
        console.log(sendRequest)
        this.props.updateFormSubmit(sendRequest)
        // this.setState({
        //     loaderState: true
        // })
    }
    
    revertChanges() {
        this.setState({
        templatename: this.state.editTemplateDetail.templatename,
        category1: this.state.editTemplateDetail.category1,
        category2: this.state.editTemplateDetail.category2,
        category3: this.state.editTemplateDetail.category3,
        category4: this.state.editTemplateDetail.category4,
        }, () => {
        console.log(this.state.editTemplateDetail)
        })
    }

    BackOnCancel() {
        this.props.history.goBack();
    }

    
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps)
            if (nextProps.editTemplateDetail) {
                if (nextProps.editTemplateDetail.user.superAdminTemplateReducer) {
                    if (nextProps.editTemplateDetail.user.superAdminTemplateReducer.data && nextProps.editTemplateDetail.user.superAdminTemplateReducer.data.singleDefaultTemplate) {
                        let tempInfo = nextProps.editTemplateDetail.user.superAdminTemplateReducer.data.singleDefaultTemplate
                        this.setState({
                        editTemplateDetail: tempInfo,
                        templatename: tempInfo.templatename,
                        category1: tempInfo.category1,
                        category2: tempInfo.category2,
                        category3: tempInfo.category3,
                        category4: tempInfo.category4,
                        userid: tempInfo.userid,
                        loaderState: false
                        });
                    }
                }
            }
        
            if (nextProps.updateTemplate) {
                if (nextProps.updateTemplate.user.superAdminTemplateReducer) {
                    if (nextProps.updateTemplate.user.superAdminTemplateReducer.data && nextProps.updateTemplate.user.superAdminTemplateReducer.data.updateDefaultTemplate) {
                        let tempInfoUpdate = nextProps.updateTemplate.user.superAdminTemplateReducer.data.updateDefaultTemplate
                        this.setState({
                        editTemplateDetail: tempInfoUpdate,
                        templatename: tempInfoUpdate.templatename,
                        category1: tempInfoUpdate.category1,
                        category2: tempInfoUpdate.category2,
                        category3: tempInfoUpdate.category3,
                        category4: tempInfoUpdate.category4,
                        userid: tempInfoUpdate.userid,
                        loaderState: false
                        });
                    }
                }
            }
        }
    }

    render() {
        console.log(this.state.editTemplateDetail)
        return (
            <div className="App">
                <div className="scroll-assist" id="edittemplate-page-wrapper">
                <HeaderComponent />
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="container-fluid">
                    <div className="col-md-12 text-left">
                    <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                        <li><Link to={'/template'}>Templates</Link></li>
                        <li><a className="breadcrumb-current">Edit {this.state.templatename}</a></li>
                    </ol>
                    </div>
                    <div className="form-box-wrapper">
                    <div className="form-box">
                        <div className="form-box-header">
                        <h4 className="text-left fw-600">Edit Template</h4>
                        <p className="text-right"><button type="button" className="revertChanges-btn" onClick={() => { this.revertChanges() }}>Revert Changes</button></p>
                        </div>
                        <div className="form-box-body">
                        <div className="form-feild-box mb-25px">
                            <label htmlFor="template-title">Template Title</label>
                            <input type="text" value={this.state.templatename} onChange={(e) => this.setState({ templatename: e.target.value })} placeholder="Joe Bluth's Awesome Retro Template" id="template-title" />
                        </div>
                        <div className="form-feild-box">
                            <label htmlFor="category1">Category 1</label>
                            <input type="text" value={this.state.category1} onChange={(e) => this.setState({ category1: e.target.value })} placeholder="What was your rose?" id="category1" />
                        </div>
                        <div className="form-feild-box">
                            <label htmlFor="category2">Category 2</label>
                            <input type="text" value={this.state.category2} onChange={(e) => this.setState({ category2: e.target.value })} placeholder="What was your thorn?" id="category2" />
                        </div>
                        <div className="form-feild-box">
                            <label htmlFor="category3">Category 3</label>
                            <input type="text" value={this.state.category3} onChange={(e) => this.setState({ category3: e.target.value })} placeholder="This is a longer category name?" id="category3" />
                        </div>
                        <div className="form-feild-box">
                            <label htmlFor="category4">Category 4</label>
                            <input type="text" value={this.state.category4} onChange={(e) => this.setState({ category4: e.target.value })} placeholder="This is a much, much longer category name, isn't it?" id="category4" />
                        </div>
                        </div>
                        <div className="form-box-footer">
                        <div className="buttons-box">
                            <button type="button" className="cancel-btn" onClick={() => this.BackOnCancel()}>Cancel</button>
                            <button type="button" className="saveChanges-btn" onClick={() => this.updatetemplate()}>Save Changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <FooterComponent />
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    editTemplateDetail: getEditGlobalTemplateRes,
    updateTemplate: updateEditGlobalTemplateRes,
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      handleFormSubmit: (data) => dispatch(submit_get_global_Template(data)),
      updateFormSubmit: (data) => dispatch(submit_update_global_Template(data))
    };
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  export default compose(withConnect)(SuperAdminEditGlobalTemplate);