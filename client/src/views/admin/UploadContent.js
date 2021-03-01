import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
//import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { UploadService } from "../../services/upload";
import { AdminService } from "../../services/admin";
import Classes from "../../components/Classes";
import Tags from "../../components/Tag";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";

class UploadContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
      tag: [],
      selectedOption: {},
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

  handleSubmitTag = (event) => {
    var data = {
      name: event.target.tagname.value,
    };

    UploadService.add_tag(data).then((response) => {
      if (response === undefined) {
        M.toast({
          html: "Tag not added",
          classes: "red",
        });
      } else if (response.err) {
        M.toast({
          html: response.err,
          classes: "red",
        });
      } else if (response.success === true) {
        M.toast({
          html: "Tag Added",
          classes: "green ",
        });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var uploadCount = 0;
    var targetLength = event.target.fileUpload.files.length;
    var tagSelected = this.state.tag;

    M.toast({
      html: "Resource upload in progress",
      classes: "green ",
    });

    for (var i = 0; i < event.target.fileUpload.files.length; i++) {
      this.fileUpload = event.target.fileUpload.files[i];
      var data = {
        teacherid: this.loggedUserId,
        schoolid: this.schoolid,
        materialname: this.fileUpload.name,
        materialtype: "file",
        file: true,
        classid: this.state.class.classId,
        grade: this.state.class.grade,
        obj: this.state.selectedOption.name,
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

          var tag_post = {
            tagIds: tagSelected,
            materialId: response.uploadId,
          };

          UploadService.link_tags(tag_post).then((response) => {
            M.toast({
              html: "Taging Content",
              classes: "yellow",
            });

            console.log(response);
            if (response === undefined) {
              M.toast({
                html: "Content uploading without any tags.",
                classes: "red",
              });
            } else if (response.err) {
              M.toast({
                html: response.err,
                classes: "red",
              });
            } else if (response.success) {
              UploadService.upload(uploadData).then((resp) => {
                if (resp.success === true) {
                  uploadCount += 1;
                  if (uploadCount === targetLength) {
                    M.toast({
                      html:
                        uploadCount +
                        " out of " +
                        targetLength +
                        " files uploaded ...",
                      classes: "green",
                    });
                    M.toast({
                      html: "Upload Successful",
                      classes: "green ",
                    });
                    this.componentDidMount();
                  } else {
                    M.toast({
                      html:
                        uploadCount +
                        " out of " +
                        targetLength +
                        " files uploaded ...",
                      classes: "green",
                    });
                  }
                } else {
                  M.toast({
                    html: "Failed to upload resource: " + resp.message,
                    classes: "red ",
                  });
                }

                
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
  };

  onSelectClassOption = (selectedOption) => {
    this.setState({
      class: selectedOption,
    });
  };

  onSelectTagOption = (selectedOption) => {
    const tagOptions = this.state.tag;
    tagOptions.push(selectedOption.tagId);
    this.setState({
      tag: tagOptions,
      selectedOption,
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
            <LeftSidebar />

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75 image-bg-1"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p
                        style={{
                          padding: "10px",
                          paddingTop: 25,
                          fontSize: "16px",
                        }}
                      >
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
                    {/* <a
                      href="#!"
                      data-target="modaltag"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Add new content tags"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">add_circle_outline</i>
                    </a> */}
                  </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  {/* <div className="card-stats z-depth-5 padding-3 border-radius-10">
                    <DatatablePage data={this.state} /> */}
                  <div className="card-stats padding-2 border-radius-10">
                    <ResourceCard></ResourceCard>
                  </div>
                </div>
              </section>

              <div
                id="modaladd"
                className="modal modal-meeting min-width-500 border-radius-10"
              >
                <h1 style={{ marginTop: "10px" }} className="h1-meeting">
                  <i
                    className="material-icons"
                    style={{ transform: "translate(-3px, 4px)" }}
                  >
                    cloud_upload
                  </i>
                  Upload Resource!
                </h1>

                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSubmit}
                  id="sibs"
                >
                  {/* <hr className="hr5" style={{ marginBottom: 30 }} /> */}
                  <div className="row">
                    <div className="col s7 m7">
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
                    <div className="col s5 m5">
                      <fieldset className="form-group">
                        <label
                          style={{
                            transform: "translateY(-15px)",
                            fontSize: "12px",
                          }}
                        >
                          SELECT TAG *
                        </label>
                        <Tags
                          onSelectOption={this.onSelectTagOption}
                          required
                        />
                        <div
                          style={{ marginTop: "10px" }}
                          className="my-divider"
                        ></div>
                      </fieldset>
                    </div>
                  </div>
                  <fieldset className="form-group">
                    <ReactFormLabel
                      htmlFor="fileUpload"
                      title="Subject Resources:"
                    />
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

              <div
                id="modaltag"
                className="modal modal-meeting min-width-500 border-radius-10"
              >
                <h1 style={{ marginTop: "10px" }} className="h1-meeting">
                  Add New Content Tag
                </h1>
                <form
                  className="react-form form-meeting"
                  onSubmit={this.handleSubmitTag}
                  id="sibs"
                >
                  <ReactFormLabel htmlFor="tagname" title="Tag Name:" />

                  <input
                    id="tagname"
                    className="form-input input-meeting"
                    name="tagname"
                    type="text"
                    required
                  />
                  <div className="form-group">
                    <input
                      id="formButton2"
                      className="btn gradient-45deg-light-blue-cyan border-radius-5"
                      type="submit"
                      value="Add"
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
