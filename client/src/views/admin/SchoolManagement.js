import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AdminService } from "../../services/admin";

export class SchoolManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolId: "",
      selectedSchool: {},
      title: "Mr",
      columns: [
        {
          label: "School Name",
          field: "schoolname",
          sort: "asc",
          width: "24%",
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
          width: "20%",
        },
        {
          label: "School Contact",
          field: "contacts",
          sort: "asc",
          width: "15%",
        },
        {
          label: "Enrolment Key",
          field: "enrolmentkey",
          sort: "asc",
          width: "50%",
        },
        {
          label: "Action",
          field: "actions",
        },
      ],
      rows: [],
      options: [],
    };

    this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleTitleDropdownChange(event) {
    this.setState({ title: event.target.value });
  }

  componentDidMount() {
    this.getDashData();
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  getDashData() {
    const schools = [];
    AdminService.get_all_schools()
      .then((response) => {
        for (const school of response) {
          school.actions = (
            <ul className="card-action-buttons2">
              <li>
                <a
                  href="#!"
                  className="btn-floating waves-effect waves-light modal-trigger light-blue"
                  data-target="modaledit"
                  onClick={this.setState({
                    schoolId: school.schoolId,
                    selectedSchool: school,
                  })}
                >
                  <i className="material-icons">create</i>
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="btn-floating waves-effect waves-light modal-trigger red accent-2"
                  data-target="areyousure"
                  onClick={
                  
                    this.setState({
                    schoolId: school.schoolId,
                  })}
                >
                  <i className="material-icons">delete</i>
                </a>
              </li>
            </ul>
          );
          schools.push(school);
        }
        this.setState({ rows: schools });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ rows: [] });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      schoolname: event.target.schoolName.value,
      address: event.target.schoolAddress.value,
      contacts: event.target.schoolContactNumber.value,
      firstname: event.target.personName.value,
      lastname: event.target.surname.value,
      email: event.target.email.value,
    };

    AdminService.post_new_school(data).then((response) => {
      if (response === undefined) {
        alert("School creation failed");
      } else if (response.success === true || response.message === "S") {
        document.getElementById("sibs").reset();
        this.getDashData();
        console.log(response.password);
        alert(
          response.message + "\nSchool Admin password is : " + response.password
        );
      } else {
        document.getElementById("sibs").reset();
        this.getDashData();
        alert(
          response.message + "\nSchool Admin password is : " + response.password
        );
        console.log(response.password);
      }
    });
  };
  handleSave = (event) => {
    event.preventDefault();
    var data = {
      schoolname: event.target.editschoolName.value,
      address: event.target.editschoolAddress.value,
      contacts: event.target.editschoolContactNumber.value,
      firstname: event.target.editpersonName.value,
      lastname: event.target.editsurname.value,
      email: event.target.editemail.value,
    };

    AdminService.update_school(this.state.schoolId, data).then((response) => {
      if (response === undefined) {
        alert("School creation failed");
      } else if (response.success === true || response.message === "S") {
        document.getElementById("sibs").reset();
        this.getDashData();
        console.log(response.password);
        alert(
          response.message + "\nSchool Admin password is : " + response.password
        );
      } else {
        document.getElementById("sibs").reset();
        this.getDashData();
        alert(
          response.message + "\nSchool Admin password is : " + response.password
        );
        console.log(response.password);
      }
    });
  };
  handleDelete = () => {
 
    AdminService.delete_school(this.state.schoolId)
      .then((response) => {
        alert(this.response)
        console.log(response);
        this.getDashData();
      })
      .catch((error) => {
        console.log(error);
        this.getDashData();
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
                      School Management
                    </p>
                  </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 80 }}>
                <div className="container col s7">
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

                <div className="container col s5">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12">
                        <h4 className="header2">
                          <b>Add School Details</b>
                        </h4>
                        <form onSubmit={this.handleSubmit} id="sibs">
                          <div className="row">
                            <div className="col s12">
                              <div className="row">
                                <div className="input-field col s5">
                                  <input
                                    id="schoolName"
                                    type="text"
                                    name="schoolName"
                                    required
                                  ></input>
                                  <label htmlFor="schoolName">
                                    School Name
                                  </label>
                                </div>
                                <div className="input-field col s7">
                                  <input
                                    id="schoolAddress"
                                    type="text"
                                    name="schoolAddress"
                                    required
                                  ></input>
                                  <label htmlFor="schoolAddress">
                                    School Address
                                  </label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="input-field col s4">
                                  <input
                                    id="schoolContactNumber"
                                    type="number"
                                    name="schoolContactNumber"
                                    required
                                  ></input>
                                  <label htmlFor="schoolContactNumber">
                                    Contact Number
                                  </label>
                                </div>
                              </div>

                              <h4 className="header2">
                                <b>School Admin Details</b>
                              </h4>
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
                              <div className="row">
                                <div className="input-field col s6">
                                  <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                  ></input>
                                  <label htmlFor="email">Email</label>
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
                <div id="modaledit" className="modal">
                  <div className="modal-content">
                    <h4 className="header2">
                      <b>Edit School Details</b>
                    </h4>
                    <form onSubmit={this.handleSave} id="sibs2">
                      <div className="row">
                        <div className="col s12">
                          <div className="row">
                            <div className="input-field col s5">
                              <input
                                id="editschoolName"
                                type="text"
                                name="editschoolName"
                                required
                              ></input>
                              <label htmlFor="editschoolName">
                                School Name
                              </label>
                            </div>
                            <div className="input-field col s7">
                              <input
                                id="editschoolAddress"
                                type="text"
                                name="editschoolAddress"
                                required
                              ></input>
                              <label htmlFor="editschoolAddress">
                                School Address
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s4">
                              <input
                                id="editschoolContactNumber"
                                type="number"
                                name="editschoolContactNumber"
                                required
                              ></input>
                              <label htmlFor="editschoolContactNumber">
                                Contact Number
                              </label>
                            </div>
                          </div>

                          <h4 className="header2">
                            <b>School Admin Details</b>
                          </h4>
                          <div className="row">
                            <div className="input-field col s2">
                              <select
                                name="edittitle"
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
                                id="editpersonName"
                                type="text"
                                name="editpersonName"
                                required
                              ></input>
                              <label htmlFor="editpersonName">First Name</label>
                            </div>
                            <div className="input-field col s5">
                              <input
                                id="editsurname"
                                type="text"
                                name="editsurname"
                                required
                              ></input>
                              <label htmlFor="editsurname">Surname</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s6">
                              <input
                                id="editemail"
                                type="email"
                                name="editemail"
                                required
                              ></input>
                              <label htmlFor="editemail">Email</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s6 offset-s6">
                            <button className="btn file-upload gradient-45deg-light-blue-cyan waves-effect waves-light right">
                              Save
                              <i className="material-icons right">save</i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div id="areyousure" className="modal width-250">
                  <div className="modal-content">
                    <h4 className="header2">Are you sure?</h4>
                  </div>
                  <div className="modal-footer">
                    <a
                      href="#!"
                      style={{ marginRight: 10 }}
                      className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                      onClick={this.handleDelete}
                    >
                      Yes
                    </a>
                    <a
                      href="#!"
                      className="modal-close btn gradient-45deg-red-pink waves-effect white-text"
                    >
                      No
                    </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolManagement);
