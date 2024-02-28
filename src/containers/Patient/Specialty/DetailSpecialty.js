import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let response = await getDetailSpecialtyById({
        id: id,
        location: "ALL",
      });
      let resProvince = await getAllCodeService("PROVINCE");

      if (response && response.errCode === 0) {
        let data = response.data;
        let arrDoctorId = [];
        if (
          data &&
          !_.isEmpty(response.data) &&
          resProvince &&
          resProvince.errCode === 0
        ) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          });
        }

        this.setState({
          dataDetailSpecialty: response.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handOnchangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let response = await getDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (response && response.errCode === 0) {
        let data = response.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(response.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: response.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };

  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    const { language } = this.props;
    console.log(this.state);
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="specialty-body">
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              />
            )}
          </div>
          <div className="search-doctor-specialty col-4 mt-3">
            <select
              className="form-select"
              onChange={(event) => this.handOnchangeSelect(event)}
            >
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option
                      className="sds-option"
                      key={index}
                      value={item.keyMap}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="content-specialty-left">
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
                  <div className="content-specialty-right">
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
