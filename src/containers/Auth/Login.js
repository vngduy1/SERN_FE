import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Login.scss";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "DVN",
      password: "1111",
      isShowPassword: false,
    };
  }

  handleOnchangeUsername = (e) => {
    this.setState({
      username: e.target.defaultValue,
    });
  };

  handleOnchangePassword = (e) => {
    this.setState({
      password: e.target.defaultValue,
    });
  };

  handleLogin = () => {
    console.log(
      "username: ",
      this.state.username,
      " password: ",
      this.state.password
    );
    console.log("all state", this.state);
  };

  handleShowHidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
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
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
