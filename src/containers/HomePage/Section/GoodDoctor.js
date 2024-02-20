import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class GoodDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.out-standing-doctor" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                    return (
                      <div
                        className="good_doctor"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div
                          className="good_doctor_img"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        ></div>
                        <div>
                          <div className="position">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div className="good-doctor-title">Cơ xương khớp</div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
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
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GoodDoctor)
);
