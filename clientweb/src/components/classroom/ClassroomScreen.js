import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import FileDropZone from "../dropzone";
import $ from "jquery";
import { ClassroomClassworkCard } from "./ClassroomClassworkCard";
import ClassroomStudentsCard from "./ClassroomStudentsCard";
import { ClassroomCourseCard } from "./ClassroomCourseCard";
export class ClassroomScreen extends Component {
  componentDidMount() {
    $(".remove-material").on("click", function () {
      $(".content-clear").css({
        display: "inline",
      });
    });
    $(".tabs-trigger").each(function () {
      $(this).on("click", function () {
        $(".tabs-trigger").removeClass("active");
        $(this).addClass("active");
        const tab = $(this).attr("data-target");
        if (tab === "task-card1") {
          $("#task-card1").css({
            display: "block",
          });
          $("#task-card2").css({
            display: "none",
          });
          $("#task-card3").css({
            display: "none",
          });
        }
        if (tab === "task-card2") {
          $("#task-card1").css({
            display: "none",
          });
          $("#task-card2").css({
            display: "block",
          });
          $("#task-card3").css({
            display: "none",
          });
        }
        if (tab === "task-card3") {
          $("#task-card1").css({
            display: "none",
          });
          $("#task-card2").css({
            display: "none",
          });
          $("#task-card3").css({
            display: "block",
          });
        }
      });
    });
  }

  render() {
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
            <nav
              style={{ position: "fixed", width: "90%" }}
              className="navbar nav-extended"
            >
              <div className="nav-wrapper">
                <Link to="#" className="brand-logo">
                  Classroom
                </Link>

                <Link
                  className="dropdown-trigger waves-effect black-text"
                  to="#!"
                  data-target="dropdown1"
                  style={{
                    zIndex: 51,
                    transform: "translate(4000%,60%)",
                    background: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <i className="material-icons ">settings</i>
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
              </div>
              <div className="nav-content">
                <ul className="tabs">
                  <li className="tab">
                    <Link
                      to="#"
                      data-target="task-card1"
                      className="tabs-trigger active"
                    >
                      Classwork
                    </Link>
                  </li>
                  <li className="tab">
                    <Link
                      to="#"
                      data-target="task-card2"
                      className="tabs-trigger"
                    >
                      Students
                    </Link>
                  </li>
                  <li className="tab">
                    <Link
                      to="#"
                      data-target="task-card3"
                      className="tabs-trigger"
                    >
                      Course Content
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="container">
            <div className="row" style={{ paddingTop: 85, width: "80%" }}>
              <div className="col s12">
                <ClassroomClassworkCard />
                <ClassroomStudentsCard />
                <ClassroomCourseCard />
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
