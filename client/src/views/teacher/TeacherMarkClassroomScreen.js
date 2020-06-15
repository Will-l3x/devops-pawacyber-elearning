import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import $ from "jquery";
import M from "materialize-css";

import TestFolderCard from "../../components/teacher-mark/TestFolderCard";
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
                <nav className="navbar nav-extended" style={{ position: "fixed"}}>
                  <div className="nav-content"> 
                    <Link to="#" className="brand-logo">
                      Classroom Mark/Grade
                    </Link>
                    <ul className="tabs">
                      <li className="tab">
                        <Link to="#" data-target="task-card1" className="tabs-trigger active">
                          Tests - Assignments - Exercises
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
