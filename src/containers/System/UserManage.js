import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenEditUser: false,
      userEdit: {},
    };
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
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode === 0) {
        await this.getAllUser();
      } else {
        alert(response.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isOpenEditUser: true,
      userEdit: user,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenEditUser: !this.state.isOpenEditUser,
    });
  };

  doEditUser = async (user) => {
    console.log(user);
    try {
      let response = await editUserService(user);
      if (response && response.errCode === 0) {
        this.setState({
          isOpenEditUser: false,
        });
        await this.getAllUser();
      } else {
        alert(response.errCode);
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
        {this.state.isOpenEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenEditUser}
            toggleUser={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
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
                          <button
                            type="button"
                            className="btn-btn-edit"
                            onClick={() => {
                              this.handleEditUser(item);
                            }}
                          >
                            <i className="far fa-edit"></i>
                          </button>
                          <button
                            type="button"
                            className="btn-btn-delete"
                            onClick={() => this.handleDeleteUser(item)}
                          >
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
