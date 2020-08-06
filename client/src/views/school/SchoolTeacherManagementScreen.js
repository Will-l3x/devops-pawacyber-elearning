import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import moment from "moment";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { SchoolService } from "../../services/school";
import { AuthService } from "../../services/authServices";
import TitleOptions from "../../components/TitleOptions";
import { Link } from "react-router-dom";
import UserGridComp from "../../components/UserGridComp";

class SchoolTeacherManagementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
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
      selectedTeacher: {
        teacherid: "",
        schoolid: "",
        firstname: "",
        lastname: "",
        userid: "",
        datejoined: "",
      },
      teacherId: "",
      view: "grid",
      selectedTitle: {},
    };
    this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
    this.onSelectTitle = this.onSelectTitle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  user = {};
  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    const teachers = [];
    SchoolService.get_all_teachers(this.user.schoolid).then((response) => {
      for (const teacher of response) {
        teacher.datejoined = moment(teacher.datejoined).format("LL");
        /*  teacher.actions = (
          <ul className="card-action-buttons2">
            <li>
              <a
                href="#!"
                className="btn-floating waves-effect waves-light light-blue"
                onClick={() => this.handleEdit(teacher)}
              >
                <i className="material-icons">create</i>
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="btn-floating waves-effect waves-light modal-trigger red accent-2"
                data-target="areyousure"
                onClick={this.setState({
                  teacherId: teacher.teacherId,
                })}
              >
                <i className="material-icons">delete</i>
              </a>
            </li>
          </ul>
              ); */
        teachers.push(teacher);
      }
      console.log(response);

      this.setState({
        rows: response,
      });
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
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      title: this.state.selectedTitle.value,
      vpassword: "pass@123",
      dob: event.target.dob.value,
    };
    let elem = document.getElementById("modaladd");
    let modal = new M.Modal(elem);
    modal.close();
    AuthService.register(registerAdmin).then((response) => {
      if (response === undefined) {
        alert("Teacher Registration Failed");
      } else if (response.success === false) {
        alert(response.message);
      } else {
        document.getElementById("sibs").reset();
        this.getDashData();
        console.log(response);
        alert(response.message);
      }
    });
  };

  handleEdit = (teacher) => {
    this.setState(
      {
        teacherId: teacher.teacherId,
        selectedTeacher: {
          teacherid: teacher.teacherId,
          schoolid: teacher.schoolid,
          firstname: teacher.firstname,
          lastname: teacher.lastname,
          userid: teacher.userid,
          datejoined: teacher.datejoined,
        },
      },
      () => {
        const elem = document.getElementById("modaledit");
        const modal = M.Modal.init(elem);
        this.modal = modal;
        console.log(this.state.selectedTeacher);
        modal.open();
      }
    );
  };

  handleSave = (event) => {
    event.preventDefault();
    this.modal.close();
    console.log(this.state.selectedTeacher);

    let elem = document.getElementById("modaledit");
    let modal = new M.Modal(elem);
    modal.close();

    SchoolService.update_teacher(
      this.state.teacherId,
      this.state.selectedTeacher
    )
      .then((response) => {
        if (response === undefined) {
          M.toast({
            html: `An error occured, update failed!`,
            classes: "red accent-2",
          });
        } else if (response.success === true || response.message === "S") {
          document.getElementById("sibs").reset();
          this.getDashData();
          M.toast({
            html: "Update Successfull",
            classes: "green accent-3",
          });
        } else {
          document.getElementById("sibs").reset();
          this.getDashData();
        }
      })
      .catch((error) => {
        console.log(error);
        M.toast({
          html: `An error occured, update failed!`,
          classes: "red accent-2",
        });
        this.getDashData();
      });
  };

  handleDelete = (event) => {
    event.preventDefault();
    SchoolService.delete_teacher(this.state.teacherId)
      .then((response) => {
        if (response.data.message === "An error occured") {
          M.toast({
            html: `An error occured, delete failed!`,
            classes: "red accent-2",
          });
          this.getDashData();
        } else {
          M.toast({
            html: `${response.data.message}, delete successfull`,
            classes: "green accent-3",
          });
          this.getDashData();
        }
        this.getDashData();
      })
      .catch((error) => {
        console.log(error);
        M.toast({
          html: `An error occured, delete failed!`,
          classes: "red accent-2",
        });
        this.getDashData();
      });
  };
  onChange = (e) => {
    e.preventDefault();
    const selectedTeacher = this.state.selectedTeacher;
    selectedTeacher[e.target.name] = e.target.value;
    this.setState({
      selectedTeacher,
    });
  };
  onSelectTitle = (selectedTitle) => {
    this.setState({ selectedTitle }, () =>
      console.log(this.state.selectedTitle)
    );
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
                  className="navbar nav-extended width-75"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p style={{ padding: "10px", fontSize: "16px" }}>
                        Teacher Management
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

                    <a
                      href="#!"
                      data-target="modaladd"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Add New Teacher"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">add_circle_outline</i>
                    </a>
                    <a
                      href="#!"
                      className={`tooltipped waves-effect right blue-text accent-2`}
                      data-tooltip="Refresh"
                      data-position="bottom"
                      onClick={() => this.getDashData()}
                      style={{
                        marginTop: "1%",
                        marginRight: "1%",
                      }}
                    >
                      <i className="material-icons">refresh</i>
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
                    <UserGridComp dashboard="schooladmin" rolename="teacher" />
                  </div>
                </div>
              </section>

              <div
                id="modaladd"
                className="modal modal-meeting min-width-800 border-radius-10"
              >
                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSubmit}
                  id="sibs"
                >
                  <h1 className="h1-meeting">
                    <i
                      className="material-icons"
                      style={{ transform: "translate(-3px, 4px)" }}
                    >
                      add_circle_outline
                    </i>
                    Teacher!
                  </h1>
                  <hr className="hr5" style={{ marginBottom: 30 }} />
                  <fieldset className="form-group row">
                    <div className="col s2">
                      <ReactFormLabel htmlFor="title" title="Title:" />
                      <TitleOptions
                        style={{ transform: "translateY(-1px)" }}
                        onSelectTitle={this.onSelectTitle}
                      />
                      <div
                        style={{ transform: "translateY(-3px)" }}
                        className="my-divider"
                      ></div>
                    </div>
                    <div className="col s5">
                      <ReactFormLabel htmlFor="firstname" title="Firstname:" />
                      <input
                        className="form-input input-meeting"
                        id="firstname"
                        type="text"
                        name="firstname"
                        required
                      />
                    </div>
                    <div className="col s5">
                      <ReactFormLabel htmlFor="lastname" title="Lastname:" />
                      <input
                        className="form-input input-meeting"
                        id="lastname"
                        type="text"
                        name="lastname"
                        required
                      />
                    </div>
                  </fieldset>
                  <fieldset className="form-group row">
                    <div className="col s6">
                      <ReactFormLabel htmlFor="email" title="Email:" />
                      <input
                        className="form-input input-meeting"
                        id="email"
                        type="email"
                        name="email"
                        required
                      />
                    </div>
                  </fieldset>
                  <fieldset className="form-group row">
                    <div className="col s6">
                      <ReactFormLabel htmlFor="dob" title="Date Of Birth:" />
                      <input
                        className="form-input input-meeting"
                        id="dob"
                        type="date"
                        name="dob"
                        required
                      />
                    </div>
                    <div className="col s6">
                      <ReactFormLabel htmlFor="grade" title="Grade:" />

                      <input
                        className="form-input input-meeting"
                        id="grade"
                        type="number"
                        min="0"
                        max="12"
                        name="grade"
                        required
                      />
                    </div>
                  </fieldset>
                  <div className="form-group">
                    <input
                      id="formButton"
                      className="btn gradient-45deg-light-blue-cyan border-radius-5"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>

              <div
                id="modaledit"
                className="modal modal-meeting border-radius-10"
              >
                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSave}
                  id="sibs2"
                >
                  <h1 className="h1-meeting">
                    <i
                      className="material-icons"
                      style={{ transform: "translate(-3px, 4px)" }}
                    >
                      create
                    </i>
                    Edit Teacher Details!
                  </h1>

                  <hr className="hr5" style={{ marginBottom: 30 }} />
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="firstname" title="Firstname:" />
                    <input
                      id="firstname2"
                      type="text"
                      className="form-input input-meeting"
                      name="firstname"
                      onChange={this.onChange}
                      value={this.state.selectedTeacher.firstname}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="lastname" title="Lastname:" />
                    <input
                      id="lastname2"
                      type="text"
                      className="form-input input-meeting"
                      name="lastname"
                      onChange={this.onChange}
                      value={this.state.selectedTeacher.lastname}
                      required
                    />
                  </fieldset>
                  <div className="form-group">
                    <input
                      id="formButton2"
                      className="btn gradient-45deg-light-blue-cyan border-radius-5"
                      type="submit"
                      value="Save"
                    />
                  </div>
                </form>
              </div>
              <div id="areyousure" className="modal width-250">
                <div className="modal-content">
                  <h4 className="header2">Are you sure?</h4>
                </div>
                <div className="modal-footer">
                  <Link
                    to="#!"
                    style={{ marginRight: 10 }}
                    className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                    onClick={this.handleDelete}
                  >
                    Yes
                  </Link>
                  <Link
                    to="#!"
                    className="modal-close btn gradient-45deg-red-pink waves-effect white-text"
                  >
                    No
                  </Link>
                </div>
              </div>
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

class ReactFormLabel extends React.Component {
  render() {
    return (
      <label className="label-meeting" htmlFor={this.props.htmlFor}>
        {this.props.title}
      </label>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolTeacherManagementScreen);
