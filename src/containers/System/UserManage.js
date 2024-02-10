import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUser } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = { arrUsers: [] };
  }

  async componentDidMount() {
    let response = await getAllUser("ALL");
    if (response) {
      this.setState({
        arrUsers: response.users,
      });
      console.log("check state user 1", this.state.arrUsers);
    }
  }

  /**Life cycle
   * Chạy construct -> init state
   * Did mount- sét giá trị của các biến trước khi in ra màn hình
   * Render
   *
   */

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="container">
          <div className="row mt-3">
            <div className="title text-center">manage</div>
            <table className="table table-striped" id="customers">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">email</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button type="button" className="btn-btn-edit">
                            <i className="far fa-edit"></i>
                          </button>
                          <button type="button" className="btn-btn-delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
