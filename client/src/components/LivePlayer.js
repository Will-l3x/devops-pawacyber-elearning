import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import Header from "./header";
import Footer from "./footer";
import VideoPlayer from "./VideoPlayer";

class LivePlayer extends Component {
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
            <div className="vid-container">
              <VideoPlayer />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LivePlayer);