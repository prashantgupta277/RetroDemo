import React from 'react';
import './login.css';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { joinRetroRes,doJoinRetro} from '../../actions/loginActions';

import featurethought from './img/feature-thoughts.png';
import voteonthought from './img/vote-on-thoughts.png';
import organizeproject from "./img/organize-projects.png";

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { createNotification } from './../../commonComponent/notificationbox/index';
import  FooterComponent from './../../commonComponent/footer';
import MainHeaderComponent from './../../commonComponent/mainHeader';


class LoginComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.crossBtn = React.createRef();
    this.crossBtnUp = React.createRef();
    this.state = {
      joinretro: false,
      show: false,
      join: false,
      login: false,
      email: '',
      password: '',
      createuseremail: '',
      createaccountfirstname: '',
      createaccountsecondname: '',
      createaccountpassword: '',
      createaccountconfirmpassword: '',
      businessUser: '',
      profession: '',
      userType: '',
      accountType: '',
      companyId: '',
      companyName: '',
      skills: [],
      status: '',
      checkstatus: false,
      signupError: false,
      signinError: false,
      loaderState: false,
      openlogin: false,
      openRegister: false,
      isType: "",
      companyList:[],
      roomcode:''
    }
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onOpenRegisterModal = this.onOpenRegisterModal.bind(this);
  }

  onOpenModal() {
    this.setState({
      openRegister: false,
      openlogin: true
    });
  };

  onOpenRegisterModal() {
    this.setState({
      openlogin: false,
      openRegister: true
    });
  };

  componentWillReceiveProps(nextProps) {
      if (nextProps) {
          if (nextProps.joinRetroRes && nextProps.joinRetroRes.user.user.data && nextProps.joinRetroRes.user.user.data.fetchRetroByRoomCode) {
        
            let response=nextProps.joinRetroRes.user.user.data.fetchRetroByRoomCode;
            console.log(response)
    
            if(response && response.length>0){
              window.location.href="/startretro/"+response[0].roomCode+"/"+response[0].id;
            }else{
              createNotification('error', "Invalid room code");
            }
            
          }
      }

  }




  onCloseModal = () => {
    this.setState({ openlogin: false });
  };

  onCloseRegisterModal = () => {
    this.setState({ openRegister: false });
  };


 

  handlejoin() {
    this.setState({ login: false, join: false, show: false })
  }
  handleHide() {
    this.setState({ login: false, show: false, join: false });
  }

  handlelogin() {
    this.setState({ login: false, show: false, join: false })
  }



  joinBtnHandler(e) {

    e.preventDefault();
    e.stopPropagation();
    this.setState({ joinretro: true })
  }

  joinRetro(){
    let sendRequest={
      "operationName":null,
      "variables":{},
      "query":"{\n  fetchRetroByRoomCode(roomCode: \""+this.state.roomcode+"\") {\n    id\n    roomCode\n  }\n}\n"}
    this.props.doJoinRetro(sendRequest)
  }

  render() {
    // const { openlogin } = this.state;
    const { createaccountconfirmpassword, createaccountfirstname, createuseremail, createaccountpassword, status} = this.state;
    // const isValid = email === '' || password === '';
    const isValid2 = status === '' || createaccountconfirmpassword === '' || createaccountfirstname === '' || createuseremail === '' || createaccountconfirmpassword === '' || createaccountpassword === '';
  
    return (
      <div >
        <PerfectScrollbar>
          <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
            <div className={this.state.loaderState ? "loader" : ""}></div>
          </div>
          <div className="body-content" id="landing-page">
          <MainHeaderComponent/>
           
          <div className="margintop55">
             

            <section id="retroJoin" className="section-one" onClick={() => this.setState({ joinretro: false })}>
              <div className="landingBanner">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="content">
                        <h4 className="remote-share-text">Remote Teams.<br />Shared Space.</h4>
                        {
                          this.state.joinretro ?
                            <div className="show_join_retro_field">
                              <input type="text" className="form-control roomcode-put" value={this.state.roomcode} placeholder="Enter room code"
                                aria-label="Recipient's username" aria-describedby="basic-addon2" size={40}
                                onChange={(e)=>{this.setState({roomcode:e.target.value})}}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              />
                              <button type="button" className="btn btn-primary btn-lg join-btn"  onClick={()=>{this.joinRetro()}}>Join Retro</button>
                            </div>
                            :
                            <div className="join-create-retro-btn-wrapper text-left">
                              <button type="button" className="btn btn-primary btn-lg join-btn blue-btn"
                                onMouseEnter={(e) => this.joinBtnHandler(e)}
                              >Join Retro</button>
                              {/* <input type="text" class="show_field" /> */}
                              <button className="btn btn-outline-orange btn-lg btn-create-retro" type="button" data-toggle="modal" data-target="#registerModal" onClick={this.onOpenRegisterModal}>
                                Create Retro</button>
                            </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-two" onClick={() => this.setState({ joinretro: false })} id="features">
              <div className="bg-orange">
                <div className="container">
                  <div className="content">
                    <div className="row">
                      <div className="col-md-12">
                        <h3>Better decisions. Better products.Stronger teams.</h3>
                        <h4>Share your thoughts. Vote on what’s important. Group your ideas. Commit to a better
                                        process and better future.</h4>
                      </div>
                    </div>
                    <div className="row two-column">
                      <div className="col-md-6 ">
                        <img src={featurethought} alt="" />
                      </div>
                      <div className="col-md-6">
                        <h3>Discuss team thoughts in a real-time, configurable enivonment</h3>
                        <p>
                          Use a real-time, configurable, feedback tool for your team
                          to discuss and share their thoughts. Teams can scale to 50+
                          team members concurrently, for either internal or remote, to
                          support efficient and transparent shared understanding
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green">
                <div className="container">
                  <div className="content">
                    <div className="row two-column mt-5">
                      <div className="col-md-6">
                        <h3 className="review-heading">Review your team's feedback</h3>
                        <p>
                          Group, Sort, and Vote on Thoughts to prioritize your and
                          your team's feedback and support a better understanding
                          of the "How Well" a team is working together
                          </p>
                      </div>
                      <div className="col-md-6 ">
                        <img src={voteonthought} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="row two-column mt-5">
                    <div className="col-md-6 ">
                      <img src={organizeproject} alt="" />
                    </div>
                    <div className="col-md-6" id="features">
                      <h3 className="mt-5">Organize by Projects & Schedules</h3>
                      <p>
                        Organize your Retro's to specific projects to better assess
                        your team's understanding. Schedule Retros to create a
                        consistent, recurring feedback loop.
                            </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-three" id="get-the-beta">
              <div className="bg-blue">
                <div className="container">
                  <div className="content">
                    <div className="row mt-5">
                      <div className="col-md-5 newsletter">
                        <h4>Sign up for the Beta</h4>
                        <form >
                          <div className="input-group mb-3 zclass">
                            <input type="email" className="form-control" placeholder="youremail@yourcompany.com"
                              aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                              <button className="btn btn-secondary btn-orange" type="button">Submit</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="row two-column mt-5" id="planspricing">
                      <div className="col-md-12">
                        <h3>Plans & Pricing</h3>
                      </div>
                      <div className="col-md-4">
                        <div className="plans">
                          <div className="head">
                            <h4>Freelancer</h4>
                            <h5>Free</h5>
                          </div>
                          <div className="content">
                            <ul className="list-group">
                              <li className="list-group-item">Join any retro</li>
                              <li className="list-group-item">Receive a retro summary</li>
                              <li className="list-group-item">Create a retro</li>
                              <li className="list-group-item">Up to <b>1</b> retro admin</li>
                              <li className="list-group-item">Limit of <b>7</b> users in a retro</li>
                              <li className="list-group-item">Up to <b>5</b> retros</li>
                            </ul>
                            <div className="other-features linethrough plansContent">
                              <ul>
                                <li>Schedule retros</li>
                                <li>Invite/Uninvite users</li>
                                <li>Manage projects</li>
                                <li>Templates</li>
                                <li>Decision Log</li>
                                <li>Reportings (v2)</li>
                                <li>Action Items</li>
                                <li>Retro Notes (Project & Personal Notes)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="plans">
                          <div className="head">
                            <h4>Startup</h4>
                            <h5>$49/mo</h5>
                          </div>
                          <div className="content">
                            <ul className="list-group">
                              <li className="list-group-item">Join any retro</li>
                              <li className="list-group-item">Receive a retro summary</li>
                              <li className="list-group-item">Create a retro</li>
                              <li className="list-group-item">Up to <b>10</b> retro admin</li>
                              <li className="list-group-item">Limit of <b>7</b> users in a retro</li>
                              <li className="list-group-item"><b>Unlimited</b> retros</li>
                            </ul>
                            <div className="other-features plansContent">
                              <ul>
                                <li>Schedule retros</li>
                                <li>Invite/Uninvite users</li>
                                <li>Manage projects</li>
                                <li>Templates</li>
                                <li>Decision Log</li>
                                <li>Reportings (v2)</li>
                                <li>Action Items</li>
                                <li>Retro Notes (Project & Personal Notes)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="plans">
                          <div className="head">
                            <h4>Enterprise</h4>
                            <h5>Contact for Pricing</h5>
                          </div>
                          <div className="content">
                            <ul className="list-group">
                              <li className="list-group-item">Join any retro</li>
                              <li className="list-group-item">Receive a retro summary</li>
                              <li className="list-group-item">Create a retro</li>
                              <li className="list-group-item"><b>Unlimited</b> retro admin</li>
                              <li className="list-group-item"><b>Unlimited</b> users in a retro</li>
                              <li className="list-group-item"><b>Unlimited</b> retros</li>
                              <li className="list-group-item">Everything in <b>Startup</b></li>
                            </ul>
                            <div className="other-features plansContent">
                              <ul>
                                <li>Security (SSL)</li>
                                <li>Data Isolated</li>
                                <li>Manage Users</li>
                                <li>User List / User Details</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
            <FooterComponent/>
            

          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  joinRetroRes: PropTypes.any

};

const mapStateToProps = createStructuredSelector({
  joinRetroRes:joinRetroRes
});

function mapDispatchToProps(dispatch) {
  return {
    doJoinRetro: (data) => dispatch(doJoinRetro(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginComponent);
