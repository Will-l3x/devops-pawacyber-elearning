import React, { Component } from "react";
import { connect } from "react-redux";
import folderIcon from "../../assets/images/icon/folder.svg";
// /import $ from "jquery";
import avatar from "../../assets/images/gallary/not_found.gif";
import { ClassroomService } from "../../services/classroom";

class ClassroomMarkScreen extends Component {
  constructor() {
    super();
    this.state = {
      classid: 1,
      assignments: [],
      submissions: [],
      selectedFolder: false,
    };
    this.get_assignments.bind(this);
    this.handleFolderClick.bind(this);
  }
  componentDidMount() {
    this.get_assignments();
    // $(".custom-select.bs-select select").addClass("display-none");
    // $(".col-sm-12.col-md-6").addClass("height-0");
    // $(".dataTables_length.bs-select").addClass("translateY-10");
  }

  get_assignments = async () => {
    ClassroomService.get_assiginments(
      this.props.teacherState.course.courseId
    ).then((res) => {
      this.setState({ assignments: [] });
    });
  };

  handleFolderClick = (id) => {
    this.setState({ selectedFolder: true });
    ClassroomService.get_submissions(id)
      .then((res) => {
        this.setState({ subsmissions: res.data.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ subsmissions: [] });
      });
  };

  render() {
    return (
      <div id="task-card4" style={{ display: "none", marginTop: "4%" }}>
        <div className="row">
          <div className="col s6">
            <div>
              {this.state.assignments.length < 1 ? (
                <div className="row">
                  <p style={{ textAlign: "center", fontSize: "20px" }}>
                    No Assignments Found!
                    <br />{" "}
                    <img
                      src={avatar}
                      alt="Avatar"
                      style={{ maxWidth: "100%", maxHeight: "150px" }}
                    ></img>
                  </p>
                </div>
              ) : (
                this.state.assignments.map((assignment, i) => (
                  <div key={i} className="col 12 padding-5px">
                    <div className="folder-container">
                      <div
                        onClick={() => this.handleFolderClick(assignment.id)}
                        className="folder cursor-pointer center-align"
                      >
                        <div className=" left folder-icon">
                          <img src={folderIcon} className="icon" alt="folder" />
                        </div>
                        <div className="center-align left folder-name">
                          <h6>{assignment.assignmentname}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="col s6">
            <div>
              {this.state.selectedFolder ? (
                this.state.submissions.length < 1 ? (
                  <div className="row">
                    <p style={{ textAlign: "center", fontSize: "20px" }}>
                      No Student Assigments Submmitted Yet!
                      <br />{" "}
                      <img
                        src={avatar}
                        alt="Avatar"
                        style={{ maxWidth: "100%", maxHeight: "150px" }}
                      ></img>
                    </p>
                  </div>
                ) : (
                  this.state.submissions.map((assignment, i) => (
                    <div key={i} className="col s12 padding-5px">
                      <div className="folder-container">
                        <div
                          onClick={() => this.handleFolderClick(assignment.id)}
                          className="folder cursor-pointer center-align"
                        >
                          <div className=" left folder-icon">
                            <img
                              src={folderIcon}
                              className="icon"
                              alt="folder"
                            />
                          </div>
                          <div className="center-align left folder-name">
                            <h6>{assignment.assignmentname}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <div className="col s12 padding-5px"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  teacherState: state.teacher,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomMarkScreen);
