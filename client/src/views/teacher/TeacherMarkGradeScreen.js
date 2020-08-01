import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css";
import SideBar from "../../components/SideBar";
import TeacherFolderCard from "./TeacherFolderCard";
import Footer from "../../components/footer";
import Header from "../../components/header";

class TeacherMarkGradeScreen extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    M.AutoInit();
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
            <SideBar />

            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75"
                  style={{
                    position: "fixed",

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

              <section id="content">
                <div className="container" style={{ paddingTop: "1%" }}>
                  <div className="row">
                    <TeacherFolderCard/>
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
});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TeacherMarkGradeScreen)
);
