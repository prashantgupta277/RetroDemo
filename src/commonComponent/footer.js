import React from 'react';
import './footer.css';
import { Link } from "react-router-dom";
import footerImg from './img/dt_logo_robot2.png'
import Modal from 'react-responsive-modal';
import loginBg from './img/login.png';

class FooterComponent extends  React.PureComponent {

    constructor(props){
      super(props)
      this.state={
        contact: false
      }
      this.openContactUs=this.openContactUs.bind(this);
    }

    openContactUs(){
      this.setState({
        contact: true
      })

    }
    onCloseModal = () => {
      this.setState({ contact: false });
    };

  render() {
    return (
    <div className="footer">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-footer">
          <div className="col-md-5">
            <div className="" id="navbarText">
              <ul className="navbar-nav">
                <li className="nav-item ">
                  <div className="nav-link" onClick={()=>this.openContactUs()}>Contact Us</div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/termscondition">Terms & Condition</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/privacypolicy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <span className="footer-img">
               <img src={footerImg} alt="" />
               <div className="intro-text">
                  <h4>Built by Dom &amp; Tom.</h4>
                  <p>Agile teams running retros every sprint.</p>
                </div>
            </span>
          </div>
          <div className="col-md-3">
            <div className="navbar-text f-copyright">
              © Dom & Tom 2019<br />
              Visit our Website
            </div>
          </div>
          </nav>

          {/* Contact Modal */}
          <Modal open={this.state.contact}  onClose={this.onCloseModal} showCloseIcon={false} center>
               <div  className="contact_us_modal">
                <div className="modal-dialog" role="document">
                  <div className="modal-content" >
                    <img src={loginBg} alt={true} className="contact_us_modal_bg"/>
                    <div className="modal-header">
                      <button type="button" className="close" aria-label="Close" onClick={() => this.onCloseModal()}>
                        <span aria-hidden="true" ref={this.crossBtnUp}>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <h4 className="content-heading text_center contactusTitle">
                        <b>Contact us</b></h4>
                      <div id="registerForm">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Name:</label>
                            <input className="input" type="text" name="first_name" title="Name" placeholder="Name" required />
                          </div>
                          <div className="col-md-6">
                            <label>Email:</label>
                            <input className="input" type="text" name="email" title="Email" placeholder="Email" required />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 form-feild-box">
                            <label>Please select a category:</label>
                                <div className="account-type-dropdown">
                                  <select id="saveteamplate" className="form-control minimal" >
                                      <option value="">Select</option>
                                      <option value="">Investor Inquiry</option>
                                      <option value=""> Company Inquiry</option>
                                  </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <label>Message:</label>
                            <textarea placeholder="Enter Message"  className="textareaResize textArea"></textarea>
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-3"></div>
                          <div className="col-md-9">
                            <button className="btn btn-default btn-orange btn-submit"
                            >Send</button>

                          </div>
                       </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </Modal>
        </div>
    );
  }
}

export default FooterComponent;
