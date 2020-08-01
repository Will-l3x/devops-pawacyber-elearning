import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { TeacherService } from "../../services/teacher";
import ClassOptions from "../../components/ClassOptions";
import { Link } from "react-router-dom";
//import {StudentService} from '../../services/student';

class UploadMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Class ID",
          field: "classid",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Resource Name",
          field: "materialname",
          sort: "asc",
          width: "30%",
        },
        {
          label: " Link",
          field: "file",
          sort: "asc",
          width: "30%",
        },
      ],
      rows: [],
      courses: [],
      selectedOption: {},
    };
  }

  user = {};
  courseId = "1";
  fileData;
  teacherid = "";

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    this.teacherid = this.user.userid;
    TeacherService.get_all_courses(this.teacherid).then((response) => {
      this.setState({ courses: response });
      if (response.length > 0) {
        this.courseId = response[0].classId;
        TeacherService.get_materials(this.courseId) //get by course id
          .then((response) => {
            this.setState({ rows: response });
          });
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fileData = event.target.file.value;
    alert(
      `You are uploading for ${this.state.selectedOption.classname}, classId: ${this.state.selectedOption.value}`
    );
    var data = {
      teacherid: this.teacherid,
      schoolid: this.user.schoolid,
      materialname: event.target.materialname.value,
      materialtype: "file",
      file: true,
      classid: this.state.selectedOption.value,
    };

    let elem = document.getElementById("modaledit");
    let modal = new M.Modal(elem);
    modal.close();

    TeacherService.post_material(data).then((response) => {
      if (response === undefined) {
        alert("Resource Upload failed");
      } else if (response.err) {
        alert(response.err);
      } else if (response.success === true) {
        const uploadData = new FormData();
        uploadData.append("file", this.fileData);
        uploadData.append("uploadType", response.uploadType);
        uploadData.append("uploadId", response.uploadId);
        TeacherService.post_file(uploadData).then((response) => {
          console.log(response);
        });

        document.getElementById("sibs").reset();
        this.getDashData();
      } else {
        alert(response.message);
      }
    });
  };
  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );
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
                  className="navbar nav-extended width-75"
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
                className="modal modal-meeting border-radius-10"
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
                  <hr className="hr5" style={{ marginBottom: 30 }} />
                  <fieldset className="form-group">
                    <ReactFormLabel
                      htmlFor="materialname"
                      title="Material Name:"
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
                    <ReactFormLabel htmlFor="classid" title="Class:" />
                    <ClassOptions
                      style={{ transform: "translateY(-1px)" }}
                      onSelectOption={this.onSelectOption}
                    />
                    <div
                      style={{ transform: "translateY(-3px)" }}
                      className="my-divider"
                    ></div>
                  </fieldset>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="file" title="File:" />
                    <input
                      className="form-input input-meeting"
                      id="file"
                      type="file"
                      name="file"
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
                    to="#!"
                    style={{ marginRight: 10 }}
                    className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                   // onClick={this.handleDelete}
                  >
                    Yes
                  </Link>
                  <Link
                    to="#!"
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadMaterial);
