import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import FileDropZone from "../dropzone";
import M from "materialize-css";
import Footer from "../footer";
import Header from "../header";
class StudentTestScreen extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      uploadFileId: "",
      to: "",
      classwork: [
        {
          id: "2",
          student: "Student Name",
          title: "Exercise 2",
          type: "Test/Exercise",
          marked: false,
          download: false,
          upload: true,
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "3",
          student: "Student Name",
          title: "Exercise 2",
          type: "Test/Exercise",
          marked: false,
          download: true,
          upload: false,
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "6",
          student: "Student Name",
          title: "Exercise 2",
          type: "Test/Exercise",
          marked: true,
          download: false,
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
  removeMaterialHandler = () => {};
  removeItemHandler = () => {};
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <LeftSidebar />

            <section id="content">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75 image-bg-1"
                  style={{ position: "fixed" }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p
                        style={{
                          padding: "10px",
                          paddingTop: 25,
                          paddingBottom: 25,
                          fontSize: "16px",
                        }}
                      >
                        Students' Classwork
                      </p>
                    </div>
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
                      {this.state.classwork.map((cw, i) => (
                        <li key={cw.id} className="collection-item">
                          <label>
                            {cw.student}
                            <span> {cw.title}</span>
                            <Link to="#" className="secondary-content">
                              <span className="ultra-small">Due {cw.due}</span>
                            </Link>
                          </label>
                          <span className={`task-cat red accent-2`}>
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
                              data-position="bottom"
                              data-tooltip="Download to mark"
                              className={`left tooltipped download ${
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
                              data-position="bottom"
                              data-tooltip="Upload marked file"
                              className={`left tooltipped upload modal-trigger ${
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
                  <h4 className="header2">Marked Test/Exercise</h4>
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
                          <FileDropZone input_id="file1" />
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

            <RightSidebar />
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentTestScreen);
