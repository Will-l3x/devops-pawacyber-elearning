import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import $ from "jquery";
import M from "materialize-css";
import folderIcon from "../../assets/images/icon/folder.svg";
import { TeacherService } from "../../services/teacher";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import Footer from "../../components/footer";
import Header from "../../components/header";

class TeacherMarkClassroomScreen extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      classwork: [
        //   {
        //   id: "2",
        //   title: "Test 1",
        //   type: "Test/Exercise",
        //   due: "18 May",
        //   posted: "18 May",
        // },
      ],
      courses: [],
    };
    this.handleFolderClick.bind(this);
  }

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
  }

  getDashData() {
    TeacherService.get_all_courses(this.user.userid) // Get all courses by userid
      .then((response) => {
        this.setState({ courses: response });
        if (this.state.courses.length > 0) {
          this.courseId = this.state.courses[0].classId;
          TeacherService.get_assignments(this.courseId) // Get all assignments by class id
            .then((response) => {
              this.setState({ classwork: response });
            });
        }
      });
  }

  handleFolderClick = (e, assignment) => {
    e.preventDefault();
    const thus = this;
    try {
      localStorage.removeItem("assignment");
      localStorage.setItem("assignment", JSON.stringify(assignment));
      setTimeout(function () {
        thus.setState({ redirect: true });
      }, 300);
    } catch (error) {
      M.toast({
        html: "Failed to find assignment folder",
        classes: "red accent-2",
      });
    }
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/classroom-mark-test" />;
    }

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
                <div className="row" style={{ paddingTop: 85, width: "90%" }}>
                  <div className="col s12">
                    <div
                      id="task-card1"
                      className="row"
                      style={{ display: "block", marginTop: "4%" }}
                    >
                      {this.state.classwork.map((assignment, i) => (
                        <div key={i} className="col s12 m4 l3 padding-5px">
                          <div className="folder-container">
                            <div
                              onClick={(e) =>
                                this.handleFolderClick(e, assignment)
                              }
                              className="folder cursor-pointer center-align"
                            >
                              <div className=" left folder-icon">
                                <img
                                  src={folderIcon}
                                  className="icon"
                                  alt="folder"
                                />
                              </div>
                              <div className="center-align left folder-name">
                                <h6>{assignment.assignmentname}</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherMarkClassroomScreen);
