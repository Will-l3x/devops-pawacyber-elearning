import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FileDropZone from "../dropzone";
import $ from "jquery";

import store from "../../config/store";
import ClassroomActions from "../../actions/classroom";
import UploadActions from "../../actions/upload";

export class ClassworkItem extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      classwork: [
        {
          id: "1",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "2",
          title: "Test 1",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "3",
          title: "Exercise 2",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "4",
          title: "Chapter 6",
          type: "Course material",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "5",
          title: "Assignment 2",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "6",
          title: "Exercise 1",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "7",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "8",
          title: "Chapter 3 & 4",
          type: "Course material",
          due: "18 May",
          posted: "18 May",
        },
      ],
    };

    this.removeItemHandler.bind(this);
    this.handleSendAssignment.bind(this);
    this.handleSendMaterial.bind(this);
    this.handleSendTest.bind(this);
  }
  handleDeleteItem(id) {
    let classwork = [];
    for (const item of this.state.classwork) {
      if (item.id === id) {
        console.log(item);
      } else {
        classwork.push(item);
      }
    }
    this.setState({
      classwork,
    });
  }
  removeItemHandler = () => {};
  handleSendMaterial = () => {
    const files = store.getState().fileUpload;
    const file = files.files[0];
    let data = new FormData();

    file.details = {
      title: $("#mat-title").val(),
      type: "Assignment",
      due: "",
      posted: new Date().toISOString(),
      duration: "",
    };

    data.append("files", file, file.name);
  };
  handleSendTest = () => {
    const files = store.getState().fileUpload;
    const file = files.files[0];
    let data = new FormData();

    file.details = {
      title: $("#test-title").val(),
      type: "Test/Exercise",
      due: new Date($("#test-due").val()).toISOString(),
      posted: new Date().toISOString(),
      duration: $("#test-duration").val(),
    };

    data.append("files", file, file.name);
  };
  handleSendAssignment = async () => {
    const files = store.getState().fileUpload;
    const file = files.files[0];
    let data = new FormData();

    file.details = {
      title: $("assign-title"),
      type: "Assignment",
      due: new Date($("#assign-due").val()).toISOString(),
      posted: new Date().toISOString(),
      duration: "",
    };

    data.append("files", file, file.name);
    //await this.props.uploadFile(fileToUpload);
  };
  render() {
    console.log(this.props);
    return (
      <ul
        id="task-card1"
        className="collection task-card"
        style={{ display: "block", marginTop: "3%" }}
      >
        {this.state.classwork.map((cw, i) => {
          let cl = "";
          if (cw.type === "Course material") {
            return (
              <li key={cw.id} className="collection-item ">
                <label>
                  {cw.title}
                  <Link to="" className="secondary-content">
                    <span className="ultra-small">Posted {cw.posted}</span>
                  </Link>
                </label>
                <span className="task-cat cyan">{cw.type}</span>
                <label className="right">
                  <span>
                    <i
                      className="material-icons remove-content"
                      data-id={cw.id}
                      onClick={() => {
                        this.handleDeleteItem(cw.id);
                      }}
                    >
                      delete_forever
                    </i>
                  </span>
                </label>
              </li>
            );
          }
          if (cw.type === "Assignment") {
            cl = "teal accent-4";
          } else {
            cl = "red accent-2";
          }
          return (
            <li key={cw.id} className="collection-item">
              <label>
                {cw.title}
                <Link to="" className="secondary-content">
                  <span className="ultra-small">Due {cw.due}</span>
                </Link>
              </label>
              <span className={`task-cat ${cl}`}>{cw.type}</span>
              <label className="right">
                <span>
                  <i
                    onClick={() => this.handleDeleteItem(cw.id)}
                    data-id={cw.id}
                    className="material-icons remove-content"
                  >
                    delete_forever
                  </i>
                </span>
              </label>
            </li>
          );
        })}
        <li className="display-none">
          <div id="modal1" className="modal" style={{ overflowY: "hidden" }}>
            <div className="modal-content">
              <h4 className="header2">Add Course Material</h4>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s7">
                      <input id="mat-title" type="text"></input>
                      <label htmlFor="mat-title">Title</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <FileDropZone />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button
                        onClick={this.handleSendMaterial}
                        className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                      >
                        Submit
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="modal2" className="modal" style={{ overflowY: "hidden" }}>
            <div className="modal-content">
              <h4 className="header2">Add Test/Exercise</h4>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s4">
                      <input id="test-title" type="text"></input>
                      <label htmlFor="test-title">Title</label>
                    </div>
                    <div className="input-field col s4">
                      <input
                        type="text"
                        name="test-due_date"
                        id="test-due_date"
                        className="datepicker"
                      ></input>
                      <label htmlFor="test-due_date">Due</label>
                    </div>
                    <div className="input-field col s4">
                      <input
                        id="test-duration"
                        type="number"
                        min="0"
                        max="420"
                      ></input>
                      <label htmlFor="test-duration">Duration(mins)</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <FileDropZone />
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <button
                          onClick={this.handleSendTest}
                          className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                        >
                          Submit
                          <i className="material-icons right">send</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="modal3" className="modal" style={{ overflowY: "hidden" }}>
            <div className="modal-content">
              <h4 className="header2">Add Assignment</h4>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s4">
                      <input id="assign-title" type="text"></input>
                      <label htmlFor="assign-title">Title</label>
                    </div>
                    <div className="input-field col s4">
                      <input
                        type="text"
                        name="due_date"
                        id="assign-due_date"
                        className="datepicker"
                      ></input>
                      <label htmlFor="assign-due_date">Due</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <FileDropZone />
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <button
                          onClick={this.handleSendAssignment}
                          className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                        >
                          Submit
                          <i className="material-icons right">send</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  adminState: state.admin,
  classroomState: state.classroom,
  uploadState: state.upload,
});

const mapDispatchToProps = Object.assign(
  {},
  ClassroomActions,
  UploadActions
);

export default connect(mapStateToProps, mapDispatchToProps)(ClassworkItem);
