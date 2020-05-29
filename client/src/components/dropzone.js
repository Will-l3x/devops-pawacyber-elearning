import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import M from "materialize-css";
import "../assets/css/dropify.min.css";
import Dropzone from "react-dropzone";
import UploadActions from "../actions/upload";

class FileDropZone extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      fileIcon: "",
    };
    this.onDrop.bind(this);
    this.handleFileClear.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }
  onDrop = async (files) => {
    $(".dropify-clear").removeClass("display-none");
    $(".dropify-preview").removeClass("display-none");
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

    var file = $(`#${this.props.input_id}`);

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
    this.setState({ files: [this.props.uploadState.fileToUpload] });
  };
  handleFileClear = () => {
    this.setState({ files: [] });
    this.props.fileClear();
    $(".dropify-clear").addClass("display-none");
    $(".dropify-preview").addClass("display-none");
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
              <input id={this.props.input_id} {...getInputProps()}></input>
              <button
                className="dropify-clear display-none"
                onClick={this.handleFileClear}
                style={
                  [this.props.uploadState.fileToUpload].length > 0
                    ? preview
                    : {}
                }
              >
                Remove
              </button>
              <div
                className="dropify-preview display-none"
                style={
                  [this.props.uploadState.fileToUpload].length > 0
                    ? preview
                    : {}
                }
              >
                <span className="dropify-render">
                  <i
                    className="file-icon material-icons large"
                    style={
                      [this.props.uploadState.fileToUpload].length > 0
                        ? preview
                        : {}
                    }
                  >
                    {this.state.fileIcon}
                  </i>
                </span>
                <div className="dropify-infos">
                  <ul className="dropify-infos-inner">{files}</ul>
                </div>
              </div>
            </div>
            <div
              className={
                this.props.uploadState.fileToUpload.progress === 0
                  ? "dispaly-none"
                  : "progress "
              }
              style={{ height: 20 }}
            >
              <div
                className="determinate white-text"
                style={{
                  width: this.props.uploadState.fileToUpload.progress
                    ? this.props.uploadState.fileToUpload.progress + "%"
                    : 0 + "%",
                }}
              >
                <span className="right">
                  {this.props.uploadState.fileToUpload.progress + "%"}
                </span>
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
