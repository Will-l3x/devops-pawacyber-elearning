import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { SchoolService } from "../../services/school";

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
            <SideBar />

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <p style={{ padding: "10px", fontSize: "16px" }}>
                      Student List
                    </p>
                  </div>
                </nav>
              </div>
              <section id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  <div className="card-stats z-depth-5 padding-3 border-radius-10">
                    <DatatablePage data={this.state} />
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolStudentManagementScreen);
