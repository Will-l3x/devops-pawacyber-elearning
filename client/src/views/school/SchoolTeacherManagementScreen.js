import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { SchoolService } from "../../services/school";
import { AuthService } from "../../services/authServices";

export class SchoolTeacherManagementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Mr",
      columns: [
        {
          label: "ID",
          field: "teacherId",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Teacher Name",
          field: "firstname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Teacher Surname",
          field: "lastname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Date Joined",
          field: "datejoined",
          sort: "asc",
          width: "20%",
        },
      ],
      rows: [],
    };
    this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
  }

  user = {};
  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  getDashData() {
    SchoolService.get_all_teachers(this.user.schoolid).then((response) => {
      console.log(response)
      this.setState({ rows: response });
    });
  }

  handleTitleDropdownChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var registerAdmin = {
      roleid: 1,
      schoolid: this.user.schoolid,
      email: event.target.email.value,
      password: "pass@123",
      grade: event.target.grade.value,
      firstname: event.target.personName.value,
      lastname: event.target.surname.value,
      title: this.state.title,
      vpassword: "pass@123",
      dob: event.target.dob.value,
    };

    AuthService.register(registerAdmin).then((response) => {
      if (response === undefined) {
        alert("Teacher Registration Failed");
      } else if (response.success === false) {
        alert(response.message);
      } else {
        document.getElementById("sibs").reset();
        this.getDashData();
        alert(response.message);
      }
    });
  };

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
                      Teacher Management
                    </p>
                  </div>
                </nav>
              </div>
              <section
                className="row"
                id="content"
                style={{ paddingTop: "7%" }}
              >
                <div className="container col s6">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div
                        className="col s12 m6 l12"
                        style={{ padding: "20px" }}
                      >
                        <DatatablePage data={this.state} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container col s6">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12">
                        <h4 className="header2">Add Teacher</h4>
                        <form onSubmit={this.handleSubmit} id="sibs">
                          <div className="row">
                            <div className="col s12">
                              <div className="row">
                                <div className="input-field col s2">
                                  <select
                                    name="title"
                                    defaultValue={this.state.title}
                                    onChange={this.handleTitleDropdownChange}
                                    required
                                  >
                                    <option value="Mr">Mr</option>
                                    <option value="Mr">Mrs</option>
                                    <option value="Mr">Rev</option>
                                    <option value="Mr">Dr</option>
                                  </select>
                                </div>
                                <div className="input-field col s5">
                                  <input
                                    id="personName"
                                    type="text"
                                    name="personName"
                                    required
                                  ></input>
                                  <label htmlFor="personName">First Name</label>
                                </div>
                                <div className="input-field col s5">
                                  <input
                                    id="surname"
                                    type="text"
                                    name="surname"
                                    required
                                  ></input>
                                  <label htmlFor="surname">Surname</label>
                                </div>
                              </div>
                              <div className="Row">
                                <div className="input-field col s4">
                                  <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                  ></input>
                                  <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field col s4">
                                  <input
                                    id="dob"
                                    type="date"
                                    name="dob"
                                    required
                                  ></input>
                                  <label htmlFor="dob">DOB</label>
                                </div>
                                <div className="input-field col s4">
                                  <input
                                    id="grade"
                                    type="number"
                                    name="grade"
                                    required
                                  ></input>
                                  <label htmlFor="grade">Grade</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s6 offset-s6">
                                <button className="btn file-upload gradient-45deg-light-blue-cyan waves-effect waves-light right">
                                  Submit
                                  <i className="material-icons right">send</i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
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
)(SchoolTeacherManagementScreen);
