import React, { Component } from "react";
import { connect } from "react-redux";
//import $ from "jquery";
import carousel1 from "../assets/images/conference/live-chat.svg";
// import M from "materialize-css";
import moment from "moment";
import "../assets/css/video-player.css";

import { StreamService } from "../services/stream";

class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      source: [],
      live: false,
      currentPageNumber: 1,
      meetings: [],
      pages: [],
      refresh: 0,
    };
  }
  refresh = 0;
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
    this.get_meetings();
    this.initJitsi();
  }

  initJitsi = () => {
    const meeting = this.props.meetingData.startstop_meeting_res;
    localStorage.setItem("meetingId", meeting.meetingId);
    const domain = this.props.meetingData.startstop_meeting_res.started
      ? meeting.room
      : "meet.jit.si";
    const options = {
      width: "100%",
      height: 450,
      parentNode: document.querySelector("#meet"),
    };

    const JitsiMeetExternalAPI =
      window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI;
    const api = new JitsiMeetExternalAPI(domain, options);
    this.api = api;
  };

  disposeJitsi = () => {
    this.api.dispose() === undefined
      ? localStorage.removeItem("meetingId")
      : this.api.dispose();
    this.get_meetings();
    return "display-none";
  };

  get_meetings = () => {
    StreamService.get_meetings()
      .then((response) => {
        const meetingz =
          response === undefined ? [] : response.data.data.meetings;
        meetingz.sort((a, b) => new Date(b.date) - new Date(a.date));

        let pages = [];
        let perPage = 6;
        const totalPageCount = Math.ceil(meetingz.length / perPage);

        for (var i = 1; i <= totalPageCount; i++) {
          pages.push(i);
        }

        const meetings = this.pageArraySplit(meetingz, {
          currentPageNumber: this.state.currentPageNumber,
          perPage,
        });
        this.setState({ pages, meetings });
      })
      .catch((error) => {
        console.log(error);
      });
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
    if (this.props.meetingData.refresh > this.refresh) {
      this.get_meetings();
      this.refresh = this.props.meetingData.refresh;
      console.log("reload");
    }
    return (
      <div className="vid-containa">
        <div
          className={`video-player ${
            this.props.meetingData.startstop_meeting_res.started
              ? ""
              : "display-none"
          }`}
        >
          <div className="video-topbar-2 gradient-45deg-semi-dark">
            Meeting Name
          </div>
          <div
            id="meet"
            style={{
              marginTop: "44px",
              marginBottom: "44px",
            }}
            className="conference"
          ></div>

          <div className="video-controls-2 gradient-45deg-semi-dark"></div>
        </div>

        <div
          className={`video-player ${
            this.props.meetingData.startstop_meeting_res.started
              ? "display-none"
              : ""
          }`}
          style={{ height: 44 }}
        >
          <div
            data-target="start-meeting"
            className="video-topbar-2 gradient-45deg-semi-dark cursor-pointer modal-trigger"
          >
            <i className="material-icons" style={{ marginRight: 7 }}>
              videocam
            </i>{" "}
            Start a Meeting
          </div>
        </div>

        <div
          className={`${
            this.props.meetingData.startstop_meeting_res.started
              ? "display-none"
              : "video-info-2 z-depth-5"
          }`}
          style={{ marginTop: 30 }}
        >
          <div className="divider" style={{ marginTop: 1 }}></div>
          <div className="center-align" style={{ marginTop: 30 }}>
            <a
              href="#!"
              className="btn waves waves-effect gradient-45deg-semi-dark width-250"
              onClick={() => this.get_meetings()}
            >
              Activity
            </a>
          </div>
          <div
            className="divider"
            style={{ marginTop: 30, marginBottom: 30 }}
          ></div>
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
                      <h5 className="flight-card-title">
                        {meeting.meetingname === null
                          ? `Meeting ${meeting.meetingId}`
                          : meeting.meetingname}
                        <i className="material-icons right">
                          {meeting.status === "Meeting Started"
                            ? "videocam"
                            : "videocam_off"}
                        </i>
                      </h5>
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
                      ? "disabled pointer-events-none"
                      : "waves-effect"
                  }
                >
                  <a
                    className={
                      this.state.currentPageNumber === 1
                        ? "disabled pointer-events-none"
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
                      ? "disabled pointer-events-none"
                      : "waves-effect"
                  }
                >
                  <a
                    onClick={this.handleNextClick}
                    className={
                      this.state.currentPageNumber === this.state.pages.length
                        ? "disabled pointer-events-none"
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

export default connect(mapStateToProps, null)(VideoPlayer);
