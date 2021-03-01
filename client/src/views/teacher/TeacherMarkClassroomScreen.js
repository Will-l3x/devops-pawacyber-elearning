import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";

import TestFolderCard from "../../components/teacher-mark/TestFolderCard";
import Footer from "../../components/footer";
import Header from "../../components/header";

class TeacherMarkClassroomScreen extends Component {
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <LeftSidebar />

            <section id="content">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75 image-bg-1"
                  style={{ position: "fixed" }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p
                        style={{
                          padding: "10px",
                          paddingTop: 25,
                          paddingBottom: 25,
                          fontSize: "16px",
                        }}
                      >
                        Students' Classwork
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="row" style={{ paddingTop: 85, width: "90%" }}>
                  <div className="col s12">
                    <TestFolderCard />
                  </div>
                </div>
              </div>
            </section>

            <RightSidebar />
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
