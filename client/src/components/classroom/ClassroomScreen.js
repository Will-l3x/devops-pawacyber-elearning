import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import FileDropZone from "../dropzone";
import $ from "jquery";
import M from "materialize-css";

import { ClassroomClassworkCard } from "./ClassroomClassworkCard";
import ClassroomStudentsCard from "./ClassroomStudentsCard";
import { ClassroomCourseCard } from "./ClassroomCourseCard";
import { ClassroomStudentAssessment } from "./ClassroomStudentAssessment";
import store from "../../config/store";
import Footer from "../footer";
import Header from "../header";

export class ClassroomScreen extends Component {
  constructor() {
    super();
    this.removeItemHandler.bind(this);
    this.removeMaterialHandler.bind(this);
    this.handleSendAssignment.bind(this);
    this.handleSendMaterial.bind(this);
    this.handleSendTest.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }

  removeMaterialHandler = () => {
    $(".remove-content").css({
      display: "inline",
    });
  };
  removeItemHandler = () => {};
  handleSendMaterial = () => {
    const files = store.getState().fileUpload;
    const file = files.files[0];
    let data = new FormData();

    file.details = {
      title: $("#mat-title").val(),
      type: "Assignment",
      due: "",
      posted: new Date().toISOString(),
      duration: "",
    };

    data.append("files", file, file.name);
  };
  handleSendTest = () => {
    const files = store.getState().fileUpload;
    const file = files.files[0];
    let data = new FormData();

    file.details = {
      title: $("#test-title").val(),
      type: "Test/Exercise",
      due: new Date($("#test-due").val()).toISOString(),
      posted: new Date().toISOString(),
      duration: $("#test-duration").val(),
    };

    data.append("files", file, file.name);
  };
  handleSendAssignment = () => {
    const files = store.getState().fileUpload;
    const file = files.files[0];
    let data = new FormData();

    file.details = {
      title: $("assign-title"),
      type: "Assignment",
      due: new Date($("#assign-due").val()).toISOString(),
      posted: new Date().toISOString(),
      duration: "",
    };

    data.append("files", file, file.name);
  };
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar />

            <section id="content">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{ position: "fixed" }}
                >
                  <div className="nav-content">
                    <Link to="#" className="brand-logo">
                      Classroom
                    </Link>
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
                      style={{ transform: "translate(-80%, 20%)" }}
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
                        >
                          <i className="material-icons ">book</i>
                          Add Material
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#!"
                          data-target="modal2"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">description</i>
                          Test/Exercise
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#!"
                          data-target="modal3"
                          className="grey-text modal-trigger text-darken-2"
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
                    <ul className="tabs">
                      <li className="tab col s3">
                        <a
                          className="active cyan-text"
                          rel="noopener noreferer"
                          href="#task-card1"
                        >
                          Classwork
                        </a>
                      </li>
                      <li className="tab col s3">
                        <a
                          className="cyan-text"
                          rel="noopener noreferer"
                          href="#task-card2"
                        >
                          Students
                        </a>
                      </li>
                      <li className="tab col s3">
                        <a
                          className="cyan-text"
                          rel="noopener noreferer"
                          href="#task-card3"
                        >
                          Course Content
                        </a>
                      </li>
                      <li className="tab col s3">
                        <a
                          className="cyan-text"
                          rel="noopener noreferer"
                          href="#task-card4"
                        >
                          Assessment
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="row" style={{ paddingTop: 85, width: "90%" }}>
                  <ClassroomClassworkCard />
                  <ClassroomStudentsCard />
                  <ClassroomCourseCard />
                  <ClassroomStudentAssessment />
                </div>
              </div>
              <div
                id="modal1"
                className="modal"
                style={{ overflowY: "hidden" }}
              >
                <div className="modal-content">
                  <h4 className="header2">Add Course Material</h4>
                  <div className="row">
                    <div className="col s12">
                      <div className="row">
                        <div className="input-field col s7">
                          <input id="mat-title" type="text"></input>
                          <label htmlFor="mat-title">Title</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <FileDropZone />
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12">
                          <button
                            onClick={this.handleSendMaterial}
                            className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                          >
                            Submit
                            <i className="material-icons right">send</i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="modal2"
                className="modal"
                style={{ overflowY: "hidden" }}
              >
                <div className="modal-content">
                  <h4 className="header2">Add Test/Exercise</h4>
                  <div className="row">
                    <div className="col s12">
                      <div className="row">
                        <div className="input-field col s4">
                          <input id="test-title" type="text"></input>
                          <label htmlFor="test-title">Title</label>
                        </div>
                        <div className="input-field col s4">
                          <input
                            type="text"
                            name="test-due_date"
                            id="test-due_date"
                            className="datepicker"
                          ></input>
                          <label htmlFor="test-due_date">Due</label>
                        </div>
                        <div className="input-field col s4">
                          <input
                            id="test-duration"
                            type="number"
                            min="0"
                            max="420"
                          ></input>
                          <label htmlFor="test-duration">Duration(mins)</label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12">
                          <FileDropZone />
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <button
                              onClick={this.handleSendTest}
                              className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                            >
                              Submit
                              <i className="material-icons right">send</i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="modal3"
                className="modal"
                style={{ overflowY: "hidden" }}
              >
                <div className="modal-content">
                  <h4 className="header2">Add Assignment</h4>
                  <div className="row">
                    <div className="col s12">
                      <div className="row">
                        <div className="input-field col s4">
                          <input id="assign-title" type="text"></input>
                          <label htmlFor="assign-title">Title</label>
                        </div>
                        <div className="input-field col s4">
                          <input
                            type="text"
                            name="due_date"
                            id="assign-due_date"
                            className="datepicker"
                          ></input>
                          <label htmlFor="assign-due_date">Due</label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12">
                          <FileDropZone />
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <button
                              onClick={this.handleSendAssignment}
                              className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                            >
                              Submit
                              <i className="material-icons right">send</i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  files: state.fileUpload,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScreen);
