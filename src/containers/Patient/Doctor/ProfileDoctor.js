import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

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

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataTime.date / 1000)
              .format("dddd - DD/MM/YYYY")
              .toUpperCase()
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} | {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking.free" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      doctorId,
    } = this.props;
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
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description} </span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-doctor">
            <Link
              className="view-detail-doctor-link"
              to={`/detail-doctor/${doctorId}`}
            >
              Xem thêm
            </Link>
          </div>
        )}
        {isShowPrice === true && (
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
        )}
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
