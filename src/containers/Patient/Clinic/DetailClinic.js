import React, { Component } from "react";
import { connect } from "react-redux";
// import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailClinicById,
  // getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let response = await getDetailClinicById({
        id: id,
      });

      if (response && response.errCode === 0) {
        let data = response.data;
        let arrDoctorId = [];
        console.log("check", data);
        if (data && !_.isEmpty(response.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: response.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    console.log(dataDetailClinic);
    // const { language } = this.props;
    console.log(this.state);
    return (
      <div className="detail-clinic-container">
        <HomeHeader />
        <div className="clinic-body">
          <div className="description-clinic">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div className="clinic-title">{dataDetailClinic.name} </div>
                <div
                  className="clinic-text"
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                />
              </>
            )}
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="content-clinic-left">
                    <div>
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                        //   dataTime={dataTime}
                      />
                    </div>
                  </div>
                  <div className="content-clinic-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule detailDoctor={item} />
                    </div>
                    <div className="doctor-extra-info">
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
