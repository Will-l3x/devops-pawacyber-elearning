import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import Header from "./header";
import Footer from "./footer";
import TeVideoPlayer from "./VideoPlayer";
import StVideoPlayer from "./student-components/VideoPlayer";
import StreamActions from "../actions/stream";
import { Link } from "react-router-dom";
import MeetingOptions from "../views/teacher/MeetingOptions";
import { StreamService } from "../services/stream";

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
      selectedOption: {},
      pages: [],
      meetings: [],
      meeting: {},
      create_meeting_res: {},
      startstop_meeting_res: {
        started: false,
        stopped: true,
      },
      refresh: 0,
    };
    this.create_meeting = this.create_meeting.bind(this);
    this.start_meeting = this.start_meeting.bind(this);
    this.stop_meeting = this.stop_meeting.bind(this);
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
      name: e.target.roomname.value,
      classid: 1,
      notes: e.target.notes.value,
    };
    StreamService.create_meeting(data)
      .then((response) => {
        this.setState({ create_meeting_res: response });
        document.getElementById("create-meeting-form").reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  start_meeting = (e) => {
    e.preventDefault();
    const data = {
      password: e.target.password.value,
    };
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
  };
  stop_meeting = () => {
    localStorage.setItem("meeting", "MEETING_STOPPED");
    localStorage.removeItem("meetingId");
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
                  {this.state.user.roleid === 1 ? (
                    <div>
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
                          this.state.startstop_meeting_res.started
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
                          this.state.startstop_meeting_res.started
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
                      <Link
                        to="#!"
                        className={`tooltipped waves-effect right blue-text accent-2`}
                        data-tooltip="Refresh"
                        data-position="top"
                        onClick={() => {
                          let refresh = this.state.refresh;
                          refresh++;
                          this.setState({ refresh });
                        }}
                        style={{
                          marginTop: "1%",
                          marginRight: "2%",
                          color: "#626262",
                        }}
                      >
                        <i className="material-icons">refresh</i>
                      </Link>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </nav>
            </div>
            {this.state.user.roleid === 1 ? (
              <TeVideoPlayer meetingData={this.state} />
            ) : (
              <StVideoPlayer meetingData={this.state} />
            )}
          </div>
          <div id="create-meeting" className="modal modal-meeting border-radius-10">
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

              <hr className="hr5" style={{ marginBottom: 30 }} />
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
                  className="btn modal-close gradient-45deg-light-blue-cyan border-radius-5"
                  type="submit"
                  placeholder="Send message"
                />
              </div>
            </form>
          </div>

          <div id="start-meeting" className="modal modal-meeting border-radius-10">
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
