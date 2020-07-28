import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import AdminActions from "../actions/admin";
import { Link } from "react-router-dom";
import FileDropZone from "./dropzone";

class TopicContentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.handleDeleteContext.bind(this);
    this.handleDeletePdf.bind(this);
    this.handleDeleteVideo.bind(this);
    this.handleUpdateContext.bind(this);
    this.handleUpdatePdf.bind(this);
    this.handleUpdateVideo.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
  }
  handleDeleteContext = () => {};
  handleDeletePdf = () => {};
  handleDeleteVideo = () => {};
  handleUpdateContext = () => {};
  handleUpdatePdf = () => {};
  handleUpdateVideo = () => {};
  render() {
    var data = this.props.content;
    console.log(this.props);
    return (
      <div className="collection-item modal-close">
        <span className="badge">
          <a
            className="black-text tooltipped"
            data-position="top"
            data-tooltip="Download pdf"
            target={"_blank"}
            href="http://material.doc_path"
            rel="noopener noreferrer"
          >
            <i className="material-icons">picture_as_pdf</i>
          </a>
          <a
            className="black-text tooltipped"
            target={"_blank"}
            data-position="top"
            data-tooltip="Download video"
            rel="noopener noreferrer"
            href="http://material.video_path"
          >
            <i className="material-icons">ondemand_video</i>
          </a>
          {this.state.user.username === "admin" ? (
            <Link
              className="black-text modal-trigger tooltipped"
              data-target="modal1"
              data-position="top"
              data-tooltip="Options"
              to="/"
            >
              <i className="material-icons">settings</i>
            </Link>
          ) : (
            ""
          )}
        </span>
        <p>{data.topicContent}</p>

        <div id="modal1" className="modal modal-width-20">
          <div className="modal-content">
            <h4 className="header2">
              <i className="material-icons left">settings</i>Topic Options
            </h4>
            <div className="collection">
              <Link
                to="#!"
                onClick={this.handleUpdateContext}
                className="collection-item modal-close grey-text text-darken-2"
              >
                <i className="material-icons left">create</i>
                Add/Update Content Text
              </Link>

              <Link
                to="#!"
                data-target="modal3"
                className="collection-item modal-trigger modal-close grey-text text-darken-2"
              >
                <i className="material-icons left">create</i>
                Add/Update Pdf
              </Link>

              <Link
                to="#!"
                data-target="modal4"
                className="collection-item modal-trigger modal-close grey-text text-darken-2"
              >
                <i className="material-icons left">create</i>
                Add/Update Video
              </Link>

              <Link
                to="#!"
                onClick={this.handleDeleteContext}
                className="collection-item modal-close grey-text text-darken-2"
              >
                <i className="material-icons left">delete</i>
                Remove context
              </Link>
              <Link
                to="#!"
                onClick={this.handleDeletePdf}
                className="collection-item modal-close grey-text text-darken-2"
              >
                <i className="material-icons left">delete</i>
                Remove pdf
              </Link>

              <Link
                to="#!"
                onClick={this.handleDeleteVideo}
                className="collection-item modal-close grey-text text-darken-2"
              >
                <i className="material-icons left">delete</i>
                Remove video
              </Link>
            </div>
          </div>
        </div>
        <div id="modal3" className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s6">
                    <input id="title3" type="text"></input>
                    <label htmlFor="title3">PDF TITLE</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <FileDropZone  input_id="file1"/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button
                      onClick={this.handleUpdatePdf}
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

        <div id="modal4" className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s6">
                    <input id="title2" type="text"></input>
                    <label htmlFor="title2">VIDEO TITLE</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <FileDropZone input_id="file2" />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button
                      onClick={this.handleUpdateVideo}
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
    );
  }
}
const mapStateToProps = (state) => ({
  admin: state.admin,
});
const mapDispatchToProps = Object.assign({}, AdminActions);
export default connect(mapStateToProps, mapDispatchToProps)(TopicContentCard);
