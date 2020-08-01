import React, { Component } from "react";
import { connect } from "react-redux";
//import $ from "jquery";
import carousel1 from "../assets/images/conference/live-chat.svg";
// import M from "materialize-css";
import moment from "moment";
import "../assets/css/video-player.css";

import avatar from "../assets/images/gallary/not_found.gif";
import { StreamService } from "../services/stream";
import { Link } from "react-router-dom";
import MeetingOptions from "../views/teacher/MeetingOptions";

class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      source: [],
      live: false,
      currentPageNumber: 1,
      meetings: [],
      meeting: { meetingname: "" },
      pages: [],
      refresh: 0,
      startstop_meeting_res: {
        started: false,
        stopped: true,
      },
      meetinginprogress: false,
    };

    this.start_meeting = this.start_meeting.bind(this);
    this.stop_meeting = this.stop_meeting.bind(this);
  }
  refresh = 0;
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
    this.get_meetings();
  }

  initJitsi = () => {
    const meeting = this.state.startstop_meeting_res;
    const domain = meeting.started ? meeting.data.room : "meet.jit.si";

    const options = {
      width: "100%",
      height: 450,
      parentNode: document.querySelector("#meet"),
    };
    if (this.state.meetinginprogress) {
      return "";
    }
    const JitsiMeetExternalAPI =
      window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI;
    const api = new JitsiMeetExternalAPI(domain, options);
    this.api = api;
    this.setState({ meetinginprogress: true });
    return "";
  };

  disposeJitsi = () => {
    this.api === undefined
      ? localStorage.removeItem("meetingId")
      : this.api.dispose();
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
  handlePageClick = (pageNumber) => {
    this.setState({ currentPageNumber: parseInt(pageNumber) });
    this.get_meetings();
  };
  handlePrevClick = () => {
    const pageNumber = this.state.currentPageNumber - 1;
    this.setState({ currentPageNumber: pageNumber });
    this.get_meetings();
  };
  handleNextClick = () => {
    const pageNumber = this.state.currentPageNumber + 1;
    console.log(pageNumber);
    this.setState({ currentPageNumber: pageNumber });
    this.get_meetings();
  };

  start_meeting = (e) => {
    e.preventDefault();
    const data = {
      password: e.target.password.value,
    };
    if (this.state.selectedOption === null) {
      return false;
    }
    localStorage.setItem("meeting", "MEETING_STARTED");
    localStorage.setItem("meetingId", this.state.selectedOption.value);

    StreamService.start_meeting(this.state.selectedOption.value, data)
      .then((response) => {
        response.started = true;
        response.stopped = false;
        this.setState({ startstop_meeting_res: response });
        document.getElementById("start-meeting-form").reset();
      })
      .catch((error) => {
        console.log(error);
      });
    StreamService.get_meeting(this.state.selectedOption.value)
      .then((response) => {
        const meeting =
          response === undefined ? {} : response.data.data.meeting[0];
        this.setState({ meeting });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  stop_meeting = () => {
    localStorage.setItem("meeting", "MEETING_STOPPED");
    localStorage.removeItem("meetingId");
    this.disposeJitsi();
    this.setState({ meetinginprogress: false });
    StreamService.stop_meeting(this.state.selectedOption.value)
      .then((response) => {
        response.started = false;
        response.stopped = true;
        this.setState({ startstop_meeting_res: response });
        document.getElementById("start-meeting-form").reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );
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
            this.state.startstop_meeting_res.started
              ? this.initJitsi()
              : this.disposeJitsi()
          }`}
        >
          <div
            className="video-topbar-2 gradient-45deg-semi-dark"
            style={{
              justifyContent: "normal",
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                className="left center-align"
                style={{ marginLeft: 15, paddingTop: 5 }}
              >
                <i className="material-icons left" style={{ marginRight: 7 }}>
                  videocam
                </i>
                <div className="left" style={{ paddingTop: "2.5px" }}>
                  {this.state.meeting.meetingname}
                </div>
              </div>
              <span
                className="right"
                style={{ marginRight: 15, paddingTop: 5 }}
              >
                <i
                  className="material-icons red-text accent-2 cursor-pointer "
                  style={{ marginRight: 7 }}
                  onClick={() => this.stop_meeting()}
                >
                  cancel
                </i>
              </span>
            </div>
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
            this.state.startstop_meeting_res.started ? "display-none" : ""
          }`}
          style={{ height: 44 }}
        >
          <div
            data-target="start-meeting"
            className="video-topbar-2 gradient-45deg-semi-dark cursor-pointer modal-trigger border-radius-5"
          >
            <i className="material-icons" style={{ marginRight: 7 }}>
              videocam
            </i>{" "}
            Start a Meeting
          </div>
        </div>

        <div
          className={`${
            this.state.startstop_meeting_res.started
              ? "display-none"
              : "video-info-2 z-depth-5 border-radius-10"
          }`}
          style={{ marginTop: 30 }}
        >
          <div className="divider" style={{ marginTop: 1 }}></div>
          <div className="center-align" style={{ marginTop: 30 }}>
            <Link
              to="#!"
              className="btn waves waves-effect gradient-45deg-semi-dark width-250 border-radius-5"
            >
              Activity
            </Link>
          </div>
          <div
            className="divider"
            style={{ marginTop: 30, marginBottom: 30 }}
          ></div>
          <div className="row margin-0">
            {this.state.meetings.length < 1 ? (
              <div className="row">
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
                  No Meetings Found!
                </p>
              </div>
            ) : (
              this.state.meetings.map((meeting, i) => (
                <div
                  key={i}
                  data-target="start-meeting"
                  className="col s12 m4 l3 cursor-pointer waves-effect modal-trigger"
                >
                  <div id="flight-card" className="card border-radius-7">
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
                        <p
                          className="flight-card-date"
                          style={{ marginTop: 10 }}
                        >
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
              ))
            )}
          </div>
          <div className="divider" style={{ marginTop: 30 }}></div>
          <div className="row">
            <div className="col l12 center-align">
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
                    this.state.pages.length < 1
                      ? "disabled pointer-events-none"
                      : "waves-effect"
                  }
                >
                  <Link
                    onClick={this.handleNextClick}
                    className={
                      this.state.currentPageNumber ===
                        this.state.pages.length || this.state.pages.length < 1
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

          <div
            id="start-meeting"
            className="modal modal-meeting border-radius-10"
          >
            <form
              className="react-form form-meeting"
              id="start-meeting-form"
              onSubmit={this.start_meeting}
            >
              <h1 className="h1-meeting">
                <i
                  className="material-icons"
                  style={{ transform: "translate(-3px, 4px)" }}
                >
                  videocam
                </i>
                Start Meeting!
              </h1>
              <hr className="hr5" style={{ marginBottom: 30 }} />
              <fieldset className="form-group">
                <ReactFormLabel htmlFor="roomname" title="Room Name:" />
                <MeetingOptions onSelectOption={this.onSelectOption} />
                <div className="my-divider"></div>
              </fieldset>
              <fieldset className="form-group">
                <ReactFormLabel htmlFor="password" title="Password:" />

                <input
                  id="password"
                  className="form-input input-meeting"
                  name="password"
                  type="password"
                  required
                />
              </fieldset>

              <div className="form-group">
                <input
                  id="start"
                  className="btn modal-close gradient-45deg-light-blue-cyan border-radius-5"
                  type="submit"
                  value="Start"
                />
              </div>
            </form>
          </div>
        </div>
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

const mapStateToProps = (state) => ({
  studentState: state.student,
  streamState: state.stream,
});

export default connect(mapStateToProps, null)(VideoPlayer);
