import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
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
                          paddingBottom: 25,
                          fontSize: "16px",
                        }}
                      >
                        Student List
                      </p>
                    </div>
                   </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  <div
                    className={`padding-3`}
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
