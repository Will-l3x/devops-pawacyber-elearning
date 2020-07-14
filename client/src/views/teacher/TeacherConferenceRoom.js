import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import Header from "../../components/header";
import Footer from "../../components/footer";

class TeacherConferenceRoom extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      url: "https://cybers.azurewebsites.net/fe_assets/PawaCyber.mp4",
    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
    const domain = "meet.jit.si";
    const options = {
      roomName: "JitsiMeetAPIExample",
      width: "100%",
      height: 550,
      parentNode: document.querySelector("#meet"),
    };

    const JitsiMeetExternalAPI =
      window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI;
    const api = new JitsiMeetExternalAPI(domain, options);
    api.executeCommand(
      "avatarUrl",
      "https://avatars0.githubusercontent.com/u/3671647"
    );
  }
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />

            <div id="meet" className="conference padding-2"></div>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan footer-fixed z-depth-1">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherConferenceRoom);
