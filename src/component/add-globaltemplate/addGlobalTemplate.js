import React from 'react';
import './addGlobalTemplate.css';
import {create_Global_template} from '../../actions/superAdminTemplateActions';
import  HeaderComponent from './../../commonComponent/header';
import  FooterComponent from './../../commonComponent/footer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

class AddGlobalTemplate extends  React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
        templatename:'',
        category1:"",
        category2:"",
        category3:"",
        category4:"",
        userid:''
    }
  }

  Addtemplate(){
    let sendRequest={
        "operationName":null,
        "variables":{},
        "query":"mutation {\n  createDefaultTemplate(templatename: \""+this.state.templatename+"\", category1: \""+this.state.category1+"\", category2: \""+this.state.category2+"\", category3: \""+this.state.category3+"\", category4: \""+this.state.category4+"\") {\n    templatename\n    category1\n    category2\n    category3\n    category4\n  }\n}\n"
    }
    this.props.handleFormSubmit(sendRequest)
  }

  BackOnCancel(){
    this.props.history.goBack();
    }

  render() {
    return (
      <div className="App">
        <div className="scroll-assist" id="edittemplate-page-wrapper">
          <HeaderComponent/>
          <div className="container-fluid">
              <div className="col-md-12 text-left">
                  <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                      <li><a>Templates</a></li>
                      <li><a className="breadcrumb-current">Add "Joe Bluth's Awesome Retro Template"</a></li>
                  </ol>
              </div>
              <div className="form-box-wrapper">
                  <div className="form-box">
                      <div className="form-box-header">
                          <h4>Add Global Template</h4>
                      </div>
                      <div className="form-box-body">
                        <div className="form-feild-box mb-25px">
                            <label htmlFor="template-title">Template Title</label>
                            <input type="text" value={this.state.templatename} onChange={(e) => this.setState({templatename:e.target.value})} placeholder="Joe Bluth's Awesome Retro Template" id="template-title" />
                        </div>
                        <div className="form-feild-box">
                            <label htmlFor="category1">Category 1</label>
                            <input type="text" value={this.state.category1} onChange={(e) => this.setState({category1:e.target.value})}   placeholder="What was your rose?" id="category1" />
                        </div>
                        <div className="form-feild-box">
                            <label htmlFor="category2">Category 2</label>
                            <input type="text" value={this.state.category2}  onChange={(e) => this.setState({category2:e.target.value})}  placeholder="What was your thorn?" id="category2" />
                        </div>
                        <div className="form-feild-box">
                            <label htmlFor="category3">Category 3</label>
                            <input type="text" value={this.state.category3} onChange={(e) => this.setState({category3:e.target.value})}  placeholder="This is a longer category name?" id="category3" />
                        </div>
                        <div className="form-feild-box">
                            <label htmlFor="category4">Category 4</label>
                            <input type="text" value={this.state.category4}  onChange={(e) => this.setState({category4:e.target.value})}  placeholder="This is a much, much longer category name, isn't it?" id="category4" />
                        </div>
                    </div>
                      <div className="form-box-footer">
                          <div className="buttons-box">
                              <button type="button" className="cancel-btn" onClick={()=>this.BackOnCancel()}>Cancel</button>
                              <button type="button" className="saveChanges-btn" onClick={()=>this.Addtemplate()}>Save</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <FooterComponent/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
  
function mapDispatchToProps(dispatch) {
  return {
      handleFormSubmit: (data) => dispatch(create_Global_template(data))
  };
}
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddGlobalTemplate);
