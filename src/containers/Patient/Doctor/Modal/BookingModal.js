import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
    };
  }

  componentDidMount() {
    this.props.getGender();
  }

  buildDataGender = (data) => {
    let { language } = this.props;
    let result = [];

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        return result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
          : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
      return name;
    }
    return "";
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataTime.date / 1000)
              .format("dddd - DD/MM/YYYY")
              .toUpperCase()
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return <></>;
  };

  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a successFully");
      this.props.isClose();
    } else {
      toast.error("Booking error!!!");
    }
  };

  render() {
    let { isOpen, isClose, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    return (
      <Modal
        isOpen={isOpen}
        className="booking-modal-container"
        size="lg"
        centered
        toggle={isClose}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking.booking-info" />
            </span>
            <span className="right" onClick={isClose}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-info">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
              />
            </div>
            <div className="row px-2">
              <div className="col-12 form-group mt-2">
                <label>
                  <FormattedMessage id="patient.booking.set" />
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      <FormattedMessage id="patient.booking.for-yourself" />
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      <FormattedMessage id="patient.booking.others" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 form-group mt-2">
                <input
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "fullName")
                  }
                  className="form-control"
                  placeholder={"Họ và tên bệnh nhân (bắt buộc)"}
                />
                <span>
                  <FormattedMessage id="patient.booking.name-text" />
                </span>
              </div>
              <div className="col-12 form-group mt-2">
                <input
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "phoneNumber")
                  }
                  className="form-control"
                  placeholder={"Số điện thoại liên hệ (bắt buộc)"}
                />
              </div>
              <div className="col-12 form-group mt-2">
                <input
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeInput(event, "email")}
                  className="form-control"
                  placeholder={"Hộp thư điện tử (bắt buộc)"}
                />
              </div>
              <div className="col-12 form-group mt-2">
                <input
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "address")
                  }
                  className="form-control"
                  placeholder={"Địa chỉ liên hệ (bắt buộc)"}
                />
              </div>
              <div className="col-6 form-group mt-2">
                <label>
                  <FormattedMessage id="patient.booking.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                />
              </div>
              <div className="col-6 form-group mt-2">
                <label>
                  <FormattedMessage id="patient.booking.birthday" />
                </label>
                <DatePicker
                  value={this.state.birthday}
                  className="form-control"
                  onChange={this.handleOnchangeDatePicker}
                />
              </div>
              <div className="col-12 form-group mt-2 mb-2">
                <label>
                  <FormattedMessage id="patient.booking.reason-for-examination" />
                </label>
                <textarea
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "reason")
                  }
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking.confirm" />
            </button>
            <button className="btn-booking-cancel" onClick={isClose}>
              <FormattedMessage id="patient.booking.cancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
