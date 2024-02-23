import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";

class HandBook extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.handbook" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 1
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 2
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 3
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 4
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 5
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 6
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 7
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 8
                  </div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div className="bg-image-title">
                    <FormattedMessage id="homepage.musculoskeletal" /> 9
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
