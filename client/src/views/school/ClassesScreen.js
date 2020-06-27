import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Footer from "../../components/footer";
import Header from "../../components/header";
import M from "materialize-css";

import { SchoolService } from "../../services/school";
import avatar from "../../assets/images/gallary/not_found.gif";
import bg4 from "../../assets/images/gallary/4.png";
import bg5 from "../../assets/images/gallary/5.png";
import bg8 from "../../assets/images/gallary/8.png";
import bg11 from "../../assets/images/gallary/11.png";
import bg12 from "../../assets/images/gallary/12.png";
import bg25 from "../../assets/images/gallary/25.png";
import bg30 from "../../assets/images/gallary/30.png";
import bg31 from "../../assets/images/gallary/31.png";
import bg32 from "../../assets/images/gallary/32.png";
import bg33 from "../../assets/images/gallary/33.png";
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
      bgimage: {
        default: bg4,
        bg1: bg4,
        bg2: bg5,
        bg3: bg8,
        bg4: bg11,
        bg5: bg12,
        bg6: bg25,
        bg7: bg30,
        bg8: bg31,
        bg9: bg32,
        bg10: bg33,
      },
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
    // SchoolService.get_courses('2')
    SchoolService.get_courses(this.user.schoolid)
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
      enrolmentkey: "123ABC",
      status: "active",
      createdby: this.user.userid,
    };
    SchoolService.update_course(data).then((response) => {
      if (response === undefined) {
        alert("Apologies. Course addition failed. Please contact admin");
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
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h4 className="header2">Add Class</h4>
                  <form onSubmit={this.handleSubmit} id="sibs">
                    <div className="row">
                      <div className="col s12">
                        <div className="row">
                          <div className="input-field col s5">
                            <input
                              id="classname"
                              type="text"
                              name="classname"
                              required
                            ></input>
                            <label htmlFor="classname">Class Name</label>
                          </div>
                          <div className="input-field col s3">
                            <label
                              htmlFor="teacherId"
                              style={{
                                transform: "translateY(-15px)",
                                fontSize: "12px",
                              }}
                            >
                              Class Teacher
                            </label>
                            <TeacherOptions
                              onSelectOption={this.onSelectOption}
                            />
                            <div className="my-divider"></div>
                          </div>
                          <div className="input-field col s4">
                            <select className="icons modal-width-230">
                              <option value="default">Default</option>
                              <option value="bg1" data-icon={bg4}>
                                Background 1
                              </option>
                              <option value="bg2" data-icon={bg5}>
                                Background 2
                              </option>
                              <option value="bg3" data-icon={bg8}>
                                Background 3
                              </option>
                              <option value="bg4" data-icon={bg11}>
                                Background 4
                              </option>
                              <option value="bg5" data-icon={bg12}>
                                Background 5
                              </option>
                              <option value="bg6" data-icon={bg25}>
                                Background 6
                              </option>
                              <option value="bg7" data-icon={bg30}>
                                Background 7
                              </option>
                              <option value="bg8" data-icon={bg31}>
                                Background 8
                              </option>
                              <option value="bg9" data-icon={bg32}>
                                Background 9
                              </option>
                              <option value="bg10" data-icon={bg33}>
                                Background 10
                              </option>
                            </select>
                            <label>Image Background</label>
                          </div>
                        </div>
                        <button className="btn gradient-45deg-light-blue-cyan waves-effect waves-light right">
                          Submit
                          <i className="material-icons right">send</i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div id="modal2" className="modal">
                <div className="modal-content">
                  <h4 className="header2">Edit Class</h4>
                  <form onSubmit={this.handleSave} id="sibs2">
                    <div className="row">
                      <div className="col s12">
                        <div className="row">
                          <div className="input-field col s5">
                            <input
                              id="classname"
                              type="text"
                              name="classname"
                              required
                            ></input>
                            <label htmlFor="classname">Class Name</label>
                          </div>
                          <div className="input-field col s3">
                            <label
                              htmlFor="teacherId"
                              style={{
                                transform: "translateY(-15px)",
                                fontSize: "12px",
                              }}
                            >
                              Class Teacher
                            </label>
                            <TeacherOptions
                              onSelectOption={this.onSelectOption}
                            />
                            <div className="my-divider"></div>
                          </div>
                          <div className="input-field col s4">
                            <select className="icons modal-width-230">
                              <option value="default">Default</option>
                              <option value="bg1" data-icon={bg4}>
                                Background 1
                              </option>
                              <option value="bg2" data-icon={bg5}>
                                Background 2
                              </option>
                              <option value="bg3" data-icon={bg8}>
                                Background 3
                              </option>
                              <option value="bg4" data-icon={bg11}>
                                Background 4
                              </option>
                              <option value="bg5" data-icon={bg12}>
                                Background 5
                              </option>
                              <option value="bg6" data-icon={bg25}>
                                Background 6
                              </option>
                              <option value="bg7" data-icon={bg30}>
                                Background 7
                              </option>
                              <option value="bg8" data-icon={bg31}>
                                Background 8
                              </option>
                              <option value="bg9" data-icon={bg32}>
                                Background 9
                              </option>
                              <option value="bg10" data-icon={bg33}>
                                Background 10
                              </option>
                            </select>
                            <label>Image Background</label>
                          </div>
                          <button className="btn gradient-45deg-light-blue-cyan waves-effect waves-light right">
                            Save
                            <i className="material-icons right">save</i>
                          </button>{" "}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassesScreen);
