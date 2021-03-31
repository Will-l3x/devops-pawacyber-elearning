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
import { StudentService } from "../../services/student";

class StudentCoursework extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? {}
          : JSON.parse(localStorage.getItem("user")),
      courses: [],
    };
    this.handleFolderClick.bind(this);
  }

  componentDidMount() {
    this.getDashData();
  }

  getDashData() {
    const studentData = JSON.parse(localStorage.getItem("userAll"));
    StudentService.get_all_courses(studentData.studentId) // Get all courses by userid
      .then((response) => {
        this.setState({ courses: response });
      });
  }

  handleFolderClick = (e, course) => {
    e.preventDefault();
    const thus = this;
    try {
      localStorage.removeItem("course");
      localStorage.setItem("course", JSON.stringify(course));
      setTimeout(function () {
        thus.setState({ redirect: true });
      }, 300);
    } catch (error) {
      M.toast({
        html: "Failed to find course folder",
        classes: "red accent-2",
      });
    }
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/class-coursework" />;
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
                        Coursework
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="container" style={{ paddingTop: 85 }}>
                <div className="row">
                  {this.state.courses.map((course, i) => (
                    <div key={i} className="col s6 m3">
                      <div
                        className="card min-height-100 z-depth-2 white-text designed-dots border-radius-10"
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <div className="padding-4">
                          <div className="col s12 m12">
                            <p className="no-margin" style={{ color: "teal" }}>
                              <b>{course.classname}</b>
                            </p>
                          </div>

                          <div
                            className="row"
                            style={{
                              marginTop: "90px",
                              color: "white",
                            }}
                          >
                            <div className="left-align col s6 m6"></div>
                            <div className="right-align col s6 m6">
                              <p className="no-margin">
                                <a
                                  href="#!"
                                  style={{
                                    border: "1px solid #2196F3",
                                    color: "white",
                                    backgroundColor: "#2196F3",
                                    borderRadius: "15px",
                                    padding: "5px",
                                    textAlign: "center",
                                  }}
                                  onClick={(e) =>
                                    this.handleFolderClick(e, course)
                                  }
                                >
                                  Open
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentCoursework);
