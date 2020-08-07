import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { TeacherService } from "../../services/teacher";
import { StudentService } from "../../services/student";

class EnrolStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "ID",
          field: "studentid",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Student Name",
          field: "firstname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Student Surname",
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
      ],
      rows: [],
      courses: [],
    };
  }

  user = {};
  courseId = "";

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    StudentService.get_all_courses(this.user.userid).then((response) => {
      console.log(response);
      this.setState({
        courses: response,
      });
      const students = [];
      for (const course of response) {
        TeacherService.get_all_students(course.classId).then((response) => {
          students.concat(response);
        });
      }
      TeacherService.get_all_students(8).then((response) => {
        students.concat(response);
      });
      this.setState({
        rows: students,
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      teacherid: this.user.userid,
      studentid: event.target.studentid.value,
      classid: event.target.classid.value,
    };

    TeacherService.enrol_student(data).then((response) => {
      console.log(response);
      if (response === undefined) {
        alert("Student Enrolment failed");
      } else {
        // alert(response.message);
        document.getElementById("sibs").reset();
        this.getDashData();
      }
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
                  className="navbar nav-extended width-75"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p style={{ padding: "10px", fontSize: "16px" }}>
                        Student Management
                      </p>
                    </div>
                    <a
                      href="#!"
                      data-target="modal1"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Enrol Student"
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
              <section id="content" style={{ paddingTop: "7%" }}>
                <div className="container">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12" style={{ padding: "20px" }}>
                        <DatatablePage data={this.state} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div id="modal1" className="modal modal-meeting">
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
                    <ReactFormLabel htmlFor="studentid" title="Student ID:" />

                    <input
                      id="studentid"
                      className="form-input input-meeting"
                      name="studentid"
                      type="text"
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="classid" title="Class ID:" />
                    <input
                      id="classid"
                      className="form-input input-meeting"
                      name="classid"
                      type="text"
                      required
                    />
                  </fieldset>
                  <div className="form-group" style={{ marginTop: 50 }}>
                    <input
                      id="submit"
                      className="btn modal-close gradient-45deg-light-blue-cyan"
                      type="submit"
                      value="Enrol"
                    />
                  </div>
                </form>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnrolStudent);
