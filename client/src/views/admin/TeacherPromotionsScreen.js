import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../assets/images/gallary/not_found.gif";
//import $ from "jquery";
//import moment from "moment";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { SchoolService } from "../../services/school";
import { Link } from "react-router-dom";

class TeacherPromotionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      title: "Mr",
      teachers: [],
      currentPageNumber: 1,
      searchText: "",
      pages: [],
      allTeachers: [],
    };
  }

  user = {};
  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    SchoolService.get_all_teachers(37)
      .then((response) => {
        console.log(response);
        const allTeachers = [];
        for (const teacher of response) {
          teacher.name = teacher.firstname + " " + teacher.lastname;
          teacher.rolename = "Teacher";
          allTeachers.push(teacher);
        }

        allTeachers.sort((a, b) => new Date(b.lastname) - new Date(a.lastname));

        let pages = [];
        let perPage = 12;
        const totalPageCount = Math.ceil(allTeachers.length / perPage);

        for (var i = 1; i <= totalPageCount; i++) {
          pages.push(i);
        }

        const teachers = this.pageArraySplit(allTeachers, {
          currentPageNumber: this.state.currentPageNumber,
          perPage,
        });

        this.setState({ pages, teachers, allTeachers });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
                        Teacher Referral Awards
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  <Search searchText={this.searchText} />
                  <main className="row" style={{ minHeight: 350 }}>
                    {this.state.teachers.filter((teacher) =>
                      teacher.name
                        .toLowerCase()
                        .includes(this.state.searchText.toLowerCase())
                    ).length < 1 ? (
                      <div>
                        <div
                          className="divider"
                          style={{ marginTop: 30 }}
                        ></div>
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
                      this.state.teachers

                        .filter((teacher) =>
                          teacher.name
                            .toLowerCase()
                            .includes(this.state.searchText.toLowerCase())
                        )
                        .map((teacher, index) => (
                          <Teacher
                            index={index}
                            key={index}
                            teacher={teacher}
                          />
                        ))
                    ) : (
                      this.state.allTeachers
                        .filter((teacher) =>
                          teacher.name
                            .toLowerCase()
                            .includes(this.state.searchText.toLowerCase())
                        )
                        .map((teacher, index) => (
                          <Teacher
                            key={index}
                            index={index}
                            teacher={teacher}
                            handleEdit={this.state.handleEdit}
                            setTeacherId={this.state.setTeacherId}
                          />
                        ))
                    )}
                  </main>
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
                          <Link
                            className={
                              this.state.currentPageNumber === 1 ||
                              this.state.pages.length < 1 ||
                              this.state.searchText !== ""
                                ? "disabled pointer-events-none"
                                : ""
                            }
                            onClick={this.state.handlePrevClick}
                            rel="noopener noreferer"
                            to="#!"
                          >
                            <i className="material-icons">chevron_left</i>
                          </Link>
                        </li>
                        {this.state.pages.length < 1 ||
                        this.state.searchText !== "" ? (
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
                                    onClick={() =>
                                      this.state.handlePageClick(page)
                                    }
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
                                      this.state.handlePageClick(page);
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
                            this.state.currentPageNumber ===
                              this.state.pages.length ||
                            this.state.pages.length < 1 ||
                            this.state.searchText !== ""
                              ? "disabled pointer-events-none"
                              : "waves-effect"
                          }
                        >
                          <Link
                            onClick={this.state.handleNextClick}
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
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
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
      this.state.searchText(this.state.searchText);
    });
  }

  render() {
    return (
      <form className="Search" onSubmit={(e) => e.preventDefault()}>
        <div
          className="white border-radius-10 z-depth-5"
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

class Teacher extends Component {
  constructor() {
    super();
    this.state = { settings: false };
  }
  componentDidMount() {
    M.AutoInit();
  }

  colors = (i) => {
    var colors = [
      "gradient-45deg-light-blue-cyan",
      "gradient-45deg-red-pink",
      "gradient-45deg-green-teal",
      "gradient-45deg-amber-amber",
      "gradient-45deg-purple-deep-purple",
      "gradient-45deg-brown-brown",
    ];
    return colors[i % 6];
  };
  toggleSettings = (e) => {
    e.preventDefault();
    const thus = this;
    function triggerOn() {
      thus.setState({ settings: true });
    }
    function triggerOff() {
      thus.setState({ settings: false });
    }
    this.state.settings ? triggerOff() : triggerOn();
  };
  truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  render() {
    const { teacher, index } = this.props;
    return (
      <div className="col s12 m6 l4">
        <div className="card border-radius-10 z-depth-5">
          <div className="user-content card-content right-top">
            <div className="right-top-content">
              <div className="adminActions">
                <a
                  className="admin-button"
                  href="#!"
                  onClick={this.toggleSettings}
                >
                  <i className="material-icons">settings</i>
                </a>
                <div className="admin-buttons">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="btn-floating blue"
                    style={
                      this.state.settings
                        ? { opacity: 1, visibility: "visible" }
                        : {}
                    }
                  >
                    <i className="material-icons small">create</i>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="btn-floating red"
                    style={
                      this.state.settings
                        ? { opacity: 1, visibility: "visible" }
                        : {}
                    }
                  >
                    <i className="material-icons small">delete</i>
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col s4">
                <Avatar className={`avatar-large-2 ${this.colors(index)}`}>
                  {teacher.firstname.charAt(0)}
                  {teacher.lastname.charAt(0)}
                </Avatar>
              </div>
              <div className="col s8">
                <div id="full-name" className="text-capitalize">
                  {this.truncate(teacher.name, 24)}
                </div>
                <div className="description">
                  <p>
                    <i className="material-icons small icon-translate">
                      account_balance
                    </i>{" "}
                    Account Balance: <span>N$ 0</span>
                  </p>
                  <br />
                  <p>
                    <i className="material-icons small icon-translate">
                      account_balance_wallet
                    </i>{" "}
                    Amount Paid: <span>N$ 0</span>
                  </p>
                </div>
              </div>
              <div className="col s12 user-footer">
                <button id="btn" className="activator info-button">
                  Gift Account
                </button>
              </div>
            </div>
          </div>
          <div className="card-reveal overflow-y-visibile">
            <span className="card-title grey-text text-darken-4 text-capitalize">
              {teacher.name}
              <i className="material-icons right">close</i>
            </span>
            <form
              id="contact"
              data-toggle="validator"
              data-focus="false"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {" "}
              <div className="row">
                <div className="col s12">
                  <div className="input-field">
                    <fieldset className="form-group">
                      <ReactFormLabel htmlFor="amount" title="Amount *" />
                      <input
                        id="amount"
                        type="number"
                        className="validate"
                        name="amount"
                        required
                      />
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="justify-center">
                <button className="form-control-submit-button gradient-45deg-light-blue-cyan">
                  Send Money
                </button>
              </div>
              <div className="form-message">
                <div id="cmsgSubmit" className="h3 text-center hidden"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherPromotionsScreen);
