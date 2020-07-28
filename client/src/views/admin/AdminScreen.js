import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AdminService } from "../../services/admin";
import { SchoolService } from "../../services/school";

class AdminScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      packages: [],
      students: [],
      teachers: [],
      subjects:[]
    };
  }

  componentDidMount() {
    this.getDashData();
  }

  getDashData() {
    AdminService.get_all_schools().then((response) => {
      console.log(response);
      this.setState({ schools: response });
    });

    AdminService.get_subs_plans().then((response) => {
      this.setState({ packages: response });
    });
    SchoolService.get_all_teachers(2).then((response) => {
      this.setState({ teachers: response });
    });
    AdminService.get_all_students().then((response) => {
      this.setState({ students: response });
    });

    AdminService.get_all_classes().then((response) => {
      this.setState({ subjects: response });
    });
  }

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar data={this.props}></SideBar>

            <section id="content">
              <div className="container">
                <div className="card-stats">
                  <div className="row mt-1">
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text border-radius-7">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              local_library
                            </i>
                            <p className="white-text">Schools</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0 white-text">
                              {this.state.schools.length}
                            </h5>
                            <p className="no-margin white-text">Total</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-red-pink gradient-shadow min-height-100 white-text border-radius-7">
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
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-amber-amber gradient-shadow min-height-100 white-text border-radius-7">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              timeline
                            </i>
                            <p className="white-text">Packages Available</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0 white-text">
                              {this.state.packages.length}
                            </h5>
                            <p className="no-margin white-text">Count</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-green-teal gradient-shadow min-height-100 white-text border-radius-7">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              attach_money
                            </i>
                            <p className="white-text">Revenue</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0 white-text">$0</h5>
                            <p className="no-margin white-text">Total</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-1">
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text border-radius-7">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              book
                            </i>
                            <p className="white-text">Subjects Offered</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0 white-text">{this.state.subjects.length}</h5>
                            <p className="no-margin white-text">Total</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-red-pink gradient-shadow min-height-100 white-text border-radius-7">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              perm_identity
                            </i>
                            <p className="white-text">Teachers Available</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);
