import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import bv1 from "../../../assets/BV/bv1.svg";
import bv2 from "../../../assets/BV/bv2.svg";
import bv3 from "../../../assets/BV/bv3.svg";
import bv4 from "../../../assets/BV/bv4.svg";
import bv5 from "../../../assets/BV/bv5.svg";

class GoodDoctor extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cơ sở y tế nổi bật</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="specialty-customize">
                  <img
                    className="doctorImage"
                    src={bv1}
                    alt="bv1"
                    height={260}
                    width="80%"
                  />
                  <div className="position text-center">
                    <div>Giáo sư </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="specialty-customize">
                  <img
                    className="doctorImage"
                    src={bv2}
                    alt="bv2"
                    height={260}
                    width="80%"
                  />
                  <div className="position text-center">
                    <div>Giáo sư </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="specialty-customize">
                  <img
                    className="doctorImage"
                    src={bv3}
                    alt="bv3"
                    height={260}
                    width="80%"
                  />
                  <div className="position text-center">
                    <div>Giáo sư </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="specialty-customize">
                  <img
                    className="doctorImage"
                    src={bv4}
                    alt="bv1"
                    height={260}
                    width="80%"
                  />
                  <div className="position text-center">
                    <div>Giáo sư </div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
                <div className="specialty-customize">
                  <img
                    className="doctorImage"
                    src={bv5}
                    alt="bv1"
                    height={260}
                    width="80%"
                  />
                  <div className="position text-center">
                    <div>Giáo sư </div>
                    <div>Cơ xương khớp</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GoodDoctor);
