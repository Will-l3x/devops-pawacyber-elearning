import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import M from "materialize-css";
import Footer from "../footer";
import Header from "../header";
import { TeacherService } from "../../services/teacher";
import moment from "moment";

class StudentSubmissionsScreen extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      uploadFileId: "",
      to: "",
      assignment:
        JSON.parse(localStorage.getItem("assignment")) === null
          ? {}
          : JSON.parse(localStorage.getItem("assignment")),
      submissions_: [],

      classwork: [
        {
          id: "2",
          assignmentid: "2",
          studentid: "2",
          datesubmitted: "03/03/2021",
          firstname: "Student",
          lastname: "Name",
        },
        {
          id: "3",
          assignmentid: "3",
          studentid: "3",
          datesubmitted: "03/03/2021",
          firstname: "Student",
          lastname: "Name",
        },
        {
          id: "6",
          assignmentid: "6",
          studentid: "6",
          datesubmitted: "03/03/2021",
          firstname: "Student",
          lastname: "Name",
        },
      ],
      currentPageNumber: 1,
      searchText: "",
      pages: [],
      submissions: [],
    };
    this.removeMaterialHandler.bind(this);
    this.removeItemHandler.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    this.getSubmissions();
  }
  getSubmissions = () => {
    TeacherService.getSubmissions(this.state.assignment.assignmentId)
      .then((response) => {
        console.log(response);
        this.setState({ submissions: response }, () => {
          for (const submission of response) {
            this.getStudentDetails(submission.studentid);
          }
          let pages = [];
          let perPage = 5;
          const totalPageCount = Math.ceil(
            this.state.submissions.length / perPage
          );

          for (var i = 1; i <= totalPageCount; i++) {
            pages.push(i);
          }

          const submissions_ = this.pageArraySplit(this.state.submissions, {
            currentPageNumber: this.state.currentPageNumber,
            perPage,
          });

          this.setState({ pages, submissions_ });
        });
      })
      .catch((error) => {
        M.toast({
          html: "Failed to find assignment folder",
          classes: "red accent-2",
        });
        console.log(error);
      });
  };

  removeMaterialHandler = () => {};
  removeItemHandler = () => {};

  getStudentDetails = (studentid) => {
    TeacherService.getStudent(studentid)
      .then((response) => {
        const submissions = this.state.submissions.map((el) =>
          el.studentid === response.studentId ? { ...el, response } : el
        );
        this.setState({
          submissions,
        });
      })
      .catch((error) => {
        M.toast({
          html: "Failed get student details",
          classes: "red accent-2",
        });
        console.log(error);
      });
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
       let pages = [];
       let perPage = 4;
       const totalPageCount = Math.ceil(
         this.state.submissions.length / perPage
       );

       for (var i = 1; i <= totalPageCount; i++) {
         pages.push(i);
       }

       const submissions_ = this.pageArraySplit(this.state.submissions, {
         currentPageNumber: this.state.currentPageNumber,
         perPage,
       });

       this.setState({ pages, submissions_ });
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
      let pages = [];
       let perPage = 4;
       const totalPageCount = Math.ceil(
         this.state.submissions.length / perPage
       );

       for (var i = 1; i <= totalPageCount; i++) {
         pages.push(i);
       }

       const submissions_ = this.pageArraySplit(this.state.submissions, {
         currentPageNumber: this.state.currentPageNumber,
         perPage,
       });

       this.setState({ pages, submissions_ });
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
     let pages = [];
       let perPage = 4;
       const totalPageCount = Math.ceil(
         this.state.submissions.length / perPage
       );

       for (var i = 1; i <= totalPageCount; i++) {
         pages.push(i);
       }

       const submissions_ = this.pageArraySplit(this.state.submissions, {
         currentPageNumber: this.state.currentPageNumber,
         perPage,
       });

       this.setState({ pages, submissions_ });
    });
  };
   
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <LeftSidebar />

            <section id="content">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75 image-bg-1"
                  style={{ position: "fixed" }}
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
                        Students' Classwork
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="row" style={{ paddingTop: "7%", width: "90%" }}>
                  <div className="col s12">
                    <div className="card border-radius-10 z-depth-5">
                      <div className="submission padding-3">
                        <div className="submission__header">
                          <div className="submission__title left">
                            {this.state.assignment.assignmentname}
                          </div>
                          <div className="submission__status">
                            {"Due Date: "+moment(
                              new Date()
                            ).format("LL")}
                          </div>
                        </div>
                       </div>
                    </div>
                  </div>
                  {this.state.classwork.map((submission, i) => (
                    <div key={i} className="col s12 m12 l6">
                      <div className="card border-radius-10 z-depth-5">
                        <StudentMark key={i} submission={submission} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider" style={{ marginTop: 30 }}></div>
                <div className="row">
                  <div
                    className="col l12 center-align"
                    style={{ paddingTop: 20 }}
                  >
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
                        <a
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
                        </a>
                      </li>
                      {this.state.pages.length < 1 ||
                      this.state.searchText !== "" ? (
                        <li className="active">
                          <a rel="noopener noreferer" to="#!">
                            {1}
                          </a>
                        </li>
                      ) : (
                        this.state.pages.map((page) => {
                          if (page === this.state.currentPageNumber) {
                            return (
                              <li key={page} className="active">
                                <a
                                  onClick={() => this.handlePageClick(page)}
                                  rel="noopener noreferer"
                                  to="#!"
                                >
                                  {page}
                                </a>
                              </li>
                            );
                          } else {
                            return (
                              <li key={page}>
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.handlePageClick(page);
                                  }}
                                  rel="noopener noreferer"
                                  to="#!"
                                >
                                  {page}
                                </a>
                              </li>
                            );
                          }
                        })
                      )}
                      <li
                        className={
                          this.state.currentPageNumber ===
                            this.state.pages.length ||
                          this.state.pages.length < 1 ||
                          this.state.searchText !== ""
                            ? "disabled pointer-events-none"
                            : "waves-effect"
                        }
                      >
                        <a
                          onClick={this.handleNextClick}
                          className={
                            this.state.currentPageNumber ===
                              this.state.pages.length ||
                            this.state.pages.length < 1 ||
                            this.state.searchText !== ""
                              ? "disabled pointer-events-none"
                              : ""
                          }
                          rel="noopener noreferer"
                          to="#!"
                        >
                          <i className="material-icons">chevron_right</i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

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
class StudentMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: null,
      enableMarkEdit: false,
      enableCommentEdit: false,
      chars_left: 139,
      max_chars: 139,
      error: null,
    };
  }

  componentDidMount() {
    const submission = this.props.submission;
    this.setState({ submission });
  }

  enableCommentEdit = (e) => {
    e.preventDefault();
    this.setState({
      enableCommentEdit: true,
    });
  };
  saveComment = (e) => {
    e.preventDefault();
    this.setState({
      enableCommentEdit: false,
    });
  };
  enableMarkEdit = (e) => {
    e.preventDefault();
    this.setState({
      enableMarkEdit: true,
    });
  };
  saveMark = (e) => {
    e.preventDefault();
    this.setState({
      enableMarkEdit: false,
    });
  };
  markAssignment = (e) => {
    e.preventDefault();
    const studentMarks = {
      student_assignmentid: this.props.submission.assignmentid,
      mark: e.target.mark.value,
    };
    TeacherService.markAssignment(studentMarks)
      .then((response) => {
        console.log(response);
        M.toast({
          html: "Student marks have been awarded successfully!",
          classes: "green accent-3",
        });
      })
      .catch((error) => {
        M.toast({
          html: "Failed to award mark to student's work",
          classes: "red accent-2",
        });
        console.log(error);
      });
  };
  commentAssignment = (e) => {
    e.preventDefault();
    const studentMarks = {
      student_assignmentid: this.props.submission.assignmentid,
      comment: e.target.comment.value,
    };
    TeacherService.commentAssignment(studentMarks)
      .then((response) => {
        console.log(response);
        M.toast({
          html: "Comments have been added successfully!",
          classes: "green accent-3",
        });
      })
      .catch((error) => {
        M.toast({
          html: "Failed to comment to student's work",
          classes: "red accent-2",
        });
        console.log(error);
      });
  };

  handleChange = (e) => {
    var input = e.target.value;
    const max_chars = this.state.max_chars;
    this.setState({
      chars_left: max_chars - input.length,
    });
  };

  render() {
    return (
      <div className="submission padding-3">
        <div className="submission__header">
          <div className="submission__title left">
            {this.props.submission.firstname +
              " " +
              this.props.submission.lastname}
          </div>
          <div className="submission__status">
            {"Submitted " +
              moment(new Date(this.props.submission.datesubmitted)).format(
                "LL"
              )}
            {/* {error === null ? datesubmitted : error.message} */}
          </div>
        </div>
        <form
          className="row mark-comment"
          data-toggle="validator"
          data-focus="false"
          onSubmit={this.saveMark}
        >
          <div className="col s5">
            <fieldset className="form-group">
              <ReactFormLabel htmlFor="mark" title="Mark:" />
              <input
                className="validate"
                type="text"
                name="mark"
                required
                onChange={this.handleChange.bind(this)}
              ></input>
            </fieldset>
          </div>

          <div className="card--button col s2">
            {this.state.enableMarkEdit ? (
              <button
                style={{
                  width: 40,
                  transform: "translateY(45px)",
                }}
                type="submit"
                className="green accent-3 border-radius-5"
              >
                <svg
                  style={{
                    marginRight: 0,
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-save"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </button>
            ) : (
              <button
                style={{
                  width: 40,
                  transform: "translateY(45px)",
                  backgroundColor: "rgb(0 0 0 / 12%)",
                }}
                className="border-radius-5"
                onClick={this.enableMarkEdit}
              >
                <svg
                  style={{
                    marginRight: 0,
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-edit"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            )}
          </div>
          <div className="col s5">
            <fieldset className="form-group">
              <ReactFormLabel htmlFor="total" title="Total:" />
              <input
                id="total"
                className="total validate"
                type="text"
                name="total"
                readOnly
                defaultValue={100 /**this.props.submission.total */}
              ></input>
            </fieldset>
          </div>
        </form>
        <form
          className="row mark-comment"
          data-toggle="validator"
          data-focus="false"
          onSubmit={this.saveComment}
        >
          <div className="col s10">
            <fieldset className="form-group">
              <ReactFormLabel htmlFor="comment" title="Comment:" />
              <input
                className="validate"
                type="text"
                name="comment"
                required
                onChange={this.handleChange.bind(this)}
              ></input>
              <p>Characters Left: {this.state.chars_left}</p>
            </fieldset>
          </div>
          <div className="card--button col s2">
            {this.state.enableCommentEdit ? (
              <button
                style={{
                  width: 40,
                  transform: "translateY(45px)",
                }}
                type="submit"
                className="green accent-3 border-radius-5"
              >
                <svg
                  style={{
                    marginRight: 0,
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-save"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </button>
            ) : (
              <button
                style={{
                  width: 40,
                  transform: "translateY(45px)",
                  backgroundColor: "rgb(0 0 0 / 12%)",
                }}
                className="border-radius-5"
                onClick={this.enableCommentEdit}
              >
                <svg
                  style={{
                    marginRight: 0,
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-message-square"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            )}
          </div>
        </form>
        <div className="submission__footer">
          <div className="submission__status">Download File</div>
        </div>
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
)(StudentSubmissionsScreen);
