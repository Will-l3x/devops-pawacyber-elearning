import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import SideBar from "../../components/SideBar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import VideoPlayer from "../../components/VideoPlayer";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

const history = createBrowserHistory();

class TeacherLivePlayer extends Component {
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
            <div className="row">
              <div className="col s8">
                <div className="vid-container">
                  <VideoPlayer />
                </div>
              </div>
              <div className="col s4">
                <Router history={history}>
                  <Switch>
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams/new" exact component={StreamCreate} />
                    <Route
                      path="/streams/edit/:id"
                      exact
                      component={StreamEdit}
                    />
                    <Route
                      path="/streams/delete/:id"
                      exact
                      component={StreamDelete}
                    />
                    <Route path="/streams/:id" exact component={StreamShow} />
                  </Switch>
                </Router>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherLivePlayer);
