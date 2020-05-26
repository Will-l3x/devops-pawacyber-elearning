import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import M from "materialize-css";
import "../assets/css/dropify.min.css";
import Dropzone from "react-dropzone";
import { toArray } from "lodash";
import UploadActions from "../actions/upload";

class FileDropZone extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      fileIcon: "",
    };
    this.onDrop.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }
  onDrop = async (files) => {
    function getExtension(filename) {
      var parts = filename.split(".");
      return parts[parts.length - 1];
    }

    function isValidFile(filename) {
      var ext = getExtension(filename);
      switch (ext.toLowerCase()) {
        case "doc":
          return { isValid: true, icon: "library_books" };
        case "docx":
          return { isValid: true, icon: "library_books" };
        case "pdf":
          return { isValid: true, icon: "library_books" };
        case "epub":
          return { isValid: true, icon: "library_books" };
        case "jpg":
          return { isValid: true, icon: "photo" };
        case "gif":
          return { isValid: true, icon: "photo" };
        case "bmp":
          return { isValid: true, icon: "photo" };
        case "png":
          return { isValid: true, icon: "photo" };
        case "jpeg":
          return { isValid: true, icon: "photo" };
        case "m4v":
          return { isValid: true, icon: "ondemand_video" };
        case "avi":
          return { isValid: true, icon: "ondemand_video" };
        case "mpg":
          return { isValid: true, icon: "ondemand_video" };
        case "mp4":
          return { isValid: true, icon: "ondemand_video" };
        case "mkv":
          return { isValid: true, icon: "ondemand_video" };
        default:
          return { isValid: false, icon: "warning" };
      }
    }

    var file = $("#input-file");

    if (isValidFile(file.val()).isValid === false) {
      $(".file-upload").addClass("upload-disabled");
      this.setState({ fileIcon: isValidFile(file.val()).icon });
      return M.toast({
        html: "Fail. Please select valid file type!",
        classes: "red accent-2",
      });
    }
    $(".file-upload").removeClass("upload-disabled");
    this.setState({ fileIcon: isValidFile(file.val()).icon });
    M.toast({
      html: "Success. Valid file type!",
      classes: "green accent-3",
    });

    const fileToUpload = {
      id: 1,
      file: files[0],
      progress: 0,
    };
    await this.props.setUploadFile(fileToUpload);
    this.setState({ files: toArray(this.props.uploadState.fileProgress) });
  };
  render() {
    const preview = {
      display: "inline",
    };
    const files = this.state.files.map((file, i) => (
      <li key={i}>
        <p className="dropify-filename">
          <span className="file-icon"></span>
          <span className="dropify-filename-inner">
            {file.file.name} - {file.file.size} bytes
          </span>
        </p>
      </li>
    ));
    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="container">
            <div className="dropify-wrapper" {...getRootProps()}>
              <div className="dropify-message">
                {" "}
                <p>Drag and drop a file here or click</p>
              </div>
              <input id="input-file" {...getInputProps()}></input>
              <button
                className="dropify-clear"
                onClick={() => {
                  this.setState({ files: [] });
                  this.props.fileClear();
                }}
                style={
                  toArray(this.props.uploadState.fileProgress).length > 0
                    ? preview
                    : {}
                }
              >
                Remove
              </button>
              <div
                className="dropify-preview"
                style={
                  toArray(this.props.uploadState.fileProgress).length > 0
                    ? preview
                    : {}
                }
              >
                <span className="dropify-render">
                  <i
                    className="file-icon material-icons large"
                    style={
                      toArray(this.props.uploadState.fileProgress).length > 0
                        ? preview
                        : {}
                    }
                  >
                    {this.state.fileIcon}
                  </i>
                </span>
                <div className="dropify-infos">
                  <ul className="dropify-infos-inner">
                    {files}
                    <div className="progress">
                      <div
                        className="determinate"
                        style={{
                          width: this.props.uploadState.fileProgress
                            .fileToUpload.progress
                            ? this.props.uploadState.fileProgress.fileToUpload
                                .progress + "%"
                            : 0 + "%",
                        }}
                      ></div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

const mapStateToProps = (state) => ({
  uploadState: state.upload,
});

const mapDispatchToProps = Object.assign({}, UploadActions);

export default connect(mapStateToProps, mapDispatchToProps)(FileDropZone);
