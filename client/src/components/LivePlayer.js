import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import SideBar from "./SideBar";
import Header from "./header";
import Footer from "./footer";
import TeVideoPlayer from "./VideoPlayer";
import StVideoPlayer from "./student-components/VideoPlayer";
import StreamActions from "../actions/stream";
import { Link } from "react-router-dom";
import { StreamService } from "../services/stream";
import ClassOptions from "./ClassOptions";

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
      url: "https://pawacyberschool.net/fe_assets/PawaCyber.mp4",
      selectedOption: {},
      selectedClass: {},
      pages: [],
      meetings: [],
      meeting: {},
      create_meeting_res: {},
      refresh: 0,
    };
    this.create_meeting = this.create_meeting.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }
  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );
  };
  onSelectClass = (selectedClass) => {
    this.setState({ selectedClass }, () =>
      console.log(this.state.selectedClass)
    );
  };

  create_meeting = (e) => {
    e.preventDefault();
    const data = {
      createdby: this.state.user.userid,
      date: e.target.date.value,
      name: e.target.roomname.value,
      classid: this.state.selectedClass.value,
      notes: e.target.notes.value,
    };
    StreamService.create_meeting(data)
      .then((response) => {
        this.setState({ create_meeting_res: response });
        if (response === undefined) {
          M.toast({
            html: "Meeting creation failed",
            classes: "red accent-2",
          });
        } else {
          M.toast({
            html: "Meeting was successfully created",
            classes: "green",
          });
        }
        document.getElementById("create-meeting-form").reset();
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
                className="navbar nav-extended width-75 image-bg-1"
                style={{
                  position: "fixed",
                  transform: "translateY(-7%)",
                }}
              >
                <div className="nav-content">
                  <div className="left">
                    <p
                      style={{
                        padding: "10px",
                        paddingTop: 25,
                        paddingBottom: 25,
                        fontSize: "16px",
                      }}
                    >
                      Meeting Room
                    </p>
                  </div>
                  {this.state.user.roleid === 1 ? (
                    <div>
                      <Link
                        to="#!"
                        data-target="create-meeting"
                        className="modal-trigger waves-effect right"
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
          <div
            id="create-meeting"
            className="modal modal-meeting border-radius-10"
          >
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
              <fieldset className="form-group row">
                <div className="col s6">
                  <ReactFormLabel htmlFor="roomname" title="Room Name:" />
                  <input
                    id="roomname"
                    className="form-input input-meeting"
                    name="roomname"
                    type="text"
                    required
                  />
                </div>
                <div className="col s6">
                  <ReactFormLabel htmlFor="date" title="Date:" />

                  <input
                    id="date"
                    className="form-input input-meeting"
                    name="date"
                    type="date"
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="form-group">
                <ReactFormLabel htmlFor="classid" title="Class:" />
                <ClassOptions
                  style={{ transform: "translateY(-1px)" }}
                  onSelectOption={this.onSelectClass}
                />
                <div
                  style={{ transform: "translateY(-3px)" }}
                  className="my-divider"
                ></div>
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
