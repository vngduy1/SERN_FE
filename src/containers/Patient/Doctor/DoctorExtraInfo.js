import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { getExtraInfoDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let response = await getExtraInfoDoctorById(
        this.props.doctorIdFromParent
      );
      if (response && response.errCode === 0) {
        this.setState({
          extraInfo: response.data,
        });
      }
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    let { language } = this.props;
    console.log(this.state);
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-info-doctor.address-clinic" />
          </div>
          <div className="nameClinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false ? (
            <div className="title-up">
              <FormattedMessage id="patient.extra-info-doctor.price" />:
              {extraInfo &&
              extraInfo.priceTypeData &&
              extraInfo.priceTypeData.valueVi ? (
                <NumberFormat
                  value={
                    language === LANGUAGES.VI
                      ? extraInfo.priceTypeData.valueVi
                      : extraInfo.priceTypeData.valueEn
                  }
                  displayType="text"
                  thousandSeparator=","
                  suffix={language === LANGUAGES.VI ? "VND" : "$"}
                />
              ) : (
                ""
              )}
              <span onClick={() => this.showHideDetailInfo(true)}>
                <FormattedMessage id="patient.extra-info-doctor.more-price" />{" "}
                <i className="fas fa-chevron-down"></i>
              </span>
            </div>
          ) : (
            <div className="title-down">
              <div className="title-price">
                <FormattedMessage id="patient.extra-info-doctor.price" />
              </div>
              <div className="detail-info">
                <div className="detail-price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-info-doctor.price" />
                  </span>
                  <span className="right">
                    {extraInfo &&
                    extraInfo.priceTypeData &&
                    extraInfo.priceTypeData.valueVi ? (
                      <NumberFormat
                        value={
                          language === LANGUAGES.VI
                            ? extraInfo.priceTypeData.valueVi
                            : extraInfo.priceTypeData.valueEn
                        }
                        displayType="text"
                        thousandSeparator=","
                        suffix={language === LANGUAGES.VI ? "VND" : "$"}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div className="note">
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extra-info-doctor.payment" /> :
                {extraInfo && extraInfo.paymentTypeData ? (
                  <span>
                    {language === LANGUAGES.VI
                      ? extraInfo.paymentTypeData.valueVi
                      : extraInfo.paymentTypeData.valueEn}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfo(false)}>
                  <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                  <i className="fas fa-chevron-up"></i>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
