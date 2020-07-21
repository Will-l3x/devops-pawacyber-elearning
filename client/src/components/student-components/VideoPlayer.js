import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";

import carousel1 from "../../assets/images/conference/live-chat.svg";

//import M from "materialize-css";
import moment from "moment";
import "../../assets/css/video-player.css";

import StreamActions from "../../actions/stream";

class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      source: [],
      live: false,
      currentPageNumber: 1,
      meetings: [],
      pages: [],
    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });

    this.get_meetings();

    this.videoPlayer();
  }
  videoPlayer() {
    $(".video-player").each(function (_, videoPlayer) {
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

  initJisti = () => {
    const res = this.props.streamState.startstop_meeting_res;
    localStorage.setItem("meetingId", res.meetingId);
    const domain =
      "meet.jit.si/RIFqhR13UEsVBUfqKvpZ8ijJCGkMhkCuONOSZ0OJc6fQF7m58cxCL";
    const options = {
      width: "100%",
      height: 450,
      parentNode: document.querySelector("#meet"),
    };

    const JitsiMeetExternalAPI =
      window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI;
    const api = new JitsiMeetExternalAPI(domain, options);
    this.api = api;
    return "";
  };

  get_meetings = () => {
    this.props.get_meetings();
    let pages = [];
    let perPage = 6;
    const totalPageCount = Math.ceil(
      this.props.streamState.meetings.length / perPage
    );

    for (var i = 1; i <= totalPageCount; i++) {
      pages.push(i);
      this.setState({ pages });
    }

    const meetings = this.pageArraySplit(this.props.streamState.meetings, {
      currentPageNumber: this.state.currentPageNumber,
      perPage,
    });
    this.setState({ meetings });
  };
  colors = (i) => {
    var colors = [
      "gradient-45deg-light-blue-cyan",
      "gradient-45deg-red-pink",
      "gradient-45deg-green-teal",
      "gradient-45deg-amber-amber",
      "red",
      "teal accent-4",
    ];
    /* shuffle array
    colors.sort(function(){
      return .5 -Math.random();
    });
    */
    return colors[i % 5];
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
    this.get_meetings();
  };
  handlePrevClick = async () => {
    const pageNumber = this.state.currentPageNumber - 1;
    this.setState({ currentPageNumber: pageNumber });
    this.get_meetings();
  };
  handleNextClick = async () => {
    const pageNumber = this.state.currentPageNumber + 1;
    console.log(pageNumber);
    this.setState({ currentPageNumber: pageNumber });
    this.get_meetings();
  };

  render() {
    console.log(this.props);
    return (
      <div className="vid-containa">
        <div
          className={`video-player ${
            this.props.streamState.startstop_meeting_res.started
              ? this.initJisti()
              : "display-none"
          }`}
        >
          <div className="video-topbar gradient-45deg-semi-dark">Title</div>
          <div id="meet" className="conference"></div>

          <div
            className="video-controls gradient-45deg-semi-dark"
            style={{ height: 5 }}
          ></div>
        </div>

        <div
          className={`video-player ${
            this.props.streamState.startstop_meeting_res.started
              ? "display-none"
              : ""
          }`}
        >
          <div className="video-topbar gradient-45deg-semi-dark">Title</div>
          <video src="https://www.videvo.net/videvo_files/converted/2018_07/videos/180607_A_101.mp466981_jw.mp4"></video>
          <div className="video-controls gradient-45deg-semi-dark">
            <div className="video-top-controls">
              <div className="video-seekbar seekbar">
                <span className="progress"></span>
              </div>
            </div>

            <div className="video-playback-controls">
              <button className="control-btn toggle-play-pause play">
                <i className="fas fa-play play-icon icon translate-icon"></i>
                <i className="fas fa-pause pause-icon icon translate-icon"></i>
              </button>
              <div className="video-volume-control">
                <button className="control-btn toggle-volume on">
                  <i className="fas fa-volume-up icon volume-on translate-icon"></i>
                  <i className="fas fa-volume-mute icon volume-off translate-icon"></i>
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

        <div
          className={`${
            this.props.streamState.startstop_meeting_res.started ||
            this.props.streamState.meetings.length < 1
              ? "display-none"
              : "video-info-2"
          }`}
        >
          <div className="padding-025" style={{ marginTop: 30 }}>
            <a
              href="#!"
              className="btn waves waves-effect green accent-4 width-250"
            >
              Activity
            </a>
          </div>
          <hr className="invis" />

          <div className="row margin-0">
            {this.state.meetings.map((meeting, i) => (
              <div
                key={i}
                data-target="start-meeting"
                className="col s12 m4 l3 cursor-pointer waves-effect modal-trigger"
              >
                <div id="flight-card" className="card">
                  <div className={`card-header ${this.colors(i)}`}>
                    <div className="card-title">
                      <h4 className="flight-card-title">
                        Flight{" "}
                        <i className="material-icons right">
                          {meeting.status === "Meeting Started"
                            ? "videocam"
                            : "videocam_off"}
                        </i>
                      </h4>
                      <p className="flight-card-date" style={{ marginTop: 10 }}>
                        {moment(new Date(meeting.date)).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div className="card-content-bg white-text">
                    <div
                      className="card-content"
                      style={{
                        backgroundImage: `url(${carousel1}) `,
                      }}
                    >
                      <div className="row">
                        <div className="col s12 center-align">
                          <i className="material-icons medium">
                            play_circle_outline
                          </i>
                        </div>
                      </div>
                    </div>
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
                    this.state.currentPageNumber === this.state.pages.length
                      ? "disabled"
                      : "waves-effect"
                  }
                >
                  <a
                    onClick={this.handleNextClick}
                    className={
                      this.state.currentPageNumber === this.state.pages.length
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
    );
  }
}

const mapStateToProps = (state) => ({
  studentState: state.student,
  streamState: state.stream,
});

export default connect(mapStateToProps, StreamActions)(VideoPlayer);
