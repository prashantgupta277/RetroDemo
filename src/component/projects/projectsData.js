import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProject, getAllProjectsRes, deleteSpecificProject } from './../../actions/createRetroAction';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import Modal from 'react-responsive-modal';

const getProjectRequest = {
    "operationName": null,
    "variables": {},
    "query": "{\n  getAllProject {\n    id\n    projectName\n retroCount\n   updatedAt\n   createdAt\n  createdBy {\n      id\n      lastName\n      firstName\n      email\n    }\n  }\n}\n"
}


class ProjectsData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            loaderState: false,
            projectsorttype: 'dec',
            DeleteId:"",
            open: false
        }
    }

    componentWillMount() {
        this.props.fetchAllProjects(getProjectRequest);
        this.setState({
            loaderState: true
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.projectList && nextProps.projectList.data.projectList.data) {
                console.log(nextProps.projectList.data.projectList.data.getAllProject);

                let tempData = [];
                for (let items of nextProps.projectList.data.projectList.data.getAllProject) {
                    if (items) {
                        items.createdAt = moment(new Date(items.createdAt)).format('MMM D, YYYY     hh:mm a')
                        tempData.push(items)
                    }
                }
                this.setState({
                    projectList: tempData,
                    loaderState: false
                })
            }
        }
    }

    shortuserdata() {
        if (this.state.projectsorttype === "desc") {
            this.setState({ projectList: this.state.projectList.sort(this.ascsort) })
        } else {
            this.setState({ projectList: this.state.projectList.sort(this.descsort) })
        }
        if (this.state.projectsorttype === "desc") {
            // this.state.projectsorttype = "asc";
            this.setState({ projectsorttype: "asc"})
        } else {
            this.setState({ projectsorttype: "desc"})

            // this.state.projectsorttype = "desc";
        }
    }

    descsort(a, b) {

        if (a.projectName > b.projectName)
            return -1;
        if (a.projectName < b.projectName)
            return 1;
        return 0;
    }

    ascsort(a, b) {

        if (a.projectName < b.projectName)
            return -1;
        if (a.projectName > b.projectName)
            return 1;
        return 0;
    }

    deleteProj() {
        this.setState({
            loaderState: true
        })
        let sendRequest = {
            "operationName": null,
            "variables": {},
            "query": "mutation {\n  deleteProject(id: \"" + this.state.DeleteId + "\") {\n    id\n  }\n}\n"
        }
        console.log(sendRequest)
        this.props.deleteProjects(sendRequest)
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

    render() {
        const { open } = this.state;
        return (
            <React.Fragment>
                <div className={this.state.loaderState ? "loaderParentB" : "loaderParentA"}  >
                    <div className={this.state.loaderState ? "loader" : ""}></div>
                </div>
                <div id="userList" className="infoCard pt-2 pb-2 pl-3 pr-3 projects_page_content">
                    <div className="edit-user-page-retros-header">
                        <h4 className="text-db-blue projects_page_title">Projects</h4>
                    </div>
                    <div className="tab">
                        <table className="table table-borderless projects_data_table">
                            <thead>
                                <tr>
                                    <th scope="col">Projects Name&nbsp;<span className="icon-chevrlet-up handpointer" onClick={(e) => { this.shortuserdata(); }} >({this.state.projectsorttype == "asc" ? "↓" : "↑"})</span></th>
                                    {/* <th scope="col" className="down_arrow">Projects Name</th> */}
                                    <th scope="col" className="fw-n text-lg-grey"> Created By</th>
                                    <th scope="col" className="fw-n text-lg-grey"> Date Added</th>
                                    <th scope="col" className="fw-n text-lg-grey"> # of Retros</th>
                                    <th scope="col" className="fw-n text-lg-grey"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(this.state.projectList && this.state.projectList.length > 0) ? this.state.projectList.map((project, index) => {
                                    return (<tr key={index}>
                                        <td scope="row">{project.projectName}</td>
                                        <td> {project.createdBy.email}</td>
                                        <td> {project.createdAt}</td>
                                        <td> {project.retroCount}</td>
                                        <td className="actions-dropdown">
                                            <div className="dropdown">
                                                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Actions
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" onClick={() => { this.onOpenModal(project.id) }}>Delete</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>);
                                },

                                ) :
                                    <tr className="upcoming-list">
                                        <td colSpan="5" className="text_center">Data Not Found</td></tr>}
                            </tbody>
                        </table>
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
                                    <button type="button" data-dismiss="modal" className="btn btn-danger" id="delete" onClick={() => { this.deleteProj() }}>Delete</button>
                                    <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => { this.onCloseModal() }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}


ProjectsData.propTypes = {
    handleFormSubmit: PropTypes.func,
    projectList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    projectList: getAllProjectsRes,
});

function mapDispatchToProps(dispatch) {
    return {
        fetchAllProjects: (data) => dispatch(getAllProject(data)),
        deleteProjects: (data) => dispatch(deleteSpecificProject(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProjectsData);

// export default ProjectsData;