import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { UploadService } from "../../services/upload";
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
  fileUpload;
  loggedUserId = "";
  schoolid = "";

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.loggedUserId = this.user.userid;
    this.schoolid = this.user.schoolid;
    M.AutoInit();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fileUpload = event.target.fileUpload.files;
    var data = {
      teacherid: this.loggedUserId,
      schoolid: this.schoolid,
      materialname: event.target.materialname.value,
      materialtype: "file",
      file: true,
      classid: event.target.subject.value,
      grade: event.target.grade.value,
    };

    UploadService.post_material(data).then((response) => {
      if (response === undefined) {
        alert("Resource Upload failed");
      } else if (response.err) {
        alert(response.err);
      } else if (response.success === true) {
        const uploadData = new FormData();
        uploadData.append("fileUpload", this.fileUpload);
        uploadData.append("uploadType", response.uploadType);
        uploadData.append("uploadId", response.uploadId);

        UploadService.upload(uploadData).then((resp) => {

          console.log("Inisde the upload file");

          if (resp.success === true) {
            alert(resp.message);
          } else {
            alert(resp.message);
          }
        });
      } else {
        alert(response.message);
      }
    });
  };

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
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p style={{ padding: "10px", fontSize: "16px" }}>
                        Resource Management
                      </p>
                    </div>
                    <a
                      href="#!"
                      data-target="modaladd"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="New Upload"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">cloud_upload</i>
                    </a>
                  </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  <div className="card-stats z-depth-5 padding-3 border-radius-10">
                    <DatatablePage data={this.state} />
                  </div>
                </div>
              </section>
              <div
                id="modaladd"
                className="modal modal-meeting min-width-500 border-radius-10"
              >
                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSubmit}
                  id="sibs"
                >
                  <h1 className="h1-meeting">
                    <i className="material-icons" style={{ transform: "translate(-3px, 4px)" }}>
                      cloud_upload
                    </i>
                    Upload Resource!
                  </h1>
                  {/* <hr className="hr5" style={{ marginBottom: 30 }} /> */}
                  <div className="row">
                    <div className="col s6 m6">
                      <fieldset className="form-group">
                        <ReactFormLabel htmlFor="subject" title="Subject ID:" />
                        <input
                          className="form-input input-meeting"
                          id="subject"
                          type="text"
                          name="subject"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col s6 m6">
                      <fieldset className="form-group">
                        <ReactFormLabel htmlFor="grade" title="Grade:" />
                        <input
                          className="form-input input-meeting"
                          id="grade"
                          type="number"
                          name="grade"
                          min="0"
                          max="12"
                          required
                        />
                      </fieldset>
                    </div>

                  </div>




                  <fieldset className="form-group">
                    <ReactFormLabel
                      htmlFor="materialname"
                      title="Resource Name:"
                    />
                    <input
                      className="form-input input-meeting"
                      id="materialname"
                      type="text"
                      name="materialname"
                      required
                    />
                  </fieldset>







                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="fileUpload" title="Multiple Files:" />
                    <input
                      className="many-files"
                      id="file"
                      type="file"
                      name="fileUpload"
                      multiple
                      required
                    />
                  </fieldset>










                  <div className="form-group">
                    <input
                      id="formButton2"
                      className="btn gradient-45deg-light-blue-cyan border-radius-5"
                      type="submit"
                      value="Upload"
                    />
                  </div>
                </form>
              </div>
              <div id="areyousure" className="modal width-250">
                <div className="modal-content">
                  <h4 className="header2">Are you sure?</h4>
                </div>
                <div className="modal-footer">
                  <a
                    href="#!"
                    style={{ marginRight: 10 }}
                    className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                    onClick={this.handleDelete}
                  >
                    Yes
                  </a>
                  <a
                    href="#!"
                    className="modal-close btn gradient-45deg-red-pink waves-effect white-text"
                  >
                    No
                  </a>
                </div>
              </div>
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

class ReactFormLabel extends React.Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadContent);
