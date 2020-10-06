import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SubjectDescrip from "../../components/student-components/SubjectDescrip";
import ShowAllAssignments from "../../components/student-components/showAllAssignments";
import store from "../../config/store";
import Footer from "../../components/footer";
import Header from "../../components/header";
import $ from "jquery";

import { StudentService } from "../../services/student";

class SubjectContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      url: "",
      view: false,
      selectedResourceKey: -1,
    };
  }

  componentDidMount() {
    this.videoresources();
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
  videoresources() {
    const course = store.getState().student.course.course;

    if (
      course === undefined ||
      course.name === "" ||
      course.name === undefined
    ) {
      return <Redirect to="/student" />;
    }

    StudentService.get_course_downloadables(course.courseId).then(
      (response) => {
        console.log(response)
        this.setState({ resources: response });
      }
    );
  }

  videoSelected = false;
  showAssignments = false;
  videoAddress = "";
  previewTitle = "";

  selectedResource(resource, key) {
    var data = {
      file: resource.file,
    };
    this.setState({ selectedResourceKey: key });
    setTimeout(() => {
      StudentService.download(data).then((response) => {
        this.setState(
          { view: true, url: URL.createObjectURL(response) },
          () => {
            this.videoSelected = true;
            this.previewTitle = resource.materialname;
            this.videoPlayer();
          }
        );
      });
    }, 100);
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
            <SideBar />

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
                              <p className="task-card-title">
                                {course.name} VIDEOS
                              </p>
                            </li>
                            {this.state.resources.map((resource, i) =>
                              resource.materialname.includes(".mp4") ? (
                                ""
                              ) : (
                                <li className="collection-item dismissable">
                                  <label htmlFor="task1">
                                    {resource.materialname.substr(0, 28) +
                                      "\u2026"}
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        this.selectedResource(resource, i)
                                      }
                                      className="secondary-content"
                                    >
                                      <span style={{ fontSize: "11px" }}>
                                        Watch
                                      </span>
                                    </Link>
                                  </label>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="col s12 m13 l9">
                        <div className="task-card collection with-header">
                          <div className="collection-header teal">
                            <p
                              className="task-card-title"
                              style={{ color: "white" }}
                            >
                              {this.videoSelected
                                ? this.previewTitle
                                : this.showAssignments
                                ? this.previewTitle
                                : "LIBRARY RESOURCES"}
                            </p>
                          </div>
                          {this.state.view ? (
                            <div className="video-player-st">
                              <div className="video-topbar transparent">
                                <div className="justfiyCenter white-text cursor-pointer">
                                  <i
                                    className="material-icons"
                                    onClick={() => this.showResources()}
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
                          ) : this.showAssignments ? (
                            <div
                              className="row"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              <ShowAllAssignments
                                content={course.courseId}
                              ></ShowAllAssignments>
                            </div>
                          ) : (
                            <SubjectDescrip
                              content={course.courseId}
                            ></SubjectDescrip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
