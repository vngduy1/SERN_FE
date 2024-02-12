import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashCode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleUser();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  checkValidInput = () => {
    let check = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        check = false;
        alert("Missing", +arrInput[i]);
        break;
      }
    }
    return check;
  };

  handleEditUser = () => {
    let isValid = this.checkValidInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        size="lg"
        className="modal-user-container"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container mt-2">
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, "email")}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container mt-2">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => this.handleOnChangeInput(e, "password")}
                value={this.state.password}
                disabled
              />
            </div>
            <div className="input-container mt-2">
              <label>First name</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container mt-2">
              <label>Last name</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container mt-2 max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              this.handleEditUser();
            }}
            className="px-3 btn-btn-save"
          >
            save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
