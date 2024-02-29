import React, { Component } from "react";
import { connect } from "react-redux";
// import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
    };
  }

  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formattedDate);
  }

  getDataPatient = async (user, formattedDate) => {
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formattedDate);
      }
    );
  };

  render() {
    let { currentDate, dataPatient } = this.state;
    console.log(this.state);
    return (
      <div className="manage-patient-container">
        <div className="manage-patient-title">
          <FormattedMessage id="menu.doctor.manage-patient" />
        </div>
        <div className="manage-patient-body row">
          <div className="col-3 mt-3 form-group">
            <label>Chọn ngày khám</label>
            <DatePicker
              onChange={this.handleOnchangeDatePicker}
              className="form-control"
              value={currentDate}
            />
          </div>
          <div className="col-12 mt-3 table-manage-patient">
            <table>
              <thead>
                <tr>
                  <th>T</th>
                  <th>Thời gian</th>
                  <th>Họ và tên</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    console.log(item);
                    return (
                      <tr key={index}>
                        <td> {index + 1} </td>
                        <td>{item.timeTypeDataPatient.valueVi} </td>
                        <td>{item.patientData.firstName} </td>
                        <td>{item.patientData.address} </td>
                        <td>{item.patientData.genderData.valueVi} </td>
                        <td>
                          <button
                            className="mp-btn-confirm"
                            onClick={() => this.handleBtnConfirm()}
                          >
                            Xác nhận
                          </button>
                          <button
                            className="mp-btn-remedy"
                            onClick={() => this.handleBtnRemedy()}
                          >
                            Gửi hóa đơn
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>Hiện tại không có lịch khám bệnh</>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
