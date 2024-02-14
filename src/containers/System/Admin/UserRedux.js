import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        this.setState({
          genderArr: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    return (
      <>
        <div className="user-redux-container">
          <div className="title text-center">UserRedux DVN</div>
          <div className="user-redux-body">
            <div className="container">
              <form className="row">
                <div className="col-12 mt-3">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="email" className="form-label">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input type="email" className="form-control" name="email" />
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="password" className="form-label">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
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
                  />
                </div>
                <div className="col-12 mt-3">
                  <label htmlFor="address" className="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input type="text" className="form-control" name="address" />
                </div>
                <div className="col-md-4 mt-3">
                  <label htmlFor="phonenumber" className="form-label">
                    <FormattedMessage id="manage-user.phonenumber" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phonenumber"
                  />
                </div>
                <div className="col-md-2 mt-3">
                  <label htmlFor="gender" className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select className="form-control">
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index}>
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
                  <select name="position" className="form-select">
                    <option type="1">None</option>
                    <option type="2">Master</option>
                    <option type="3">Doctor</option>
                    <option type="4">Professor</option>
                  </select>
                </div>
                <div className="col-md-3 mt-3">
                  <label htmlFor="roleId" className="form-label">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select name="roleId" className="form-select">
                    <option type="1">Admin</option>
                    <option type="2">Doctor</option>
                    <option type="3">Patient</option>
                  </select>
                </div>
                <div className="col-12 mt-3">
                  <label htmlFor="image" className="form-label">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <input type="url" className="form-control" name="image" />
                </div>
                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-primary">
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
