import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { UploadService } from "../../services/upload";
import { AdminService } from "../../services/admin";
import Classes from "../../components/Classes";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";

class UploadContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Subject",
          field: "classid",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Resource Name",
          field: "materialname",
          sort: "asc",
          width: "40%",
        },
        {
          label: "Teacher ID",
          field: "teacherid",
          sort: "asc",
          width: "40%",
        },
        // {
        //   label: "File",
        //   field: "file",
        //   sort: "asc",
        //   width: "30%",
        // },
      ],
      rows: [],
      courses: [],
      class: "",
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
    this.getDashData();
  }

  getDashData() {
    const materials = [];
    AdminService.get_all_resources().then((response) => {
      if (response === undefined) {
        console.log(response);
      } else {
        for (const material of response) {
          materials.push(material);
        }
      }
      this.setState({
        rows: materials,
      });
    });
  }


  handleSubmit = (event) => {
    event.preventDefault();
    var uploadCount = 0;

    for (var i = 0; i < event.target.fileUpload.files.length; i++) {
      this.fileUpload = event.target.fileUpload.files[i];
      var data = {
        teacherid: this.loggedUserId,
        schoolid: this.schoolid,
        materialname: event.target.materialname.value,
        materialtype: "file",
        file: true,
        classid: this.state.class.classId,
        grade: this.state.class.grade,
      };

      UploadService.post_material(data).then((response) => {
        if (response === undefined) {
          M.toast({
            html: "Resource Upload failed",
            classes: "red",
          });
        } else if (response.err) {
         
          M.toast({
            html: response.err,
            classes: "red",
          });
        } else if (response.success === true) {
          const uploadData = new FormData();
          uploadData.append("", this.fileUpload);
          uploadData.append("uploadType", response.uploadType);
          uploadData.append("uploadId", response.uploadId);

          UploadService.upload(uploadData).then((resp) => {
            if (resp.success === true) {
              uploadCount += 1;
            } else {
              M.toast({
                html:"Failed to upload resource: "+ resp.message,
                classes: "red ",
              });
            }
          });
        } else {
          M.toast({
            html: response.message,
            classes: "red ",
          });
        }
      });
    }
    if (uploadCount === event.target.fileUpload.files.length) {
      M.toast({
        html: "Resource upload complete. " + uploadCount + " out of " + event.target.fileUpload.files.length + " files uploaded",
        classes: "green",
      });

      this.componentDidMount();
    } else {
      M.toast({
        html: "Upload could not be completed " + uploadCount + " out of " + event.target.fileUpload.files.length + " files uploaded",
        classes: "red",
      });
    }
  };

  onSelectClassOption = (selectedOption) => {
    this.setState({
      class: selectedOption,
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
                  {/* <div className="card-stats z-depth-5 padding-3 border-radius-10">
                    <DatatablePage data={this.state} /> */}
                  <div className="card-stats padding-3 border-radius-10">
                    < ResourceCard></ ResourceCard>
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
                    <i
                      className="material-icons"
                      style={{ transform: "translate(-3px, 4px)" }}
                    >
                      cloud_upload
                    </i>
                    Upload Resource!
                  </h1>
                  {/* <hr className="hr5" style={{ marginBottom: 30 }} /> */}
                  <div className="row">
                    <div className="">
                      <fieldset className="form-group">
                        <label
                          style={{
                            transform: "translateY(-15px)",
                            fontSize: "12px",
                          }}
                        >
                          SELECT SUBJECT *
                        </label>
                        <Classes
                          onSelectOption={this.onSelectClassOption}
                          required
                        />
                        <div
                          style={{ marginTop: "10px" }}
                          className="my-divider"
                        ></div>
                      </fieldset>
                    </div>
                    {/* <div className="col s6 m6">
                      <fieldset className="form-group">
                        <ReactFormLabel htmlFor="grade" title="Grade *" />
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
                    </div> */}
                  </div>
                  <fieldset className="form-group">
                    <ReactFormLabel
                      htmlFor="materialname"
                      title="Resource Name *"
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
                    <ReactFormLabel htmlFor="fileUpload" title="Subject Resources:" />
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
                  <Link
                    to="#"
                    style={{ marginRight: 10 }}
                    className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                  //onClick={this.handleDelete}
                  >
                    Yes
                  </Link>
                  <Link
                    to="#"
                    className="modal-close btn gradient-45deg-red-pink waves-effect white-text"
                  >
                    No
                  </Link>
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
