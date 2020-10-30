import React, { Component } from "react";
import { StudentService } from "../../services/student";
import $ from "jquery";

export default class SubjectDescrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      resources: [],
      url: "",
      view: false,
      selectedResourceKey: -1,
      selectedContentTag: { tagId: 1, name: "Textbook" },
    };
  }

  data = "";

  componentDidMount() {
    this.data = this.props.content;
    this.setState({ selectedContentTag: this.props.selectedContentTag }, () => {
      this.getDashData();
    });
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
   StudentService.get_course_downloadables(this.data).then((response) => {
        let materialContent = response;
        const selectedContentTag = this.props.selectedContentTag;
        for (const material of materialContent) {
          var newarray = $.grep(materialContent, function (e) {
            return material.obj != selectedContentTag.name;
          });
          materialContent = newarray;
        }
        this.setState({ resources: materialContent, loaded: true });
      });
    return this.selectedContent()
  }
  changeContentTag(selectedContentTag) {
    console.log(selectedContentTag)
    this.setState({ selectedContentTag, loaded: false });
    return this.getDashData();
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
    this.setState({ view: false, selectedResourceKey: -1 });
  }
  selectedContent() {
    return this.state.resources.map((resource, i) =>
      resource.materialname.includes(".mp4") ? (
        <div key={i}></div>
      ) : (
        <div key={i} className="col s12 m6 l4">
          <div
            className="card min-height-100 white-text designed-dots"
            style={{ borderRadius: "5px" }}
          >
            <div className="padding-4">
              <div className="col s12 m12">
                <p className="no-margin" style={{ color: "teal" }}>
                  <b>{resource.materialname}</b>
                </p>
                <p
                  className="no-margin"
                  style={{ fontSize: "12px", color: "grey" }}
                >
                  {resource.dateadded}
                </p>
              </div>
              <div
                className="right-align"
                style={{ marginTop: "60px", color: "black" }}
              >
                <p className="no-margin">
                  <button
                    onClick={() => {
                      this.download(resource, i);
                    }}
                  >
                    VIEW
                  </button>
                </p>
              </div>
              <div
                className={
                  i === this.state.selectedResourceKey
                    ? "justfiyCenter"
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
      )
    );
  }
  render() {
    return this.state.view ? (
      <div className="video-player-st">
        <div className="video-topbar transparent">
          <div className="justfiyCenter white-text cursor-pointer">
            <i className="material-icons" onClick={() => this.cancelView()}>
              clear
            </i>
          </div>
        </div>

        <video src={this.state.url} width="100%" height="100%"></video>
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
              <div className="start-time time">00:00:00</div>/
              <div className="end-time time">00:00:00</div>
            </div>
          </div>
        </div>
      </div>
    ) : this.state.selectedContentTag.name ===
      this.props.selectedContentTag.name ? (
      this.selectedContent()
    ) : (
      this.changeContentTag(this.props.selectedContentTag)
    );
  }
}
