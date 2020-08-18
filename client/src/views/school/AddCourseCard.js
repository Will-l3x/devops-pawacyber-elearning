import React, { Component } from "react";
import { connect } from "react-redux";

import M from "materialize-css";
import SchoolActions from "../../actions/school";
import AdminActions from "../../actions/admin";
import CounterActions from "../../actions/counter";
import { Link, Redirect } from "react-router-dom";

class AddCourseCard extends Component {
  constructor() {
    super();
    this.state = {
      school: {
        id: "3e23e23",
        name: "Pawa High School",
      },
      currentPageNumber: 1,
      courses: [],
    };
    this.handleNextClick.bind(this);
    this.handlePageClick.bind(this);
    this.handlePrevClick.bind(this);
    this.handleCourseClick.bind(this);
    this.handleSubscribedCourse.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    this.handleSubscribedCourse();
  }
  handleSubscribedCourse = async () => {
    await this.props.get_all_courses(this.state.currentPageNumber);
    await this.props.get_subscribed_courses(
      this.state.school.id,
      parseInt(this.props.currentPageNumber, "ALL")
    );
    function arrayUnique(array) {
      var a = array.concat();
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i].id === a[j].id) a.splice(j--, 1);
        }
      }

      return a;
    }

    const courses = arrayUnique(
      this.props.subscribed_courses.concat(this.props.courses)
    );
    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }

    courses.sort(compare);
    this.setState({ courses });
  };

  handlePageClick = async (pageNumber) => {
    await this.props.pageClick(pageNumber);
    this.setState({ currentPageNumber: this.props.currentPageNumber });
    this.handleSubscribedCourse();
  };
  handlePrevClick = async () => {
    await this.props.prevClick(parseInt(this.props.currentPageNumber));
    this.setState({ currentPageNumber: this.props.currentPageNumber });

    this.handleSubscribedCourse();
  };
  handleNextClick = async () => {
    await this.props.nextClick(parseInt(this.props.currentPageNumber));
    this.setState({ currentPageNumber: this.props.currentPageNumber });
    this.handleSubscribedCourse();
  };
  handleCourseClick = async (course) => {
    await this.props.get_subscribe_course(course);
    this.setState({ redirect: true });
  };

  render() {
    console.log(this.props);
    if (this.state.redirect) {
      return <Redirect to="/school-subscribe" />;
    }
    return (
      <div className="container">
        <div className="row">
          {this.state.courses.map((course, i) => {
            if (course.subscribed === false) {
              return (
                <div key={course.id} className="col l3">
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
                          onClick={() => {
                            this.handleCourseClick(course);
                          }}
                          className="cyan-text tooltipped"
                          data-position="down"
                          data-tooltip="Add Subscription"
                          to="#"
                        >
                          Subscribe
                          <i className="material-icons left">subscriptions</i>
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
                          <i
                            className="fa fa-youtube-play"
                            aria-hidden="true"
                          ></i>{" "}
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
              );
            } else {
              return (
                <div key={course.id} className="col l3">
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
                          onClick={() => {
                            this.handleCourseClick(course);
                          }}
                          className="red-text accent-2 tooltipped"
                          data-position="down"
                          data-tooltip="Upgrade/Downgrade"
                          to="#"
                        >
                          Upgrade/Downgrade
                          <i className="material-icons left">subscriptions</i>
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
                          <i
                            className="fa fa-youtube-play"
                            aria-hidden="true"
                          ></i>{" "}
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
              );
            }
          })}
        </div>
        <div className="divider" style={{ marginTop: 30 }}></div>
        <div className="row">
          <div className="col l12 center-align">
            <ul className="pagination" style={{ paddingTop: 20 }}>
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
              {this.props.pages.map((page) => {
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
                  this.state.currentPageNumber === this.props.pages.length
                    ? "disabled"
                    : "waves-effect"
                }
              >
                <a
                  onClick={this.handleNextClick}
                  className={
                    this.state.currentPageNumber === this.props.pages.length
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
  courses: state.admin.courses,
  subscribed_courses: state.school.subscribed_courses,
  pages: state.admin.pages,
  currentPageNumber: state.counter.currentPageNumber,
});

const mapDispatchToProps = Object.assign(
  { get_all_courses: AdminActions.get_all_courses },
  SchoolActions,
  CounterActions
);

export default connect(mapStateToProps, mapDispatchToProps)(AddCourseCard);
