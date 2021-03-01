import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { StudentService } from "../../services/student";
import StudentActions from "../../actions/student";
import moment from "moment";
import { Redirect } from "react-router";

class StudentLiveClass extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      user: {},
      url: "https://pawacyberschool.net/fe_assets/PawaCyber.mp4",
      courses: [
        {
          classname: "Class 1",
          live: false,
          lastlivedate: "2011-10-05T14:48:00.000Z",
        },
        {
          classname: "Class 2",
          live: false,
          lastlivedate: "2020-07-07T14:48:00.000Z",
        },
        {
          classname: "Class 3",
          live: true,
          lastlivedate: "",
        },
      ],
    };
    this.liveClassHandle.bind(this);
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
    this.getDashData(user);
  }

  getDashData(user) {
    StudentService.get_all_courses(user.userid) // by student id
      .then((response) => {
        console.log(response);
        //this.setState({ courses: response });
      });
  }
  getTimeDiff(date) {
    return moment(date).fromNow();
  }
  liveClassHandle(course) {
    this.props.live_course(course);
    this.setState({ redirect: true });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/video-player" />;
    }
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <LeftSidebar data={this.props} />

            <section id="content">
              <div className="container" style={{ marginTop: "25px" }}>
                <div className="card-stats">
                  <div className="row">
                    {this.state.courses.map((course, i) => (
                      <div key={i} className="col s4">
                        <div
                          className="padding-3 card cursor-pointer"
                          onClick={() => this.liveClassHandle(course)}
                        >
                          <video width="100%" controls={false}>
                            <source src={`${this.state.url}#t=10,20`} />
                          </video>
                          <div className="row">
                            <div className="col s12 video-class-title">
                              <span>Introduction to Algebra</span>
                            </div>
                            <div className="col s12">{course.classname}</div>
                            <div className="col s12">
                              <span
                                className={`col s11 margin-0 ${
                                  course.live ? "red-text" : ""
                                }`}
                              >
                                Live{" "}
                                {course.live
                                  ? "Now"
                                  : this.getTimeDiff(course.lastlivedate)}
                              </span>
                              <span className="col s1 margin-0">
                                <i
                                  className={`material-icons ${
                                    course.live ? "red-text" : ""
                                  }`}
                                >
                                  live_tv
                                </i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <RightSidebar />
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, StudentActions)(StudentLiveClass);
