import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        userRedux: this.props.users,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let arrUsers = this.state.userRedux;
    return (
      <React.Fragment>
        <table className="table table-striped mt-3" id="tableManageUser">
          <thead>
            <tr>
              <th scope="col">
                <FormattedMessage id="manage-user.email" />
              </th>
              <th scope="col">
                <FormattedMessage id="manage-user.firstName" />
              </th>
              <th scope="col">
                <FormattedMessage id="manage-user.lastName" />
              </th>
              <th scope="col">
                <FormattedMessage id="manage-user.address" />
              </th>
              <th scope="col">
                <FormattedMessage id="manage-user.action" />
              </th>
            </tr>
          </thead>
          <tbody>
            {arrUsers &&
              arrUsers.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-btn-edit"
                        onClick={() => {
                          this.handleEditUser(item);
                        }}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        type="button"
                        className="btn-btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
