import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { UploadService } from "../../services/upload";
import { AdminService } from "../../services/admin";
import "../../assets/css/bounceman-4th-loader.css";

class AdsManagementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      view: false,
      selectedVideo: false,
      courses: [],
      class: "",
      tag: [],
      url: "",
      nowPlaying: -1,
      selectedOption: {},
      resources: [],
      adverts: [],
      currentPageNumber: 1,
      searchText: "",
      pages: [],
      numPages: 1,
    };
  }

  componentDidMount() {
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    AdminService.get_all_resources().then((response) => {
      let adverts = response === undefined ? [] : response;
      adverts = adverts.filter((el) => el.obj === "Videos");
      this.setState({ adverts: adverts.slice(0, 12) }, () => {
        if (this.state.adverts.length > 0) {
          this.download(adverts[0], 0);
        }
      });
    });
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

  download(resource, i) {
    console.log(resource);
    var data = {
      file: resource.file,
    };
    this.setState({ loading: true }, () => {
      AdminService.download(data).then((response) => {
        try {
          const url = URL.createObjectURL(response);
          this.setState(
            {
              nowPlaying: i,
              loading: false,
              url,
            },

            () => {
              this.videoPlayer();
            }
          );
        } catch (error) {
          this.setState(
            {
              nowPlaying: i,
              loading: false,
              url: "",
            },

            () => {
              this.videoPlayer();
            }
          );
        }
      });
    });
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
  confirmDelete = (e) => {
    e.preventDefault();
    let elem = document.getElementById("areyousure");
    let modal = new M.Modal(elem);
    modal.open();
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    M.toast({
      html: "Resource upload in progress",
      classes: "green ",
    });
    const uploadData = new FormData();
    uploadData.append("filetoupload", event.target.advert.files[0]);

    var data = {
      teacherid: user.userid,
      schoolid: user.schoolid,
      materialname: event.target.advert.files[0].name,
      materialtype: "file",
      file: true,
      classid: 24,
      grade: 2,
      obj: "Advert",
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
        uploadData.append("uploadType", response.uploadType);
        uploadData.append("uploadId", response.uploadId);

        var tag_post = {
          tagIds: [8],
          materialId: response.uploadId,
        };

        UploadService.link_tags(tag_post).then((response) => {
          M.toast({
            html: "Taging Content",
            classes: "yellow",
          });

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
                M.toast({
                  html: "Upload Successful",
                  classes: "green ",
                });
                this.componentDidMount();
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
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
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
                        Manage Adverts
                      </p>
                    </div>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      data-target="modaladd"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Add New Plan"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">add_circle_outline</i>
                    </a>
                  </div>
                </nav>
              </div>
              <div style={{ paddingTop: 85 }} className="row">
                <div className="col s12">
                  <div
                    className="card sticky-action z-depth-5 left"
                    style={{ height: 480, width: "80%" }}
                  >
                    <div
                      style={
                        this.state.loading
                          ? { backgroundColor: "#00bcd4", height: "100%" }
                          : { backgroundColor: "#000", height: "100%" }
                      }
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
                      ) : (
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
                                <div className="start-time time">00:00:00</div>/
                                <div className="end-time time">00:00:00</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <section
                    id="style-2"
                    className="playlist-wrapper scrollbar-playlist z-depth-5 left"
                    style={{
                      height: 480,
                      margin: ".5rem 0 1rem 0",
                      width: "20%",
                    }}
                  >
                    <section className="lists padding-3">
                      <ul className="itemList">
                        {this.state.adverts.map((item, i) => (
                          <li
                            key={`listItem${i}`}
                            className="video-item card sticky-action border-radius-5 z-depth-5 "
                          >
                            <div style={{ height: 100 }}>
                              <div style={{ margin: "10px 15px 15px 15px" }}>
                                <span>
                                  {this.truncate(item.materialname, 32)}
                                </span>
                              </div>
                              <div
                                className="card--button"
                                style={{ margin: "0px 15px" }}
                              >
                                {i === this.state.nowPlaying ? (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                    className="green accent-3 border-radius-5 texe"
                                    style={{
                                      width: 110,
                                      fontSize: 12,
                                      height: 24,
                                    }}
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
                                      className="feather feather-play"
                                    >
                                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                    Now Playing
                                  </button>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      this.download(item, i);
                                    }}
                                    className="green accent-3 border-radius-5"
                                    style={{
                                      width: 70,
                                      fontSize: 12,
                                      height: 24,
                                    }}
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
                                      className="feather feather-play-circle"
                                    >
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                    </svg>
                                    Play
                                  </button>
                                )}
                              </div>
                              <div className="card--button right">
                                <button
                                  onClick={this.confirmDelete}
                                  className="border-radius-5"
                                  style={{
                                    width: 24,
                                    fontSize: 12,
                                    height: 24,
                                    transform: "translate(-5px, -80px)",
                                    zIndex: 1,
                                  }}
                                >
                                  <svg
                                    style={{ marginRight: 0 }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-trash-2"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line
                                      x1="10"
                                      y1="11"
                                      x2="10"
                                      y2="17"
                                    ></line>
                                    <line
                                      x1="14"
                                      y1="11"
                                      x2="14"
                                      y2="17"
                                    ></line>
                                  </svg>
                                </button>
                              </div>
                              <div
                                id="areyousure"
                                className="modal width-250 top-50 padding-1 border-radius-10"
                              >
                                <div className="modal-content">
                                  <h4 className="header2">Are you sure?</h4>
                                </div>
                                <div className="modal-footer">
                                  <a
                                    onClick={(e) => {
                                      e.preventDefault();
                                      this.download(item, i);
                                    }}
                                    to="#!"
                                    style={{ marginRight: 10 }}
                                    className="modal-close btn gradient-45deg-green-teal waves-effect white-text border-radius-5"
                                  >
                                    Yes
                                  </a>
                                  <a
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                    to="#!"
                                    className="modal-close btn gradient-45deg-red-pink waves-effect white-text border-radius-5"
                                  >
                                    No
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </section>
                </div>
                <div
                  id="modaladd"
                  className="modal modal-meeting min-width-500 border-radius-10 padding-2"
                >
                  <h5 className="padding-1">Add New Advert</h5>
                  <form
                    className="row"
                    id="advert_form"
                    data-toggle="validator"
                    data-focus="false"
                    style={{ marginBottom: 0 }}
                    onSubmit={this.handleSubmit}
                  >
                    <div className="input-field col s10">
                      <fieldset className="form-group">
                        <ReactFormLabel
                          htmlFor="advert"
                          title="Advert Upload *"
                        />
                        <input
                          className=""
                          id="advert"
                          type="file"
                          name="advert"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="card--button input-field col s2">
                      <button
                        style={{
                          width: 40,
                          transform: "translateY(45px)",
                        }}
                        type="submit"
                        className="green accent-3 border-radius-5"
                      >
                        <svg
                          style={{ marginRight: 0 }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-upload-cloud"
                        >
                          <polyline points="16 16 12 12 8 16"></polyline>
                          <line x1="12" y1="12" x2="12" y2="21"></line>
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                          <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>
                      </button>
                    </div>
                  </form>
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

class ReactFormLabel extends React.Component {
  render() {
    return (
      <label className="label-meeting" htmlFor={this.props.htmlFor}>
        {this.props.title}
      </label>
    );
  }
}

// initial list data structure to demo.
const listData = [
  {
    content: "This is to-do item #1",
  },
  {
    content:
      "This is another to-do item, that might take place before or after #1. Should have a much longer content box to test dynamic height calculations and transitions. Same size boxes are just boring anyhow.",
  },
  {
    content:
      "This is another to-do item, that might take place before or after #1. Should have a much longer content box to test dynamic height calculations and transitions. Same size boxes are just boring anyhow.",
  },
  {
    content:
      "This is another to-do item, that might take place before or after #1. Should have a much longer content box to test dynamic height calculations and transitions. Same size boxes are just boring anyhow.",
  },
  {
    content:
      "This is another to-do item, that might take place before or after #1. Should have a much longer content box to test dynamic height calculations and transitions. Same size boxes are just boring anyhow.",
  },
  {
    content:
      "This is another to-do item, that might take place before or after #1. Should have a much longer content box to test dynamic height calculations and transitions. Same size boxes are just boring anyhow.",
  },
  {
    content:
      "This is another to-do item, that might take place before or after #1. Should have a much longer content box to test dynamic height calculations and transitions. Same size boxes are just boring anyhow.",
  },
  {
    content:
      "This is another to-do item, that might take place before or after #1. Should have a much longer content box to test dynamic height calculations and transitions. Same size boxes are just boring anyhow.",
  },
  {
    content:
      "This is another to-do item, that might take place before or after #1. Should have a much longer content box to test dynamic height calculations and transitions. Same size boxes are just boring anyhow.",
  },
  {
    content: "Definitely need to do this step too, I just dont know where",
  },
  {
    content: "Will probably have to do this step last... I think...",
  },
];

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdsManagementScreen);
