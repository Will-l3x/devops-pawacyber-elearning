import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";

import ClassroomClassworkCard from "./ClassroomClassworkCard";
import ClassroomStudentsCard from "./ClassroomStudentsCard";
import ClassroomMarkScreen from "./ClassroomMarkScreen";
import Footer from "../footer";
import Header from "../header";

class ClassroomScreen extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />

            <section id="content">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{ position: "fixed" }}
                >
                  <div className="nav-content">
                    <Link to="#" className="brand-logo">
                      Classroom
                    </Link>
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
                          href="#task-card4"
                        >
                          Mark/Grade
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="row" style={{ paddingTop: 85 }}>
                  <ClassroomClassworkCard />
                  <ClassroomStudentsCard />
                  <ClassroomMarkScreen />
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
  ...state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScreen);
