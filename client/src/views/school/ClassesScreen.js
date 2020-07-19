import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Footer from "../../components/footer";
import Header from "../../components/header";
import M from "materialize-css";

import { SchoolService } from "../../services/school";
import avatar from "../../assets/images/gallary/not_found.gif";
import TeacherOptions from "./TeacherOptions";

export class ClassesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsubscribe: false,
      selectedOption: null,
      classId: "",
      courses: [],
      teachers: [],
    };
    this.handleUnsubscribe.bind(this);
  }
  handleUnsubscribe = () => {
    this.setState({ unsubscribe: true });
  };

  user = {};
  componentDidMount() {
    M.AutoInit();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
  }

  getDashData() {
    SchoolService.get_courses(1) //this.user.schoolid)
      .then((response) => {
        if (response === undefined) {
        } else {
          this.setState({ courses: response });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ courses: [] });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const elem = document.getElementById("modal1");
    const modal = new M.Modal(elem);
    modal.close();
    var data = {
      teacherid:
        this.state.selectedOption === null
          ? ""
          : this.state.selectedOption.value,
      classname: event.target.classname.value,
      enrolmentkey: "123ABC",
      grade: event.target.grade.value,
      status: "active",
      createdby: this.user.userid,
    };

    SchoolService.post_new_course(data).then((response) => {
      if (response === undefined) {
        alert("Apologies. Course addition failed. Please contact admin");
      } else if (response.success === false) {
        alert(response.message);
      } else {
        alert("successfully added");
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    });
  };

  handleSave = (event) => {
    event.preventDefault();
    const elem = document.getElementById("modal2");
    const modal = new M.Modal(elem);
    modal.close();
    var data = {
      teacherid:
        this.state.selectedOption === null
          ? ""
          : this.state.selectedOption.value,
      classname: event.target.classname.value,
      grade: event.target.grade.value,
      enrolmentkey: "123ABC",
      status: "active",
      createdby: this.user.userid,
    };
    SchoolService.update_course(data).then((response) => {
      if (response === undefined) {
        alert("Apologies. Update. Please contact admin");
      } else if (response.success === false) {
        alert(response.message);
      } else {
        alert("successfully added");
        document.getElementById("sibs2").reset();
        this.getDashData();
      }
    });
  };
  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );
  };
  handleDelete = () => {
    SchoolService.delete_course(this.state.classId)
      .then((response) => {
        console.log(response);
        this.getDashData();
      })
      .catch((error) => {
        console.log(error);
        this.getDashData();
      });
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
            <div style={{ position: "relative", zIndex: 50 }}>
              <nav
                className="navbar nav-extended"
                style={{
                  position: "fixed",
                  transform: "translateY(-7%)",
                }}
              >
                <div className="nav-content">
                  <div className="left">
                    <p style={{ padding: "10px", fontSize: "16px" }}>
                      Class Management
                    </p>
                  </div>
                  <Link
                    to="#!"
                    data-target="modal1"
                    className="modal-trigger tooltipped waves-effect right"
                    data-tooltip="Add Class"
                    data-position="bottom"
                    style={{
                      marginTop: "1%",
                      marginRight: "2%",
                      color: "#626262",
                    }}
                  >
                    <i className="material-icons">add_circle_outline</i>
                  </Link>
                </div>
              </nav>
            </div>

            <section id="content">
              <div id="overviews" style={{ paddingTop: "70px" }}>
                <div className="row">
                  {this.state.courses.length === 0 ? (
                    <div className="row">
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          transform: "translateY(100%)",
                        }}
                      >
                        No Courses Found
                        <br />{" "}
                        <img
                          src={avatar}
                          alt="Avatar"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "150px",
                          }}
                        ></img>
                      </p>
                    </div>
                  ) : (
                    this.state.courses.map((course, i) => (
                      <div key={i} className="col s3">
                        <div className="card" style={{ borderRadius: 20 }}>
                          <div className="card-image waves-effect waves-block waves-light">
                            <img
                              src={this.state.bgimage[course.bgimage]}
                              alt="user bg"
                            />
                          </div>
                          <ul className="card-action-buttons">
                            {/**
                             * <li>
                              <a
                                className="btn-floating waves-effect waves-light green accent-4 tooltipped"
                                data-tooltip="Generate new enrolment key"
                                data-position="top"
                              >
                                <i className="material-icons">repeat</i>
                              </a>
                            </li>
                             */}
                            <li>
                              <a
                                href="#!"
                                className="btn-floating waves-effect waves-light modal-trigger light-blue"
                                data-target="modal2"
                                onClick={() => {
                                  this.setState({ classId: course.id });
                                }}
                              >
                                <i className="material-icons">create</i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#!"
                                className="btn-floating waves-effect waves-light modal-trigger red accent-2"
                                data-target="areyousure"
                                onClick={() => {
                                  this.setState({ classId: course.id });
                                }}
                              >
                                <i className="material-icons">delete</i>
                              </a>
                            </li>
                          </ul>
                          <div className="card-content">
                            <div className="card-title">{course.classname}</div>
                            <hr className="hr5" />
                            <span style={{ fontSize: 16 }}>
                              Teacher: {course.teacherid}
                            </span>
                            <hr className="hr5" />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
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
                    Add Class!
                  </h1>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="classname" title="Class Name:" />

                    <input
                      id="classname"
                      className="form-input input-meeting"
                      name="classname"
                      type="text"
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="grade" title="Grade:" />
                    <input
                      id="grade"
                      className="form-input input-meeting"
                      name="grade"
                      type="number"
                      min="0"
                      max="12"
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="teacher" title="Teacher:" />
                    <TeacherOptions onSelectOption={this.onSelectOption} />
                    <div className="my-divider"></div>
                  </fieldset>
                  <div className="form-group" style={{ marginTop: 50 }}>
                    <input
                      id="submit"
                      className="btn modal-close gradient-45deg-light-blue-cyan"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
              <div id="modal2" className="modal modal-meeting">
                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSave}
                  id="sibs2"
                >
                  <h1 className="h1-meeting">
                    <i
                      className="material-icons"
                      style={{ transform: "translate(-3px, 4px)" }}
                    >
                      class
                    </i>
                    Edit Class!
                  </h1>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="classname" title="Class Name:" />

                    <input
                      id="classname"
                      className="form-input input-meeting"
                      name="classname"
                      type="text"
                      required
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="grad" title="Grade:" />
                    <input
                      id="grad"
                      className="form-input input-meeting"
                      name=""
                      type="text"
                      required
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="teacher" title="Teacher:" />
                    <TeacherOptions onSelectOption={this.onSelectOption} />
                    <div className="my-divider"></div>
                  </fieldset>
                  <div className="form-group">
                    <input
                      id="save"
                      className="btn modal-close gradient-45deg-light-blue-cyan"
                      type="submit"
                      value="Save"
                    />
                  </div>
                </form>
              </div>

              <div id="areyousure" className="modal width-250">
                <div className="modal-content">
                  <h4 className="header2">Are you sure?</h4>
                </div>
                <div className="modal-footer">
                  <a
                    href="#!"
                    style={{ marginRight: 10 }}
                    onClick={this.handleDelete}
                    className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                  >
                    Yes
                  </a>
                  <a
                    href="#!"
                    className="modal-close btn gradient-45deg-red-pink waves-effect white-text"
                  >
                    No
                  </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassesScreen);
