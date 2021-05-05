import React, { Component } from "react";
import { connect } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { UploadService } from "../../services/upload";
import { AdminService } from "../../services/admin";
import Classes from "../../components/Classes";
import Tags from "../../components/Tag";
import { Link } from "react-router-dom";
import "../../assets/css/list-grid-comp.css";
import "../../assets/css/bounceman-4th-loader.css";
import avatar from "../../assets/images/gallary/not_found.gif";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class UploadContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      view: false,
      selectedVideo: false,
      courses: [],
      class: "",
      tag: [],
      url: "",
      selectedResourceKey: -1,
      selectedOption: {},
      resources: [],
      allResources: [],
      currentPageNumber: 1,
      searchText: "",
      pages: [],
      numPages: 1,
    };
  }

  user = {};
  courseId = "1";
  fileUpload;
  loggedUserId = "";
  schoolid = "";

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.loggedUserId = this.user.userid;
    this.schoolid = this.user.schoolid;
    M.AutoInit();
    this.getDashData();
  }

  videoPlayer() {
    $(".video-player-st").each(function (_, videoPlayer) {
      /**
       * get all the controlsdd
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
    AdminService.get_all_resources().then((response) => {
      let allResources = response === undefined ? [] : response;
      allResources = allResources.filter((el) => el.obj !== "Advert");
      allResources.sort((a, b) => a.materialname.localeCompare(b.materialname));

      let pages = [];
      let perPage = 24;
      const totalPageCount = Math.ceil(allResources.length / perPage);

      if (this.state.currentPageNumber <= 3) {
        for (var i = 1; i <= 7; i++) {
          pages.push(i);
        }
      } else if (this.state.currentPageNumber >= totalPageCount - 2) {
        for (var i = totalPageCount - 6; i <= totalPageCount; i++) {
          pages.push(i);
        }
      } else {
        for (
          var i = this.state.currentPageNumber - 3;
          i <= this.state.currentPageNumber;
          i++
        ) {
          pages.push(i);
        }
        for (
          var i = this.state.currentPageNumber + 1;
          i <= this.state.currentPageNumber + 3;
          i++
        ) {
          pages.push(i);
        }
      }

      const resources = this.pageArraySplit(allResources, {
        currentPageNumber: this.state.currentPageNumber,
        perPage,
      });
      this.setState({ pages, resources, allResources, totalPageCount });
    });
  }

  handleSubmitTag = (event) => {
    var data = {
      name: event.target.tagname.value,
    };

    UploadService.add_tag(data).then((response) => {
      if (response === undefined) {
        M.toast({
          html: "Tag not added",
          classes: "red",
        });
      } else if (response.err) {
        M.toast({
          html: response.err,
          classes: "red",
        });
      } else if (response.success === true) {
        M.toast({
          html: "Tag Added",
          classes: "green ",
        });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var uploadCount = 0;
    var targetLength = event.target.fileUpload.files.length;
    var tagSelected = this.state.tag;

    M.toast({
      html: "Resource upload in progress",
      classes: "green ",
    });

    for (var i = 0; i < event.target.fileUpload.files.length; i++) {
      this.fileUpload = event.target.fileUpload.files[i];
      var data = {
        teacherid: this.loggedUserId,
        schoolid: this.schoolid,
        materialname: this.fileUpload.name,
        materialtype: "file",
        file: true,
        classid: this.state.class.classId,
        grade: this.state.class.grade,
        obj: this.state.selectedOption.name,
      };

      UploadService.post_material(data).then((response) => {
        if (response === undefined) {
          M.toast({
            html: "Resource Upload failed",
            classes: "red",
          });
        } else if (response.err) {
          M.toast({
            html: response.err,
            classes: "red",
          });
        } else if (response.success === true) {
          const uploadData = new FormData();
          uploadData.append("", this.fileUpload);
          uploadData.append("uploadType", response.uploadType);
          uploadData.append("uploadId", response.uploadId);

          var tag_post = {
            tagIds: tagSelected,
            materialId: response.uploadId,
          };

          UploadService.link_tags(tag_post).then((response) => {
            M.toast({
              html: "Taging Content",
              classes: "yellow",
            });

            console.log(response);
            if (response === undefined) {
              M.toast({
                html: "Content uploading without any tags.",
                classes: "red",
              });
            } else if (response.err) {
              M.toast({
                html: response.err,
                classes: "red",
              });
            } else if (response.success) {
              UploadService.upload(uploadData).then((resp) => {
                if (resp.success === true) {
                  uploadCount += 1;
                  if (uploadCount === targetLength) {
                    M.toast({
                      html:
                        uploadCount +
                        " out of " +
                        targetLength +
                        " files uploaded ...",
                      classes: "green",
                    });
                    M.toast({
                      html: "Upload Successful",
                      classes: "green ",
                    });
                    this.componentDidMount();
                  } else {
                    M.toast({
                      html:
                        uploadCount +
                        " out of " +
                        targetLength +
                        " files uploaded ...",
                      classes: "green",
                    });
                  }
                } else {
                  M.toast({
                    html: "Failed to upload resource: " + resp.message,
                    classes: "red ",
                  });
                }
              });
            }
          });
        } else {
          M.toast({
            html: response.message,
            classes: "red ",
          });
        }
      });
    }
  };

  onSelectClassOption = (selectedOption) => {
    this.setState({
      class: selectedOption,
    });
  };

  onSelectTagOption = (selectedOption) => {
    this.setState({
      tag: [selectedOption.tagId],
      selectedOption,
    });
  };

  download(resource) {
    var data = {
      file: resource.file,
    };
    this.setState(
      {
        view: true,
        loading: true,
      },
      () => {
        AdminService.download(data).then((response) => {
          try {
            const url = URL.createObjectURL(response);
            this.setState(
              {
                loading: false,
                selectedVideo: resource.file.includes("video") ? true : false,

                url,
              },

              () => {
                this.videoPlayer();
              }
            );
          } catch (error) {
            this.setState(
              {
                loading: false,
                selectedVideo: resource.file.includes("video") ? true : false,
                url: "",
              },

              () => {
                this.videoPlayer();
              }
            );
          }
        });
      }
    );
  }

  deleteResource(resource) {
    var data = {
      file: resource.file,
    };

    AdminService.deleteResource(data).then((response) => {
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

  cancelView = (e) => {
    e.preventDefault();
    this.setState({
      view: false,
      selectedVideo: false,
      selectedResourceKey: -1,
      url: "",
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
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

  truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

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
                        Resource Management
                      </p>
                    </div>
                    <a
                      href="#!"
                      data-target="modaladd"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="New Upload"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">cloud_upload</i>
                    </a>
                    {/* <a
                      href="#!"
                      data-target="modaltag"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Add new content tags"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">add_circle_outline</i>
                    </a> */}
                  </div>
                </nav>
              </div>
              <section class="row" style={{ paddingTop: 85 }}>
                {this.state.view ? (
                  <div className="col s12">
                    <div
                      className="card sticky-action z-depth-5 left"
                      style={{
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: this.state.loading
                            ? "#00bcd4"
                            : "#000",
                          height: this.state.selectedVideo ? 480 : "100%",
                          minHeight: 480,
                        }}
                      >
                        {this.state.loading ? (
                          <div className="bounceman-4th">
                            <ul>
                              <li>L</li>
                              <li>O</li>
                              <li>A</li>
                              <li>D</li>
                              <li>I</li>
                              <li>N</li>
                              <li>G</li>
                              <li>.</li>
                              <li>.</li>
                              <li>.</li>
                            </ul>
                          </div>
                        ) : this.state.selectedVideo ? (
                          <div className="video-player-st">
                            <video
                              contextMenu="none"
                              src={this.state.url}
                              width="100%"
                              height="100%"
                            ></video>
                            <div className="video-controls transparent">
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
                                  /<div className="end-time time">00:00:00</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className=" padding-1">
                            <div className="card--button right z-depth-5 border-radius-10">
                              <button
                                style={{
                                  backgroundColor: "#ee6e73",
                                }}
                                className="border-radius-10"
                                onClick={this.cancelView}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-x"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                                <span>close</span>
                              </button>
                            </div>

                            <div className="justify-center">
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
                                            this.state.currentPageNumber - 1,
                                        })
                                    : () =>
                                        this.setState({
                                          currentPageNumber: 1,
                                        })
                                }
                              >
                                <i className="material-icons">chevron_left</i>
                                <i className="material-icons">chevron_left</i>
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
                                            this.state.currentPageNumber + 1,
                                        })
                                    : () =>
                                        this.setState({
                                          currentPageNumber: this.state
                                            .numPages,
                                        })
                                }
                              >
                                <i className="material-icons">chevron_right</i>
                                <i className="material-icons">chevron_right</i>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="padding-3">
                    <Search searchText={this.searchText} />
                    <main className="row" style={{ minHeight: 350 }}>
                      {this.state.resources.filter((resource) =>
                        resource.materialname
                          .toLowerCase()
                          .includes(this.state.searchText.toLowerCase())
                      ).length < 1 ? (
                        <div className="row">
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
                        this.state.resources
                          .filter((resource) =>
                            resource.materialname
                              .toLowerCase()
                              .includes(this.state.searchText.toLowerCase())
                          )
                          .map((resource, i) => (
                            <div key={i} className="col s12 m6 l4">
                              <div
                                className="card min-height-100 z-depth-2 white-text designed-dots"
                                style={{
                                  borderRadius: "5px",
                                  backgroundColor: "white",
                                }}
                              >
                                <div className="padding-4">
                                  <div className="col s12 m12">
                                    <p
                                      className="no-margin"
                                      style={{ color: "teal" }}
                                    >
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                        }}
                                        className="tooltipped"
                                        data-tooltip={`${resource.materialname}`}
                                        data-position="bottom"
                                      >
                                        {this.truncate(
                                          resource.materialname,
                                          128
                                        )}
                                      </a>
                                    </p>
                                    <p
                                      className="no-margin"
                                      style={{
                                        fontSize: "12px",
                                        color: "grey",
                                      }}
                                    >
                                      Tag: {resource.obj} | Subject ID:{" "}
                                      {resource.classid}
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
                                          {resource.file.includes("video")
                                            ? "Watch"
                                            : "View"}
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
                            <div key={i} className="col s12 m6 l4">
                              <div
                                className="card min-height-100 z-depth-2 white-text designed-dots"
                                style={{
                                  borderRadius: "5px",
                                  backgroundColor: "white",
                                }}
                              >
                                <div className="padding-4">
                                  <div className="col s12 m12">
                                    <p
                                      className="no-margin"
                                      style={{ color: "teal" }}
                                    >
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                        }}
                                        className="tooltipped"
                                        data-tooltip={`${resource.materialname}`}
                                        data-position="bottom"
                                      >
                                        {this.truncate(
                                          resource.materialname,
                                          128
                                        )}
                                      </a>
                                    </p>
                                    <p
                                      className="no-margin"
                                      style={{
                                        fontSize: "12px",
                                        color: "grey",
                                      }}
                                    >
                                      Tag: {resource.obj} | Subject ID:{" "}
                                      {resource.classid}
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
                              onClick={this.handlePrevClick}
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
                              this.state.currentPageNumber ===
                                this.state.pages.length ||
                              this.state.pages.length < 1 ||
                              this.state.searchText !== ""
                                ? "disabled pointer-events-none"
                                : "waves-effect"
                            }
                          >
                            <Link
                              onClick={this.handleNextClick}
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
                )}
              </section>

              <div
                id="modaladd"
                className="modal modal-meeting min-width-500 border-radius-10"
              >
                <h1 style={{ marginTop: "10px" }} className="h1-meeting">
                  <i
                    className="material-icons"
                    style={{ transform: "translate(-3px, 4px)" }}
                  >
                    cloud_upload
                  </i>
                  Upload Resource!
                </h1>

                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSubmit}
                  id="sibs"
                >
                  {/* <hr className="hr5" style={{ marginBottom: 30 }} /> */}
                  <div className="row">
                    <div className="col s7 m7">
                      <fieldset className="form-group">
                        <label
                          style={{
                            transform: "translateY(-15px)",
                            fontSize: "12px",
                          }}
                        >
                          SELECT SUBJECT *
                        </label>
                        <Classes
                          onSelectOption={this.onSelectClassOption}
                          required
                        />
                        <div
                          style={{ marginTop: "10px" }}
                          className="my-divider"
                        ></div>
                      </fieldset>
                    </div>
                    <div className="col s5 m5">
                      <fieldset className="form-group">
                        <label
                          style={{
                            transform: "translateY(-15px)",
                            fontSize: "12px",
                          }}
                        >
                          SELECT TAG *
                        </label>
                        <Tags
                          onSelectOption={this.onSelectTagOption}
                          required
                        />
                        <div
                          style={{ marginTop: "10px" }}
                          className="my-divider"
                        ></div>
                      </fieldset>
                    </div>
                  </div>
                  <fieldset className="form-group">
                    <ReactFormLabel
                      htmlFor="fileUpload"
                      title="Subject Resources:"
                    />
                    <input
                      className="many-files"
                      id="file"
                      type="file"
                      name="fileUpload"
                      multiple
                      required
                    />
                  </fieldset>
                  <div className="form-group">
                    <input
                      id="formButton2"
                      className="btn gradient-45deg-light-blue-cyan border-radius-5"
                      type="submit"
                      value="Upload"
                    />
                  </div>
                </form>
              </div>

              <div
                id="modaltag"
                className="modal modal-meeting min-width-500 border-radius-10"
              >
                <h1 style={{ marginTop: "10px" }} className="h1-meeting">
                  Add New Content Tag
                </h1>
                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSubmitTag}
                  id="sibs"
                >
                  <ReactFormLabel htmlFor="tagname" title="Tag Name:" />

                  <input
                    id="tagname"
                    className="form-input input-meeting"
                    name="tagname"
                    type="text"
                    required
                  />
                  <div className="form-group">
                    <input
                      id="formButton2"
                      className="btn gradient-45deg-light-blue-cyan border-radius-5"
                      type="submit"
                      value="Add"
                    />
                  </div>
                </form>
              </div>

              <div id="areyousure" className="modal width-250">
                <div className="modal-content">
                  <h4 className="header2">Are you sure?</h4>
                </div>
                <div className="modal-footer">
                  <Link
                    to="#"
                    style={{ marginRight: 10 }}
                    className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                    //onClick={this.handleDelete}
                  >
                    Yes
                  </Link>
                  <Link
                    to="#"
                    className="modal-close btn gradient-45deg-red-pink waves-effect white-text"
                  >
                    No
                  </Link>
                </div>
              </div>
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
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadContent);
