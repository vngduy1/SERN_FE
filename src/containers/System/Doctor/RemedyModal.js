import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Modal, Button, ModalBody, ModalFooter } from "reactstrap";
// import { FormattedMessage } from "react-intl";
// import _ from "lodash";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
// import { toast } from "react-toastify";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnchangeEmail = (email) => {
    this.setState({
      email: email.target.value,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { isOpenModal, closeRemedyModal } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        className="remedy-modal-container"
        size="md"
        centered
        toggle={closeRemedyModal}
      >
        <div className="modal-header">
          <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
          <button type="button" className="close" aria-label="close">
            <span aria-hidden="true" onClick={closeRemedyModal}>
              X
            </span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email Bệnh nhân</label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={(event) => this.handleOnchangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chọn file đơn thuốc</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(event) => this.handleOnchangeImage(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSendRemedy()}>
            Gửi
          </Button>
          <Button color="secondary" onClick={closeRemedyModal}>
            Hủy
          </Button>
        </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
