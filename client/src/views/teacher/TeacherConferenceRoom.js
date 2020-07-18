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
  api;
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
    this.initJisti(user)
   
  }
  
  initJisti = () =>{
     const domain = "meet.jit.si";
     const options = {
       roomName: "testroom",
       width: "100%",
       height: 550,
       parentNode: document.querySelector("#meet"),
     };

     const JitsiMeetExternalAPI =
       window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI;
     const api = new JitsiMeetExternalAPI(domain, options);
     this.api = api;
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
            <div className="container">
              <div id="meet" className="conference padding-2"></div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherConferenceRoom);
