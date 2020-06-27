import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import AdminActions from "../../actions/admin";
import CounterActions from "../../actions/counter";
import { Link, Redirect } from "react-router-dom";

export class CoursesCard extends Component {
  constructor() {
    super();
    this.state = {
      admin: {
        id: "3e23e23",
        name: "Pawa admin",
      },
      currentPageNumber: 1,
    };
    this.handleNextClick.bind(this);
    this.handlePageClick.bind(this);
    this.handlePrevClick.bind(this);
    this.handleCourseViewClick.bind(this);
    this.removeItemHandler.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    this.props.get_all_courses(this.state.currentPageNumber);
  }

  handlePageClick = async (pageNumber) => {
    await this.props.pageClick(pageNumber);
    this.setState({ currentPageNumber: this.props.currentPageNumber });

    this.props.get_all_courses(
      parseInt(this.props.currentPageNumber)
    );
  };
  
  handlePrevClick = async () => {
    await this.props.prevClick(parseInt(this.props.currentPageNumber));
    this.setState({ currentPageNumber: this.props.currentPageNumber });

    this.props.get_all_courses(
      parseInt(this.props.currentPageNumber)
    );
  };
  handleNextClick = async () => {
    await this.props.nextClick(parseInt(this.props.currentPageNumber));
    this.setState({ currentPageNumber: this.props.currentPageNumber });
    this.props.get_all_courses(
      parseInt(this.props.currentPageNumber)
    );
  };
  handleCourseViewClick = async (course) => {
    await this.props.get_course_content(course);
    this.setState({ redirect: true });
  };

  removeItemHandler = async (id) => {
    await this.props.delete_course(id);
    await this.props.get_all_courses(
      parseInt(this.props.currentPageNumber)
    );
    console.log(this.props.adminState.courses)
    if (this.props.adminState.deleted_course_info) {
      M.toast({
        html: `Course successfully removed!`,
        classes: "green accent-3",
      });
    } else {
      M.toast({
        html: `Course removal failed!`,
        classes: "red accent-2",
      });
    }
  };
  render() {
    console.log(this.props);
    if (this.state.redirect) {
      return <Redirect to="/course-outline" />;
    }
    return (
      <div className="container">
        <div className="row">
          {this.props.adminState.courses.map((course, i) => (
            <div key={i} className="col m6 l4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img src={course.img} alt="alt" />
                </div>
                <div className="card-content">
                  <Link
                    to="#"
                    className="card-title grey-text text-darken-4"
                    style={{ cursor: "unset" }}
                  >
                    {course.title}
                    <i
                      className="material-icons red-text right remove-content"
                      data-position="right"
                      onClick={() => {
                        this.removeItemHandler(course.id);
                      }}
                    >
                      delete_forever
                    </i>
                  </Link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <hr className="invis"></hr>
                  <p>
                    <Link
                      onClick={() => this.handleCourseViewClick(course)}
                      className="cyan-text"
                      to="#"
                    >
                      View Content
                    </Link>
                  </p>
                </div>
                <div className="card-action course-meta">
                  <ul>
                    <li>
                      <i className="fa fa-calendar" aria-hidden="true"></i>6
                      Month
                    </li>
                    <li>
                      <i className="fa fa-youtube-play" aria-hidden="true"></i>{" "}
                      56 Video Tutorials
                    </li>
                    <li>
                      <i className="fa fa-book" aria-hidden="true"></i> 7
                      Chapters
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="divider" style={{ marginTop: 30 }}></div>
        <div className="row">
          <div className="col l12 center-align">
            <ul className="pagination">
              <li
                className={
                  this.state.currentPageNumber === 1
                    ? "disabled"
                    : "waves-effect"
                }
              >
                <a
                  className={
                    this.state.currentPageNumber === 1
                      ? "pointer-events-none"
                      : ""
                  }
                  onClick={this.handlePrevClick}
                  rel="noopener noreferer"
                  href="#!"
                >
                  <i className="material-icons">chevron_left</i>
                </a>
              </li>
              {this.props.adminState.pages.map((page) => {
                if (page === this.props.currentPageNumber) {
                  return (
                    <li key={page} className="active">
                      <a
                        onClick={() => this.handlePageClick(page)}
                        rel="noopener noreferer"
                        href="#!"
                      >
                        {page}
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li key={page}>
                      <a
                        onClick={() => this.handlePageClick(page)}
                        rel="noopener noreferer"
                        href="#!"
                      >
                        {page}
                      </a>
                    </li>
                  );
                }
              })}
              <li
                className={
                  this.state.currentPageNumber === this.props.adminState.pages.length
                    ? "disabled"
                    : "waves-effect"
                }
              >
                <a
                  onClick={this.handleNextClick}
                  className={
                    this.state.currentPageNumber === this.props.adminState.pages.length
                      ? "pointer-events-none"
                      : ""
                  }
                  rel="noopener noreferer"
                  href="#!"
                >
                  <i className="material-icons">chevron_right</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adminState: state.admin,
  currentPageNumber: state.counter.currentPageNumber,
});

const mapDispatchToProps = Object.assign({}, AdminActions, CounterActions);

export default connect(mapStateToProps, mapDispatchToProps)(CoursesCard);
