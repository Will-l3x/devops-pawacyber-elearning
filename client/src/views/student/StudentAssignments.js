import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import Footer from "../../components/footer";
import M from "materialize-css";
import Header from "../../components/header";

import { StudentService } from "../../services/student";
import { UploadService } from "../../services/upload";

class StudentAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: [],
      courses: [],
      submitFor: "",
    };
  }

  componentDidMount() {
    this.assignmentData();
  }
  user = {};

  download(resource) {
    alert(resource.file);
    var data = {
      file: resource.file,
    };
    StudentService.download(data).then((response) => {
      try {
        window.open(URL.createObjectURL(response));
      } catch (error) {
        console.log(error);
      }
    });
  }

  assignmentData() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.studentData = JSON.parse(localStorage.getItem("userAll"));
    console.log(this.studentData);

    localStorage.setItem(
      "registrationData",
      JSON.stringify({ gradeid: this.studentData.gradeid })
    );

    StudentService.get_all_courses(this.studentData.studentId) // by student id
      .then((response) => {
        const courses = [];
        var assignments = [];
        const assTemp = [];
        const del_courses = [];
        for (const course of response) {
          if (course.status === "deleted") {
            del_courses.push(course);
          } else {
            courses.push(course);
          }
        }

        this.setState({ courses, del_courses });
        for (const sub of response) {
          this.courseId = sub.classId;

          StudentService.get_student_all_classwork(this.courseId) // by course id
            .then((response) => {
              const content = [];
              const corruptContent = [];

              for (const material of response) {
                if (!material.file.includes("materials")) {
                  corruptContent.push(material);
                } else {
                  content.push(material);
                }
              }

              this.setState({ assignment: content });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  assignmentCategory = "ALL ASSIGNMENTS";
  status = "All";

  selectCategory(category, stat) {
    this.assignmentCategory = category;
    this.status = stat;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.studentData = JSON.parse(localStorage.getItem("userAll"));

    var uploadCount = 0;
    var targetLength = event.target.fileUpload.files.length;

    var assigmentUploaded = this.state.submitFor;

    M.toast({
      html: `Assignment ${assigmentUploaded.assignmentname} upload in progress`,
      classes: "green ",
    });

    for (var i = 0; i < event.target.fileUpload.files.length; i++) {
      this.fileUpload = event.target.fileUpload.files[i];
      var data = {
        studentid: this.studentData.studentId,
        schoolid: this.studentData.schoolid,
        grade: this.studentData.gradeid,
        materialname: this.fileUpload.name,
        materialtype: "file",
        file: true,
        classid: assigmentUploaded.assignmentId,
        assid: assigmentUploaded.teacherid,
        teacherid: assigmentUploaded.teacherid,
        obj: "Assignment",
      };

      StudentService.submit_assignment(data).then((response) => {
        if (response === undefined) {
          M.toast({
            html: "Assignment Upload failed",
            classes: "red",
          });
        } else if (response.err) {
          M.toast({
            html: response.err,
            classes: "red",
          });
        } else if (response.success === true) {
          const uploadData = new FormData();
          uploadData.append("", this.fileUpload);
          uploadData.append("uploadType", response.uploadType);
          uploadData.append("uploadId", response.uploadId);

          UploadService.upload(uploadData).then((resp) => {
            if (resp.success === true) {
              uploadCount += 1;
              if (uploadCount === targetLength) {
                M.toast({
                  html:
                    uploadCount +
                    " out of " +
                    targetLength +
                    " assignment(s) uploaded ...",
                  classes: "green",
                });

                this.componentDidMount();
                M.toast({
                  html: "Upload Successful",
                  classes: "green ",
                });
              } else {
                M.toast({
                  html:
                    uploadCount +
                    " out of " +
                    targetLength +
                    " assignment(s) uploaded ...",
                  classes: "green",
                });
              }
            } else {
              M.toast({
                html: "Failed to upload Assignment: " + resp.message,
                classes: "red ",
              });
            }
          });
        } else {
          M.toast({
            html: response.message,
            classes: "red",
          });
        }
      });
    }
  };

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <LeftSidebar />

            <section id="content">
              <div className="container">
                <div style={{ marginTop: "15px" }}>
                  <div id="card-widgets">
                    <div className="row">
                      <div className="col s12 m2 l3">
                        <div className="column">
                          <ul className="task-card collection with-header">
                            <li className={`collection-header teal `}>
                              <p className="task-card-title">ASSIGNMENTS</p>
                            </li>
                            <li className="collection-item dismissable">
                              <label htmlFor="task1">
                                All Assignments
                                <Link
                                  to="#"
                                  onClick={() =>
                                    this.selectCategory(
                                      "ALL ASSIGNMENTS",
                                      "All"
                                    )
                                  }
                                  className="secondary-content"
                                >
                                  <span className="ultra-small">VIEW</span>
                                </Link>
                              </label>
                            </li>

                            <li className="collection-item dismissable">
                              <label htmlFor="task1">
                                Submitted Assignments
                                <Link
                                  to="#"
                                  onClick={() =>
                                    this.selectCategory(
                                      "Submitted Assignments",
                                      "Submitted"
                                    )
                                  }
                                  className="secondary-content"
                                >
                                  <span className="ultra-small">VIEW</span>
                                </Link>
                              </label>
                            </li>
                            <li className="collection-item dismissable">
                              <label htmlFor="task1">
                                Submit New Assignment
                                <Link
                                  to="#"
                                  onClick={() =>
                                    this.selectCategory(
                                      "Submit New Assignment",
                                      "All"
                                    )
                                  }
                                  className="secondary-content"
                                >
                                  <span className="ultra-small">Submit</span>
                                </Link>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col s12 m13 l9">
                        <div className="task-card collection with-header">
                          <div className="collection-header teal">
                            <p
                              className="task-card-title"
                              style={{ color: "white" }}
                            >
                              {this.assignmentCategory}
                            </p>
                          </div>
                          <div
                            className="row mt-1"
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {this.state.assignment.map((assigment, i) => {
                              if (this.status === "All") {
                                return (
                                  <div key={i} className="col s12 m8 l4">
                                    <div
                                      className="card min-height-100 white-text designed-dots"
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <div className="padding-4">
                                        <div className="col s12 m12">
                                          <p
                                            className="no-margin"
                                            style={{ color: "teal" }}
                                          >
                                            <b>
                                              {assigment.assignmentname}
                                              <br />
                                              Subject :{" "}
                                              {
                                                this.state.courses.find(
                                                  (course) =>
                                                    course.classId ===
                                                    assigment.classid
                                                ).classname
                                              }
                                            </b>
                                          </p>

                                          <p
                                            className={
                                              assigment.assignmentstatus ===
                                              "Pending"
                                                ? "red"
                                                : "gradient-45deg-light-blue-cyan"
                                            }
                                            style={{
                                              paddingLeft: "5px",
                                              color: "white",
                                            }}
                                          >
                                            Submission Date: {assigment.duedate}
                                          </p>
                                        </div>
                                        <div
                                          className="right-align"
                                          style={{
                                            marginTop: "70px",
                                            color: "black",
                                          }}
                                        >
                                          <p className="no-margin">
                                            {this.assignmentCategory ===
                                            "Submit New Assignment" ? (
                                              <a
                                                data-target="modaladd"
                                                className="modal-trigger tooltipped waves-effect right"
                                                data-tooltip="New Upload"
                                                data-position="bottom"
                                                onClick={() => {
                                                  console.log(assigment);
                                                  this.setState({
                                                    submitFor: assigment,
                                                  });
                                                }}
                                              >
                                                UPLOAD NOW
                                              </a>
                                            ) : (
                                              <a
                                                onClick={() =>
                                                  this.download(assigment)
                                                }
                                              >
                                                DOWNLOAD
                                              </a>
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                if (
                                  assigment.assignmentStatus === this.status
                                ) {
                                  return (
                                    <div key={i} className="col s12 m8 l4">
                                      <div
                                        className="card min-height-100 white-text designed-dots"
                                        style={{ borderRadius: "5px" }}
                                      >
                                        <div className="padding-4">
                                          <div className="col s12 m12">
                                            <p
                                              className="no-margin"
                                              style={{ color: "teal" }}
                                            >
                                              <b>
                                                {assigment.assignmentname}
                                                <br />
                                                Subject :{" "}
                                                {
                                                  this.state.courses.find(
                                                    (course) =>
                                                      course.classId ===
                                                      assigment.classid
                                                  ).classname
                                                }
                                              </b>
                                            </p>
                                            <p
                                              className="no-margin"
                                              style={{
                                                fontSize: "12px",
                                                color: "grey",
                                              }}
                                            >
                                              {assigment.duedate}
                                            </p>
                                            <p
                                              className={
                                                assigment.assignmentstatus ===
                                                "Pending"
                                                  ? "red"
                                                  : "gradient-45deg-light-blue-cyan"
                                              }
                                              style={{
                                                paddingLeft: "5px",
                                                color: "white",
                                              }}
                                            >
                                              {assigment.score !== ""
                                                ? `Graded: ${assigment.score}`
                                                : `${assigment.assignmentStatus}`}
                                            </p>
                                          </div>
                                          <div
                                            className="right-align"
                                            style={{
                                              marginTop: "70px",
                                              color: "black",
                                            }}
                                          >
                                            <p className="no-margin">
                                              {this.assignmentCategory ===
                                              "Submit New Assignment" ? (
                                                <a
                                                  data-target="modaladd"
                                                  className="modal-trigger tooltipped waves-effect right"
                                                  data-tooltip="New Upload"
                                                  data-position="bottom"
                                                  onClick={() => {
                                                    console.log(assigment);
                                                    this.setState({
                                                      submitFor: assigment,
                                                    });
                                                  }}
                                                >
                                                  UPLOAD NOW
                                                </a>
                                              ) : (
                                                <a
                                                  href={
                                                    assigment.assignmentLink
                                                  }
                                                  target="blank"
                                                >
                                                  VIEW
                                                </a>
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="modaladd"
                className="modal modal-meeting min-width-500 border-radius-10"
              >
                <h1 style={{ marginTop: "10px" }} className="h1-meeting">
                  <i
                    className="material-icons"
                    style={{ transform: "translate(-3px, 4px)" }}
                  >
                    cloud_upload
                  </i>
                  Upload Assignment!
                </h1>

                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSubmit}
                  id="sibs"
                >
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="fileUpload" title="Assignment:" />
                    <input
                      className="many-files"
                      id="file"
                      type="file"
                      name="fileUpload"
                      multiple
                      required
                    />
                  </fieldset>
                  <div className="form-group">
                    <input
                      id="formButton2"
                      className="btn gradient-45deg-light-blue-cyan border-radius-5"
                      type="submit"
                      value="Upload"
                    />
                  </div>
                </form>
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

class ReactFormLabel extends React.Component {
  render() {
    return (
      <label className="label-meeting" htmlFor={this.props.htmlFor}>
        {this.props.title}
      </label>
    );
  }
}

export default connect(null, null)(StudentAssignments);
