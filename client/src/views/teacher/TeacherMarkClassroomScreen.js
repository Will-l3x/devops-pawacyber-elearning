import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import FileDropZone from "../../components/dropzone";
import $ from "jquery";
import M from "materialize-css";

import TestFolderCard from "../../components/teacher-mark/TestFolderCard";
import AssignmentFolderCard from "../../components/teacher-mark/AssignmentFolderCard";
import Footer from "../../components/footer";
import Header from "../../components/header";
export class TeacherMarkClassroomScreen extends Component {
  constructor() {
    super();
    this.removeMaterialHandler.bind(this);
    this.removeItemHandler.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
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
  removeMaterialHandler = () => {
    $(".remove-content").css({
      display: "inline",
    });
  };
  removeItemHandler = () => {};
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">

              <SideBar/>

            <section id="content">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{ position: "fixed"}}
                >
                  <div className="nav-content">
                    <Link to="#" className="brand-logo">
                      Classroom Mark/Grade
                    </Link>
                    <ul className="tabs">
                      <li className="tab">
                        <Link
                          to="#"
                          data-target="task-card1"
                          className="tabs-trigger active"
                        >
                          Test/Exercise
                        </Link>
                      </li>
                      <li className="tab">
                        <Link
                          to="#"
                          data-target="task-card2"
                          className="tabs-trigger"
                        >
                          Assignment
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="row" style={{ paddingTop: 85, width: "90%" }}>
                  <div className="col s12">
                    <TestFolderCard />
                    <AssignmentFolderCard />
                  </div>
                </div>
              </div>
              <div
                id="modal1"
                className="modal"
                style={{ overflowY: "hidden" }}
              >
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

              <div
                id="modal2"
                className="modal"
                style={{ overflowY: "hidden" }}
              >
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

              <div
                id="modal3"
                className="modal"
                style={{ overflowY: "hidden" }}
              >
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
