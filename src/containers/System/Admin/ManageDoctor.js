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
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          return result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi + " VND";
          let labelEn = item.valueEn + " $";
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          return result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          return result.push(object);
        });
      }
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
    let { resPayment, resPrice, resProvince } =
      this.props.allRequiredDoctorInfo;

    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );

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

  handleChangeSelectDoctorInfo = async (selectedDoctor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
    console.log(selectedDoctor, stateName);
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

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
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
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
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
      selectedPrice,
      selectedPayment,
      selectedProvince,
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
              placeholder={
                <FormattedMessage id="manage-doctor.choose-a-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label className="">
              <FormattedMessage id="manage-doctor.introductory-information" />
            </label>
            <textarea
              className="form-control"
              value={this.state.description}
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
            />
          </div>
        </div>

        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.price" />
            </label>
            <Select
              value={selectedPrice}
              onChange={this.handleChangeSelectDoctorInfo}
              options={listPrice}
              placeholder={<FormattedMessage id="manage-doctor.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.payment" />
            </label>
            <Select
              value={selectedPayment}
              onChange={this.handleChangeSelectDoctorInfo}
              options={listPayment}
              placeholder={<FormattedMessage id="manage-doctor.payment" />}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.province" />
            </label>
            <Select
              value={selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              options={listProvince}
              placeholder={<FormattedMessage id="manage-doctor.province" />}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group mt-3">
            <label>
              <FormattedMessage id="manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              value={this.state.nameClinic}
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
            />
          </div>
          <div className="col-4 form-group mt-3">
            <label>
              <FormattedMessage id="manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              value={this.state.addressClinic}
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
            />
          </div>
          <div className="col-4 form-group mt-3">
            <label>
              <FormattedMessage id="manage-doctor.note" />
            </label>
            <input
              className="form-control"
              value={this.state.note}
              onChange={(event) => this.handleOnChangeText(event, "note")}
            />
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
