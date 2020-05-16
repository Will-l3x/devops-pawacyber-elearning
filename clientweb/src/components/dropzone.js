import React, { Component } from "react";
import { connect } from "react-redux";
import $ from 'jquery';
import M from 'materialize-css';
import "../assets/css/dropify.min.css";
import Dropzone from "react-dropzone";

class FileDropZone extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      fileIcon: ''
    };
    this.onDrop.bind(this);
  }
  onDrop = (files) => {
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
          return { isValid: true, icon: "warning" }
      }
    }

    var file = $("#input-file");
    if (!isValidFile(file.val()).isValid) {
      $('.file-upload').addClass("upload-disabled");
      this.setState({ fileIcon: isValidFile(file.val()).icon });
      return M.toast({
        html: "Fail. Please select valid file type!",
        classes: "red accent-2",
      });
    }
    $('.file-upload').removeClass("upload-disabled");
    this.setState({ fileIcon: isValidFile(file.val()).icon });
    M.toast({
      html: "Success. Valid file type!",
      classes: "green accent-3",
    });
    this.setState({ files });
  };
  render() {
    const preview = {
      display: "inline",
    };
    const files = this.state.files.map((file) => (
      <li key={file.name}>
        <p className="dropify-filename">
          <span className="file-icon"></span>
          <span className="dropify-filename-inner">
            {file.name} - {file.size} bytes
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
                }}
                style={this.state.files.length > 0 ? preview : {}}
              >
                Remove
              </button>
              <div
                className="dropify-preview"
                style={this.state.files.length > 0 ? preview : {}}
              >
                <span className="dropify-render">
                  <i
                    className="file-icon material-icons large"
                    style={this.state.files.length > 0 ? preview : {}}
                  >
                    {this.state.fileIcon}
                  </i>
                </span>
                <div className="dropify-infos">
                  <ul className="dropify-infos-inner">{files}</ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FileDropZone);
