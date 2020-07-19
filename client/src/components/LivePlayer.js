import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import Header from "./header";
import Footer from "./footer";
import VideoPlayer from "./VideoPlayer";
import StreamActions from "../actions/stream";
import { Link } from "react-router-dom";
import MeetingOptions from "../views/teacher/MeetingOptions";

class LivePlayer extends Component {
  constructor() {
    super();
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      liveclass:
        JSON.parse(localStorage.getItem("liveclass")) === null
          ? {}
          : JSON.parse(localStorage.getItem("liveclass")),
      url: "https://cybers.azurewebsites.net/fe_assets/PawaCyber.mp4",
      meetings: [],
      meeting: {},
      selectedOption: "",
    };
    this.create_meeting = this.create_meeting.bind(this);
    this.start_meeting = this.start_meeting.bind(this);
    this.stop_meeting = this.stop_meeting.bind(this);
    this.get_meeting = this.get_meeting.bind(this);
    this.get_meetings = this.get_meetings.bind(this);
  }
  componentDidMount() {
    this.get_meetings();
    const meetingId = localStorage.getItem("meetingId");
    if (meetingId === null) {
    } else {
      this.get_meeting(meetingId);
    }
  }
  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );
  };

  create_meeting = (e) => {
    e.preventDefault();
    const data = {
      createdby: this.state.user.userid,
      date: e.target.date.value,
      // roomname: e.target.roomname.value,
      classid: 1,
      notes: e.target.notes.value,
    };
    this.props.create_meeting(data);

    document.getElementById("create-meeting-form").reset();
  };

  start_meeting = (e) => {
    e.preventDefault();
    const data = {
      password: e.target.password.value,
    };
    localStorage.setItem("meeting", "MEETING_STARTED");
    this.props.start_meeting(this.state.selectedOption.value, data);

    document.getElementById("start-meeting-form").reset();
  };
  stop_meeting = () => {
    localStorage.setItem("meeting", "MEETING_STOPPED");
    localStorage.removeItem("meetingId");
    this.props.stop_meeting(this.state.selectedOption.value);
  };

  get_meetings = () => {
    this.props.get_meetings();
  };

  get_meeting = (id) => {
    this.props.get_meeting(id);
  };

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />{" "}
            <div
              className="z-depth-5"
              style={{ position: "relative", zIndex: 50 }}
            >
              <nav
                className="navbar nav-extended"
                style={{
                  position: "fixed",
                  transform: "translateY(-7%)",
                }}
              >
                <div className="nav-content">
                  <div className="left">
                    <p style={{ padding: "10px", fontSize: "16px" }}>
                      Video Room
                    </p>
                  </div>
                  <Link
                    to="#!"
                    data-target="create-meeting"
                    className="modal-trigger tooltipped waves-effect right"
                    data-tooltip="Add Class"
                    data-position="top"
                    style={{
                      marginTop: "1%",
                      marginRight: "2%",
                      color: "#626262",
                    }}
                  >
                    <i className="material-icons">video_call</i>
                  </Link>
                  <Link
                    to="#!"
                    data-target="start-meeting"
                    className={`modal-trigger tooltipped waves-effect right green-text accent-3 ${
                      this.props.streamState.startstop_meeting_res.started
                        ? "display-none"
                        : ""
                    }`}
                    data-tooltip="Start Meeting"
                    data-position="top"
                    style={{
                      marginTop: "1%",
                      marginRight: "2%",
                      color: "#626262",
                    }}
                  >
                    <i className="material-icons">videocam</i>
                  </Link>
                  <Link
                    to="#!"
                    className={`tooltipped waves-effect right red-text accent-2 ${
                      this.props.streamState.startstop_meeting_res.started
                        ? ""
                        : "display-none"
                    }`}
                    onClick={() => this.stop_meeting()}
                    data-tooltip="Stop Meeting"
                    data-position="top"
                    style={{
                      marginTop: "1%",
                      marginRight: "2%",
                      color: "#626262",
                    }}
                  >
                    <i className="material-icons">videocam_off</i>
                  </Link>
                </div>
              </nav>
            </div>
            <VideoPlayer />
            {this.state.user.roleid === 1 ? (
              <div className="fixed-action-btn">
                <a
                  href="#!"
                  className="btn-floating gradient-45deg-light-blue-cyan"
                >
                  <i className="large material-icons">video_call</i>
                </a>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div id="create-meeting" className="modal modal-meeting">
            <form
              id="create-meeting-form"
              className="react-form form-meeting"
              onSubmit={this.create_meeting}
            >
              <h1 className="h1-meeting">
                <i
                  className="material-icons"
                  style={{ transform: "translate(-3px, 4px)" }}
                >
                  video_call
                </i>
                Create Meeting!
              </h1>
              <fieldset className="form-group">
                <ReactFormLabel htmlFor="roomname" title="Room Name:" />
                <input
                  id="roomname"
                  className="form-input input-meeting"
                  name="roomname"
                  type="text"
                  required
                />
              </fieldset>
              <fieldset className="form-group">
                <ReactFormLabel htmlFor="date" title="Date:" />

                <input
                  id="date"
                  className="form-input input-meeting"
                  name="date"
                  type="date"
                  required
                />
              </fieldset>

              <fieldset className="form-group">
                <ReactFormLabel htmlFor="notes" title="Notes:" />

                <textarea
                  id="notes"
                  className="form-textarea textarea-meeting"
                  name="notes"
                  rows="3"
                  required
                ></textarea>
              </fieldset>

              <div className="form-group">
                <input
                  id="formButton"
                  className="btn modal-close gradient-45deg-light-blue-cyan"
                  type="submit"
                  placeholder="Send message"
                />
              </div>
            </form>
          </div>

          <div id="start-meeting" className="modal modal-meeting">
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
                  className="btn modal-close gradient-45deg-light-blue-cyan"
                  type="submit"
                  value="Start"
                />
              </div>
            </form>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan footer-fixed z-depth-1">
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

const mapStateToProps = (state) => ({
  streamState: state.stream,
});

export default connect(mapStateToProps, StreamActions)(LivePlayer);
