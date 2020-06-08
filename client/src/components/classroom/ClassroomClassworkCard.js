import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import $ from "jquery";
import M from "materialize-css";
import { ClassroomService } from "../../services/classroom";
import avatar from "../../assets/images/gallary/not_found.gif";
import Dropzone from "react-dropzone";

//import store from "../../config/store"
class ClassroomClassworkCard extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      user: {},
      classid: 1,
      materials: [],
      assignments: [],
      fileId: "",
    };
    this.removeMaterialHandler.bind(this);
    this.getDashData.bind(this);
    this.onDrop.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user }, () => console.log(this.state.user, this.props));
    this.getDashData();
  }

  removeMaterialHandler = () => {
    $(".remove-content").css({
      display: "inline",
    });
  };
  getDashData = () => {
    ClassroomService.get_assiginments(this.props.teacherState.course.courseId)
      .then((res) => {
        this.setState({ assignments: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
    ClassroomService.get_materials(this.props.teacherState.course.courseId)
      .then((res) => {
        console.log(res.data.data);
        this.setState({ materials: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleSendMaterial = async (event) => {
    event.preventDefault();
    let fileData = this.state.files;
    var data = {
      classid: this.props.teacherState.course.courseId,
      teacherid: this.state.user.userid,
      schoolid: this.state.user.schoolid,
      materialname: event.target.materialname.value,
      file: true,
    };

    ClassroomService.post_new_material(data).then((response) => {
      if (response === undefined) {
        alert("Resource Upload failed");
      } else if (response.err) {
        alert(response.err);
      } else if (response.success === true) {
        const uploadData = new FormData();
        uploadData.append("file", fileData[0].file);
        uploadData.append("uploadType", response.uploadType);
        uploadData.append("uploadType", response.uploadId);

        ClassroomService.post_file(uploadData).then((response) => {
          this.props.get_all_courses(1);
          this.handleFileClear();
        });

        document.getElementById("materialform").reset();
        this.getDashData();
      } else {
        alert(response.message);
      }
    });
  };
  handleSendAssignment = async (event) => {
    event.preventDefault();
    let fileData = this.state.files;
    var data = {
      classid: this.props.teacherState.course.courseId,
      teacherid: this.state.user.userid,
      schoolid: this.state.user.schoolid,
      assignmentname: event.target.assignmentname.value,
      file: true,
    };

    ClassroomService.post_new_assignment(data).then((response) => {
      if (response === undefined) {
        alert("Resource Upload failed");
      } else if (response.err) {
        alert(response.err);
      } else if (response.success === true) {
        const uploadData = new FormData();
        uploadData.append("file", fileData[0].file);
        uploadData.append("uploadType", response.uploadType);
        uploadData.append("uploadType", response.uploadId);

        ClassroomService.post_file(uploadData).then((response) => {
          this.props.get_all_courses(1);
          this.handleFileClear();
        });

        document.getElementById("assignmentform").reset();
        this.getDashData();
      } else {
        alert(response.message);
      }
    });
  };
  onDrop = async (files) => {
    $(".dropify-clear").removeClass("display-none");
    $(".dropify-preview").removeClass("display-none");
    function getExtension(filename) {
      var parts = filename.split(".");
      return parts[parts.length - 1];
    }

    function isValidFile(filename) {
      var ext = getExtension(filename);
      switch (ext.toLowerCase()) {
        case "doc":
          return { isValid: true, icon: "library_books" };
        case "docx":
          return { isValid: true, icon: "library_books" };
        case "pdf":
          return { isValid: true, icon: "library_books" };
        case "epub":
          return { isValid: true, icon: "library_books" };
        case "jpg":
          return { isValid: true, icon: "photo" };
        case "gif":
          return { isValid: true, icon: "photo" };
        case "bmp":
          return { isValid: true, icon: "photo" };
        case "png":
          return { isValid: true, icon: "photo" };
        case "jpeg":
          return { isValid: true, icon: "photo" };
        case "m4v":
          return { isValid: true, icon: "ondemand_video" };
        case "avi":
          return { isValid: true, icon: "ondemand_video" };
        case "mpg":
          return { isValid: true, icon: "ondemand_video" };
        case "mp4":
          return { isValid: true, icon: "ondemand_video" };
        case "mkv":
          return { isValid: true, icon: "ondemand_video" };
        default:
          return { isValid: false, icon: "warning" };
      }
    }

    var file = $(`#${this.state.fileId}`);

    if (isValidFile(file.val()).isValid === false) {
      $(".file-upload").addClass("upload-disabled");
      this.setState({ fileIcon: isValidFile(file.val()).icon });
      return M.toast({
        html: "Fail. Please select valid file type!",
        classes: "red accent-2",
      });
    }
    $(".file-upload").removeClass("upload-disabled");
    this.setState({ fileIcon: isValidFile(file.val()).icon });
    M.toast({
      html: "Success. Valid file type!",
      classes: "green accent-3",
    });
    this.setState({ files });
  };
  render() {
    if (this.props.teacherState.course.courseId === undefined) {
      return <Redirect to="/teacher" />;
    }
    const preview = {
      display: "inline",
    };
    const files = this.state.files.map((file, i) => (
      <li key={i}>
        <p className="dropify-filename">
          <span className="file-icon"></span>
          <span className="dropify-filename-inner">
            {file.name} - {file.size} bytes
          </span>
        </p>
      </li>
    ));
    return (
      <div
        className="row"
        id="task-card1"
        style={{ display: "block", marginTop: "3%" }}
      >
        <div className="col s5">
          <ul className="collection with-header">
            <li className="collection-header">
              <div className="center-align">
                <span
                  className="black-text"
                  style={{ padding: "10px", fontSize: "16px" }}
                >
                  Classroom Assignments
                </span>
              </div>
            </li>
            {this.state.assignments.length < 1 ? (
              <div className="row">
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  No Assignments Found!
                  <br />{" "}
                  <img
                    src={avatar}
                    alt="Avatar"
                    style={{ maxWidth: "100%", maxHeight: "150px" }}
                  ></img>
                </p>
              </div>
            ) : (
              this.state.assignments.map((cm, i) => (
                <li
                  key={i}
                  className="collection-item avatar pointer-event modal-close"
                >
                  <a
                    href={`http://cybers.azurewebsites.net/api/${cm.assignmentname}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`material-icons circle`}>assignment</i>
                    <span className="title">{cm.assignmentname}</span>
                    <p style={{ marginLeft: 15 }}>
                      Due: {cm.status}
                      <br />
                      Posted: {cm.numberofstudents}
                      <br />
                      Descrpition: {cm.enrolmentkey}
                      <br />
                    </p>
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col s5">
          <ul className="collection with-header">
            <li className="collection-header">
              <div className="center-align">
                <span
                  className="black-text"
                  style={{ padding: "10px", fontSize: "16px" }}
                >
                  Classroom Materials
                </span>
              </div>
            </li>
            {this.state.materials.length < 1 ? (
              <div className="row">
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  No Materials Found!
                  <br />{" "}
                  <img
                    src={avatar}
                    alt="Avatar"
                    style={{ maxWidth: "100%", maxHeight: "150px" }}
                  ></img>
                </p>
              </div>
            ) : (
              this.state.materials.map((cm, i) => (
                <li
                  key={i}
                  className="collection-item avatar pointer-event modal-close"
                >
                  <a
                    href={`http://cybers.azurewebsites.net/api/${cm.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`material-icons circle`}>assignment</i>
                    <span className="title">{cm.materialname}</span>
                    <p style={{ marginLeft: 15 }}>
                      Due: {cm.status}
                      <br />
                      Posted: {cm.numberofstudents}
                      <br />
                      Descrpition: {cm.enrolmentkey}
                      <br />
                    </p>
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="col s2">
          <Link
            to="#!"
            className="btn gradient-45deg-light-blue-cyan remove-content right waves-effect"
            data-target="dropdown7"
            style={{ transform: "translate(-200%, 55%)" }}
          >
            Save
            <i className="material-icons">save</i>
          </Link>
          <Link
            to="#!"
            className="dropdown-trigger black-text right waves-effect"
            data-target="dropdown7"
          >
            <i className="material-icons">settings</i>
          </Link>
          <ul
            id="dropdown7"
            className="dropdown-content"
            style={{
              minWidth: "200px",
              whiteSpace: "nowrap",
              opacity: 1,
              display: "none",
            }}
          >
            <li>
              <Link
                to="#!"
                data-target="modal1"
                className="grey-text modal-trigger text-darken-2"
                onClick={() => this.setState({ fileId: "matfile" })}
              >
                <i className="material-icons ">book</i>
                Add Material
              </Link>
            </li>
            <li>
              <Link
                to="#!"
                data-target="modal3"
                className="grey-text modal-trigger text-darken-2"
                onClick={() => this.setState({ fileId: "assignfile" })}
              >
                <i className="material-icons ">assignment</i>
                Add Assignment
              </Link>
            </li>
            <li>
              <Link
                onClick={this.removeMaterialHandler}
                to="#!"
                className="grey-text text-darken-2"
              >
                <i className="material-icons ">delete</i>
                Remove Content
              </Link>
            </li>
          </ul>
        </div>
        <div id="modal1" className="modal" style={{ overflowY: "hidden" }}>
          <div className="modal-content">
            <h4 className="header2">Add Course Material</h4>
            <form
              onSubmit={this.handleSendMaterial}
              id="materialform"
              className="row"
            >
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s5">
                    <input
                      className="validate"
                      id="materialname"
                      name="materialname"
                      type="text"
                    ></input>
                    <label htmlFor="materialname">Material Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section className="container">
                          <div className="dropify-wrapper" {...getRootProps()}>
                            <div className="dropify-message">
                              {" "}
                              <p>Drag and drop a file here or click</p>
                            </div>
                            <input
                              id="matfile"
                              name="file"
                              {...getInputProps()}
                            ></input>
                            <button
                              className="dropify-clear display-none"
                              onClick={this.handleFileClear}
                              style={this.state.files.length > 0 ? preview : {}}
                            >
                              Remove
                            </button>
                            <div
                              className="dropify-preview display-none"
                              style={this.state.files.length > 0 ? preview : {}}
                            >
                              <span className="dropify-render">
                                <i
                                  className="file-icon material-icons large"
                                  style={
                                    this.state.files.length > 0 ? preview : {}
                                  }
                                >
                                  {this.state.fileIcon}
                                </i>
                              </span>
                              <div className="dropify-infos">
                                <ul className="dropify-infos-inner">{files}</ul>
                              </div>
                            </div>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button
                      type="submit"
                      className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                    >
                      Submit
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div id="modal3" className="modal" style={{ overflowY: "hidden" }}>
          <div className="modal-content">
            <h4 className="header2">Add Assignment</h4>
            <form
              onSubmit={this.handleSendAssignment}
              id="assignmentform"
              className="row"
            >
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s5">
                    <input
                      className="validate"
                      id="assignmentname"
                      name="assignmentname"
                      type="text"
                    ></input>
                    <label htmlFor="assignmentname">Assignment Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section className="container">
                          <div className="dropify-wrapper" {...getRootProps()}>
                            <div className="dropify-message">
                              {" "}
                              <p>Drag and drop a file here or click</p>
                            </div>
                            <input
                              id="assignfile"
                              name="file"
                              {...getInputProps()}
                            ></input>
                            <button
                              className="dropify-clear display-none"
                              onClick={this.handleFileClear}
                              style={this.state.files.length > 0 ? preview : {}}
                            >
                              Remove
                            </button>
                            <div
                              className="dropify-preview display-none"
                              style={this.state.files.length > 0 ? preview : {}}
                            >
                              <span className="dropify-render">
                                <i
                                  className="file-icon material-icons large"
                                  style={
                                    this.state.files.length > 0 ? preview : {}
                                  }
                                >
                                  {this.state.fileIcon}
                                </i>
                              </span>
                              <div className="dropify-infos">
                                <ul className="dropify-infos-inner">{files}</ul>
                              </div>
                            </div>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button
                      type="submit"
                      className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                    >
                      Submit
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  teacherState: state.teacher,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomClassworkCard);
