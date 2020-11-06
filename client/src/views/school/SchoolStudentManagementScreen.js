import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { SchoolService } from "../../services/school";
import UserGridComp from "../../components/UserGridComp";

class SchoolStudentManagementScreen extends Component {
  constructor() {
    super();
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      columns: [
        {
          label: "Student Id",
          field: "studentId",
          sort: "asc",
          width: "15%",
        },
        {
          label: "First Name",
          field: "firstname",
          sort: "asc",
          width: "24%",
        },
        {
          label: "Surname",
          field: "lastname",
          sort: "asc",
          width: "24%",
        },
        {
          label: "DOB",
          field: "dob",
          sort: "asc",
          width: "24%",
        },
        {
          label: "Enrolment Date",
          field: "datejoined",
          sort: "asc",
          width: "50%",
        },
      ],
      rows: [],
      view: "grid",
    };
  }

  user = {};
  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    SchoolService.get_all_students(this.user.schoolid).then((response) => {
      this.setState({ rows: response });
    });
  }

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <LeftSidebar />

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75 image-bg-1"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p
                        style={{
                          padding: "10px",
                          paddingTop: 25,
                          fontSize: "16px",
                        }}
                      >
                        Student List
                      </p>
                    </div>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ view: "grid" });
                      }}
                      className={`waves-effect right ${
                        this.state.view === "grid" ? "active-view" : ""
                      }`}
                      style={{
                        marginTop: "1%",
                        marginRight: "1%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">grid_on</i>
                    </a>

                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ view: "table" });
                      }}
                      className={`waves-effect right ${
                        this.state.view === "table" ? "active-view" : ""
                      }`}
                      style={{
                        marginTop: "1%",
                        marginRight: "1%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">format_list_numbered</i>
                    </a>
                  </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  <div
                    className={`card-stats z-depth-5 padding-3 border-radius-10 ${
                      this.state.view === "table" ? "" : "display-none"
                    }`}
                  >
                    <DatatablePage data={this.state} />
                  </div>
                  <div
                    className={`padding-3 ${
                      this.state.view === "grid" ? "" : "display-none"
                    }`}
                  >
                    <UserGridComp dashboard="schooladmin" rolename="student" />
                  </div>
                </div>
              </section>
            </div>

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
)(SchoolStudentManagementScreen);
