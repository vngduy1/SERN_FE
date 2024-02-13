import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <>
        <div className="home-footer">
          <p>
            &copy; 2024
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.youtube.com/watch?v=147SkAVXEqM&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=62"
            >
              More info
            </a>
          </p>
          HomeFooter
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
