import React, { Component } from "react";
import { connect } from "react-redux";

import M from "materialize-css";
import AdminActions from "../../actions/admin";
import CounterActions from "../../actions/counter";
import { Link } from "react-router-dom";

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
  }

  componentDidMount() {
    M.AutoInit();
    this.props.get_all_courses(this.state.currentPageNumber);
  }

  handlePageClick = async (pageNumber) => {
    await this.props.pageClick(pageNumber);
    this.setState({ currentPageNumber: this.props.currentPageNumber });

    this.props.get_all_courses(
      this.state.admin.id,
      parseInt(this.props.currentPageNumber)
    );
  };
  handlePrevClick = async () => {
    await this.props.prevClick(parseInt(this.props.currentPageNumber));
    this.setState({ currentPageNumber: this.props.currentPageNumber });

    this.props.get_all_courses(
      this.state.admin.id,
      parseInt(this.props.currentPageNumber)
    );
  };
  handleNextClick = async () => {
    await this.props.nextClick(parseInt(this.props.currentPageNumber));
    this.setState({ currentPageNumber: this.props.currentPageNumber });
    this.props.get_all_courses(
      this.state.admin.id,
      parseInt(this.props.currentPageNumber)
    );
  };

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          {this.props.courses.map((course, i) => (
            <div key={i} className="col l3">
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
                        console.log(
                          "action for which course was clicked and for who clicked and for who if"
                        );
                      }}
                      className="cyan-text"
                      to="/course-outline"
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
  pages: state.admin.pages,
  currentPageNumber: state.counter.currentPageNumber,
});

const mapDispatchToProps = Object.assign({}, AdminActions, CounterActions);

export default connect(mapStateToProps, mapDispatchToProps)(CoursesCard);
