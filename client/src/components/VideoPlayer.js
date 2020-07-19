import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import M from "materialize-css";
import moment from "moment";
import "../assets/css/video-player.css";

import carousel1 from "../assets/images/conference/live-chat.svg";
import carousel2 from "../assets/images/conference/video-call.svg";
import carousel3 from "../assets/images/conference/interview.svg";

import CommentBox from "./CommentBox";
import StreamActions from "../actions/stream";

class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      source: [],
      live: false,
    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });

    let carousel = document.querySelector(".carousel");
    var instance = M.Carousel.init(carousel, {
      dist: 0,
      padding: 0,
      indicators: true,
      duration: 100,
      fullWidth: true,
    });
    autoplay();
    function autoplay() {
      instance.next();
      setTimeout(autoplay, 5000);
    }
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

  render() {
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
            style={{ height: 50 }}
          ></div>
        </div>

        <div
          className={`video-player ${
            this.props.streamState.startstop_meeting_res.started
              ? "display-none"
              : ""
          }`}
        >
          <div className="carousel carousel-slider" data-indicators="true">
            <a class="carousel-item center" href="#one!">
              <img alt="carousel" className="carsel" src={`${carousel1}`} />
            </a>
            <a class="carousel-item center" href="#two!">
              <img alt="carousel" className="carsel" src={`${carousel2}`} />
            </a>
            <a class="carousel-item center" href="#three!">
              <img alt="carousel" className="carsel" src={`${carousel3}`} />
            </a>
          </div>
        </div>

        <div className="video-info">
          <div className="video-comments padding-025">
            <hr className="hr5" />
            <div className="description padding-010">
              <h6 className="center-align">DESCRIPTION</h6>
              <p>Description</p>
            </div>
            <hr className="hr5" />
            <div className="description">
              <h6 className="center-align padding-010">COMMENTS</h6>
              <CommentBox
                url="https://codepen.io/Kikoku/pen/Qbwmpb.js"
                pollInterval={2000}
              />
            </div>
          </div>
          <div className="video-activity padding-025">
            <hr className="hr5" />
            <h6 className="center-align padding-020">ACTIVITY</h6>
            <div className="activity">
              {this.props.streamState.meetings.map((meeting, i) => (
                <div
                  key={i}
                  className="recent-activity-list chat-out-list row mb-0"
                >
                  <div className="col s12 recent-activity-list-text">
                    <a href="#!" className="cyan-text medium-small">
                      Meeting {moment(meeting.date).fromNow()}
                    </a>
                    <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">
                      {meeting.notes}
                    </p>
                  </div>
                </div>
              ))}
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
