import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FileDropZone from "../dropzone";
import ClassroomActions from "../../actions/classroom";
import UploadActions from "../../actions/upload";

import M from "materialize-css";
import $ from "jquery";

export class ClassworkItem extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      redirect: false,
      to: "",
      classwork: [
        {
          id: "1",
          title: "Assignment 1",
          type: "assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "2",
          title: "Test 1",
          type: "test",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "3",
          title: "Exercise 2",
          type: "test",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "4",
          title: "Chapter 6",
          type: "material",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "5",
          title: "Assignment 2",
          type: "assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "6",
          title: "Exercise 1",
          type: "test",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "7",
          title: "Assignment 1",
          type: "assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "8",
          title: "Chapter 3 & 4",
          type: "material",
          due: "18 May",
          posted: "18 May",
        },
      ],
    };
    this.get_classwork.bind(this);
    this.handleSendAssignment.bind(this);
    this.handleSendMaterial.bind(this);
    this.handleSendTest.bind(this);
    this.handleMatValidation.bind(this);
    this.handleTestValidation.bind(this);
    this.handleAssignValidation.bind(this);
    this.handleFileClear.bind(this);
    this.onChange.bind(this);
  }
  componentDidMount() {
    this.get_classwork();
  }
  get_classwork = async () => {
    const id = "1";
    await this.props.get_all_classwork(id);
  };
  handleDeleteItem(id) {
    let classwork = [];
    for (const item of this.state.classwork) {
      if (item.id === id) {
        console.log(item);
      } else {
        classwork.push(item);
      }
    }
    this.setState({
      classwork,
    });
  }
  handleMatValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["mat_title"]) {
      formIsValid = false;
      errors["mat_title"] = "Cannot be empty!";
    }
    /***
     *  if (typeof fields["mat_title"] !== "undefined") {
      if (!fields["mat_title"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["mat_title"] = "Only letters!";
      }
    }
     */

    //Email
    /**if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty!";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
     * 
     */
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleTestValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["test_title"]) {
      formIsValid = false;
      errors["test_title"] = "Cannot be empty!";
    }

    if (!fields["test_duration"]) {
      formIsValid = false;
      errors["test_duration"] = "Cannot be empty!";
    }

    if (typeof fields["test_duration"] !== "undefined") {
      if (!fields["test_duration"].match(/^\d+$/)) {
        formIsValid = false;
        errors["test_duration"] = "Only Numbers!";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleAssignValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["assign_title"]) {
      formIsValid = false;
      errors["assign_title"] = "Cannot be empty!";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSendMaterial = async (e) => {
    e.preventDefault();
    let data = {
      classid: 0,
      teacherid: 0,
      schoolid: 0,
      materialname: this.state.mat_title,
      materialtype: "png",
      file: true,
      type: "material",
      due: "",
      posted: new Date().toISOString(),
      duration: "",
    };
    if (this.handleMatValidation()) {
      await this.props.post_new_classroom_material(data);
      this.upload();
    } else {
      M.toast({
        html: "Form has errors!",
        classes: "red accent-2",
      });
    }
  };
  handleSendTest = async (e) => {
    e.preventDefault();
    let data = {
      classid: 0,
      teacherid: 0,
      schoolid: 0,
      file: true,
      type: "test",
      due:
        $("#test_due").val() === undefined || $("#test_due").val() === ""
          ? ""
          : new Date($("#test_due").val()).toISOString(),
      posted: new Date().toISOString(),
      duration: this.state.test_duration,
    };
    if (this.handleTestValidation()) {
      await this.props.post_new_classroom_material(data);
      this.upload();
    } else if ($("#test_due").val() === undefined || $("#test_due").val() === "") {
      M.toast({
        html: "Please enter due date!",
        classes: "red accent-2",
      });
    } else {
      M.toast({
        html: "Form has errors!",
        classes: "red accent-2",
      });
    }
  };
  handleSendAssignment = async (e) => {
    console.log($("#assign_due").val());
    e.preventDefault();
    let data = {
      classid: 0,
      teacherid: 0,
      schoolid: 0,
      materialname: this.state.assign_title,
      type: "assignment",
      due:
        $("#assign_due").val() === undefined || $("#assign_due").val() === ""
          ? ""
          : new Date($("#assign_due").val()).toISOString(),
      posted: new Date().toISOString(),
      duration: "",
    };
    if (this.handleAssignValidation()) {
      await this.props.post_new_classroom_material(data);
      this.upload();
    } else if (
      $("#assign_due").val() === undefined ||
      $("#assign_due").val() === ""
    ) {
      M.toast({
        html: "Please enter due date!",
        classes: "red accent-2",
      });
    } else {
      M.toast({
        html: "Form has errors!",
        classes: "red accent-2",
      });
    }
  };
  upload = async () => {
    await this.props.uploadFile(this.props.uploadState.fileToUpload);
    M.toast({
      html: "Form submiting.....!",
      classes: "green accent-3",
    });
  };
  onChange = (event) => {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
  };
  handleFileClear = () => {
    this.props.fileClear();
  };
  render() {
    return (
      <ul
        id="task-card1"
        className="collection task-card"
        style={{ display: "block", marginTop: "3%" }}
      >
        {this.state.classwork.map((cw, i) => {
          let cl = "";
          if (cw.type === "material") {
            return (
              <li key={cw.id} className="collection-item ">
                <label>
                  {cw.title}
                  <Link to="" className="secondary-content">
                    <span className="ultra-small">Posted {cw.posted}</span>
                  </Link>
                </label>
                <span className="task-cat cyan">{cw.type}</span>
                <label className="right">
                  <span>
                    <i
                      className="material-icons remove-content"
                      data-id={cw.id}
                      onClick={() => {
                        this.handleDeleteItem(cw.id);
                      }}
                    >
                      delete_forever
                    </i>
                  </span>
                </label>
              </li>
            );
          }
          if (cw.type === "assignment") {
            cl = "teal accent-4";
          } else {
            cl = "red accent-2";
          }
          return (
            <li key={cw.id} className="collection-item">
              <label>
                {cw.title}
                <Link to="" className="secondary-content">
                  <span className="ultra-small">Due {cw.due}</span>
                </Link>
              </label>
              <span className={`task-cat ${cl}`}>{cw.type}</span>
              <label className="right">
                <span>
                  <i
                    onClick={() => this.handleDeleteItem(cw.id)}
                    data-id={cw.id}
                    className="material-icons remove-content"
                  >
                    delete_forever
                  </i>
                </span>
              </label>
            </li>
          );
        })}
        <div id="modal1" className="modal" style={{ overflowY: "hidden" }}>
          <div className="modal-content">
            <h4 className="header2">Add Course Material</h4>
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s7">
                    <input
                      className="validate"
                      id="mat_title"
                      name="mat_title"
                      onChange={this.onChange}
                      type="text"
                    ></input>
                    <span className="red-text">
                      {this.state.errors["mat_title"]}
                    </span>
                    <label htmlFor="mat_title">Title</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <FileDropZone input_id="file1" />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <button
                      onClick={this.handleSendMaterial}
                      className={
                        this.props.uploadState.fileToUpload.status === 1
                          ? "btn file-upload waves-effect waves-light right green accent-3 modal-close"
                          : "btn file-upload waves-effect waves-light right gradient-45deg-light-blue-cyan"
                      }
                    >
                      {this.props.uploadState.fileToUpload.status === 1
                        ? "Done"
                        : "Submit"}
                      <i className="material-icons right">
                        {this.props.uploadState.fileToUpload.status === 1
                          ? "done"
                          : "send"}
                      </i>
                    </button>
                    <button
                      onClick={this.handleFileClear}
                      className="btn file-upload red accent-2 modal-close waves-effect waves-light right"
                    >
                      Cancel
                      <i className="material-icons right">cancel</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="modal2" className="modal" style={{ overflowY: "hidden" }}>
          <div className="modal-content">
            <h4 className="header2">Add Test/Exercise</h4>
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s4">
                    <input
                      className="validate"
                      id="test_title"
                      name="test_title"
                      onChange={this.onChange}
                      type="text"
                    ></input>
                    <span className="red-text">
                      {this.state.errors["test_title"]}
                    </span>
                    <label htmlFor="test_title">Title</label>
                  </div>
                  <div className="input-field col s4">
                    <input
                      className="validate datepicker"
                      type="text"
                      name="test_due"
                      id="test_due"
                      onChange={() => this.onChange()}
                    ></input>
                    <span className="red-text">
                      {this.state.errors["test_due"]}
                    </span>
                    <label htmlFor="test_due">Due</label>
                  </div>
                  <div className="input-field col s4">
                    <input
                      className="validate"
                      id="test_duration"
                      name="test_duration"
                      onChange={this.onChange}
                      type="number"
                      min="0"
                      max="420"
                    ></input>
                    <span className="red-text">
                      {this.state.errors["test_duration"]}
                    </span>
                    <label htmlFor="test_duration">Duration(mins)</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <FileDropZone input_id="file2" />
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <button
                        onClick={this.handleSendTest}
                        type="submit"
                        className={
                          this.props.uploadState.fileToUpload.status === 1
                            ? "btn file-upload waves-effect waves-light right green accent-3 modal-close"
                            : "btn file-upload waves-effect waves-light right gradient-45deg-light-blue-cyan"
                        }
                      >
                        {this.props.uploadState.fileToUpload.status === 1
                          ? "Done"
                          : "Submit"}
                        <i className="material-icons right">
                          {this.props.uploadState.fileToUpload.status === 1
                            ? "done"
                            : "send"}
                        </i>
                      </button>
                      <button
                        onClick={this.handleFileClear}
                        className="btn file-upload red accent-2 modal-close waves-effect waves-light right"
                      >
                        Cancel
                        <i className="material-icons right">cancel</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="modal3" className="modal" style={{ overflowY: "hidden" }}>
          <div className="modal-content">
            <h4 className="header2">Add Assignment</h4>
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s4">
                    <input
                      className="validate"
                      id="assign_title"
                      name="assign_title"
                      onChange={this.onChange}
                      type="text"
                    ></input>
                    <span className="red-text">
                      {this.state.errors["assign_title"]}
                    </span>
                    <label htmlFor="assign_title">Title</label>
                  </div>
                  <div className="input-field col s4">
                    <input
                      className="validate datepicker"
                      type="text"
                      name="assign_due"
                      id="assign_due"
                      onChange={this.onChange}
                    ></input>
                    <span className="red-text">
                      {this.state.errors["assign_due"]}
                    </span>
                    <label htmlFor="assign_due">Due</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <FileDropZone input_id="file3" />
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <button
                        onClick={this.handleSendAssignment}
                        type="submit"
                        className={
                          this.props.uploadState.fileToUpload.status === 1
                            ? "btn file-upload waves-effect waves-light right green accent-3 modal-close"
                            : "btn file-upload waves-effect waves-light right gradient-45deg-light-blue-cyan"
                        }
                      >
                        {this.props.uploadState.fileToUpload.status === 1
                          ? "Done"
                          : "Submit"}
                        <i className="material-icons right">
                          {this.props.uploadState.fileToUpload.status === 1
                            ? "done"
                            : "send"}
                        </i>
                      </button>
                      <button
                        onClick={this.handleFileClear}
                        className="btn file-upload red accent-2 modal-close waves-effect waves-light right"
                      >
                        Cancel
                        <i className="material-icons right">cancel</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  adminState: state.admin,
  classroomState: state.classroom,
  uploadState: state.upload,
});

const mapDispatchToProps = Object.assign({}, ClassroomActions, UploadActions);

export default connect(mapStateToProps, mapDispatchToProps)(ClassworkItem);
