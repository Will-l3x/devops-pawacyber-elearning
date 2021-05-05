import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AdminService } from "../../services/admin";
import { Link } from "react-router-dom";
import SchoolGridComp from "./SchoolGridComp";
//import TitleOptions from "../../components/TitleOptions";

class SchoolManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      schoolId: "",

      selectedTitle: {},
      selectedSchool: {
        schoolname: "",
        address: "",
        contacts: "",
        email: "",
      },
      title: "Mr",
      columns: [
        {
          label: "ID",
          field: "schoolId",
          sort: "asc",
          width: "5%",
        },
        {
          label: "School Name",
          field: "schoolname",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
          width: "35%",
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
          width: "10%",
        },
        {
          label: "Action",
          field: "actions",
          width: "15%",
        },
      ],
      rows: [],
      allSchools: [],
      schools: [],
      currentPageNumber: 1,
      pages: [],
      options: [],
      view: "grid",
      updated: false,
    };
    this.onSelectTitle = this.onSelectTitle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.setSchoolId = this.setSchoolId.bind(this);
  }
  modal;

  handleTitleDropdownChange(event) {
    this.setState({ title: event.target.value });
  }

  componentDidMount() {
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    const schoolz = [];
    AdminService.get_all_schools()
      .then((response) => {
        const allSchools = response === undefined ? [] : response;
        allSchools.sort(
          (a, b) => new Date(b.schoolname) - new Date(a.schoolname)
        );

        let pages = [];
        let perPage = 12;
        const totalPageCount = Math.ceil(allSchools.length / perPage);

        for (var i = 1; i <= totalPageCount; i++) {
          pages.push(i);
        }

        const schools = this.pageArraySplit(allSchools, {
          currentPageNumber: this.state.currentPageNumber,
          perPage,
        });

        for (const school of allSchools) {
          school.actions = (
            <ul className="card-action-buttons2">
              <li>
                <a
                  href="#!"
                  className="btn-floating waves-effect waves-light light-blue"
                  onClick={(e) => {
                    e.preventDefault();
                    this.handleEdit(school);
                  }}
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
                    schoolId: school.schoolId,
                  })}
                >
                  <i className="material-icons">delete</i>
                </a>
              </li>
            </ul>
          );
          schoolz.push(school);
        }

        this.setState({ pages, allSchools, schools, rows: schoolz });
      })
      .catch((error) => {
        this.setState({ rows: [] });
      });
  }

  handleEdit = (school) => {
    this.setState(
      {
        schoolId: school.schoolId,
        selectedSchool: {
          address: school.address,
          contacts: school.contacts,
          datejoined: school.datejoined,
          email: school.email,
          enrolmentkey: school.enrolmentkey,
          schoolId: school.schoolId,
          schoolname: school.schoolname,
        },
      },
      () => {
        if (this.modal !== undefined) {
          this.modal.close();
        }
        const elem = document.getElementById("modaledit");
        const modal = M.Modal.init(elem);
        this.modal = modal;
        modal.open();
      }
    );
  };

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

    let elem = document.getElementById("modaladd");
    let modal = new M.Modal(elem);
    modal.close();

    AdminService.post_new_school(data).then((response) => {
      if (response === undefined) {
        M.toast({
          html: "School creation failed",
          classes: "red accent-2",
        });
      } else if (response.success === true || response.message === "S") {
        document.getElementById("sibs").reset();
        this.getDashData();
        this.setState({ updated: true });
        M.toast({
          html:
            response.message +
            "\nSchool Admin password is : " +
            response.password,
          classes: "green ",
        });
      } else {
        document.getElementById("sibs").reset();
        this.getDashData();
        this.setState({ updated: true });
        M.toast({
          html:
            response.message +
            "\nSchool Admin password is : " +
            response.password,
          classes: "green",
        });
      }
    });
  };

  handleSave = (event) => {
    event.preventDefault();
    this.modal.close();
    var data = {
      schoolname: event.target.schoolname.value,
      address: event.target.address.value,
      contacts: event.target.contacts.value,
    };

    let elem = document.getElementById("modaledit");
    let modal = new M.Modal(elem);
    modal.close();

    AdminService.update_school(this.state.schoolId, data)
      .then((response) => {
        if (response === undefined) {
          M.toast({
            html: `An error occured, update failed!`,
            classes: "red accent-2",
          });
        } else if (response.success === true || response.message === "S") {
          this.getDashData();
          this.setState({ updated: true });
          M.toast({
            html: "Update Successfull",
            classes: "green accent-3",
          });
        } else {
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
    AdminService.delete_school(this.state.schoolId)
      .then((response) => {
        console.log(response);
        if (response.data.message === "An error occured") {
          M.toast({
            html: `An error occured, delete failed!`,
            classes: "red accent-2",
          });
          this.getDashData();
        } else {
          this.setState({ updated: true });
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
    const selectedSchool = this.state.selectedSchool;
    selectedSchool[e.target.name] = e.target.value;
    this.setState({
      selectedSchool,
    });
  };

  onSelectTitle = (selectedTitle) => {
    this.setState({ selectedTitle }, () =>
      console.log(this.state.selectedTitle)
    );
  };

  setSchoolId = (schoolId) => {
    this.setState({ schoolId });
  };

  pageArraySplit = (array, pagingOptions) => {
    const currentPageNumber = pagingOptions.currentPageNumber;
    const perPage = pagingOptions.perPage;
    const startingIndex = (currentPageNumber - 1) * perPage;
    const endingIndex = startingIndex + perPage;
    return array.slice(startingIndex, endingIndex);
  };

  handlePageClick = async (pageNumber) => {
    this.setState({ currentPageNumber: parseInt(pageNumber) }, () => {
      this.gettingSchools();
    });
  };

  handlePrevClick = async (e) => {
    e.preventDefault();
    const pageNumber =
      this.state.currentPageNumber === this.state.pages.length ||
      this.state.pages.length < 1
        ? this.state.currentPageNumber
        : this.state.currentPageNumber - 1;
    this.setState({ currentPageNumber: pageNumber }, () => {
      this.gettingSchools();
    });
  };

  handleNextClick = async (e) => {
    e.preventDefault();
    const pageNumber =
      this.state.currentPageNumber === this.state.pages.length ||
      this.state.pages.length < 1
        ? this.state.currentPageNumber
        : this.state.currentPageNumber + 1;
    this.setState({ currentPageNumber: pageNumber }, () => {
      this.gettingSchools();
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
            <LeftSidebar />

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75 image-bg-1"
                  style={{
                    position: "fixed",
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
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
                        School Management
                      </p>
                    </div>
                    <a
                      href="#!"
                      data-target="modaladd"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Add New School"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">add_circle_outline</i>
                    </a>
                  </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  <div
                    className={`padding-3`}
                  >
                    <SchoolGridComp
                      handleEdit={this.handleEdit}
                      setSchoolId={this.setSchoolId}
                      handlePageClick={this.handlePageClick}
                      handlePrevClick={this.handlePrevClick}
                      handleNextClick={this.handleNextClick}
                      pages={this.state.pages}
                      currentPageNumber={this.state.currentPageNumber}
                      schools={this.state.schools}
                      allSchools={this.state.allSchools}
                    />
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
                    School!
                  </h1>
                  <hr className="hr5" style={{ marginBottom: 30 }} />
                  <fieldset className="form-group row">
                    <div className="col s7">
                      <ReactFormLabel
                        htmlFor="schoolName"
                        title="School Name:"
                      />
                      <input
                        className="form-input input-meeting"
                        id="schoolName"
                        type="text"
                        name="schoolName"
                        required
                      />
                    </div>
                    <div className="col s5">
                      <ReactFormLabel
                        htmlFor="schoolContactNumber"
                        title="Contact Number:"
                      />
                      <input
                        className="form-input input-meeting"
                        id="schoolContactNumber"
                        type="text"
                        name="schoolContactNumber"
                        required
                      />
                    </div>
                  </fieldset>
                  <fieldset className="form-group row">
                    <div className="col s12">
                      <ReactFormLabel
                        htmlFor="schoolAddress"
                        title="Address:"
                      />
                      <textarea
                        id="schoolAddress"
                        name="schoolAddress"
                        className="form-textarea textarea-meeting"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </fieldset>
                  <h4 className="header2">
                    <b>School Admin Details</b>
                  </h4>

                  <fieldset className="form-group row">
                    <div className="col s6">
                      <ReactFormLabel htmlFor="personName" title="Firstname:" />
                      <input
                        className="form-input input-meeting"
                        id="personName"
                        type="text"
                        name="personName"
                        required
                      />
                    </div>
                    <div className="col s6">
                      <ReactFormLabel htmlFor="surname" title="Lastname:" />

                      <input
                        className="form-input input-meeting"
                        id="surname"
                        type="text"
                        name="surname"
                        required
                      />
                    </div>
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
                    Edit School Details!
                  </h1>

                  <hr className="hr5" style={{ marginBottom: 30 }} />
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="schoolname" title="School Name:" />
                    <input
                      id="schoolname"
                      type="text"
                      className="form-input input-meeting"
                      name="schoolname"
                      onChange={this.onChange}
                      value={this.state.selectedSchool.schoolname}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="address" title="Address:" />

                    <textarea
                      id="address"
                      name="address"
                      className="form-textarea textarea-meeting"
                      onChange={this.onChange}
                      value={this.state.selectedSchool.address}
                      rows="3"
                      required
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="contact" title="Contacts:" />
                    <input
                      id="contacts"
                      type="text"
                      name="contacts"
                      className="form-input input-meeting"
                      onChange={this.onChange}
                      value={
                        this.state.selectedSchool.contacts === null
                          ? ""
                          : this.state.selectedSchool.contacts
                      }
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

class ReactFormLabel extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolManagement);
