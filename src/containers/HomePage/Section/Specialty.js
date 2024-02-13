import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    return (
      <>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title-section">Chuyên khoa phổ biến</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="specialty-body">
              <Slider {...settings}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
