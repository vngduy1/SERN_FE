import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.users !== this.props.users) {
      let arrGenders = this.props.genderRedux;
      let arrPosition = this.props.positionRedux;
      let arrRole = this.props.roleRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;

    this.setState({
      isOpen: true,
    });
  };

  onChangeInput = (event, id) => {
    let copyState = {
      ...this.state,
    };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phonenumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }

    this.props.fetchUserRedux();
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";

    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "hashPassword",
      firstName: user.firstName,
      lastName: user.lastName,
      phonenumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      phonenumber,
      address,
      gender,
      position,
      role,
    } = this.state;
    return (
      <>
        <div className="user-redux-container">
          <div className="title text-center">UserRedux DVN</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-12 mt-3">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div>{isLoadingGender === true ? "loading-gender" : ""} </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="email" className="form-label">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(event) => this.onChangeInput(event, "email")}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="password" className="form-label">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(event) => this.onChangeInput(event, "password")}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="firstName" className="form-label">
                    <FormattedMessage id="manage-user.firstName" />
                  </label>
                  <input
                    type="firstName"
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={(event) => this.onChangeInput(event, "firstName")}
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="lastName" className="form-label">
                    <FormattedMessage id="manage-user.lastName" />
                  </label>
                  <input
                    type="lastName"
                    className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={(event) => this.onChangeInput(event, "lastName")}
                  />
                </div>
                <div className="col-12 mt-3">
                  <label htmlFor="address" className="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={(event) => this.onChangeInput(event, "address")}
                  />
                </div>
                <div className="col-md-4 mt-3">
                  <label htmlFor="phonenumber" className="form-label">
                    <FormattedMessage id="manage-user.phonenumber" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phonenumber"
                    value={phonenumber}
                    onChange={(event) =>
                      this.onChangeInput(event, "phonenumber")
                    }
                  />
                </div>
                <div className="col-md-2 mt-3">
                  <label htmlFor="gender" className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "gender");
                    }}
                    value={gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3 mt-3">
                  <label htmlFor="position" className="form-label">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    name="position"
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "position");
                    }}
                    value={position}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3 mt-3">
                  <label htmlFor="roleId" className="form-label">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    name="roleId"
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "role");
                    }}
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-12 mt-3 preview-image-container">
                  <div className="preview-image-update">
                    <label htmlFor="image" className="form-label">
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="previewImg"
                      hidden
                      onChange={(event) => {
                        this.handleOnchangeImage(event);
                      }}
                    />
                    <label
                      htmlFor="previewImg"
                      className="btn btn-outline-primary btn-preview"
                    >
                      <FormattedMessage id="manage-user.update-image" />
                      <i className="fas fa-upload px-2"></i>
                    </label>
                  </div>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => {
                      this.openPreviewImage();
                    }}
                  ></div>
                </div>
                <div className="col-12 my-3">
                  <button
                    type="submit"
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
                <div className="col-12 mb-5">
                  <TableManageUser
                    handleEditUserFromParent={this.handleEditUserFromParent}
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
