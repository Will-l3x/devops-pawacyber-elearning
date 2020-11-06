import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import store from "../../config/store";
import Footer from "../../components/footer";
import Header from "../../components/header";
import $ from "jquery";

import avatar from "../../assets/images/gallary/not_found.gif";
import { StudentService } from "../../services/student";
import { AdminService } from "../../services/admin";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class SubjectContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      view: false,
      selectedContentTag: { tagId: 1, name: "Textbook" },
      resources: [],
      assignments: [],
      url: "",
      classwork: "",
      selectedResourceKey: -1,
      allResources: [],
      currentPageNumber: 1,
      pages: [],
      corruptContent: [],
      numPages: 1,
    };
  }

  componentDidMount() {
    this.getContentTags();
  }
  videoPlayer() {
    $(".video-player-st").each(function (_, videoPlayer) {
      /**
       * get all the controls
       **/
      let eleVideoObj = $(videoPlayer).find("video");
      let elePlayPauseBtn = $(videoPlayer).find(".toggle-play-pause");
      let eleStartTime = $(videoPlayer).find(".start-time");
      let eleEndTime = $(videoPlayer).find(".end-time");
      let eleVideoSeekbar = $(videoPlayer).find(".video-seekbar");
      let eleVideoProgress = $(eleVideoSeekbar).find(".progress");
      let eleToggleVolume = $(videoPlayer).find(".toggle-volume");
      let eleVolumeSeekbar = $(videoPlayer).find(".volume-seekbar");
      let eleVolumeProgress = $(eleVolumeSeekbar).find(".progress");

      let totalDurationInSeconds = 0;
      let currentTimeInSeconds = 0;
      let currentDuration = null;
      let totalDuration = null;
      let seekPercentage = 0;
      let volumeValue = 1;
      let volumePercentage = 100;

      /*-------------- HIDE / SHOW CONTROLS -----------*/
      $(videoPlayer).hover(
        () => $(videoPlayer).removeClass("hide-controls"),
        () => {
          if (eleVideoObj["0"] === undefined) {
            $(videoPlayer).addClass("hide-controls");
          } else {
            if (!eleVideoObj["0"].paused)
              $(videoPlayer).addClass("hide-controls");
          }
        }
      );
      /*--------------- HIDE / SHOW CONTROLS --------*/

      /*-------------- UPDATE FUNCTIONS ---------------*/
      const updateSeekbar = () => {
        seekPercentage = helper_getPercentage(
          currentTimeInSeconds,
          totalDurationInSeconds
        );
        $(eleVideoProgress).css({
          width: `${seekPercentage}%`,
        });
      };

      const updateVolumebar = () => {
        $(eleVolumeProgress).css({ width: `${volumePercentage}%` });
      };

      const updateTotalDuration = () => {
        $(eleEndTime).html(
          `${totalDuration.hours}:${totalDuration.minutes}:${totalDuration.seconds}`
        );
      };

      const updateCurrentTime = () => {
        $(eleStartTime).html(
          `${currentDuration.hours}:${currentDuration.minutes}:${currentDuration.seconds}`
        );
      };
      /*----------- UPDATE FUNCTIONS -----------------*/

      //1. update the total duration
      eleVideoObj.on("loadeddata", () => {
        totalDurationInSeconds = eleVideoObj["0"].duration;
        totalDuration = helper_calculateDuration(totalDurationInSeconds);
        updateTotalDuration();
        updateSeekbar();
        updateVolumebar();
      });

      // 2. update current time
      eleVideoObj.on("timeupdate", () => {
        currentTimeInSeconds = eleVideoObj["0"].currentTime;
        currentDuration = helper_calculateDuration(currentTimeInSeconds);
        updateCurrentTime();
        updateSeekbar();
      });
      //3. update volume
      eleVideoObj.on("volumechange", () => {
        volumePercentage = eleVideoObj["0"].volume * 100;
        updateVolumebar();
      });

      eleVideoObj.on("ended", () => {
        eleVideoObj["0"].currentTime = 0;
        $(elePlayPauseBtn).removeClass("pause").addClass("play");
        $(videoPlayer).removeClass("hide-controls");
      });
      /*----------------------user events ------------------------------*/

      //4. play the song
      $(elePlayPauseBtn).on("click", () => {
        $(elePlayPauseBtn).hasClass("play")
          ? eleVideoObj["0"].play()
          : eleVideoObj["0"].pause();
        $(elePlayPauseBtn).toggleClass("play pause");
      });

      //5. toggle volume
      $(eleToggleVolume).on("click", () => {
        eleVideoObj["0"].volume = eleVideoObj["0"].volume ? 0 : volumeValue;
        $(eleToggleVolume).toggleClass("on off");
      });

      //6. volume bar click
      $(eleVolumeSeekbar).on("click", (e) => {
        let tempVolumePosition =
          e.pageX - videoPlayer.offsetLeft - eleVolumeSeekbar["0"].offsetLeft;
        let tempVolumeValue =
          tempVolumePosition / eleVolumeSeekbar["0"].clientWidth;
        volumeValue = tempVolumeValue;
        eleVideoObj["0"].volume = tempVolumeValue.toFixed(1);
        volumePercentage = tempVolumeValue.toFixed(1) * 100;
        $(eleToggleVolume).addClass("on").removeClass("off");
      });
      //7. seekbar click
      $(eleVideoSeekbar).on("click", (e) => {
        let tempSeekPosition =
          e.pageX - videoPlayer.offsetLeft - eleVideoSeekbar["0"].offsetLeft;
        let tempSeekValue = tempSeekPosition / eleVideoSeekbar["0"].clientWidth;
        eleVideoObj["0"].currentTime = tempSeekValue * totalDurationInSeconds;
      });

      //8. scroll on seekbar
      $(eleVideoSeekbar).on("mousewheel", (e) => {
        e.deltaY === 1
          ? (eleVideoObj["0"].currentTime += 5)
          : (eleVideoObj["0"].currentTime -= 5);
      });

      //9. scroll on volumebar
      $(eleVolumeSeekbar).on("mousewheel", (e) => {
        let tempVolumeValue = eleVideoObj["0"].volume;
        if (e.deltaY === 1) {
          tempVolumeValue >= 1
            ? (tempVolumeValue = 1)
            : (tempVolumeValue += 0.1);
        } else {
          tempVolumeValue <= 0
            ? (tempVolumeValue = 0)
            : (tempVolumeValue -= 0.1);
        }
        volumeValue = tempVolumeValue.toFixed(1);
        eleVideoObj["0"].volume = tempVolumeValue.toFixed(1);
        if (eleVideoObj["0"].volume === 0)
          $(eleToggleVolume).addClass("off").removeClass("on");
        else $(eleToggleVolume).addClass("on").removeClass("off");
      });
    });
    const helper_getPercentage = (presentTime, totalTime) => {
      var calcPercentage = (presentTime / totalTime) * 100;
      return parseFloat(calcPercentage.toString());
    };

    const helper_calculateDuration = (duration) => {
      var seconds = parseInt(duration % 60);
      var minutes = parseInt((duration % 3600) / 60);
      var hours = parseInt(duration / 3600);

      return {
        hours: helper_pad(hours),
        minutes: helper_pad(minutes.toFixed()),
        seconds: helper_pad(seconds.toFixed()),
      };
    };

    const helper_pad = (number) => {
      if (number > -10 && number < 10) {
        return "0" + number;
      } else {
        return number;
      }
    };
  }
  getDashData() {
    const course = store.getState().student.course.course;
    StudentService.get_course_downloadables(course.courseId).then(
      (response) => {
        const selectedContentTag = this.state.selectedContentTag;
        const content = [];
        const corruptContent = [];
        for (const material of response) {
          if (!material.file.includes("materials")) {
            corruptContent.push(material);
          } else {
            if (material.file.includes("video")) {
              material.obj = "Videos";
              content.push(material);
            } else {
              if (material.obj === "undefined" || material.obj === "No Tag") {
                material.obj = "Textbook";
                content.push(material);
              } else {
                content.push(material);
              }
            }
          }
        }

        const allResources = content.filter((resource) =>
          resource.obj.includes(selectedContentTag.name)
        );
        allResources.sort((a, b) =>
          a.materialname.localeCompare(b.materialname)
        );

        let pages = [];
        let perPage = 9;
        const totalPageCount = Math.ceil(allResources.length / perPage);

        for (var i = 1; i <= totalPageCount; i++) {
          pages.push(i);
        }

        const resources = this.pageArraySplit(allResources, {
          currentPageNumber: this.state.currentPageNumber,
          perPage,
        });
        this.setState({ resources, pages, corruptContent });
      }
    );
  }
  getContentTags() {
    const course = store.getState().student.course.course;
    if (
      course === undefined ||
      course.name === "" ||
      course.name === undefined
    ) {
      return <Redirect to="/student" />;
    }
    AdminService.get_all_tags().then((response) => {
      this.setState({ tags: response }, () => {
        this.getDashData();
        this.getClasswork();
      });
    });
  }

  getClasswork() {
    const course = store.getState().student.course.course;
    if (
      course === undefined ||
      course.name === "" ||
      course.name === undefined
    ) {
      return <Redirect to="/student" />;
    }
    StudentService.get_student_all_classwork(course.courseId) // by course id
      .then((response) => {
        const content = [];
        const corruptContent = [];
        const unsupported = [];

        for (const material of response) {
          if (!material.file.includes("materials")) {
            corruptContent.push(material);
          } else {
            if (material.file.includes("video")) {
              material.obj = "Videos";
              unsupported.push(material);
            } else {
              content.push(material);
            }
          }
        }

        let pages = [];
        let perPage = 9;
        const totalPageCount = Math.ceil(content.length / perPage);

        for (var i = 1; i <= totalPageCount; i++) {
          pages.push(i);
        }

        const resources = this.pageArraySplit(content, {
          currentPageNumber: this.state.currentPageNumber,
          perPage,
        });
        this.setState({ assignments: resources });
      });
  }

  videoSelected = false;
  showAssignments = false;
  videoAddress = "";
  previewTitle = "";
  numPages = 0;

  selectedContentTag(tag) {
    this.cancelView();
    this.setState({ selectedContentTag: tag }, () => {
      this.getDashData();
    });
  }

  showAss() {
    this.videoSelected = false;
    this.showAssignments = true;
    this.previewTitle = "DOWNLOAD ASSIGNMENTS";
  }

  showResources() {
    this.videoSelected = false;
    this.showAssignments = false;
    this.previewTitle = "LIBRARY RESOURCES";
    this.setState({ view: false });
  }

  download(resource, key) {
    var data = {
      file: resource.file,
    };

    this.setState({ selectedResourceKey: key });
    setTimeout(() => {
      StudentService.download(data).then((response) => {
        this.setState(
          { view: true, url: URL.createObjectURL(response) },

          () => {
            this.videoPlayer();
          }
        );
      });
    }, 100);
  }
  cancelView() {
    this.setState({
      view: false,
      selectedResourceKey: -1,
      url: "",
      classwork: "",
    });
  }
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

  viewClasswork(classwork) {
    var data = {
      file: classwork,
    };

    setTimeout(() => {
      StudentService.download(data).then((response) => {
        this.setState({ view: true, classwork: URL.createObjectURL(response) });
      });
    }, 100);
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const course = store.getState().student.course.course;
    if (
      course === undefined ||
      course.name === "" ||
      course.name === undefined
    ) {
      return <Redirect to="/student" />;
    }
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
              <div className="container">
                <div style={{ marginTop: "15px" }}>
                  <div id="card-widgets">
                    <div className="row">
                      <div className="col s12 m12 l3">
                        <div className="column">
                          <ul className="task-card collection with-header">
                            <li
                              className={`collection-header ${course.color} `}
                            >
                              <p className="task-card-title">
                                {course.name} Resources
                              </p>
                            </li>
                            <li className="collection-item dismissable">
                              <label htmlFor="task1">
                                Course Library Resources
                                <Link
                                  to="#"
                                  onClick={() => this.showResources()}
                                  className="secondary-content"
                                >
                                  <span style={{ fontSize: "11px" }}>View</span>
                                </Link>
                              </label>
                            </li>
                            <li className="collection-item dismissable">
                              <label htmlFor="task1">
                                All Assingments
                                <Link
                                  to="#"
                                  onClick={() => this.showAss()}
                                  className="secondary-content"
                                >
                                  <span style={{ fontSize: "11px" }}>View</span>
                                </Link>
                              </label>
                            </li>
                          </ul>
                          <ul className="task-card collection with-header">
                            <li
                              className={`collection-header ${course.color} `}
                            >
                              <p className="task-card-title">{course.name}</p>
                            </li>
                            {this.state.tags.map((tag) => (
                              <li
                                key={tag.tagId}
                                className="collection-item dismissable"
                              >
                                <label htmlFor="task1">
                                  {tag.name}
                                  <Link
                                    to="#"
                                    onClick={() => this.selectedContentTag(tag)}
                                    className="secondary-content"
                                  >
                                    {tag.name === "Videos" ? (
                                      <span style={{ fontSize: "11px" }}>
                                        Watch
                                      </span>
                                    ) : (
                                      <span style={{ fontSize: "11px" }}>
                                        View
                                      </span>
                                    )}
                                  </Link>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col s12 m12 l9">
                        <div className="task-card collection with-header">
                          <div
                            className="collection-header teal"
                            style={{ height: 40 }}
                          >
                            <span
                              className="task-card-title left"
                              style={{ color: "white" }}
                            >
                              {this.videoSelected
                                ? this.previewTitle
                                : this.showAssignments
                                ? this.previewTitle
                                : "LIBRARY RESOURCES"}
                            </span>
                            <span
                              className="task-card-title right"
                              style={{ color: "white" }}
                            >
                              {this.state.selectedContentTag.name}
                            </span>
                          </div>
                          {this.showAssignments ? (
                            <div
                              className="row"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              {this.state.view ? (
                                <div className="video-player-st">
                                  <div className="video-topbar transparent">
                                    <div className="justify-center white-text cursor-pointer">
                                      <i
                                        className="material-icons"
                                        onClick={() => this.cancelView()}
                                      >
                                        clear
                                      </i>
                                    </div>
                                  </div>
                                  <Document
                                    file={this.state.classwork}
                                    onLoadSuccess={this.onDocumentLoadSuccess}
                                  >
                                    <Page
                                      pageNumber={this.state.currentPageNumber}
                                    />
                                  </Document>
                                  <div className="center-align">
                                    <a
                                      className="btn"
                                      style={{ color: "white" }}
                                      onClick={
                                        this.state.currentPageNumber > 1
                                          ? () =>
                                              this.setState({
                                                currentPageNumber:
                                                  this.state.currentPageNumber -
                                                  1,
                                              })
                                          : () =>
                                              this.setState({
                                                currentPageNumber: 1,
                                              })
                                      }
                                    >
                                      <i className="material-icons">
                                        chevron_left
                                      </i>
                                      <i className="material-icons">
                                        chevron_left
                                      </i>
                                    </a>
                                    Page {this.state.currentPageNumber} of{" "}
                                    {this.state.numPages}
                                    <a
                                      className="btn"
                                      style={{ color: "white" }}
                                      onClick={
                                        this.state.currentPageNumber !=
                                        this.state.numPages
                                          ? () =>
                                              this.setState({
                                                currentPageNumber:
                                                  this.state.currentPageNumber +
                                                  1,
                                              })
                                          : () =>
                                              this.setState({
                                                currentPageNumber: this.state
                                                  .numPages,
                                              })
                                      }
                                    >
                                      <i className="material-icons">
                                        chevron_right
                                      </i>
                                      <i className="material-icons">
                                        chevron_right
                                      </i>
                                    </a>
                                  </div>
                                </div>
                              ) : (
                                this.state.assignments.map((assignment, i) => (
                                  <div
                                    key={assignment.assignmentId}
                                    className="col s12 m8 l4"
                                  >
                                    <div
                                      className="card min-height-100 white-text designed-dots"
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <div className="padding-4">
                                        <div className="col s12 m12">
                                          <p
                                            className="no-margin"
                                            style={{ color: "teal" }}
                                          >
                                            <b>{assignment.assignmentname}</b>
                                          </p>
                                          <p
                                            className="no-margin"
                                            style={{
                                              fontSize: "12px",
                                              color: "grey",
                                            }}
                                          >
                                            {assignment.duedate}
                                          </p>
                                        </div>
                                        <div
                                          className="right-align"
                                          style={{
                                            marginTop: "60px",
                                            color: "black",
                                          }}
                                        >
                                          <p className="no-margin">
                                            <a
                                              href="#!"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                this.viewClasswork(
                                                  assignment.file
                                                );
                                              }}
                                            >
                                              View
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          ) : this.state.view ? (
                            this.state.selectedContentTag.name === "Videos" ? (
                              <div className="video-player-st">
                                <div className="video-topbar transparent">
                                  <div className="justify-center white-text cursor-pointer">
                                    <i
                                      className="material-icons"
                                      onClick={() => this.cancelView()}
                                    >
                                      clear
                                    </i>
                                  </div>
                                </div>

                                <video
                                  src={this.state.url}
                                  width="100%"
                                  height="100%"
                                ></video>
                                <div className="video-controls gradient-45deg-light-blue-cyan">
                                  <div className="video-top-controls">
                                    <div className="video-seekbar seekbar">
                                      <span className="progress"></span>
                                    </div>
                                  </div>

                                  <div className="video-playback-controls">
                                    <button className="control-btn toggle-play-pause play">
                                      <i className="fas fa-play play-icon icon"></i>
                                      <i className="fas fa-pause pause-icon icon"></i>
                                    </button>
                                    <div className="video-volume-control">
                                      <button className="control-btn toggle-volume on">
                                        <i className="fas fa-volume-up icon volume-on"></i>
                                        <i className="fas fa-volume-mute icon volume-off"></i>
                                      </button>
                                      <div className="volume-seekbar seekbar">
                                        <span className="progress"></span>
                                      </div>
                                    </div>
                                    <div className="video-timings">
                                      <div className="start-time time">
                                        00:00:00
                                      </div>
                                      /
                                      <div className="end-time time">
                                        00:00:00
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="col s12 m12">
                                <div className="center-align">
                                  <Document
                                    file={this.state.url}
                                    onLoadSuccess={this.onDocumentLoadSuccess}
                                  >
                                    <Page
                                      pageNumber={this.state.currentPageNumber}
                                    />
                                  </Document>
                                </div>

                                <div className="center-align">
                                  <a
                                    className="btn"
                                    style={{ color: "white" }}
                                    onClick={
                                      this.state.currentPageNumber > 1
                                        ? () =>
                                            this.setState({
                                              currentPageNumber:
                                                this.state.currentPageNumber -
                                                1,
                                            })
                                        : () =>
                                            this.setState({
                                              currentPageNumber: 1,
                                            })
                                    }
                                  >
                                    <i className="material-icons">
                                      chevron_left
                                    </i>
                                    <i className="material-icons">
                                      chevron_left
                                    </i>
                                  </a>
                                  Page {this.state.currentPageNumber} of{" "}
                                  {this.state.numPages}
                                  <a
                                    className="btn"
                                    style={{ color: "white" }}
                                    onClick={
                                      this.state.currentPageNumber !=
                                      this.state.numPages
                                        ? () =>
                                            this.setState({
                                              currentPageNumber:
                                                this.state.currentPageNumber +
                                                1,
                                            })
                                        : () =>
                                            this.setState({
                                              currentPageNumber: this.state
                                                .numPages,
                                            })
                                    }
                                  >
                                    <i className="material-icons">
                                      chevron_right
                                    </i>
                                    <i className="material-icons">
                                      chevron_right
                                    </i>
                                  </a>
                                </div>
                              </div>
                            )
                          ) : this.state.resources.length < 1 ? (
                            <div className="col s12">
                              <div
                                className="justify-center"
                                style={{ minHeight: 450 }}
                              >
                                <span
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
                                  No {this.state.selectedContentTag.name} Found!
                                </span>
                              </div>
                            </div>
                          ) : (
                            this.state.resources.map((resource, i) => (
                              <div key={i} className="col s12 m6 l4">
                                <div
                                  className="card min-height-100 white-text designed-dots"
                                  style={{ borderRadius: "5px" }}
                                >
                                  <div className="padding-4">
                                    <div className="col s12 m12">
                                      <p
                                        className="no-margin"
                                        style={{ color: "teal" }}
                                      >
                                        <b>{resource.materialname}</b>
                                      </p>
                                      <p
                                        className="no-margin"
                                        style={{
                                          fontSize: "12px",
                                          color: "grey",
                                        }}
                                      >
                                        {resource.dateadded}
                                      </p>
                                    </div>
                                    <div
                                      className="right-align"
                                      style={{
                                        marginTop: "60px",
                                        color: "black",
                                      }}
                                    >
                                      <p className="no-margin">
                                        <button
                                          onClick={() => {
                                            this.download(resource, i);
                                          }}
                                        >
                                          {this.state.selectedContentTag
                                            .name === "Videos"
                                            ? "Watch"
                                            : "View"}
                                        </button>
                                      </p>
                                    </div>
                                    <div
                                      className={
                                        i === this.state.selectedResourceKey
                                          ? "justify-center"
                                          : "display-none"
                                      }
                                    >
                                      <div className="vertical--center">
                                        <div className="vertical-center__element">
                                          <span className="preloader preloader--top"></span>
                                          <span className="preloader preloader--bottom"></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        <div className="row">
                          <div
                            className="col l12 center-align"
                            style={{ paddingTop: 20 }}
                          >
                            <ul className="pagination">
                              <li
                                className={
                                  this.state.currentPageNumber === 1 ||
                                  this.state.pages.length < 1
                                    ? "disabled pointer-events-none"
                                    : "waves-effect"
                                }
                              >
                                <Link
                                  className={
                                    this.state.currentPageNumber === 1 ||
                                    this.state.pages.length < 1
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
                              {this.state.pages.length < 1 ? (
                                <li className="active">
                                  <Link rel="noopener noreferer" to="#!">
                                    {this.state.currentPageNumber}
                                  </Link>
                                </li>
                              ) : (
                                this.state.pages.map((page) => {
                                  if (page === this.state.currentPageNumber) {
                                    return (
                                      <li key={page} className="active">
                                        <Link
                                          onClick={() =>
                                            this.handlePageClick(page)
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
                                  this.state.currentPageNumber ===
                                    this.state.pages.length ||
                                  this.state.pages.length < 1
                                    ? "disabled pointer-events-none"
                                    : "waves-effect"
                                }
                              >
                                <Link
                                  onClick={this.handleNextClick}
                                  className={
                                    this.state.currentPageNumber ===
                                      this.state.pages.length ||
                                    this.state.pages.length < 1
                                      ? "disabled pointer-events-none"
                                      : ""
                                  }
                                  rel="noopener noreferer"
                                  to="#!"
                                >
                                  <i className="material-icons">
                                    chevron_right
                                  </i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(SubjectContent);
