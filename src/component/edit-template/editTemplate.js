import React from 'react';
import './editTemplate.css';
import { submit_get_Template, getEditTemplateRes } from '../../actions/editTemplateActions';
import { updateEditTemplateRes } from '../../actions/updateTemplateActions';
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";
import { createStructuredSelector } from 'reselect';
import { createNotification} from './../../commonComponent/notificationbox/index';



const UPDATE_TEMPLATE = gql`
mutation updateUserTemplate($templatename: String!,$category1: String!,$category2: String!, $category3: String!, $category4: String!, $templateId: ID!){
  updateUserTemplate(templatename: $templatename, category1:$category1, category2:$category2, category3: $category3, category4: $category4, templateId:$templateId){
    id
    templatename
    category1
    category2
    category3
    category4
    createdAt

  }
}
`;

class EditTemplate extends React.PureComponent {

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
      templateId:''
    }
    this.revertChanges = this.revertChanges.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id
    console.log(id)
    let sendRequest = {
      "operationName": null,
      "variables": {},
      "query": "{\n  fetchSingleUsertemplate(id: \"" + id + "\") {\n    id\n    templatename\n    category1\n    category2\n    category3\n    category4\n    userid {\n      id\n      email\n    }\n  }\n}\n"
    }
    console.log(sendRequest)
    this.props.getTemplate(sendRequest)
    this.setState({
      loaderState: true
    })
  }

  updatetemplate() {
    const id = this.props.match.params.id
    let sendRequest = {
      "operationName": null,
      "variables": {},
      "query": "mutation {\n  updateUserTemplate(templateId: \"" + id + "\", templatename: \"" + this.state.templatename + "\", category1: \"" + this.state.category1 + "\", category2: \"" + this.state.category2 + "\", category3: \"" + this.state.category3 + "\", category4: \"" + this.state.category4 + "\") {\n    templatename\n    id\n    category1\n    category2\n    category3\n    category4\n    userid {\n      id\n      email\n      firstName\n    }\n  }\n}\n"
    }
    console.log(sendRequest)
    this.props.updateFormSubmit(sendRequest)
    this.setState({
      loaderState: true
    })
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps) {
      if (nextProps.editTemplateDetail) {
        let tempInfo = nextProps.editTemplateDetail.user.editTemplateReducer.data.fetchSingleUsertemplate;
        console.log(tempInfo)
        this.setState({
          editTemplateDetail: tempInfo,
          templatename: tempInfo.templatename,
          category1: tempInfo.category1,
          category2: tempInfo.category2,
          category3: tempInfo.category3,
          category4: tempInfo.category4,
          userid: tempInfo.userid,
          loaderState: false,
          templateId: tempInfo.id,
        });
      }

      if (nextProps.updateTemplate) {
        if (nextProps.updateTemplate.user.updateTemplateReducer) {
        console.log(nextProps.updateTemplate)

          if (nextProps.updateTemplate.user.updateTemplateReducer && nextProps.updateTemplate.user.updateTemplateReducer.updateUserTemplate) {
            let tempInfoUpdate = nextProps.updateTemplate.user.updateTemplateReducer.updateUserTemplate;
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

  BackOnCancel() {
    this.props.history.goBack();
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
         <ApolloConsumer>
                  {client => (
                    <Mutation mutation={UPDATE_TEMPLATE}  >
                      {(doUpate, { error }) => {
                           return ( <div className="container-fluid">
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
                                      <button type="button" className="saveChanges-btn" onClick={
                                          async (e) => {
                                            e.preventDefault();
                                            console.log(this.state);
                                            if(this.state.templatename===""){
                                                createNotification("error","Please enter template name")
                                                return false;
                                            } if(this.state.category1===""){
                                                createNotification("error","Please enter first category")
                                                return false;
                                            }if(this.state.category2===""){
                                                createNotification("error","Please enter second category")
                                                return false;
                                            }if(this.state.category3===""){
                                                createNotification("error","Please enter third category")
                                                return false;
                                            }if(this.state.category4===""){
                                                createNotification("error","Please enter fourth category")
                                                return false;
                                            }
                                    
                                            this.setState({
                                                loaderState:true
                                            })
                                            
                                          await client.mutate({
                                              mutation: UPDATE_TEMPLATE,
                                              variables: { 
                                                    templateId:this.state.templateId,
                                                    templatename: this.state.templatename ,
                                                    category1: this.state.category1 ,
                                                    category2: this.state.category2 ,
                                                    category3: this.state.category3 ,
                                                    category4: this.state.category4 
                                                }
                                            }).then(({ data }) => {
                                              console.log(data)
                                              this.props.doUpdateTemplate(data);
                                              createNotification("success","Template Update Successfully")
                                               
                                                    this.setState({
                                                        loaderState:false,                                            
                                                    })
                                                
                                              })
                                              .catch(({ graphQLErrors }) => {
                                              //This variable returns an array of errors
                                                console.log(graphQLErrors)
                                                if(graphQLErrors){
                                                  createNotification("error",graphQLErrors[0].message)
                                                  console.log( graphQLErrors[0].message );
                                                  this.setState({
                                                    loaderState:false
                                                  })
                                                }
                                                
                                              })
                                          
                                        } }>Save Changes</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            )  }}
                            </Mutation>
                            )}
                      </ApolloConsumer>
          <FooterComponent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  editTemplateDetail: getEditTemplateRes,
  updateTemplate: updateEditTemplateRes,
});

function mapDispatchToProps(dispatch) {
  return {
    getTemplate: (data) => dispatch(submit_get_Template(data)),
    doUpdateTemplate: (data) => dispatch(updateEditTemplateRes(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditTemplate);
