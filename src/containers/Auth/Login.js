import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Login.scss";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import { handleLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnchangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnchangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLogin(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        this.redirectToSystemPage();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({ errMessage: error.response.data.message });
        }
      }
    }
  };

  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/system/user-manage";
    navigate(`${redirectPath}`);
  };

  handleShowHidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container container">
          <div className="login-content row">
            <div className="col-12 text-login">
              <h3>Login</h3>
            </div>
            <div className="col-12 form-group">
              <label>User name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Username"
                name=""
                defaultValue={this.state.username}
                onChange={(e) => this.handleOnchangeUsername(e)}
              />
            </div>
            <div className="col-12 form-group mt-3">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  name=""
                  defaultValue={this.state.password}
                  onChange={(e) => this.handleOnchangePassword(e)}
                  onKeyDown={(event) => this.handleOnKeyDown(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 mt-3">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12 mt-3">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or login with</span>
            </div>
            <div className="col-12 social-login">
              <a href="/">
                <i className="fab fa-google google"></i>
              </a>
              <a href="/">
                <i className="fab fa-facebook facebook"></i>
              </a>
              <a href="/">
                <i className="fab fa-github github"></i>
              </a>
              <a href="/">
                <i className="fab fa-twitter twitter"></i>
              </a>
              <a href="/">
                <i className="fab fa-line line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
