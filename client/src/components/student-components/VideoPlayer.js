import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import M from "materialize-css";
import moment from "moment";
import avatar from "../../assets/images/gallary/not_found.gif";

import { StreamService } from "../../services/stream";
import { Link } from "react-router-dom";
import MeetingOptions from "../../views/teacher/MeetingOptions";

class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      source: [],
      live: false,
      meeting_joined: false,
      currentPageNumber: 1,
      meetings: [],
      meeting: {
        meetingId: "",
      },
      pages: [],
      selectedOption: null,
    };
    this.join_meeting = this.join_meeting.bind(this);
  }
  api = {};
  componentDidMount() {
    $("#preloader-2").addClass("display-none");
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
    this.get_meetings();
    this.initJitsi();
  }

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
  join_meeting = (e) => {
    e.preventDefault();

    this.setState({ loaded: false });
    const password = e.target.password.value;
    if (this.state.selectedOption === null) {
      return false;
    }
    StreamService.get_meeting(this.state.selectedOption.value)
      .then((response) => {
        const meeting =
          response === undefined ? {} : response.data.data.meeting[0];
        this.setState({ meeting });
        if (
          meeting.password === password &&
          meeting.status === "Meeting Started"
        ) {
          //meeting status
          const domain = `meet.jit.si/${meeting.link}`;
          setTimeout(function () {
            this.setState({ loaded: true });
          }, 5000);
          const meeting_joined = this.initJitsi(domain);
          this.setState({ meeting_joined });
        } else {
          this.setState({ loaded: true });
          M.toast({
            html: `Password is wrong!`,
            classes: "red accent-2",
          });
          this.get_meetings();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  initJitsi = (domain) => {
    const options = {
      width: "100%",
      height: 450,
      parentNode: document.querySelector("#meet"),
    };

    const JitsiMeetExternalAPI =
      window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI;
    const api = new JitsiMeetExternalAPI(domain, options);
    this.api = api;
    return true;
  };

  disposeJitsi = () => {
    this.api === undefined
      ? localStorage.removeItem("meetingId")
      : this.api.dispose();
    return "display-none";
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
  handlePrevClick = async (e) => {
    e.preventDefault();
    const pageNumber =
      this.state.currentPageNumber === this.state.pages.length ||
      this.state.pages.length < 1
        ? this.state.currentPageNumber
        : this.state.currentPageNumber - 1;
    this.setState({ currentPageNumber: pageNumber }, () => {
      this.gettingUsers();
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
      this.gettingUsers();
    });
  };
  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );
  };
  stop_meeting = () => {
    this.setState({ meeting_joined: false });
    this.disposeJitsi();
    this.get_meetings();
  };
  render() {
    return (
      <div className="vid-containa">
        <div
          className={`video-player ${
            this.state.meeting_joined ? "" : "display-none"
          }`}
        >
          <div className="video-topbar-2 gradient-45deg-semi-dark">
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
          className={`${
            this.state.meeting_joined
              ? "display-none"
              : "video-info-2 z-depth-5"
          }`}
          style={{ marginTop: 30 }}
        >
          <div className="divider" style={{ marginTop: 1 }}></div>
          <div className="center-align" style={{ marginTop: 30 }}>
            <Link
              to="#"
              className="btn waves waves-effect gradient-45deg-semi-dark width-250"
            >
              Activity
            </Link>
          </div>
          <div
            className="divider"
            style={{ marginTop: 30, marginBottom: 30 }}
          ></div>
          <div className="row padding-3">
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
                  data-target="join-meeting"
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
                        className="image-bg-2"
                        style={{ padding: 24, borderRadius: "0 0 2px 2px" }}
                      >
                        <div className="row image-bg-2">
                          <div className="col s12 center-align">
                            {this.state.meeting.meetingId ===
                            meeting.meetingId ? (
                              this.state.loaded ? (
                                <i className="material-icons medium">
                                  play_circle_outline
                                </i>
                              ) : (
                                <div id="preloader-2">
                                  <div className="spinner-2">
                                    <i className="material-icons medium text-animate-1">
                                      play_circle_outline
                                    </i>
                                  </div>
                                </div>
                              )
                            ) : (
                              <i className="material-icons medium">
                                play_circle_outline
                              </i>
                            )}
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
            <div className="col l12 center-align" style={{ paddingTop: 20 }}>
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
          </div>{" "}
          <div
            id="join-meeting"
            className="modal modal-meeting border-radius-10"
          >
            <form
              className="react-form form-meeting"
              id="join-meeting-form"
              onSubmit={this.join_meeting}
            >
              <h1 className="h1-meeting">
                <i
                  className="material-icons"
                  style={{ transform: "translate(-3px, 4px)" }}
                >
                  videocam
                </i>
                Join Meeting!
              </h1>
              <hr className="hr5" style={{ marginBottom: 30 }} />
              <fieldset className="form-group">
                <ReactFormLabel htmlFor="roomname" title="Room Name:" />
                <MeetingOptions onSelectOption={this.onSelectOption} />
                <div className="my-divider"></div>
              </fieldset>
              <fieldset className="form-group">
                <ReactFormLabel htmlFor="password1" title="Password:" />

                <input
                  id="password1"
                  className="form-input input-meeting"
                  name="password"
                  type="password"
                  required
                />
              </fieldset>

              <div className="form-group">
                <input
                  id="join"
                  className="btn modal-close gradient-45deg-light-blue-cyan border-radius-5"
                  type="submit"
                  value="Join"
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
