import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import FileDropZone from "../dropzone";
import $ from "jquery";
import M from "materialize-css";
import Footer from "../footer";
import Header from "../header";

export class StudentAssignmentScreen extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      classwork: [
        {
          id: "1",
          student: "Student Name",
          title: "Assignment 1",
          type: "Assignment",
          marked: false,
          download: true,
          upload: false,
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "5",
          student: "Student Name",
          title: "Assignment 2",
          type: "Assignment",
          marked: false,
          download: true,
          upload: false,
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "7",
          student: "Student Name",
          title: "Assignment 1",
          type: "Assignment",
          marked: false,
          download: true,
          upload: false,
          due: "18 May",
          posted: "18 May",
        },
      ],
    };
    this.removeMaterialHandler.bind(this);
    this.removeItemHandler.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }
  removeMaterialHandler = () => {
    $(".remove-content").css({
      display: "block",
    });
  };
  removeItemHandler = () => {};
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <aside id="left-sidebar-nav">
              <SideBar/>

              <Link
                to=""
                data-target="slide-out"
                className="sidebar-collapse dropdown-triger waves-effect waves-block waves-light hide-on-large-only"
              >
                <i className="material-icons">format_indent_increase</i>
              </Link>
            </aside>
            <section id="content">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{ position: "fixed"}}
                >
                  <div className="nav-content">
                    <Link
                      to="#"
                      style={{ marginTop: "3%", marginBottom: "1%" }}
                      className="brand-logo"
                    >
                      Assignments
                    </Link>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="row" style={{ paddingTop: "7%", width: "90%" }}>
                  <div className="col s12">
                    <ul
                      id="task-card1"
                      className="collection task-card"
                      style={{ display: "block", marginTop: "3%" }}
                    >
                      {this.state.classwork.map((cw) => (
                        <li key={cw.id} className="collection-item">
                          <label>
                            {cw.student}
                            <span> {cw.title}</span>
                            <Link to="#" className="secondary-content">
                              <span className="ultra-small">Due {cw.due}</span>
                            </Link>
                          </label>
                          <span className={`task-cat teal accent-4`}>
                            {cw.type}
                          </span>
                          <label className="right">
                            <div
                              className={`left marked  ${
                                cw.marked === true ? "display-block" : ""
                              }`}
                            >
                              <input
                                defaultChecked={true}
                                type="checkbox"
                                disabled
                              />
                              <span>Marked</span>
                            </div>
                            <a
                              target={"_blank"}
                              href="http://material.doc_path"
                              rel="noopener noreferrer"
                              className={`left download ${
                                cw.download === true ? "display-block" : ""
                              }`}
                            >
                              <i className="material-icons black-text">
                                file_download
                              </i>
                            </a>
                            <a
                              href="#/"
                              rel="noopener noreferrer"
                              onClick={console.log("upload")}
                              data-target="uploadFile"
                              className={`left upload modal-trigger ${
                                cw.upload === true ? "display-block" : ""
                              }`}
                            >
                              <i className="material-icons black-text">
                                file_upload
                              </i>
                            </a>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                id="uploadFile"
                className="modal"
                style={{ overflowY: "hidden" }}
              >
                <div className="modal-content">
                  <h4 className="header2">Marked Assignment</h4>
                  <div className="row">
                    <div className="col s12">
                      <div className="row">
                        <div className="input-field col s4">
                          <input id="student" type="text"></input>
                          <label htmlFor="student">Student Name</label>
                        </div>
                        <div className="input-field col s4">
                          <input id="avg" type="text"></input>
                          <label htmlFor="avg">Average</label>
                        </div>
                        <div className="input-field col s4">
                          <input id="grade" type="text"></input>
                          <label htmlFor="grade">Grade</label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12">
                          <FileDropZone />
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentAssignmentScreen);
