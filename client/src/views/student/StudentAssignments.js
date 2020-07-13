import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Footer from "../../components/footer";
import Header from "../../components/header";

import { StudentService } from "../../services/student";

export class StudentAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: [],
    };
  }

  componentDidMount() {
    this.assignmentData();
  }
  user = {};
  assignmentData() {
    this.user = JSON.parse(localStorage.getItem("user"));
    StudentService.get_student_all_classwork(1) //course id
      .then((response) => {
        this.setState({ assignment: response });
      });
  }

  assignmentCategory = "ALL ASSIGNMENTS";
  status = "All";

  selectCategory(category, stat) {
    this.assignmentCategory = category;
    this.status = stat;
  }

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />
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
                                Pending Assignments
                                <Link
                                  to="#"
                                  onClick={() =>
                                    this.selectCategory(
                                      "Pending Assignments",
                                      "Pending"
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
                                      "Pending"
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
                            {
                              // eslint-disable-next-line array-callback-return
                              this.state.assignment.map((assigment, i) => {
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
                                                {assigment.courseName}
                                                <br />
                                                {assigment.assignmentTitle}
                                              </b>
                                            </p>
                                            <p
                                              className="no-margin"
                                              style={{
                                                fontSize: "12px",
                                                color: "grey",
                                              }}
                                            >
                                              {assigment.dueDate}
                                            </p>
                                            <p
                                              className={
                                                assigment.assignmentStatus ===
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
                                              <a
                                                href={assigment.assignmentLink}
                                                target="blank"
                                              >
                                                DOWNLOAD
                                              </a>
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
                                                  {assigment.courseName}
                                                  <br />
                                                  {assigment.assignmentTitle}
                                                </b>
                                              </p>
                                              <p
                                                className="no-margin"
                                                style={{
                                                  fontSize: "12px",
                                                  color: "grey",
                                                }}
                                              >
                                                {assigment.dueDate}
                                              </p>
                                              <p
                                                className={
                                                  assigment.assignmentStatus ===
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
                                                  <a href="#!" target="blank">
                                                    UPLOAD NOW
                                                  </a>
                                                ) : (
                                                  <a
                                                    href={
                                                      assigment.assignmentLink
                                                    }
                                                    target="blank"
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
                                  }
                                }
                              })
                            }
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

export default connect(null, null)(StudentAssignments);
