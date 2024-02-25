import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
// import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

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
              <ProfileDoctor doctorId={doctorId} />
            </div>
            <div className="row px-2">
              <div className="col-12 form-group mt-2">
                <label>
                  <FormattedMessage id="patient.booking.for-yourself" />
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
                      <FormattedMessage id="patient.booking.set" />
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
                  className="form-control"
                  placeholder={"Họ và tên bệnh nhân (bắt buộc)"}
                />
                <span>
                  <FormattedMessage id="patient.booking.name-text" />
                </span>
              </div>
              <div className="col-12 form-group mt-2">
                <input
                  className="form-control"
                  placeholder={"Số điện thoại liên hệ (bắt buộc)"}
                />
              </div>
              <div className="col-12 form-group mt-2">
                <input
                  className="form-control"
                  placeholder={"Địa chỉ liên hệ (bắt buộc)"}
                />
              </div>
              <div className="col-6 form-group mt-2">
                <label>
                  <FormattedMessage id="patient.booking.gender" />
                </label>
                <input className="form-control" />
              </div>
              <div className="col-12 form-group mt-2 mb-2">
                <label>
                  {" "}
                  <FormattedMessage id="patient.booking.reason-for-examination" />
                </label>
                <textarea className="form-control" />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-confirm">
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
