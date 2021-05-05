import React, { Component } from "react";
import { connect } from "react-redux";
import { AdminService } from "../services/admin";
import "../assets/css/list-grid-comp.css";
import dp from "../assets/images/avatar/avatar-11.png";
import avatar from "../assets/images/gallary/not_found.gif";
import { Link } from "react-router-dom";
import moment from "moment";
import { SchoolService } from "../services/school";
import { TeacherService } from "../services/teacher";
import User from "./User";

class UserGridComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studs: [],
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      users: [],
      currentPageNumber: 1,
      searchText: "",
      pages: [],
      allUsers: [],
    };
  }
  componentDidMount() {
    this.gettingUsers();
  }
  gettingUsers = () => {
    const dashboard = this.props.dashboard;
    const rolename = this.props.rolename;
    if (dashboard === "admin") {
      if (rolename === "student") {
        AdminService.get_all_students().then((response) => {
          console.log(response);

          const allUsers = [];
          const allUserz = response === undefined ? [] : response;
          for (const uza of allUserz) {
            uza.name = uza.firstname + " " + uza.lastname;
            uza.rolename = "Student";
            allUsers.push(uza);
          }

          allUsers.sort((a, b) => new Date(b.lastname) - new Date(a.lastname));

          let pages = [];
          let perPage = 12;
          const totalPageCount = Math.ceil(allUsers.length / perPage);

          for (var i = 1; i <= totalPageCount; i++) {
            pages.push(i);
          }

          const users = this.pageArraySplit(allUsers, {
            currentPageNumber: this.state.currentPageNumber,
            perPage,
          });

          this.setState({ pages, users, allUsers });
        });
      }
      if (rolename === "subadmin") {
        AdminService.get_subadmins()
          .then((response) => {
            const allUsers = [];
            const allUserz = response === undefined ? [] : response;
            for (const uza of allUserz) {
              uza.name = uza.firstname + " " + uza.lastname;
              uza.rolename = "Sub-Adminstrator";
              allUsers.push(uza);
            }

            allUsers.sort(
              (a, b) => new Date(b.lastname) - new Date(a.lastname)
            );

            let pages = [];
            let perPage = 12;
            const totalPageCount = Math.ceil(allUsers.length / perPage);

            for (var i = 1; i <= totalPageCount; i++) {
              pages.push(i);
            }

            const users = this.pageArraySplit(allUsers, {
              currentPageNumber: this.state.currentPageNumber,
              perPage,
            });

            this.setState({ pages, users, allUsers });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    if (dashboard === "schooladmin") {
      if (rolename === "teacher") {
        SchoolService.get_all_teachers(this.state.user.schoolid)
          .then((response) => {
            console.log(response);
            const allUsers = [];
            const allUserz = response === undefined ? [] : response;
            for (const uza of allUserz) {
              uza.name = uza.firstname + " " + uza.lastname;
              uza.rolename = "Teacher";
              allUsers.push(uza);
            }

            allUsers.sort(
              (a, b) => new Date(b.lastname) - new Date(a.lastname)
            );

            let pages = [];
            let perPage = 12;
            const totalPageCount = Math.ceil(allUsers.length / perPage);

            for (var i = 1; i <= totalPageCount; i++) {
              pages.push(i);
            }

            const users = this.pageArraySplit(allUsers, {
              currentPageNumber: this.state.currentPageNumber,
              perPage,
            });

            this.setState({ pages, users, allUsers });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (rolename === "student") {
        SchoolService.get_all_students(this.state.user.schoolid).then(
          (response) => {
            const allUsers = [];
            const allUserz = response === undefined ? [] : response;
            for (const uza of allUserz) {
              uza.name = uza.firstname + " " + uza.lastname;
              uza.rolename = "Student";
              allUsers.push(uza);
            }

            allUsers.sort(
              (a, b) => new Date(b.lastname) - new Date(a.lastname)
            );

            let pages = [];
            let perPage = 12;
            const totalPageCount = Math.ceil(allUsers.length / perPage);

            for (var i = 1; i <= totalPageCount; i++) {
              pages.push(i);
            }

            const users = this.pageArraySplit(allUsers, {
              currentPageNumber: this.state.currentPageNumber,
              perPage,
            });

            this.setState({ pages, users, allUsers });
          }
        );
      }
    }
    if (dashboard === "teacher") {
      const rolename = "student";
      if (rolename === "student") {
        TeacherService.get_all_courses(this.state.user.userid)
          .then((response) => {
            const data = response === undefined ? [] : response;
            const courses = [];
            const del_courses = [];
            const students = [];

            for (const course of data) {
              if (course.status === "deleted") {
                del_courses.push(course);
              } else {
                courses.push(course);
              }
            }
            for (const course of courses) {

             TeacherService.get_all_students(course.classId)

                .then((response) => {

                  if (response === undefined) {
                    console.log(response);
                  } else {
                    for (const student of response) {
                      student.dob = moment(student.dob).format("LL");
                      student.datejoined = moment(student.datejoined).format(
                        "LL"
                      );
                      students.push(student);
                    }
                    const allUsers = [];
                    const allUserz = students;
                    for (const uza of allUserz) {
                      uza.name = uza.firstname + " " + uza.lastname;
                      uza.rolename = "Student";
                      allUsers.push(uza);
                    }
      
                    allUsers.sort(
                      (a, b) => new Date(b.lastname) - new Date(a.lastname)
                    );
      
                    let pages = [];
                    let perPage = 12;
                    const totalPageCount = Math.ceil(allUsers.length / perPage);
      
                    for (var i = 1; i <= totalPageCount; i++) {
                      pages.push(i);
                    }
      
                    const users = this.pageArraySplit(allUsers, {
                      currentPageNumber: this.state.currentPageNumber,
                      perPage,
                    });
      
                    this.setState({ pages, users, allUsers });

                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  searchText = (res) => {
    this.setState({ searchText: res });
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
      this.gettingUsers();
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
      this.gettingUsers();
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
      this.gettingUsers();
    });
  };
  render() {
    return (
      <div>
        <Search searchText={this.searchText} />
        <main className="row" style={{ minHeight: 350 }}>
          {this.state.users.filter((user) =>
            user.name
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())
          ).length < 1 ? (
            <div className="row">
              <div className="divider" style={{ marginTop: 30 }}></div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                <img
                  src={avatar}
                  alt="Avatar"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                  }}
                ></img>
                <br />
                <br />
                No Results Found!
              </p>
            </div>
          ) : this.state.searchText === "" ? (
            this.state.users
              .filter((user) =>
                user.name
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              )
              .map((user, index) => (
                <User
                  key={index}
                  index={index}
                  name={user.name}
                  firstname={user.firstname}
                  lastname={user.lastname}
                  email={user.email}
                  pic={dp}
                  dob={user.dob}
                  datejoined={user.datejoined}
                  enrolmentkey={user.enrolmentkey}
                  gradeid={user.gradeid}
                  rolename={user.rolename}
                />
              ))
          ) : (
            this.state.allUsers
              .filter((user) =>
                user.name
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              )
              .map((user, index) => (
                <User
                  key={index}
                  index={index}
                  name={user.name}
                  firstname={user.firstname}
                  lastname={user.lastname}
                  email={user.email}
                  pic={user.pic}
                  dob={user.dob}
                  datejoined={user.datejoined}
                  enrolmentkey={user.enrolmentkey}
                  gradeid={user.gradeid}
                  rolename={user.rolename}
                />
              ))
          )}
        </main>
        <div className="divider" style={{ marginTop: 30 }}></div>
        <div className="row">
          <div className="col l12 center-align" style={{ paddingTop: 20 }}>
            <ul className="pagination">
              <li
                className={
                  this.state.currentPageNumber === 1 ||
                  this.state.pages.length < 1 ||
                  this.state.searchText !== ""
                    ? "disabled pointer-events-none"
                    : "waves-effect"
                }
              >
                <Link
                  className={
                    this.state.currentPageNumber === 1 ||
                    this.state.pages.length < 1 ||
                    this.state.searchText !== ""
                      ? "disabled pointer-events-none"
                      : ""
                  }
                  onClick={this.handlePrevClick}
                  rel="noopener noreferer"
                  to="#!"
                >
                  <i className="material-icons">chevron_left</i>
                </Link>
              </li>
              {this.state.pages.length < 1 || this.state.searchText !== "" ? (
                <li className="active">
                  <Link rel="noopener noreferer" to="#!">
                    {1}
                  </Link>
                </li>
              ) : (
                this.state.pages.map((page) => {
                  if (page === this.state.currentPageNumber) {
                    return (
                      <li key={page} className="active">
                        <Link
                          onClick={() => this.handlePageClick(page)}
                          rel="noopener noreferer"
                          to="#!"
                        >
                          {page}
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <li key={page}>
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            this.handlePageClick(page);
                          }}
                          rel="noopener noreferer"
                          to="#!"
                        >
                          {page}
                        </Link>
                      </li>
                    );
                  }
                })
              )}
              <li
                className={
                  this.state.currentPageNumber === this.state.pages.length ||
                  this.state.pages.length < 1 ||
                  this.state.searchText !== ""
                    ? "disabled pointer-events-none"
                    : "waves-effect"
                }
              >
                <Link
                  onClick={this.handleNextClick}
                  className={
                    this.state.currentPageNumber === this.state.pages.length ||
                    this.state.pages.length < 1 ||
                    this.state.searchText !== ""
                      ? "disabled pointer-events-none"
                      : ""
                  }
                  rel="noopener noreferer"
                  to="#!"
                >
                  <i className="material-icons">chevron_right</i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ searchText: e.target.value }, () => {
      this.props.searchText(this.state.searchText);
    });
  }

  render() {
    return (
      <form className="Search" onSubmit={(e) => e.preventDefault()}>
        <div
          className="white border-radius-10 z-depth-2"
          style={{ height: 46, marginBottom: 30 }}
        >
          <div className="left" style={{ width: "90%", marginLeft: 7 }}>
            <input
              type="text"
              className="Search-box white"
              placeholder="Filter names"
              onChange={this.handleChange}
            />
          </div>
          <div
            className="justify-center white search-ico"
            style={{ paddingTop: 10, borderTopRightRadius: 10 }}
          >
            <i className="material-icons left">search</i>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserGridComp);
