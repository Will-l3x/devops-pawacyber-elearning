import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {SchoolService} from '../../services/school';

export class SchoolStudentManagementScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: {
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
            label: "Enrollment Key",
            field: "enrolmentkey",
            sort: "asc",
            width: "50%",
          },
          {
            label: "Enrolment Date",
            field: "datejoined",
            sort: "asc",
            width: "50%",
          }
        ],
        rows: [],
      },
    };
  }

  user = {};
  componentDidMount() {
    this.user= JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  getDashData(){
    // SchoolService.get_all_students('2') 
    SchoolService.get_all_students(this.user.schoolid)
    .then((response) => {
      this.setState({ rows: response })
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
                    <p style={{ padding: "10px",fontSize:"16px" }} >
                      Student List
                    </p>
                  </div>
              
                </nav>
              </div>
              <section id="content" style={{ paddingTop: "7%" }}>
                <div className="container">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12">
                        <DatatablePage data={this.state.data} />
                      </div>
                    </div>
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
