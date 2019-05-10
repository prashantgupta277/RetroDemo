import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAllUserListing ,usersListRes} from './../../actions/userActions';

/* eslint-disable react/prefer-stateless-function */
class UserData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
    
    }

    componentWillReceiveProps(nextProps){
    
    }

  render() {
    return (
      <React.Fragment>           
          <div id="userList" className="infoCard pt-2 pb-2 pl-3 pr-3 "> 
                <div className="tab">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col" className="down_arrow">User Name</th>
                                <th scope="col"> Email</th>
                                <th scope="col"> User Role</th>
                                <th scope="col"> Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row"> Ann Egg Veal</td>
                                <td> ann.veal@thebluthcompany.com</td>
                                <td> Retro Admin</td>
                                <td> Active</td>
                                <td className="actions-dropdown">
                                    <div className="dropdown">
                                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Actions
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="/edituser">Edit</a>
                                            <a className="dropdown-item">Archive</a>
                                            <a className="dropdown-item">Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row"> Ann Egg Veal</td>
                                <td> ann.veal@thebluthcompany.com</td>
                                <td> Retro Admin</td>
                                <td> Active</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td scope="row"> Ann Egg Veal</td>
                                <td> ann.veal@thebluthcompany.com</td>
                                <td> Retro Admin</td>
                                <td> Active</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td scope="row"> Ann Egg Veal</td>
                                <td> ann.veal@thebluthcompany.com</td>
                                <td> Retro Admin</td>
                                <td> Active</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td scope="row"> Ann Egg Veal</td>
                                <td> ann.veal@thebluthcompany.com</td>
                                <td> Retro Admin</td>
                                <td> Active</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td scope="row"> Ann Egg Veal</td>
                                <td> ann.veal@thebluthcompany.com</td>
                                <td> Retro Admin</td>
                                <td> Active</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td scope="row"> Ann Egg Veal</td>
                                <td> ann.veal@thebluthcompany.com</td>
                                <td> Retro Admin</td>
                                <td> Active</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td scope="row"> Ann Egg Veal</td>
                                <td> ann.veal@thebluthcompany.com</td>
                                <td> Retro Admin</td>
                                <td> Active</td>
                                <td></td>
                            </tr>                            
                        </tbody>
                    </table>
                    <div>
                          <nav aria-label="navigation">
                            <ul class="pagination justify-content-center">
                                <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1">&#8249;</a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                <a class="page-link" href="#">&#8250;</a>
                                </li>
                            </ul>
                            </nav>
                          </div>
                </div>
                    </div>              
         </React.Fragment>
    );
  }
}

UserData.propTypes = {
    allUserList: PropTypes.any,

};

const mapStateToProps = createStructuredSelector({
    allUserList:usersListRes

});
    
function mapDispatchToProps(dispatch) {
    return {
        fetchUserList: (data) => dispatch(getAllUserListing(data)),
    };
}
    
const withConnect = connect(mapStateToProps, mapDispatchToProps);
                
export default compose(withConnect)(UserData);


// export default UserData;