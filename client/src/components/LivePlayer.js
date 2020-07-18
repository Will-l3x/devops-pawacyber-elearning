import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import Header from "./header";
import Footer from "./footer";
import VideoPlayer from "./VideoPlayer";
import { TeacherService } from "../services/teacher";
import { Link } from "react-router-dom";

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
    };
  }
  componentDidMount() {}

  create_meeting = (e) => {
    e.preventDefault();
    const data = {
      createdby: this.state.user.userid,
      date: e.target.date.value,
      classid: this.state.classid,
      notes: e.target.notes.val,
    };

    TeacherService.create_meeting(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  start_meeting = (id, data) => {};
  stop_meeting = (id, data) => {};

  get_meetings = () => {};

  get_meeting = (id) => {};
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />{" "}
            <div style={{ position: "relative", zIndex: 50 }}>
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
                    data-position="bottom"
                    style={{
                      marginTop: "1%",
                      marginRight: "2%",
                      color: "#626262",
                    }}
                  >
                    <i className="material-icons">video_call</i>
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
              className="react-form form-meeting"
              onSubmit={this.create_meeting}
            >
              <h1 className="h1-meeting">
                <i className="material-icons">video_call</i>Create
                Meeting!
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
                  className="form-input datepicker input-meeting"
                  name="date"
                  type="text"
                  required
                />
              </fieldset>

              <fieldset className="form-group">
                <ReactFormLabel htmlFor="notes" title="Notes:" />

                <textarea
                  id="notes"
                  className="form-textarea textarea-meeting"
                  name="notes"
                  required
                ></textarea>
              </fieldset>

              <div className="form-group">
                <input
                  id="formButton"
                  className="btn gradient-45deg-light-blue-cyan"
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label className="label-meeting" htmlFor={this.props.htmlFor}>
        {this.props.title}
      </label>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LivePlayer);
