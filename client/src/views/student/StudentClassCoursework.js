import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import M from "materialize-css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import moment from "moment";
import { StudentService } from "../../services/student";

class StudentClassCoursework extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      uploadFileId: "",
      to: "",
      course:
        JSON.parse(localStorage.getItem("course")) === null
          ? {}
          : JSON.parse(localStorage.getItem("course")),
      assignment: {},
      assignments_: [],

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
      assignments: [],
      assignments_: [],
    };
    this.removeMaterialHandler.bind(this);
    this.removeItemHandler.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    this.getAssignments();
  }
  getAssignments = () => {
    StudentService.getAssignments(this.state.assignment.classId)
      .then((response) => {
        this.setState({ assignments: response }, () => {
          let pages = [];
          let perPage = 5;
          const totalPageCount = Math.ceil(
            this.state.assignments.length / perPage
          );

          for (var i = 1; i <= totalPageCount; i++) {
            pages.push(i);
          }

          const assignments_ = this.pageArraySplit(this.state.assignments, {
            currentPageNumber: this.state.currentPageNumber,
            perPage,
          });
          this.setState({ pages, assignments_ });
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

  pageArraySplit = (array, pagingOptions) => {
    const currentPageNumber = pagingOptions.currentPageNumber;
    const perPage = pagingOptions.perPage;
    const startingIndex = (currentPageNumber - 1) * perPage;
    const endingIndex = startingIndex + perPage;
    return array.slice(startingIndex, endingIndex);
  };
  handlePageClick = async (pageNumber) => {
    this.setState({ currentPageNumber: parseInt(pageNumber) }, () => {
      this.getAssignments();
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
      this.getAssignments();
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
      this.getAssignments();
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
                            {this.state.course.classname}
                          </div>
                          <div className="submission__status">
                            {"Date: " + moment(new Date()).format("LL")}
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
            {this.props.submission.assignmentname}
          </div>
          <div className="submission__status">
            {"Due Date: " +
              moment(new Date(this.props.submission.datesubmitted)).format(
                "LL"
              )}
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label class="submission__group__label" for="mark">
              Mark
            </label>
            <div name="mark" class="submission__group__item">
              {this.props.submission.mark}
            </div>
          </div>
          <div className="col s6">
            <label class="submission__group__label" for="total">
              Total
            </label>
            <div name="total" class="submission__group__item">
              100
            </div>
          </div>
          <div className="col s12">
            <label class="submission__group__label" for="comment">
              Comment
            </label>
            <div name="comment" class="submission__group__item">
              {this.props.submission.comment}
              Very good analysis. Keep it up!
            </div>
          </div>
        </div>
        
        <div style={{marginTop: 25}} className="submission__footer">
          <div className="submission__status">
            {/* {this.props.submission.submitted
              ? "Submitted " +
                moment(new Date(this.props.submission.datesubmitted)).format(
                  "LL"
                )
              : "Upload the file"} */}
            Upload File
          </div>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentClassCoursework);
