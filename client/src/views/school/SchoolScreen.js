import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/header";
import M from "materialize-css";
import Calendar from "../../components/calendar";
import store from "../../config/store";
import { Link } from "react-router-dom";
import { SchoolService } from "../../services/school";

class SchoolScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      teachers: [],
    };
  }

  user = {};

  componentDidMount() {
    M.AutoInit();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
  }

  getDashData() {
    // SchoolService.get_all_teachers('2')
    SchoolService.get_all_teachers(this.user.schoolid).then((response) => {
      this.setState({ teachers: response });
    });
    // SchoolService.get_all_students('2')
    SchoolService.get_all_students(this.user.schoolid).then((response) => {
      this.setState({ students: response });
    });
  }

  render() {
    const eventState = store.getState().events;
  
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />
            <section id="content">
              <div className="container">
                <div className="card-stats">
                  <div className="row mt-1">
                    <div className="col s12 m6 l6">
                      <div className="col s12 m6 l6">
                        <div className="card gradient-45deg-amber-amber gradient-shadow min-height-100 white-text border-radius-5">
                          <div className="padding-4">
                            <div className="col s7 m7">
                              <i className="material-icons background-round mt-5 white-text">
                                perm_identity
                              </i>
                              <p className="white-text">Students</p>
                            </div>
                            <div className="col s5 m5 right-align white-text">
                              <h5 className="mb-0 white-text">
                                {this.state.students === undefined
                                  ? 0
                                  : this.state.students.length}
                              </h5>
                              <p className="no-margin white-text">Total</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col s12 m6 l6">
                        <div className="card gradient-45deg-green-teal gradient-shadow min-height-100 white-text border-radius-5">
                          <div className="padding-4">
                            <div className="col s7 m7">
                              <i className="material-icons background-round mt-5 white-text">
                                perm_identity
                              </i>
                              <p className="white-text">Teachers</p>
                            </div>
                            <div className="col s5 m5 right-align white-text">
                              <h5 className="mb-0 white-text">
                                {this.state.teachers === undefined
                                  ? 0
                                  : this.state.teachers.length}
                              </h5>
                              <p className="no-margin white-text">Total</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col s12">
                        <ul className="task-card collection with-header border-radius-7">
                          <li className="collection-header teal accent-4">
                            <h4 className="task-card-title white-text">
                              School Events
                            </h4>
                           
                          </li>
                          {eventState.events.map((event) => (
                            <li className="collection-item dismissable">
                              <input type="checkbox" id="task1" />
                              <label htmlFor="task1">
                                {event.title}.
                                <Link to="#" className="secondary-content">
                                  <span className="ultra-small">Today</span>
                                </Link>
                              </label>
                              <span className="task-cat cyan">Event</span>
                            </li>
                          ))}

                        </ul>
                      </div>
                    </div>
                    <div className="col s12 m6 l6">
                      <div className="card padding-3 border-radius-10">
                        <Calendar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolScreen);
