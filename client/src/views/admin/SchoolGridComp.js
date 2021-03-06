import React, { Component } from "react";
import { connect } from "react-redux";
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
      searchText: "",
    };
  }
  
  searchText = (res) => {
    this.setState({ searchText: res });
  };
 
  render() {
    console.log(this.props)
    return (
      <div>
        <Search searchText={this.searchText} />
        <main className="row" style={{ minHeight: 350 }}>
          {this.props.schools.filter((school) =>
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
            this.props.schools
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
            this.props.allSchools
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
          )}
        </main>
        <div className="divider" style={{ marginTop: 30 }}></div>
        <div className="row">
          <div className="col l12 center-align" style={{ paddingTop: 20 }}>
            <ul className="pagination">
              <li
                className={
                  this.props.currentPageNumber === 1 ||
                  this.props.pages.length < 1 ||
                  this.state.searchText !== ""
                    ? "disabled pointer-events-none"
                    : "waves-effect"
                }
              >
                <Link
                  className={
                    this.props.currentPageNumber === 1 ||
                    this.props.pages.length < 1 ||
                    this.state.searchText !== ""
                      ? "disabled pointer-events-none"
                      : ""
                  }
                  onClick={this.props.handlePrevClick}
                  rel="noopener noreferer"
                  to="#!"
                >
                  <i className="material-icons">chevron_left</i>
                </Link>
              </li>
              {this.props.pages.length < 1 || this.state.searchText !== "" ? (
                <li className="active">
                  <Link rel="noopener noreferer" to="#!">
                    {1}
                  </Link>
                </li>
              ) : (
                this.props.pages.map((page) => {
                  if (page === this.props.currentPageNumber) {
                    return (
                      <li key={page} className="active">
                        <Link
                          onClick={() => this.props.handlePageClick(page)}
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
                            this.props.handlePageClick(page);
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
                  this.props.currentPageNumber === this.props.pages.length ||
                  this.props.pages.length < 1 ||
                  this.state.searchText !== ""
                    ? "disabled pointer-events-none"
                    : "waves-effect"
                }
              >
                <Link
                  onClick={this.props.handleNextClick}
                  className={
                    this.props.currentPageNumber === this.props.pages.length ||
                    this.props.pages.length < 1 ||
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

class School extends React.Component {
  render() {
    const { school } = this.props;
    return (
      <div className="col s6 m4">
        <div
          className="card sticky-action border-radius-10 z-depth-5"
          style={{
            background: `url(${backgrnd}) `,
            backgroundSize: "contain",
          }}
        >
          <div className="card-content UserCard">
            <div className="UserCardTop justify-center">
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
          <div className="card-action justify-center">
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
