import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { getSpecialty } from "../../../services/userService";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: {},
    };
  }

  async componentDidMount() {
    let res = await getSpecialty();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let { dataSpecialty } = this.state;
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.specialty" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div className="specialty-customize" key={index}>
                        <div
                          className="bg-image-specialty"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="bg-image-title">
                          {/* <FormattedMessage id="homepage.musculoskeletal" /> */}
                          {item.name}
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
