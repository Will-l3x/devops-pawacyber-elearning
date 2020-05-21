import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import blog_1 from "../../assets/images/blog_1.jpg";
import blog_2 from "../../assets/images/blog_2.jpg";
import blog_3 from "../../assets/images/blog_3.jpg";
import blog_4 from "../../assets/images/blog_4.jpg";
import blog_5 from "../../assets/images/blog_5.jpg";
import blog_6 from "../../assets/images/blog_6.jpg";
import FileDropZone from "../../components/dropzone";
import M from "materialize-css";
import Footer from "../../components/footer";
import Header from "../../components/header";
//import Pricing from "../../components/pricing";

export class CourseSubscriptionScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentPageNumber: 1,
      pages: [],
      plans: [
        {
          title: "STARTER",
          description: " Best plan for individual students",
          price: "-",
          frequency: "Monthly",
          bestOffer: false,
          features: ["Enquire Now"],
        },
        {
          title: "MEDIUM",
          description: " Best plan for individual students",
          price: "-",
          frequency: "Monthly",
          bestOffer: false,
          features: ["Enquire Now"],
        },
        {
          title: "COMPLETE",
          description: "Must have for large schools",
          price: "-",
          frequency: "Yearly",
          bestOffer: true,
          features: ["Enquire Now"],
        },
      ],
      subscribedCourses: [
        { id: "1", title: "Course Name 1", img: blog_1 },
        { id: "2", title: "Course Name 2", img: blog_2 },
        { id: "3", title: "Course Name 3", img: blog_3 },
        { id: "4", title: "Course Name 4", img: blog_4 },
        { id: "5", title: "Course Name 5", img: blog_5 },
        { id: "6", title: "Course Name 6", img: blog_6 },
      ],
    };
  }
  componentDidMount() {
    M.AutoInit();

    const previousButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const currentPage = document.getElementById("current-page");
    const PER_PAGE = 9;

    let currentPageNumber = 1;
    previousButton.disabled = currentPageNumber === 1;

    function loadPaging(totalItems, callback) {
      const totalPageCount = Math.ceil(totalItems / PER_PAGE);
      let pages = [];

      for (var i = 1; i <= totalPageCount; i++) {
        pages.push(i);
      }

      function updatePaging() {
        const pagingOptions = {
          currentPageNumber: currentPageNumber,
          perPage: PER_PAGE,
        };
        callback(pagingOptions);
        $("html, body").animate(
          {
            scrollTop: "70px",
          },
          0
        );
      }

      updatePaging();

      nextButton.addEventListener("click", () => {
        currentPageNumber++;
        updatePaging();
      });

      previousButton.addEventListener("click", () => {
        currentPageNumber--;
        updatePaging();
      });
    }
    const productsArray = [];
    get_all_products().then((res) => {
      loadPaging(productsArray.length, (pagingOptions) => {
        const newArray = pageArraySplit(productsArray, pagingOptions);
        loadList(newArray);
      });
    });
  }

  handlePageClick = (pageNumber) => {
    this.setState({ currentPageNumber: pageNumber });
  };
  handlePrevClick = () => {
    this.setState({ currentPageNumber: this.state.currentPageNumber++ });
  };
  handleNextClick = () => {
    this.setState({ currentPageNumber: this.state.currentPageNumber++ });
  };
  pageArraySplit = (array, pagingOptions) => {
    const currentPageNumber = pagingOptions.currentPageNumber;
    const perPage = pagingOptions.perPage;
    const startingIndex = (currentPageNumber - 1) * perPage;
    const endingIndex = startingIndex + perPage;

    return array.slice(startingIndex, endingIndex);
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
            <SideBar />
            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",

                    minHeight: 70,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      style={{ marginTop: "4%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Course Subscription
                    </Link>
                    <Link
                      to="#!"
                      className="dropdown-trigger waves-effect black-text right"
                      data-target="dropdown1"
                      style={{ marginTop: "3%", marginRight: "2%" }}
                    >
                      <i className="material-icons">settings</i>
                    </Link>
                    <ul
                      id="dropdown1"
                      className="dropdown-content"
                      style={{
                        minWidth: "200px",
                        whiteSpace: "nowrap",
                        opacity: 1,
                        display: "none",
                      }}
                    >
                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Starter
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Medium
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Complete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <section id="content">
                <div id="overviews" className="section wb">
                  <div className="container">
                    <div className="row">
                      {this.state.subscribedCourses.map((course, i) => (
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
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
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
                                  <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                  ></i>
                                  6 Month
                                </li>
                                <li>
                                  <i
                                    className="fa fa-youtube-play"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  56 Video Tutorials
                                </li>
                                <li>
                                  <i
                                    className="fa fa-book"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  7 Chapters
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
                          <li className="disabled">
                            <a
                              disabled={
                                this.state.currentPageNumber === 1
                                  ? true
                                  : false
                              }
                              onClick={this.handlePrevClick}
                              rel="noopener noreferer"
                              href="#!"
                            >
                              <i className="material-icons">chevron_left</i>
                            </a>
                          </li>
                          {this.state.pages.map((page) => {
                            if (page === this.state.currentPageNumber) {
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
                            onClick={this.handleNextClick}
                            className="waves-effect"
                          >
                            <a
                              disabled={
                                this.state.currentPageNumber ===
                                this.state.pages.length
                                  ? true
                                  : false
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
                </div>

                <div id="modal1" className="modal">
                  <div className="modal-content">
                    <h4 className="header2">Add Course</h4>
                    <div className="row">
                      <div className="col s12">
                        <div className="row">
                          <div className="input-field col s4">
                            <input id="title2" type="text"></input>
                            <label htmlFor="title2">Title</label>
                          </div>
                          <div className="input-field col s4">
                            <input type="text" id="num_of_topics"></input>
                            <label htmlFor="short_descrip">
                              Number of Topics
                            </label>
                          </div>
                          <div className="input-field col s4">
                            <input id="course_duration" type="text"></input>
                            <label htmlFor="course_duration">
                              Duration (weeks)
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s9">
                            <input type="text" id="short_descrip"></input>
                            <label htmlFor="short_descrip">
                              Short Description
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <FileDropZone />
                            <label style={{ transform: "translateY(-100%)" }}>
                              {" "}
                              <i className="material-icons left">photo</i> Cover
                              Image
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
                              Submit
                              <i className="material-icons right">send</i>
                            </button>
                          </div>
                        </div>
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
)(CourseSubscriptionScreen);
