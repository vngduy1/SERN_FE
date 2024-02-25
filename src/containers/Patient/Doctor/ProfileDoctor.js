import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInfoDoctor = async (id) => {
    let result = "";
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInfoDoctor(this.props.doctorId);
    }
  }

  render() {
    console.log(this.state);
    let { language } = this.props;
    let { dataProfile } = this.state;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ""})`,
            }}
          ></div>
          <div className="content-right">
            <div className="content-right-up">
              {language === LANGUAGES.VI ? nameVi : nameEn}{" "}
            </div>
            <div className="content-right-down">
              {dataProfile &&
                dataProfile.Markdown &&
                dataProfile.Markdown.description && (
                  <span>{dataProfile.Markdown.description} </span>
                )}
            </div>
          </div>
        </div>
        <div className="price">
          <span>
            <FormattedMessage id="patient.extra-info-doctor.price" /> :
          </span>
          {dataProfile && dataProfile.Doctor_Info ? (
            <NumberFormat
              value={
                language === LANGUAGES.VI
                  ? dataProfile.Doctor_Info.priceTypeData.valueVi
                  : dataProfile.Doctor_Info.priceTypeData.valueEn
              }
              displayType="text"
              thousandSeparator=","
              suffix={language === LANGUAGES.VI ? "VND" : "$"}
            />
          ) : (
            ""
          )}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
