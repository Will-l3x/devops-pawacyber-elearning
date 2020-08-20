import React, { Component } from "react";
import { StudentService } from "../../services/student";
import { AdminService } from "../../services/admin";
import "../../assets/css/list-grid-comp.css";
import avatar from "../../assets/images/gallary/not_found.gif";
import { Link } from "react-router-dom";
import M from "materialize-css";

class ResourceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      allResources: [],
      currentPageNumber: 1,
      searchText: "",
      pages: [],
    };
  }

  componentDidMount() {
    this.getDashData();
  }

  getDashData() {
    AdminService.get_all_resources().then((response) => {
      const allResources = response === undefined ? [] : response.reverse();
      allResources.sort(
        (a, b) => new Date(b.materialname) - new Date(a.materialname)
      );

      let pages = [];
      let perPage = 24;
      const totalPageCount = Math.ceil(allResources.length / perPage);

      for (var i = 1; i <= totalPageCount; i++) {
        pages.push(i);
      }

      const resources = this.pageArraySplit(allResources, {
        currentPageNumber: this.state.currentPageNumber,
        perPage,
      });

      this.setState({ pages, resources, allResources });
    });
  }

  download(resource) {
    var data = {
      file: resource.file,
    };
    setTimeout(() => {
      StudentService.download(data).then((response) => {
        window.open(URL.createObjectURL(response));
      });
    }, 100);
  }

  deleteResource(resource) {
    var data = {
      file: resource.file,
    };

    StudentService.deleteResource(data).then((response) => {
      if (response.success) {
        M.toast({
          html: response.message,
          classes: "green",
        });
        this.componentDidMount();
      } else {
        M.toast({
          html: "Deletion failed.",
          classes: "red",
        });
      }
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
      this.getDashData();
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
      this.getDashData();
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
      this.getDashData();
    });
  };
  render() {
    return (
      <div>
        <Search searchText={this.searchText} />
        <main className="row" style={{ minHeight: 350 }}>
          {this.state.resources.filter((resource) =>
            resource.materialname
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
            this.state.resources
              .filter((resource) =>
                resource.materialname
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              )
              .map((resource, i) => (
                <div key={i} className="col s6 m3">
                  <div
                    className="card min-height-100 z-depth-2 white-text designed-dots"
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  >
                    <div className="padding-4">
                      <div className="col s12 m12">
                        <p className="no-margin" style={{ color: "teal" }}>
                          <b>{resource.materialname}</b>
                        </p>
                        <p
                          className="no-margin"
                          style={{
                            fontSize: "12px",
                            color: "grey",
                          }}
                        >
                          Subject ID: {resource.classid}
                        </p>
                      </div>

                      <div
                        className="row"
                        style={{
                          marginTop: "90px",
                          color: "white",
                        }}
                      >
                        <div className="left-align col s6 m6">
                          <p className="no-margin">
                            <a
                              href="#!"
                              style={{
                                color: "red",
                                padding: "5px",
                                textAlign: "center",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                this.deleteResource(resource);
                              }}
                            >
                              Delete
                            </a>
                          </p>
                        </div>
                        <div className="right-align col s6 m6">
                          <p className="no-margin">
                            <a
                              href="#!"
                              style={{
                                border: "1px solid #2196F3",
                                color: "white",
                                backgroundColor: "#2196F3",
                                borderRadius: "15px",
                                padding: "5px",
                                textAlign: "center",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                this.download(resource);
                              }}
                            >
                              Download
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            this.state.allResources
              .filter((resource) =>
                resource.materialname
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              )
              .map((resource, i) => (
                <div key={i} className="col s6 m3">
                  <div
                    className="card min-height-100 z-depth-2 white-text designed-dots"
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  >
                    <div className="padding-4">
                      <div className="col s12 m12">
                        <p className="no-margin" style={{ color: "teal" }}>
                          <b>{resource.materialname}</b>
                        </p>
                        <p
                          className="no-margin"
                          style={{
                            fontSize: "12px",
                            color: "grey",
                          }}
                        >
                          Subject ID: {resource.classid}
                        </p>
                      </div>

                      <div
                        className="row"
                        style={{
                          marginTop: "90px",
                          color: "white",
                        }}
                      >
                        <div className="left-align col s6 m6">
                          <p className="no-margin">
                            <a
                              href="#!"
                              style={{
                                color: "red",
                                padding: "5px",
                                textAlign: "center",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                this.deleteResource(resource);
                              }}
                            >
                              Delete
                            </a>
                          </p>
                        </div>
                        <div className="right-align col s6 m6">
                          <p className="no-margin">
                            <a
                              href="#!"
                              style={{
                                border: "1px solid #2196F3",
                                color: "white",
                                backgroundColor: "#2196F3",
                                borderRadius: "15px",
                                padding: "5px",
                                textAlign: "center",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                this.download(resource);
                              }}
                            >
                              Download
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </main>
        <div className="divider" style={{ marginTop: 30 }}></div>
        <div className="row">
          <div className="col l12 center-align" style={{ paddingTop: 20 }}>
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

export default ResourceCard;
