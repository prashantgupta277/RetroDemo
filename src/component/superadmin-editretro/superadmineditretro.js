import React, { Component } from 'react';

import './superadmineditretro.css';
import SuperHeaderComponent from '../../commonComponent/superHeader';
import { Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class superadmineditretro extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (

            <div className="scroll-assist" id="superadmineditretro-page-wrapper">
                <SuperHeaderComponent />
                <div className="container-fluid">
                    <div className="maxWidth-1260px mt-0">
                        <div className="col-md-12 text-left">
                            <ol className="breadcrumb breadcrumb-2" id="bread-crumb">
                                <li><a href="#">Accounts</a></li>
                                <li><a href="/superadmin-account-information">The Bluth Company</a></li>
                                <li><a href="#" className="breadcrumb-current">Edit Retro</a></li>
                            </ol>
                        </div>
                        <div className="row">
                            {/* Left Side Bar */}
                            <div className="col-md-3 pl-2-5px">
                                <div className="comapanyadmin-left-sidebar">
                                    <h4 className="company-name">The Bluth Company</h4>
                                    <ul className="nav-links">
                                        <li><a href="/superadmin-account-information">Account Information</a></li>
                                        <li><a href="/superadmin-users">Users</a></li>
                                        <li className="active"><a href="/superadmin-retros">Retros</a></li>
                                        <li><a href="/superadmin-billing" className="billing-link">Billing</a></li>
                                    </ul>
                                    <div className="download-data-icon">
                                        <a href="#">Downlaod all Data</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="edit-title" id="edit-title">
                                    <div className="row flexAlignMiddle containerSeperator">
                                        <div className="col-md-7">
                                            <h2 className="text-left">Edit Upcoming Retro</h2>
                                        </div>
                                        <div className="col-md-5 btnTop_Holder">
                                            <button type="button" className="btn">Save Retro</button>
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
                                                    <input className="mb0 project-info-field" type="text" />
                                                </div>

                                            </Col>
                                            <Col md={4} className="text-left ">
                                                <div className="mbn-5 optional-link">optional</div>
                                                <div className="form-group">
                                                    <input type="text" value={this.state.sprintnumber} className="form-control sprint-code" name="sprint_name"

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
                                                            <select id="saveteamplate" className="form-control minimal">
                                                                <optgroup id="selectbox" label="Default Templates">
                                                                    <option>first</option>
                                                                    <option>secnd</option>
                                                                    <option>third</option>
                                                                    <option>Sprint Ceremonies</option>
                                                                    <option>second Template</option>
                                                                    <option>first add</option>
                                                                    <option>cha</option>
                                                                </optgroup>
                                                                <optgroup id="savetemplate" label="My Templates"></optgroup>
                                                                <option id="newtemplate" value="">+ New Template</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mb-2">
                                                    <label>Categories</label>
                                                    <input type="text" className="form-control mt-2 mb-0" placeholder="What did we miss?" />
                                                </div>
                                                <div className="form-group mb-2">
                                                    <input type="text" className="form-control  mt-2 mb-0" placeholder="What did we learn?" />
                                                </div>
                                                <div className="form-group mb-2">
                                                    <input type="text" className="form-control  mt-2 mb-0" placeholder="What can we improve?" />
                                                </div>
                                                <div className="form-group mb-2">
                                                    <input type="text" className="form-control  mt-2 mb-0" placeholder="what Puzzles Us?" />
                                                </div>

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
                                                                <tr>
                                                                    <td>email@useremail.com</td>
                                                                    <td>
                                                                        <div className="round1">
                                                                            <input type="checkbox" id="checkbox" className="cst-checkbox-field" />
                                                                            <label htmlFor="checkbox" className="cst-checkbox-label"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td><a href="#"><i className="fa fa-times fa-sm" aria-hidden="true"></i></a></td>
                                                                </tr>
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
                                                    <div className="tap2dropdown">
                                                        <div className="time_dropdown_wrapper">
                                                            <button className="time_dropdown_btn" onClick={() => this.setState({ showTimeSlotFrom: !this.state.showTimeSlotFrom, showTimeSlot: false })}>{this.state.showtimeFrom}</button>
                                                            {this.state.showTimeSlotFrom && <ul>
                                                                <li onClick={() => this.selectedFromTime(1, '9:00 AM')}>9:00 AM</li>
                                                                <li onClick={() => this.selectedFromTime(2, '9:30 AM')}>9:30 AM</li>
                                                                <li onClick={() => this.selectedFromTime(3, '10:00 AM')}>10:00 AM</li>
                                                                <li onClick={() => this.selectedFromTime(4, '10:30 AM')}>10:30 AM</li>
                                                                <li onClick={() => this.selectedFromTime(5, '11:00 AM')}>11:00 AM</li>
                                                                <li onClick={() => this.selectedFromTime(6, '11:30 AM')}>11:30 AM</li>
                                                                <li onClick={() => this.selectedFromTime(7, '12:00 PM')}>12:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(8, '12:30 PM')}>12:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(9, '1:00 PM')}>1:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(10, '1:30 PM')}>1:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(11, '2:00 PM')}>2:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(12, '2:30 PM')}>2:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(13, '3:00 PM')}>3:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(14, '3:30 PM')}>3:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(15, '4:00 PM')}>4:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(16, '4:30 PM')}>4:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(17, '5:00 PM')}>5:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(18, '5:30 PM')}>5:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(19, '6:00 PM')}>6:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(20, '6:30 PM')}>6:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(21, '7:00 PM')}>7:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(22, '7:30 PM')}>7:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(23, '8:00 PM')}>8:00 PM</li>
                                                                <li onClick={() => this.selectedFromTime(24, '8:30 PM')}>8:30 PM</li>
                                                                <li onClick={() => this.selectedFromTime(25, '9:00 PM')}>9:00 PM</li>
                                                            </ul>}
                                                        </div>
                                                        <span className="to-text">to</span>
                                                        <div className="time_dropdown_wrapper">
                                                            <button className="time_dropdown_btn" onClick={() => this.setState({ showTimeSlot: !this.state.showTimeSlot, showTimeSlotFrom: false })}>{this.state.showtimeTo}</button>
                                                            {this.state.showTimeSlot && <ul>
                                                                <li onClick={() => this.selectedToTime(1, '9:00 AM')} disabled={this.state.timeFrom < 1 ? false : true}>9:00 AM</li>
                                                                <li onClick={() => this.selectedToTime(2, '9:30 AM')}>9:30 AM</li>
                                                                <li onClick={() => this.selectedToTime(3, '10:00 AM')}>10:00 AM</li>
                                                                <li onClick={() => this.selectedToTime(4, '10:30 AM')}>10:30 AM</li>
                                                                <li onClick={() => this.selectedToTime(5, '11:00 AM')}>11:00 AM</li>
                                                                <li onClick={() => this.selectedToTime(6, '11:30 AM')}>11:30 AM</li>
                                                                <li onClick={() => this.selectedToTime(7, '12:00 PM')}>12:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(8, '12:30 PM')}>12:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(9, '1:00 PM')}>1:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(10, '1:30 PM')}>1:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(11, '2:00 PM')}>2:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(12, '2:30 PM')}>2:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(13, '3:00 PM')}>3:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(14, '3:30 PM')}>3:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(15, '4:00 PM')}>4:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(16, '4:30 PM')}>4:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(17, '5:00 PM')}>5:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(18, '5:30 PM')}>5:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(19, '6:00 PM')}>6:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(20, '6:30 PM')}>6:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(21, '7:00 PM')}>7:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(22, '7:30 PM')}>7:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(23, '8:00 PM')}>8:00 PM</li>
                                                                <li onClick={() => this.selectedToTime(24, '8:30 PM')}>8:30 PM</li>
                                                                <li onClick={() => this.selectedToTime(25, '9:00 PM')}>9:00 PM</li>
                                                            </ul>}
                                                        </div>
                                                        <div className="time_dropdown_wrapper w-auto am-pm_dropdown_wrapper">
                                                            <button className="time_dropdown_btn w-auto" onClick={() => this.setState({ showTime: !this.state.showTime })}>AM</button>
                                                            {this.state.showTime && <ul className="h-auto w-auto">
                                                                <li>AM</li>
                                                                <li>PM</li>
                                                            </ul>}
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        popperPlacement="right"
                                                    />
                                                    <br />
                                                    <div className="clearfix superadmin-editretro-date-content">
                                                        <div className="float-left">
                                                            <input type="checkbox" id="check1" hidden />
                                                            <label for="check1"></label>
                                                        </div>
                                                        <div className="float-left">
                                                            <span>Reapeats every</span>
                                                        </div>
                                                        <div className="float-left">
                                                            <div className="time_dropdown_wrapper w-auto ">
                                                                <button className="time_dropdown_btn w-auto" onClick={() => this.setState({ showWeek: !this.state.showWeek })}>2Weeks</button>
                                                                {this.state.showWeek && <ul className="h-auto w-auto">
                                                                    <li>Week</li>
                                                                    <li>2Weeks</li>
                                                                    <li>3Weeks</li>
                                                                    <li>4Weeks</li>
                                                                </ul>}
                                                            </div>
                                                        </div>
                                                        <div className="float-left">
                                                            <span>on Mondays, Ending on</span>
                                                        </div>
                                                        <DatePicker
                                                            popperPlacement="right" //when date is changed
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>


                                <div className="save-retro">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button type="button" name="button" className="btn save-btn saveBtn" >Save Retro</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default superadmineditretro;