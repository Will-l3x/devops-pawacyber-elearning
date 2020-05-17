import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";
import SideBar from "../../components/SideBar";
import { TeacherFolderCard } from "./TeacherFolderCard";
import { TeacherService } from "../../services/teacher";
import Footer from "../../components/footer";
import Header from "../../components/header";

export class TeacherMarkGradeScreen extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    M.AutoInit();
    this.setState({
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
    });
    TeacherService.get_all_courses().then((courses) => {
      console.log(courses);
    });
  }
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
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
            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                    maxWidth: "85%",
                    minHeight: 70,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      style={{ marginTop: "3%", marginBottom: "1%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Course Folders
                    </Link>
                  </div>
                </nav>
              </div>

              <section id="content" style={{ paddingTop: "1%" }}>
                <div className="container">
                  <div className="row">
                    <TeacherFolderCard courses={this.state.courses} />
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

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherMarkGradeScreen);
