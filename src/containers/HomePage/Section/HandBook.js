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
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp 2</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp 3</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp 4</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp 5</div>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp 6</div>
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
