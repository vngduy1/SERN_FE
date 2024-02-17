import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import bv1 from "../../../assets/BV/bv1.svg";
import bv2 from "../../../assets/BV/bv2.svg";
import bv3 from "../../../assets/BV/bv3.svg";
import bv4 from "../../../assets/BV/bv4.svg";
import bv5 from "../../../assets/BV/bv5.svg";
import { FormattedMessage } from "react-intl";

class MedicalFacility extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.outstanding-medical-facilities" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="specialty-customize">
                  <img src={bv1} alt="bv1" height={280} width="96%" />
                  <div>Hệ thống Y tế 1</div>
                </div>
                <div className="specialty-customize">
                  <img src={bv2} alt="bv1" height={280} width="96%" />
                  <div>Hệ thống Y tế 2</div>
                </div>
                <div className="specialty-customize">
                  <img src={bv3} alt="bv1" height={280} width="96%" />
                  <div>Hệ thống Y tế 3</div>
                </div>
                <div className="specialty-customize">
                  <img src={bv4} alt="bv1" height={280} width="96%" />
                  <div>Hệ thống Y tế 4</div>
                </div>
                <div className="specialty-customize">
                  <img src={bv5} alt="bv1" height={280} width="96%" />
                  <div>Hệ thống Y tế 4</div>
                </div>
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
