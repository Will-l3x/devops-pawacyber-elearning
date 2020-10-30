import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";

import ClassOptions from "../../components/ClassOptions";
import StudentOptions from "../../components/StudentOptions";
import M from "materialize-css";
import moment from "moment";
import Header from "../../components/header";
import Footer from "../../components/footer";
import UserGridComp from "../../components/UserGridComp";
import { TeacherService } from "../../services/teacher";

class TeacherStudentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      selectedOption: {},

      columns: [
        {
          label: "ID",
          field: "studentId",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Name",
          field: "firstname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Last Name",
          field: "lastname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "DOB",
          field: "dob",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Grade",
          field: "gradeid",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Enrolment Key",
          field: "enrolmentkey",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Date Joined",
          field: "datejoined",
          sort: "asc",
          width: "20%",
        },
      ],
      rows: [],
      view: "grid",
      class: null,
      student: null,
    };
  }

  componentDidMount() {
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    TeacherService.get_all_courses(this.state.user.userid)
      .then((response) => {
        const data = response === undefined ? [] : response;
        const courses = [];
        const del_courses = [];
        const students = [];

        for (const course of data) {
          if (course.status === "deleted") {
            del_courses.push(course);
          } else {
            courses.push(course);
          }
        }
        for (const course of courses) {
          TeacherService.get_all_students(course.classId)
            .then((response) => {
              if (response === undefined) {
                M.toast({
                  html: "Could not fetch data. Please try after a moment.",
                  classes: "red",
                });
              } else {
                for (const student of response) {
                  student.dob = moment(student.dob).format("LL");
                  student.datejoined = moment(student.datejoined).format("LL");
                  students.push(student);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        this.setState({
          rows: students,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      teacherid: this.state.user.userid,
      studentid: this.state.student.value,
      classid: this.state.class.value,
    };

    TeacherService.enrol_student(data).then((response) => {
      console.log(response);
      if (response === undefined) {
        M.toast({
          html: "Student Enrolment failed",
          classes: "red",
        });
      } else {
        M.toast({
          html: response.data.message,
          classes: "green accent 3",
        });
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    });
  };

  onSelectClassOption = (selectedOption) => {
    this.setState({
      class: selectedOption,
    });
  };
  onSelectStudentOption = (selectedOption) => {
    this.setState({
      student: selectedOption,
    });
  };

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75 image-bg-1"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p
                        style={{
                          padding: "10px",
                          paddingTop: 25,
                          fontSize: "16px",
                        }}
                      >
                        Student Management
                      </p>
                    </div>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ view: "grid" });
                      }}
                      className={`waves-effect right ${
                        this.state.view === "grid" ? "active-view" : ""
                      }`}
                      style={{
                        marginTop: "1%",
                        marginRight: "1%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">grid_on</i>
                    </a>

                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ view: "table" });
                      }}
                      className={`waves-effect right ${
                        this.state.view === "table" ? "active-view" : ""
                      }`}
                      style={{
                        marginTop: "1%",
                        marginRight: "1%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">format_list_numbered</i>
                    </a>

                    <a
                      href="#!"
                      data-target="modalenrol"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Enrol student"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">add_circle_outline</i>
                    </a>
                  </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  <div
                    className={`card-stats z-depth-5 padding-3 border-radius-10 ${
                      this.state.view === "table" ? "" : "display-none"
                    }`}
                  >
                    <DatatablePage data={this.state} />
                  </div>
                  <div
                    className={`padding-3 ${
                      this.state.view === "grid" ? "" : "display-none"
                    }`}
                  >
                    <UserGridComp dashboard="teacher" rolename="student" />
                  </div>
                  <div
                    id="modalenrol"
                    className="modal modal-meeting border-radius-10"
                  >
                    <form
                      className="react-form form-meeting"
                      onSubmit={this.handleSubmit}
                      id="sibs"
                    >
                      <h1 className="h1-meeting">
                        <i
                          className="material-icons"
                          style={{ transform: "translate(-3px, 4px)" }}
                        >
                          class
                        </i>
                        Enrol Student!
                      </h1>
                      <fieldset className="form-group">
                        <label
                          style={{
                            transform: "translateY(-15px)",
                            fontSize: "12px",
                          }}
                        >
                          SELECT STUDENT *
                        </label>
                        <StudentOptions
                          style={{ transform: "translateY(-1px)" }}
                          onSelectOption={this.onSelectStudentOption}
                        />
                        <div
                          style={{ transform: "translateY(-3px)" }}
                          className="my-divider"
                        ></div>
                      </fieldset>
                      <fieldset className="form-group">
                        <label
                          style={{
                            transform: "translateY(-15px)",
                            fontSize: "12px",
                          }}
                        >
                          SELECT SUBJECT *
                        </label>
                        <ClassOptions
                          style={{ transform: "translateY(-1px)" }}
                          onSelectOption={this.onSelectClassOption}
                        />
                        <div
                          style={{ transform: "translateY(-3px)" }}
                          className="my-divider"
                        ></div>
                      </fieldset>
                      <div className="form-group" style={{ marginTop: 50 }}>
                        <input
                          id="submit"
                          className="btn modal-close gradient-45deg-light-blue-cyan border-radius-5"
                          type="submit"
                          value="Enrol"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
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
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherStudentScreen);
