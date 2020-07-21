import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { UploadService } from '../../services/upload';
//import {StudentService} from '../../services/student';

class UploadContent extends Component {
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
  loggedUserId = "";
  schoolid = "";

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.loggedUserId = this.user.userid;
    this.schoolid = this.user.schoolid;
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.fileData = event.target.file.value;
    alert('You are uploading for class id: ' + event.target.subject.value);
    var data = {
      teacherid: this.loggedUserId,
      schoolid: this.schoolid,
      materialname: event.target.materialname.value,
      materialtype: "file",
      file: true,
      classid: event.target.subject.value,
      grade: event.target.grade.value
    }

    UploadService.post_material(data).then((response) => {
      if (response === undefined) {
        alert('Resource Upload failed');
      } else if (response.err) {
        alert(response.err)
      } else if (response.success === true) {

        const uploadData = new FormData()
        uploadData.append('file', this.fileData)
        uploadData.append('uploadType', response.uploadType)
        uploadData.append('uploadId', response.uploadId)
        UploadService.upload(uploadData).then((response) => {
          console.log('-------------------------------------------------------');
          console.log(response);
          console.log('-------------------------------------------------------');

          if (response.sucess === true) {
            alert(response.message);
          } else {
            alert("Failed to complete upload");
          }
        });

      } else {
        alert(response.message)
      }
    })
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
                              <label htmlFor="subject">Class ID</label>
                            </div>
                            <div className="input-field col s5">
                              <input
                                id="materialname"
                                type="text"
                                name="materialname"
                                required
                              ></input>
                              <label htmlFor="materialname">
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
