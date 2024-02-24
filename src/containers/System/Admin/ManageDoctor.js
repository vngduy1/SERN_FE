import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInfoDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: "",
      hasOldData: false,

      //save to doctor_info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfo();
  }

  buildDataInputSelect = (inputData, type) => {
    let { language } = this.props;
    let result = [];

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueEn;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        return result.push(object);
      });
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });

    let response = await getDetailInfoDoctor(selectedDoctor.value);
    if (response && response.errCode === 0 && response.data.Markdown) {
      let markdown = response.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    console.log("check response doctor", response);
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctors({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  render() {
    const {
      selectedDoctor,
      listDoctors,
      hasOldData,
      listPrice,
      listPayment,
      listProvince,
    } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="manage-doctor.create-additional-doctor-information" />
        </div>

        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="manage-doctor.choose-a-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeSelect}
              options={listDoctors}
              placeholder={"Chọn bác sĩ"}
            />
          </div>
          <div className="content-right">
            <label className="">
              <FormattedMessage id="manage-doctor.introductory-information" />
            </label>
            <textarea
              className="form-control"
              value={this.state.description}
              onChange={(event) => this.handleOnChangeDesc(event)}
            />
          </div>
        </div>

        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá</label>
            <Select
              // value={listPrice}
              onChange={this.handleChangeSelect}
              options={listPrice}
              placeholder={"Chọn giá"}
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn phương thức thanh toán</label>
            <Select
              // value={listPayment}
              onChange={this.handleChangeSelect}
              options={listPayment}
              placeholder={"Chọn phương thức thanh toán"}
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn tỉnh thành</label>
            <Select
              // value={listProvince}
              onChange={this.handleChangeSelect}
              options={listProvince}
              placeholder={"Chọn tỉnh thành"}
            />
          </div>
          <div className="col-4 form-group mt-3">
            <label>Tên phòng khám</label>
            <input className="form-control" />
          </div>
          <div className="col-4 form-group mt-3">
            <label>Địa chỉ phòng khám</label>
            <input className="form-control" />
          </div>
          <div className="col-4 form-group mt-3">
            <label>Ghi chú</label>
            <input className="form-control" />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          className={
            hasOldData === true ? "edit-content-doctor" : "save-content-doctor"
          }
          onClick={() => {
            this.handleSaveContentMarkdown();
          }}
        >
          {hasOldData === true ? (
            <FormattedMessage id="manage-doctor.edit-information" />
          ) : (
            <FormattedMessage id="manage-doctor.save-information" />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequiredDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
