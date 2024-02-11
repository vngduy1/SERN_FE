import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUser, createNewUserService } from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = { arrUsers: [], isOpenModalUser: false };
  }

  /**Life cycle
   * Chạy construct -> init state
   * Did mount- sét giá trị của các biến trước khi in ra màn hình
   * Render
   *
   */

  async componentDidMount() {
    await this.getAllUser();
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  getAllUser = async () => {
    let response = await getAllUser("ALL");
    if (response) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUser();
        this.setState({
          isOpenModalUser: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleUser={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <div className="container">
          <div className="mt-3">
            <div className="title text-center">manage</div>
            <div className="">
              <button
                className="btn btn-primary px-3"
                onClick={() => this.handleAddNewUser()}
              >
                <i className="fas fa-plus-circle m-2"></i>
                Add new user
              </button>
            </div>
            <table className="table table-striped mt-3" id="customers">
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
