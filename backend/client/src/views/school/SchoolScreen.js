/**
 * home page
 * used by headmaster and school admin staff
 * can register course
 * can manage its teacher list
 * can manage its students list for each course they register
 * info about registered courses/classes
 * Page with classroom teacher/students and their marks
 * table of all students under that school
 * table for all teachers at that school
 **/

import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/header";
import M from "materialize-css";


export class SchoolScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
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
          <div className="wrapper">
            <SideBar />
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolScreen);
