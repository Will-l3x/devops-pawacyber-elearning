import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
// import {TeacherService} from '../../services/teacher';
//import {StudentService} from '../../services/student';

export class UploadContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Subject",
          field: "subject",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Resource Name",
          field: "resourceName",
          sort: "asc",
          width: "40%",
        },
        {
          label: "Grade",
          field: "grade",
          sort: "asc",
          width: "30%",
        },
      ],
      rows: [],
      courses: [],
    };
  }

  user = {};
  courseId = "1";
  fileData;
  teacherid = "";

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
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

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{ position: "fixed" }}
                >
                  <div className="nav-content">
                    <p style={{ padding: "10px", fontSize: "16px" }}>
                      Resources
                    </p>
                  </div>
                </nav>
              </div>
              <section
                className="row"
                id="content"
                style={{ paddingTop: "7%" }}
              >
                <div className="container col s6 ">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m12" style={{ padding: "20px" }}>
                        <DatatablePage data={this.state} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container col s6 ">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m12">
                        <h4 className="header2">Upload Resource</h4>
                        <form onSubmit={this.handleSubmit} id="sibs">
                          <div className="row">
                            <div className="input-field col s4">
                              <input
                                id="subject"
                                type="text"
                                name="subject"
                                required
                              ></input>
                              <label htmlFor="subject">Subject</label>
                            </div>
                            <div className="input-field col s5">
                              <input
                                id="resourceName"
                                type="text"
                                name="resourceName"
                                required
                              ></input>
                              <label htmlFor="resourceName">
                                Resource Name
                              </label>
                            </div>
                            <div className="input-field col s3">
                              <input
                                id="grade"
                                type="number"
                                name="grade"
                                required
                              ></input>
                              <label htmlFor="grade">Grade</label>
                            </div>
                            <div className="input-field col s12">
                              <input
                                id="file"
                                type="file"
                                name="file"
                                className="many-files"
                                multiple
                                required
                              ></input>
                            </div>

                            <div className="row">
                              <div className="input-field col s6 offset-s6">
                                <button className="btn file-upload gradient-45deg-light-blue-cyan waves-effect waves-light right">
                                  Upload
                                  <i className="material-icons right">send</i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadContent);
