import React from 'react';
import './addTemplate.css';
import  HeaderComponent from './../../commonComponent/header';
import  FooterComponent from './../../commonComponent/footer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";
import { createNotification} from './../../commonComponent/notificationbox/index';

const ADD_TEMPLATE = gql`
mutation createUserTemplate($templatename: String!,$category1: String!,$category2: String!, $category3: String!, $category4: String!, $userid: ID!){
    createUserTemplate(templatename: $templatename, category1:$category1, category2:$category2, category3: $category3, category4: $category4, userid:$userid){
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



class AddTemplate extends  React.PureComponent {

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

    componentWillMount(){
        let userInfo=JSON.parse(localStorage.getItem("logindata"));
        if(userInfo){
            this.setState({
                loginUserInfo: userInfo
            })
        }
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
              <ApolloConsumer>
                  {client => (
                    <Mutation mutation={ADD_TEMPLATE}  >
                      {(DoCreate, { error }) => {
                           return (
                                <div className="form-box-wrapper">
                        <div className="form-box">
                            <div className="form-box-header">
                                <h4>Add Template</h4>
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
                                    <button type="button" className="saveChanges-btn"  onClick={
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
                                              mutation: ADD_TEMPLATE,
                                              variables: { 
                                                    userid:this.state.loginUserInfo.id,
                                                    templatename: this.state.templatename ,
                                                    category1: this.state.category1 ,
                                                    category2: this.state.category2 ,
                                                    category3: this.state.category3 ,
                                                    category4: this.state.category4 
                                                }
                                            }).then(({ data }) => {
                                              console.log(data)
                                              createNotification("success","Template Added Successfully")
                                                setTimeout(()=>{
                                                    this.setState({
                                                        loaderState:false,                                            
                                                    })
                                                    this.BackOnCancel();
                                                },1000)
                                                
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
                                          
                                        } }>Save</button>
                                </div>
                            </div>
                        </div>
              </div>
               )  }}
        </Mutation>
        )}
        </ApolloConsumer>
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

  };
}
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddTemplate);
