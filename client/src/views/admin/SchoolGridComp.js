import React, { Component } from "react";
import { connect } from "react-redux";
import { AdminService } from "../../services/admin";
import "../../assets/css/list-grid-comp.css";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../assets/images/gallary/not_found.gif";
import backgrnd from "../../assets/images/gallary/design.png";
import { Link } from "react-router-dom";
import moment from "moment";

class SchoolGridComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? {}
          : JSON.parse(localStorage.getItem("user")),
      schools: [],
      currentPageNumber: 1,
      searchText: "",
      pages: [],
      allSchools: [],
    };
  }
  update = 0;
  componentDidMount() {
    this.gettingSchools();
  }
  gettingSchools = () => {
    AdminService.get_all_schools()
      .then((response) => {
        const allSchools = response === undefined ? [] : response;
        allSchools.sort((a, b) => new Date(b.lastname) - new Date(a.lastname));

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

        this.setState({ pages, schools, allSchools });
      })
      .catch((error) => {
        console.log(error);
      });
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
    if (this.update !== this.props.updated) {
      this.gettingSchools();
      this.update = this.props.updated;
    }
    return (
      <div>
        <Search searchText={this.searchText} />
        <main className="row">
          {this.state.schools.filter((school) =>
            school.schoolname
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
            this.state.schools
              .filter((school) =>
                school.schoolname
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              )
              .map((school, index) => (
                <School
                  key={index}
                  school={school}
                  handleEdit={this.props.handleEdit}
                  setSchoolId={this.props.setSchoolId}
                />
              ))
          ) : (
            this.state.allSchools
              .filter((school) =>
                school.name
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              )
              .map((school, index) => (
                <School
                  key={index}
                  school={school}
                  handleEdit={this.props.handleEdit}
                  setSchoolId={this.props.setSchoolId}
                />
              ))
          )}
        </main>
        <div className="divider" style={{ marginTop: 30 }}></div>
        <div className="row">
          <div className="col l12 center-align">
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

class Search extends React.Component {
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
            className="justfiyCenter white search-ico"
            style={{ paddingTop: 10, borderTopRightRadius: 10 }}
          >
            <i className="material-icons left">search</i>
          </div>
        </div>
      </form>
    );
  }
}

class School extends React.Component {
  render() {
    const { school } = this.props;
    return (
      <div className="col s6 m4 l3">
        <div
          className="card sticky-action border-radius-10 z-depth-5"
          style={{
            background: `url(${backgrnd}) `,
            backgroundSize: "contain",
          }}
        >
          <div className="card-content UserCard">
            <div className="UserCardTop justfiyCenter">
              <Avatar className="avatar-large-2">
                <i className="material-icons medium">school</i>
              </Avatar>
              {/* <img alt="user" src={pic} /> */}
            </div>
          </div>
          <div
            className="card-content text-normal"
            style={{ paddingBottom: 0 }}
          >
            <span
              style={{ fontSize: 20 }}
              className="card-title activator grey-text text-darken-4"
            >
              {school.schoolname}
              <i className="material-icons right">more_vert</i>
            </span>
            <br />
            <p>
              <i className="material-icons small icon-translate">email</i>{" "}
              {school.email}
            </p>
            <br />
            <p>
              <i className="material-icons small icon-translate">contacts</i>{" "}
              {school.contacts}
            </p>
            <br />
            <p>
              <i className="material-icons small icon-translate">
                airplanemode_active
              </i>{" "}
              Joined{" "}
              {moment(new Date(school.datejoined)).format("LL") ===
              "Invalid date"
                ? "Unknown"
                : moment(new Date(school.datejoined)).format("LL")}
            </p>
            <br />
          </div>
          <div className="card-action justfiyCenter">
            <a
              href="#!"
              className="btn-floating waves-effect waves-light light-blue"
              onClick={(e) => {
                e.preventDefault();
                this.props.handleEdit(school);
              }}
              style={{ marginRight: 5 }}
            >
              <i className="material-icons">create</i>
            </a>
            <a
              href="#!"
              className="btn-floating waves-effect waves-light red accent-2 modal-trigger"
              data-target="areyousure"
              onClick={(e) => {
                e.preventDefault();
                this.props.setSchoolId(school.schoolId);
              }}
              style={{ marginLeft: 5 }}
            >
              <i className="material-icons">delete</i>
            </a>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {school.schoolname}
              <i className="material-icons right">close</i>
            </span>
            <p>Here is some more information about this school.</p>

            <p>
              <i className="material-icons small icon-translate">link</i> ID:{" "}
              {school.schoolId}
            </p>
            <p>
              <i className="material-icons small icon-translate">email</i>{" "}
              {school.email}
            </p>
            <p>
              <i className="material-icons small icon-translate">contacts</i>{" "}
              {school.contacts}
            </p>
            <p>
              <i className="material-icons small icon-translate">my_location</i>{" "}
              {school.address}
            </p>
            <p>
              <i className="material-icons small icon-translate">vpn_key</i>{" "}
              EnrolmentKey: {school.enrolmentkey}
            </p>
            <p>
              <i className="material-icons small icon-translate">
                airplanemode_active
              </i>{" "}
              Joined{" "}
              {moment(new Date(school.datejoined)).format("LL") ===
              "Invalid date"
                ? "Unknown"
                : moment(new Date(school.datejoined)).format("LL")}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolGridComp);
