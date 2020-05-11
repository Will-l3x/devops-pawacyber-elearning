import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { Redirect } from "react-router";
import FileDropZone from "./dropzone";
import $ from "jquery";
export class ClassroomScreen extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      classwork: [
        {
          id: "1",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "2",
          title: "Test 1",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "3",
          title: "Exercise 2",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "4",
          title: "Chapter 6",
          type: "Course Material",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "5",
          title: "Assignment 2",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "6",
          title: "Exercise 1",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "7",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "8",
          title: "Chapter 3 & 4",
          type: "Course Material",
          due: "18 May",
          posted: "18 May",
        },
      ],
    };
  }
  
  componentDidMount() {
    $(".remove-material").on("click", function () {
      $(".content-clear").css({
        display: "inline",
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="classroom-students" />;
    }
    return (
      <div className="wrapper">
        <aside id="left-sidebar-nav">
          <SideBar></SideBar>
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
            <nav style={{ position: "fixed" }}>
              <div className="nav-wrapper grey lighten-3 row">
                <div className="col s4 offset-s4">
                  <div className="col s6">
                    <div className="btn-classroom left black-text bold">
                      Classwork
                    </div>

                    <div
                      onClick={() => {
                        this.setState({
                          redirect: true,
                        });
                      }}
                      className="btn-classroom left black-text bold"
                    >
                      Students
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="container">
            <div className="row" style={{ paddingTop: 85, width: "80%" }}>
              <div className="col s12">
                <Link
                  className="btn dropdown-settings dropdown-trigger waves-effect waves-light gradient-45deg-blue-grey-blue-grey breadcrumbs-btn right"
                  to="#!"
                  data-target="dropdown1"
                  style={{ marginLeft: 30, marginTop: 10 }}
                >
                  <i className="material-icons ">note_add</i>
                </Link>
                <ul
                  id="dropdown1"
                  className="dropdown-content"
                  style={{
                    minWidth: "200px",
                    whiteSpace: "nowrap",
                    opacity: 1,
                    display: "none",
                  }}
                >
                  <li>
                    <Link
                      to="#!"
                      data-target="modal1"
                      className="grey-text modal-trigger text-darken-2"
                    >
                      <i className="material-icons ">book</i>
                      Add Material
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#!"
                      data-target="modal2"
                      className="grey-text modal-trigger text-darken-2"
                    >
                      <i className="material-icons ">description</i>
                      Test/Exercise
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#!"
                      data-target="modal3"
                      className="grey-text modal-trigger text-darken-2"
                    >
                      <i className="material-icons ">assignment</i>
                      Add Assignment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#!"
                      className="grey-text remove-material text-darken-2"
                    >
                      <i className="material-icons ">backspace</i>
                      Remove Content
                    </Link>
                  </li>
                </ul>

                <ul id="task-card" className="collection">
                  {this.state.classwork.map((cw) => {
                    let cl = "";
                    if (cw.type === "Course material") {
                      return (
                        <li key={cw.id} className="collection-item ">
                          <label>
                            {cw.title}
                            <Link to="" className="secondary-content">
                              <span className="ultra-small">
                                Posted {cw.posted}
                              </span>
                            </Link>
                          </label>
                          <span className="task-cat cyan">{cw.type}</span>
                          <button className="content-clear right white">
                            Remove
                          </button>
                        </li>
                      );
                    }
                    if (cw.type === "Assignment") {
                      cl = "teal accent-4";
                    } else {
                      cl = "red accent-2";
                    }
                    return (
                      <li key={cw.id} className="collection-item">
                        <label>
                          {cw.title}
                          <Link to="" className="secondary-content">
                            <span className="ultra-small">Due {cw.due}</span>
                          </Link>
                        </label>
                        <span className={`task-cat ${cl}`}>{cw.type}</span>
                        <button className="content-clear right white">
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div id="modal1" className="modal" style={{ overflowY: "hidden" }}>
            <div className="modal-content">
              <h4 className="header2">Add Course Material</h4>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="title" type="text"></input>
                      <label htmlFor="title">Title</label>
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

          <div id="modal2" className="modal" style={{ overflowY: "hidden" }}>
            <div className="modal-content">
              <h4 className="header2">Add Test/Exercise</h4>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s4">
                      <input id="title2" type="text"></input>
                      <label htmlFor="title2">Title</label>
                    </div>
                    <div className="input-field col s4">
                      <input
                        type="text"
                        name="due_date"
                        className="datepicker"
                      ></input>
                      <label htmlFor="due_date">Due</label>
                    </div>
                    <div className="input-field col s4">
                      <input id="duration" type="text"></input>
                      <label htmlFor="duration">Duration(mins)</label>
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

          <div id="modal3" className="modal" style={{ overflowY: "hidden" }}>
            <div className="modal-content">
              <h4 className="header2">Add Assignment</h4>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s4">
                      <input id="title3" type="text"></input>
                      <label htmlFor="title3">Title</label>
                    </div>
                    <div className="input-field col s4">
                      <input
                        type="text"
                        name="due_date"
                        className="datepicker"
                      ></input>
                      <label htmlFor="due_date">Due</label>
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
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScreen);
