import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AddCourseCard from "./AddCourseCard";

export class SchoolAddCourseScreen extends Component {
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

            <div id="section">
              <section id="content">
                <div
                  id="overviews"
                  className="section wb"
                  style={{ paddingTop: 15 }}
                >
                  <AddCourseCard />
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolAddCourseScreen);
