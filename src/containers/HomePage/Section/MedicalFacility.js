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
  constructor(props) {
    super(props);
    this.state = {
      isSystemVisible: true,
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount = () => {
    if (window.innerWidth <= 600) {
      this.setState({
        isSystemVisible: false,
      });
    } else {
      this.setState({
        isSystemVisible: true,
      });
    }
  };

  render() {
    let { isSystemVisible } = this.state;
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
                  <div className="specialty-customize-title">
                    <FormattedMessage id="homepage.health-system" /> 1
                  </div>
                </div>
                <div className="specialty-customize">
                  <img src={bv2} alt="bv1" height={280} width="96%" />
                  <div className="specialty-customize-title">
                    <FormattedMessage id="homepage.health-system" /> 2
                  </div>
                </div>
                <div className="specialty-customize">
                  <img src={bv3} alt="bv1" height={280} width="96%" />
                  <div className="specialty-customize-title">
                    <FormattedMessage id="homepage.health-system" /> 3
                  </div>
                </div>
                {isSystemVisible && (
                  <div className="specialty-customize">
                    <img src={bv5} alt="bv1" height={280} width="96%" />
                    <div className="specialty-customize-title">
                      <FormattedMessage id="homepage.health-system" /> 4
                    </div>
                  </div>
                )}

                <div className="specialty-customize">
                  <img src={bv4} alt="bv1" height={280} width="96%" />
                  <div className="specialty-customize-title">
                    <FormattedMessage id="homepage.health-system" /> 5
                  </div>
                </div>

                <div className="specialty-customize">
                  <img src={bv4} alt="bv1" height={280} width="96%" />
                  <div className="specialty-customize-title">
                    <FormattedMessage id="homepage.health-system" /> 6
                  </div>
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
