import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: [],
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let response = await getDetailInfoDoctor(id);
      if (response && response.errCode === 0) {
        this.setState({
          detailDoctor: response.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    return (
      <React.Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{ backgroundImage: `url(${detailDoctor.image})` }}
            ></div>
            <div className="content-right">
              <div className="content-right-up">
                {language === LANGUAGES.VI ? nameVi : nameEn}{" "}
              </div>
              <div className="content-right-down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description} </span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule detailDoctor={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfo
                doctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-info-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                />
              )}
          </div>
          <div className="comment-info-doctor"></div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
