import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import $ from "jquery";
import M from "materialize-css";

import ClassroomClassworkCard from "./ClassroomClassworkCard";
import ClassroomStudentsCard from "./ClassroomStudentsCard";
import ClassroomCourseCard from "./ClassroomCourseCard";
import ClassroomStudentAssessment from "./ClassroomStudentAssessment";
import Footer from "../footer";
import Header from "../header";

class ClassroomScreen extends Component {
  constructor() {
    super();
    this.removeMaterialHandler.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }

  removeMaterialHandler = () => {
    $(".remove-content").css({
      display: "inline",
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

            <section id="content">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75"
                  style={{ position: "fixed" }}
                >
                  <div className="nav-content">
                    <Link to="#" className="brand-logo">
                      Classroom
                    </Link>
                    <Link
                      to="#!"
                      className="btn gradient-45deg-light-blue-cyan remove-content right waves-effect"
                      data-target="dropdown7"
                      style={{ transform: "translate(-200%, 55%)" }}
                    >
                      Save
                      <i className="material-icons">save</i>
                    </Link>
                    <Link
                      to="#!"
                      className="dropdown-trigger black-text right waves-effect"
                      data-target="dropdown7"
                      style={{ transform: "translate(-80%, 20%)" }}
                    >
                      <i className="material-icons">settings</i>
                    </Link>
                    <ul
                      id="dropdown7"
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
                          onClick={this.removeMaterialHandler}
                          to="#!"
                          className="grey-text text-darken-2"
                        >
                          <i className="material-icons ">delete</i>
                          Remove Content
                        </Link>
                      </li>
                    </ul>
                    <ul className="tabs">
                      <li className="tab col s3">
                        <a
                          className="active cyan-text"
                          rel="noopener noreferer"
                          href="#task-card1"
                        >
                          Classwork
                        </a>
                      </li>
                      <li className="tab col s3">
                        <a
                          className="cyan-text"
                          rel="noopener noreferer"
                          href="#task-card2"
                        >
                          Students
                        </a>
                      </li>
                      <li className="tab col s3">
                        <a
                          className="cyan-text"
                          rel="noopener noreferer"
                          href="#task-card3"
                        >
                          Course Content
                        </a>
                      </li>
                      <li className="tab col s3">
                        <a
                          className="cyan-text"
                          rel="noopener noreferer"
                          href="#task-card4"
                        >
                          Assessment
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="row" style={{ paddingTop: 85, width: "90%" }}>
                  <ClassroomClassworkCard />
                  <ClassroomStudentsCard />
                  <ClassroomCourseCard />
                  <ClassroomStudentAssessment />
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

const mapStateToProps = (state) => ({
  files: state.fileUpload,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScreen);
