import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import SideBar from "../../components/SideBar";
import "../../assets/css/dropify.min.css";
import Dropzone from "react-dropzone";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AdminService } from "../../services/admin";
class CourseListScreen extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      fields: {},
      errors: {},
      currentPageNumber: 1,
      user: {},
      files: [],
      fileIcon: "",
      courses: [],
      pages: [],
    };
    this.removeMaterialHandler.bind(this);
    this.handleFileClear.bind(this);
    this.handleAddCourse.bind(this);
    this.onDrop.bind(this);
    this.handleFileClear.bind(this);
    this.handleNextClick.bind(this);
    this.handlePageClick.bind(this);
    this.handlePrevClick.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
    this.get_courses();
  }

  get_courses = () => {
    AdminService.get_courses().then((response) => {
      if (response === undefined) {
        this.setState({
          courses: [],
        });
      } else {
        let pages = [];
        let perPage = 6;
        const totalPageCount = Math.ceil(response.data.length / perPage);

        for (var i = 1; i <= totalPageCount; i++) {
          pages.push(i);
          this.setState({ pages });
        }

        const courses = this.pageArraySplit(response.data, {
          currentPageNumber: this.state.currentPageNumber,
          perPage,
        });
        this.setState({ courses });
      }
    });
  };
  removeMaterialHandler = () => {
    $(".remove-content").css({
      display: "inline",
    });
  };

  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Cannot be empty!";
    }
    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "Cannot be empty!";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleAddCourse = (event) => {
    event.preventDefault();
    let fileData = this.state.files;
    var data = {
      description: "",
      file: true,
    };

    AdminService.post_new_course(data).then((response) => {
      if (response === undefined) {

        M.toast({
          html: "Resource upload failed",
          classes: "red",
        });
      } else if (response.err) {
  
        M.toast({
          html: response.err,
          classes: "red",
        });
      } else if (response.success === true) {
        const uploadData = new FormData();
        uploadData.append("file", fileData[0].file);
        uploadData.append("uploadType", response.uploadType);
        uploadData.append("uploadType", response.uploadId);

        AdminService.post_file(uploadData).then((response) => {
          this.props.get_all_courses(1);
          this.handleFileClear();
        });

        document.getElementById("sibs").reset();
        this.getDashData();
      } else {

        M.toast({
          html: response.message,
          classes: "green",
        });
      }
    });
  };
  onChange = (event) => {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
  };

  onDrop = async (files) => {
    $(".dropify-clear").removeClass("display-none");
    $(".dropify-preview").removeClass("display-none");
    function getExtension(filename) {
      var parts = filename.split(".");
      return parts[parts.length - 1];
    }

    function isValidFile(filename) {
      var ext = getExtension(filename);
      switch (ext.toLowerCase()) {
        case "doc":
          return { isValid: true, icon: "library_books" };
        case "docx":
          return { isValid: true, icon: "library_books" };
        case "pdf":
          return { isValid: true, icon: "library_books" };
        case "epub":
          return { isValid: true, icon: "library_books" };
        case "jpg":
          return { isValid: true, icon: "photo" };
        case "gif":
          return { isValid: true, icon: "photo" };
        case "bmp":
          return { isValid: true, icon: "photo" };
        case "png":
          return { isValid: true, icon: "photo" };
        case "jpeg":
          return { isValid: true, icon: "photo" };
        case "m4v":
          return { isValid: true, icon: "ondemand_video" };
        case "avi":
          return { isValid: true, icon: "ondemand_video" };
        case "mpg":
          return { isValid: true, icon: "ondemand_video" };
        case "mp4":
          return { isValid: true, icon: "ondemand_video" };
        case "mkv":
          return { isValid: true, icon: "ondemand_video" };
        default:
          return { isValid: false, icon: "warning" };
      }
    }

    var file = $("#file");
    if (isValidFile(file.val()).isValid === false) {
      $(".file-upload").addClass("upload-disabled");
      this.setState({ fileIcon: isValidFile(file.val()).icon });
      return M.toast({
        html: "Fail. Please select valid file type!",
        classes: "red accent-2",
      });
    }
    $(".file-upload").removeClass("upload-disabled");
    this.setState({ fileIcon: isValidFile(file.val()).icon });
    M.toast({
      html: "Success. Valid file type!",
      classes: "green accent-3",
    });
    this.setState({ files });
  };
  handleFileClear = () => {
    this.setState({ files: [] });
    $(".dropify-clear").addClass("display-none");
    $(".dropify-preview").addClass("display-none");
  };

  pageArraySplit = (array, pagingOptions) => {
    const currentPageNumber = pagingOptions.currentPageNumber;
    const perPage = pagingOptions.perPage;
    const startingIndex = (currentPageNumber - 1) * perPage;
    const endingIndex = startingIndex + perPage;
    return array.slice(startingIndex, endingIndex);
  };
  handlePageClick = async (pageNumber) => {
    this.setState({ currentPageNumber: parseInt(pageNumber) });
    this.get_courses();
  };
  handlePrevClick = async () => {
    const pageNumber = this.state.currentPageNumber - 1;
    this.setState({ currentPageNumber: pageNumber });
    this.get_courses();
  };
  handleNextClick = async () => {
    const pageNumber = this.state.currentPageNumber + 1;
    console.log(pageNumber);
    this.setState({ currentPageNumber: pageNumber });
    this.get_courses();
  };
  handleCourseViewClick = (course) => {
    sessionStorage.setItem("course", JSON.stringify(course));
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="course-outline" />;
    }
    const preview = {
      display: "inline",
    };
    const files = this.state.files.map((file, i) => (
      <li key={i}>
        <p className="dropify-filename">
          <span className="file-icon"></span>
          <span className="dropify-filename-inner">
            {file.name} - {file.size} bytes
          </span>
        </p>
      </li>
    ));
    /*
    if(school is regestering ) redirect to course register else course out line;
    when school registers see more detailed content about couse, allowed to wiew maybe first topic only
    click register they see subcripion prices and register
   */
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      to="#!"
                      className="left"
                      style={{
                        padding: "10px",
                        paddingTop: "20px",
                        fontSize: "16px",
                        color: "#626262",
                      }}
                    >
                      Course Management
                    </Link>
                    <Link
                      to="#!"
                      className="dropdown-trigger waves-effect black-text right"
                      style={{ marginRight: "2%" }}
                      data-target="dropdown1"
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
                          <i className="material-icons ">library_add</i>
                          Add Course
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#!"
                          onClick={this.removeMaterialHandler}
                          className="grey-text text-darken-2"
                        >
                          <i className="material-icons ">delete</i>
                          Delete Course
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <section id="content" style={{ paddingTop: "2%" }}>
                <div id="overviews" className="section wb">
                  <div className="container">
                    <div className="row">
                      {this.state.courses.map((course, i) => (
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
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                              </p>
                              <hr className="invis"></hr>
                              <p>
                                <Link
                                  onClick={() =>
                                    this.handleCourseViewClick(course)
                                  }
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
                                  7 Topics
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
                            className={
                              this.state.currentPageNumber ===
                              this.state.pages.length
                                ? "disabled"
                                : "waves-effect"
                            }
                          >
                            <a
                              onClick={this.handleNextClick}
                              className={
                                this.state.currentPageNumber ===
                                this.state.pages.length
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
                </div>

                <div id="modal1" className="modal">
                  <div className="modal-content">
                    <h4 className="header2">Add Course</h4>
                    <form onSubmit={this.handleAddCourse} className="row">
                      <div className="col s12">
                        <div className="row">
                          <div className="input-field col s3">
                            <input id="name" type="text"></input>
                            <label htmlFor="name">Name</label>
                          </div>
                          <div className="input-field col s9">
                            <input type="text" id="description"></input>
                            <label htmlFor="description">Description</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <Dropzone onDrop={this.onDrop}>
                              {({ getRootProps, getInputProps }) => (
                                <section className="container">
                                  <div
                                    className="dropify-wrapper"
                                    {...getRootProps()}
                                  >
                                    <div className="dropify-message">
                                      {" "}
                                      <p>Drag and drop a file here or click</p>
                                    </div>
                                    <input
                                      id="file"
                                      name="file"
                                      {...getInputProps()}
                                    ></input>
                                    <button
                                      className="dropify-clear display-none"
                                      onClick={this.handleFileClear}
                                      style={
                                        this.state.files.length > 0
                                          ? preview
                                          : {}
                                      }
                                    >
                                      Remove
                                    </button>
                                    <div
                                      className="dropify-preview display-none"
                                      style={
                                        this.state.files.length > 0
                                          ? preview
                                          : {}
                                      }
                                    >
                                      <span className="dropify-render">
                                        <i
                                          className="file-icon material-icons large"
                                          style={
                                            this.state.files.length > 0
                                              ? preview
                                              : {}
                                          }
                                        >
                                          {this.state.fileIcon}
                                        </i>
                                      </span>
                                      <div className="dropify-infos">
                                        <ul className="dropify-infos-inner">
                                          {files}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              )}
                            </Dropzone>

                            <label style={{ transform: "translateY(-100%)" }}>
                              <i className="material-icons left">photo</i> Cover
                              Image
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <button
                              type="submit"
                              className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                            >
                              Submit
                              <i className="material-icons right">send</i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseListScreen);
