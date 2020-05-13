import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import M from "materialize-css";
export class TeacherClassworkScreen extends Component {
  state = {
    courses: [
      {
        courseId: 1,
        courseName: "Mathematics",
        numberOfTopics: 5,
        courseCode: 1234,
      },
      {
        courseId: 2,
        courseName: "Mathematics",
        numberOfTopics: 7,
        courseCode: 123,
      },
      {
        courseId: 3,
        courseName: "Advanced Mathematics",
        numberOfTopics: 9,
        courseCode: 1456,
      },
    ],
  };
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div className="wrapper">
        <aside id="left-sidebar-nav">
          <SideBar></SideBar>
          <Link
            to=""
            data-target="slide-out"
            className="sidebar-collapse waves-effect dropdown-trigger waves-block waves-light hide-on-large-only"
          >
            <i className="material-icons">format_indent_increase</i>
          </Link>
        </aside>

        <section id="content">
          <div style={{ position: "relative", zIndex: 50 }}>
            <nav
              className="navbar nav-extended"
              style={{
                position: "fixed",
                maxWidth: "85%",
                minHeight: 70,
                transform: "translateY(-10%)",
              }}
            >
              <div className="nav-content">
                <Link to="#" className="brand-logo">
                  Student Classwork
                </Link>
              </div>
            </nav>
          </div>

          <div className="container" style={{ paddingTop: "6%" }}>
            <div className="card-stats z-depth-5 padding-5">
              <div className="row mt-1">
                <div className="col s12 m6 l12">
                  <DatatablePage />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherClassworkScreen);
