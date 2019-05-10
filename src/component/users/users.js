import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './users.css';

import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HeaderComponent from './../../commonComponent/header';
import FooterComponent from './../../commonComponent/footer';
import Sidebar from '../../commonComponent/sidebar/Sidebar';
import Modal from 'react-responsive-modal';
import { getAllUserListing, usersListRes, deleteUserFromList, getUserPageCount, userPageCountRes ,getAccountInfoDetail,accountInfoDetailRes} from './../../actions/userActions';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersorttype: 'desc',
            searching: '',
            loaderState: false,
            open: false,
            DeleteId :'',
            AccountInfo:[],
            planInfo:[],
            isArchive:false,
            isGuest: false,
            companyId:''
        }
        this.deletUserList = this.deletUserList.bind(this);
    }

    descsort(a, b) {

        if (a.firstName > b.firstName)
            return -1;
        if (a.firstName < b.firstName)
            return 1;
        return 0;
    }

    ascsort(a, b) {

        if (a.firstName < b.firstName)
            return -1;
        if (a.firstName > b.firstName)
            return 1;
        return 0;
    }

    shortuserdata() {
        if (this.state.usersorttype === "desc") {
            this.setState({ alluser: this.state.alluser.sort(this.ascsort) })
        } else {
            this.setState({ alluser: this.state.alluser.sort(this.descsort) })
        }
        if (this.state.usersorttype === "desc") {
            this.setState({ usersorttype: "asc" })
        } else {
            this.setState({ usersorttype: "desc" })
        }
    }

    searchString(e) {
        this.setState({
            searching: e.target.value,
        }, () => {
            console.log(this.state.searching)
        })
    }

    componentWillMount() {
        var data = localStorage.getItem('logindata');
        var userdata = JSON.parse(data);
        console.log(userdata.companyId)
        if(userdata){
            this.setState({
                companyId: userdata.companyId
            },()=>{
                this.fetchUserListing();

            })
        }
       

        let sendReques1={"operationName":null,"variables":{},"query":"{\n  adminUserBar(companyId: \""+userdata.companyId+"\") {\n    id\n    companyAdminCount\n    retroAdminCount\n    retroAdminCount\n    registeredAttendesCount\n    guestCount\n    amount\n    companyName\n    currentPlanId\n    planInfo\n    user {\n      id\n      email\n    }\n  }\n}\n"}
        this.props.loadAccountInfoDetails(sendReques1)
        
    }

    fetchUserListing(){
            let sendRequest={
                "operationName":null,
                "variables":{},
                "query":"{\n  fetchUserByCompanyId(companyId: \""+this.state.companyId+"\", isGuest: \""+this.state.isGuest.toString()+"\", hideArchived: \""+this.state.isArchive.toString()+"\") {\n    id\n    email\n    firstName\n    lastName\n    role\n    companyId\n    userStatus\n hideArchived\n }\n}\n"}
            this.props.fetchUserList(sendRequest);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
           
            if(nextProps.accountInfoDetailRes && nextProps.accountInfoDetailRes.data.users && nextProps.accountInfoDetailRes.data.users.data ){
                    if(nextProps.accountInfoDetailRes.data.users.data.adminUserBar){
                        let response=nextProps.accountInfoDetailRes.data.users.data.adminUserBar;
                        console.log(JSON.parse(response.planInfo))
                        this.setState({
                            AccountInfo:response,
                            planInfo:JSON.parse(response.planInfo)
                        },()=>{
                            console.log(this.state.AccountInfo)
                        })
                    }
            }
            if (nextProps.allUserList && nextProps.allUserList.data.users.data) {
                let userList = nextProps.allUserList.data.users.data.fetchUserByCompanyId;
               
                this.setState({
                    alluser: userList,
                    loaderState: false
                })
            }
        }
    }


    deletUserList() {
        this.setState({
            loaderState: true
        })
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  singleUserDelete(id: \"" + this.state.DeleteId  + "\") {\n    id\n    email\n  }\n}\n"
        }

        this.props.deleteUser(sendRequest);
        this.setState({
            loaderState: false
        })
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

    userActivity(user,userStatus){
        this.setState({
            loaderState: true
        })
        let sendRequest={
        "operationName":null,
        "variables":{},
        "query":"mutation {\n  updateUser(id: \""+user.id+"\", userStatus: \""+userStatus+"\") {\n    firstName\n    lastName\n    id\n    userStatus\n    companyName\n    addressLine1\n    addressLine2\n    city\n    state\n    zipCode\n  }\n}\n"}
        console.log(sendRequest)
        this.props.deleteUser(sendRequest);
    }

    archiveActivity(user,archiveStatus){
        this.setState({
            loaderState: true
        })
        let sendRequest={
        "operationName":null,
        "variables":{},
        "query":"mutation {\n  updateUser(id: \""+user.id+"\", hideArchived: \""+archiveStatus+"\") {\n    firstName\n    lastName\n    id\n    userStatus\n    companyName\n    addressLine1\n    addressLine2\n    city\n    state\n    zipCode\n  hideArchived\n }\n}\n"}
        console.log(sendRequest)
        this.props.deleteUser(sendRequest);
    }


    

    changeGuest(){
        this.setState({
            isGuest: !this.state.isGuest,
        },()=>{
            this.fetchUserListing();
        })
    }
    
    changeArchive(){
        this.setState({
            isArchive: !this.state.isArchive
        },()=>{
            this.fetchUserListing();
        })
    }

    render() {
        const { open } = this.state;
        console.log( this.state.alluser)
        let filterData = this.state.searching ? this.state.alluser.filter(row => (row.firstName.toLowerCase() + " " + row.lastName.toLowerCase()).indexOf(this.state.searching.toLowerCase()) > -1) : this.state.alluser;
        
        return (
            <div className="scroll-assist" id="users-page-wrapper">
                <HeaderComponent />
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div className="container-fluid">
                    <div className="maxWidth-1260px">
                        {/* <div className="maxWidth-1260px"> */}
                        <div className="row">

                            {/* Left Side Bar */}
                            <div className="sideBar col-md-3 pl-2-5px">
                                
                                <Sidebar />
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-3 stripcc pr-0"> {/* */}
                                        <div className="stripc mt-0px">
                                            <div className="count1"> {this.state.AccountInfo.companyAdminCount?this.state.AccountInfo.companyAdminCount:0}</div>
                                            <div className="user4"> Company Admins</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc pr-0"> {/* */}
                                        <div className="stripd mt-0px">
                                            <div className="count1"> {this.state.AccountInfo.retroAdminCount?this.state.AccountInfo.retroAdminCount:0}</div>
                                            <div className="user4"> Retro Admins</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc pr-0"> {/* */}
                                        <div className="stripe mt-0px">
                                            <div className="count1"> {this.state.AccountInfo.registeredAttendesCount?this.state.AccountInfo.registeredAttendesCount:0}</div>
                                            <div className="user4"> Registered Attendees</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 stripcc"> {/* */}
                                        <div className="stripg mt-0px">
                                            <div className="count1"> {this.state.AccountInfo.guestCount?this.state.AccountInfo.guestCount:0}</div>
                                            <div className="user4"> Guest Users</div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 striphh"> {/* */}
                                        <div className="striph">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="acuser"> Users <span className="box392">{this.state.alluser?this.state.alluser.length:0}</span> <span className="t32">
                                                    
                                                    {this.state.AccountInfo.retroAdminCount?this.state.AccountInfo.retroAdminCount:0}
                                                        /{this.state.planInfo.maxRetroAdmin?this.state.planInfo.maxRetroAdmin:0}
                                                    </span> <span className="radmin">Retro Admin</span> <a href="/billing" className="upgrade">Upgrade</a></p>
                                                </div>
                                                <div className="col-md-3">
                                                    <p className="hide">
                                                        <input type="checkbox" name="vehicle1" value="Hide Archived" id="hide-archived" className="styled-checkbox hide-checkbox" value={this.state.isArchive} checked={this.state.isArchive} onChange={()=>this.changeArchive()}/>
                                                        <label htmlFor="hide-archived"></label> Hide Archived

                                                        </p>
                                                    <p className="hide">
                                                        <input type="checkbox" name="vehicle1" value="Hide Guest" id="hide-guest" className="styled-checkbox hide-checkbox" value={this.state.isGuest} checked={this.state.isGuest} onChange={()=>this.changeGuest()}/>
                                                        <label htmlFor="hide-guest"></label> Hide Guest
                                                        </p>
                                                </div>
                                                <div className="col-md-3">
                                                 
                                                    <a href="/adduser" className="adduser"><i className="fa fa-plus"></i> Add User</a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="search">
                                                        <input type="text" placeholder="Search Users" className="search-field" value={this.state.searching} onChange={(text) => this.searchString(text)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab">
                                                <table className="table table-borderless users-data-table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">User Name&nbsp;<span className="icon-chevrlet-up handpointer" onClick={(e) => { this.shortuserdata(); }} >({this.state.usersorttype === "asc" ? "↓" : "↑"})</span></th>
                                                            <td scope="col"> Email</td>
                                                            <td scope="col"> User Role</td>
                                                            <td scope="col"> Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(filterData && filterData.length > 0) ? filterData.map((user, index) => {
                                                            return (<tr key={index}>
                                                                <td scope="row">{user.firstName} {user.lastName}</td>
                                                                <td> {user.email}</td>
                                                                <td> {user.role}</td>
                                                                <td className="actions-dropdown">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            Actions
                                                                            </button>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                            <Link className="dropdown-item" to={{ pathname: `/edituser/${user.id}` }} >Edit</Link>
                                                                            <a onClick={() => { this.onOpenModal(user.id) }}
                                                                                className="dropdown-item" >Delete
                                                                            </a>
                                                                            {user.userStatus==="1"&&<a onClick={() => { this.userActivity(user,"0") }}
                                                                                className="dropdown-item" >Enable
                                                                            </a>}
                                                                            {user.userStatus!="1"&&<a onClick={() => { this.userActivity(user,"1") }}
                                                                                className="dropdown-item" >Disable
                                                                            </a>}
                                                                            {user.hideArchived==="true" &&<a onClick={() => { this.archiveActivity(user,"false") }}
                                                                                className="dropdown-item" >Unarchive
                                                                            </a>}
                                                                            {user.hideArchived!=="true" &&<a onClick={() => { this.archiveActivity(user,"true") }}
                                                                                className="dropdown-item" >Archive
                                                                            </a>}


                                                                            
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>);
                                                        },
                                                        ) :
                                                            <tr className="upcoming-list">
                                                                <td colSpan="5" className="text_center">Data Not Found</td>
                                                            </tr>}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
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
                                    <button type="button" data-dismiss="modal" className="btn btn-danger" id="delete" onClick={() => { this.deletUserList() }}>Delete</button>
                                    <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => { this.onCloseModal() }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <FooterComponent />
            </div>
        );
    };
};

Users.propTypes = {
    allUserList: PropTypes.any,
    allUserCountList: PropTypes.any,
    accountInfoDetailRes:PropTypes.any,

};

const mapStateToProps = createStructuredSelector({
    allUserList: usersListRes,
    allUserCountList: userPageCountRes,
    accountInfoDetailRes:accountInfoDetailRes


});

function mapDispatchToProps(dispatch) {
    return {
        fetchUserList: (data) => dispatch(getAllUserListing(data)),
        deleteUser: (data) => dispatch(deleteUserFromList(data)),
        fetchCount: (data) => dispatch(getUserPageCount(data)),
        loadAccountInfoDetails: (data) => dispatch(getAccountInfoDetail(data)),

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Users);
// export default Users;