import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-about-header">
            Truyền thông nói về gì về DVN
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="420px"
                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Tôi là một sinh viên đang theo học ở một trường đại học. Hiện
                tại, tôi đang chú trọng vào việc học một ngành nghề cụ thể, đó
                là [tên ngành nghề của bạn], với sự đam mê và tò mò về [mô tả về
                lĩnh vực bạn quan tâm].
              </p>
              <p>
                Trong quá trình học tập, tôi thường xuyên tìm kiếm cơ hội học
                hỏi mới, và tận dụng những dự án thực tế để áp dụng kiến thức đã
                học vào thực tế. Điều này giúp tôi không chỉ hiểu sâu hơn về chủ
                đề mà còn phát triển kỹ năng thực tế trong lĩnh vực ngành nghề
                của mình.
              </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
