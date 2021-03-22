import React, { Component } from "react";
import { connect } from "react-redux";
import dp from "../../assets/images/avatar/avatar-11.png";
import Header from "../header";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import Footer from "../footer";
import M from "materialize-css";
import "../../assets/css/profile.css";
import "../../assets/css/e-wallet.css";
import "../../assets/css/basic-loader.css";
import moment from "moment";
import InputMask from "react-input-mask";
import { AuthService } from "../../services/authServices";
import { UploadService } from "../../services/upload";

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? {}
          : JSON.parse(localStorage.getItem("user")),
      uuser: {},
      security: {},
      edit: true,
      accSettings: false,
      enableBackScanUpload: false,
      enableFrontScanUpload: false,
      enableAdrressEdit: false,
      enableIdEdit: false,
      enablePORUpload: false,
      editpass: true,
      tab: "about",
      imagePreviewUrl: dp,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditPass = this.handleEditPass.bind(this);
    this.handleSavePass = this.handleSavePass.bind(this);
  }
  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = () => {
    AuthService.profile()
      .then((response) => {
        console.log(response);
        this.setState({ uuser: response.data.data.Profile[0] });
      })
      .catch((error) => console.log(error));
  };
  handleEdit = () => {
    this.setState({ edit: false });
  };
  handleEditPass = () => {
    this.setState({ editpass: false });
  };

  handleSave = (event) => {
    event.preventDefault();

    this.setState({ edit: true });
    AuthService.update_profile(this.state.uuser)
      .then((response) => {
        console.log(response);
        if (response === undefined) {
          M.toast({
            html: `An error occured, update failed!`,
            classes: "red accent-2",
          });
        } else if (response.data.message === "An error occured") {
          M.toast({
            html: `An error occured, update failed!`,
            classes: "red accent-2",
          });
        } else if (response.data.success === true) {
          this.getUserDetails();
          M.toast({
            html: "Update Successfull",
            classes: "green accent-3",
          });
          this.setState({ edit: true });
        } else {
          this.getUserDetails();
        }
      })
      .catch((error) => {
        console.log(error);
        M.toast({
          html: `An error occured, update failed!`,
          classes: "red accent-2",
        });
        this.getUserDetails();
      });
  };
  handleSavePass = (event) => {
    event.preventDefault();

    AuthService.change_password(this.state.security)
      .then((response) => {
        console.log(response);
        if (response === undefined) {
          M.toast({
            html: `An error occured, password change failed!`,
            classes: "red accent-2",
          });
        } else if (response.data.message === "An error occured") {
          M.toast({
            html: `An error occured, password change failed!`,
            classes: "red accent-2",
          });
        } else if (response.data.success === true) {
          this.getUserDetails();
          M.toast({
            html: "Password change Successfull",
            classes: "green accent-3",
          });
          this.setState({ edit: true });
        } else {
          this.getUserDetails();
        }
      })
      .catch((error) => {
        console.log(error);
        M.toast({
          html: `An error occured, password change failed!`,
          classes: "red accent-2",
        });
        this.getUserDetails();
      });
  };

  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  onChange = (e) => {
    e.preventDefault();
    const uuser = this.state.uuser;
    uuser[e.target.name] = e.target.value;
    this.setState({
      uuser,
    });
  };
  onChangePass = (e) => {
    e.preventDefault();
    const security = this.state.security;
    security[e.target.name] = e.target.value;
    this.setState({
      security,
    });
  };

  SaveAccSettings = (e) => {
    e.preventDefault();
    this.setState({
      accSettings: false,
    });
  };
  EnableAccSettings = (e) => {
    e.preventDefault();
    this.setState({
      accSettings: true,
    });
  };

  handleUploadPOR = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("filetoupload", e.target.file_proof_of_res.value);
    uploadData.append("type", "residence");

    UploadService.uploadFile(uploadData).then((resp) => {
      console.log(resp);
      if (resp.success === true) {
        M.toast({
          html: "Upload Successful",
          classes: "green ",
        });

        this.setState({ enablePORUpload: false });
      } else {
        M.toast({
          html: "Failed to upload resource: " + resp.message,
          classes: "red ",
        });
      }
    });
  };
  handleUploadBackScan = (e) => {
    e.preventDefault();
    const uploadData = new FormData();

    uploadData.append("filetoupload", e.target.file_back_scan.value);
    uploadData.append("type", "identity");

    UploadService.uploadFile(uploadData).then((resp) => {
      console.log(resp);
      if (resp.success === true) {
        M.toast({
          html: "Upload Successful",
          classes: "green ",
        });

        this.setState({ enableBackScanUpload: false });
      } else {
        M.toast({
          html: "Failed to upload resource: " + resp.message,
          classes: "red ",
        });
      }
    });
  };
  handleUploadFrontScan = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("filetoupload", e.target.file_front_scan.value);
    uploadData.append("type", "identity");

    UploadService.uploadFile(uploadData).then((resp) => {
      console.log(resp);
      if (resp.success === true) {
        M.toast({
          html: "Upload Successful",
          classes: "green ",
        });
        this.setState({ enableFrontScanUpload: false });
      } else {
        M.toast({
          html: "Failed to upload resource: " + resp.message,
          classes: "red ",
        });
      }
    });
  };
  handleSaveAdrress = (e) => {
    e.preventDefault();

    this.setState({
      enableAdrressEdit: false,
    });
  };
  handleSaveID = (e) => {
    e.preventDefault();
    // when successful
    this.setState({ enableIdEdit: false });
  };
  enablePORUpload = (e) => {
    e.preventDefault();
    this.setState({
      enablePORUpload: true,
    });
  };
  enableBackScanUpload = (e) => {
    e.preventDefault();
    this.setState({
      enableBackScanUpload: true,
    });
  };
  enableFrontScanUpload = (e) => {
    e.preventDefault();
    this.setState({ enableFrontScanUpload: true });
  };
  enableAdrressEdit = (e) => {
    e.preventDefault();

    this.setState({
      enableAdrressEdit: true,
    });
  };
  enableIdEdit = (e) => {
    e.preventDefault();
    // when successful
    this.setState({ enableIdEdit: true });
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

            <div className="container">
              <div className="row">
                <div className="col s12 m12 l6 justify-center padding-1">
                  <div className="profile-card  border-radius-10 z-depth-5">
                    <div className="card--header">
                      {this.state.edit ? (
                        <div className="card--profile">
                          <img
                            className="_profile"
                            src={dp}
                            alt="A man smiling"
                          />
                        </div>
                      ) : (
                        <label
                          htmlFor="photo-upload"
                          className="custom-file-upload"
                        >
                          <div className="img-wrap img-upload">
                            <img
                              className="_profile"
                              alt="upload"
                              src={this.state.imagePreviewUrl}
                            />
                          </div>
                          <input
                            id="photo-upload"
                            type="file"
                            className="profile-upload "
                            onChange={this.photoUpload}
                          />
                        </label>
                      )}

                      <div className="card--name">
                        <h5 style={{ textTransform: "capitalize" }}>
                          {this.state.uuser.firstname}{" "}
                          {this.state.uuser.lastname}
                        </h5>
                      </div>
                      <div className="card--button">
                        {this.state.edit ? (
                          <button
                            onClick={this.handleEdit}
                            className="border-radius-5"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-edit"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            <span>Edit</span>
                          </button>
                        ) : (
                          <button
                            onClick={this.handleSave}
                            className="green accent-3 border-radius-5"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-save"
                            >
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                              <polyline points="17 21 17 13 7 13 7 21"></polyline>
                              <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            <span>Save</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <hr style={{ marginBottom: 30 }} className="border" />
                    <div className="card--insights">
                      <div
                        className="card--heading"
                        style={{ marginBottom: 30 }}
                      >
                        <div className="heading">Details</div>
                        <div className="date">
                          Joined{" "}
                          {moment(new Date(this.state.uuser.activefrom)).format(
                            "LL"
                          )}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-chevron-down"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                      <div className="insights justify-center">
                        <div className="insight row tab-active">
                          <div className="col s12">
                            <fieldset className="form-group">
                              <ReactFormLabel
                                htmlFor="firstname"
                                title="Firstname:"
                              />
                              <input
                                id="firstname"
                                type="text"
                                name="firstname"
                                className="form-input input-meeting"
                                onChange={this.onChange}
                                defaultValue={
                                  this.state.uuser.firstname === null
                                    ? ""
                                    : this.state.uuser.firstname
                                }
                                required
                                readOnly={this.state.edit}
                              />
                            </fieldset>
                          </div>

                          <div className="col s12">
                            <fieldset className="form-group">
                              <ReactFormLabel
                                htmlFor="lastname"
                                title="Lastname:"
                              />
                              <input
                                id="lastname"
                                type="text"
                                name="lastname"
                                className="form-input input-meeting"
                                onChange={this.onChange}
                                defaultValue={
                                  this.state.uuser.lastname === null
                                    ? ""
                                    : this.state.uuser.lastname
                                }
                                required
                                readOnly={this.state.edit}
                              />
                            </fieldset>
                          </div>
                          <div className="col s12">
                            <fieldset className="form-group">
                              <ReactFormLabel
                                htmlFor="dob"
                                title="Date of Birth *"
                              />
                              <input
                                id="dob"
                                type="date"
                                className="validate"
                                name="dob"
                                onChange={this.onChange}
                                defaultValue={
                                  this.state.uuser.dob === null
                                    ? ""
                                    : this.state.uuser.dob
                                }
                                required
                                readOnly={this.state.edit}
                              />
                            </fieldset>
                          </div>
                          <div className="col s12">
                            <fieldset className="form-group">
                              <ReactFormLabel
                                htmlFor="gender"
                                title="Gender:"
                              />
                              <input
                                id="gender"
                                type="text"
                                name="gender"
                                className="form-input input-meeting"
                                onChange={this.onChange}
                                defaultValue={
                                  this.state.uuser.gender === null
                                    ? ""
                                    : this.state.uuser.gender
                                }
                                required
                                readOnly={this.state.edit}
                              />
                            </fieldset>
                          </div>

                          <div className="col s12">
                            <fieldset className="form-group">
                              <ReactFormLabel htmlFor="email" title="Email:" />
                              <input
                                id="email"
                                type="text"
                                name="email"
                                className="form-input input-meeting"
                                onChange={this.onChange}
                                defaultValue={
                                  this.state.uuser.email === null
                                    ? ""
                                    : this.state.uuser.email
                                }
                                required
                                readOnly={this.state.edit}
                              />
                            </fieldset>
                          </div>

                          <div className="col s12">
                            <fieldset className="form-group">
                              <ReactFormLabel
                                htmlFor="phone_number"
                                title="Phone Number: "
                              />
                              <InputMask
                                id="phone_number"
                                type="text"
                                className="validate form-input input-meeting"
                                name="phone_number"
                                mask="+264\ 99 999 9999"
                                maskChar=" "
                                onChange={this.onChange}
                                defaultValue={
                                  this.state.uuser.phone_number === null
                                    ? ""
                                    : this.state.uuser.phone_number
                                }
                                required
                                readOnly={this.state.edit}
                              />
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col s12 m12 l6 justify-center padding-1">
                  <div className="profile-card  border-radius-10 z-depth-5">
                    <div className="card--insights">
                      <div className="card--heading">
                        <div className="heading">Account</div>
                        <div className="card--button">
                          {this.state.accSettings ? (
                            <button
                              onClick={this.SaveAccSettings}
                              className="green accent-3 border-radius-5"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-save"
                              >
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                              </svg>
                              <span>Save</span>
                            </button>
                          ) : (
                            <button
                              style={{ width: "180px" }}
                              onClick={this.EnableAccSettings}
                              className="border-radius-5"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-edit"
                              >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                              <span>Verify Documents</span>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="insights justify-center">
                        <div className="insight tab-active">
                          <form
                            className="row"
                            id="id_form"
                            data-toggle="validator"
                            data-focus="false"
                            onSubmit={this.handleSaveID}
                          >
                            <div className="input-field col s10">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="id_num"
                                  title="ID Number *"
                                />
                                <InputMask
                                  mask="99-999999-a-99"
                                  maskChar=" "
                                  id="id_num"
                                  type="text"
                                  className="validate"
                                  name="id_num"
                                  required
                                />
                              </fieldset>
                            </div>

                            <div className="card--button input-field col s2">
                              {this.state.accSettings ? (
                                this.state.enableIdEdit ? (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    type="submit"
                                    className="green accent-3 border-radius-5"
                                  >
                                    <svg
                                      style={{ marginRight: 0 }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-save"
                                    >
                                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                      <polyline points="7 3 7 8 15 8"></polyline>
                                    </svg>
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    className="border-radius-5"
                                    onClick={this.enableIdEdit}
                                  >
                                    <svg
                                      style={{
                                        marginRight: 0,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#fff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-edit"
                                    >
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                  </button>
                                )
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </form>

                          <form
                            className="row"
                            id="back_scan_form"
                            data-toggle="validator"
                            data-focus="false"
                            onSubmit={this.handleUploadBackScan}
                          >
                            <div className="input-field col s10">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="file_back_scan"
                                  title="BACK Scan/Photo of ID *"
                                />
                                <input
                                  className=""
                                  id="file_back_scan"
                                  type="file"
                                  name="file_back_scan"
                                  required
                                />
                              </fieldset>
                            </div>
                            <div className="card--button input-field col s2">
                              {this.state.accSettings ? (
                                this.state.enableBackScanUpload ? (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    type="submit"
                                    className="green accent-3 border-radius-5"
                                  >
                                    <svg
                                      style={{ marginRight: 0 }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-upload-cloud"
                                    >
                                      <polyline points="16 16 12 12 8 16"></polyline>
                                      <line
                                        x1="12"
                                        y1="12"
                                        x2="12"
                                        y2="21"
                                      ></line>
                                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                      <polyline points="16 16 12 12 8 16"></polyline>
                                    </svg>
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    className="border-radius-5"
                                    onClick={this.enableBackScanUpload}
                                  >
                                    <svg
                                      style={{
                                        marginRight: 0,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#fff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-edit"
                                    >
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                  </button>
                                )
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </form>

                          <form
                            className="row"
                            id="front_scan_form"
                            data-toggle="validator"
                            data-focus="false"
                            onSubmit={this.handleUploadFrontScan}
                          >
                            <div className="input-field col s10">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="file_front_scan"
                                  title="FRONT Scan/Photo of ID *"
                                />
                                <input
                                  className=""
                                  id="file_front_scan"
                                  type="file"
                                  name="file_front_scan"
                                  required
                                />
                              </fieldset>
                            </div>

                            <div className="card--button input-field col s2">
                              {this.state.accSettings ? (
                                this.state.enableFrontScanUpload ? (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    type="submit"
                                    className="green accent-3 border-radius-5"
                                  >
                                    <svg
                                      style={{ marginRight: 0 }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-upload-cloud"
                                    >
                                      <polyline points="16 16 12 12 8 16"></polyline>
                                      <line
                                        x1="12"
                                        y1="12"
                                        x2="12"
                                        y2="21"
                                      ></line>
                                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                      <polyline points="16 16 12 12 8 16"></polyline>
                                    </svg>
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    className="border-radius-5"
                                    onClick={this.enableFrontScanUpload}
                                  >
                                    <svg
                                      style={{
                                        marginRight: 0,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#fff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-edit"
                                    >
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                  </button>
                                )
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </form>
                          <form
                            className="row"
                            id="address_form"
                            data-toggle="validator"
                            data-focus="false"
                            onSubmit={this.handleSaveAdrress}
                          >
                            <div className="input-field col s10">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="address"
                                  title="Address *"
                                />
                                <input
                                  id="address"
                                  type="text"
                                  className="validate"
                                  name="address"
                                  required
                                ></input>
                              </fieldset>
                            </div>

                            <div className="card--button input-field col s2">
                              {this.state.accSettings ? (
                                this.state.enableAdrressEdit ? (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    type="submit"
                                    className="green accent-3 border-radius-5"
                                  >
                                    <svg
                                      style={{ marginRight: 0 }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-save"
                                    >
                                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                      <polyline points="7 3 7 8 15 8"></polyline>
                                    </svg>
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    className="border-radius-5"
                                    onClick={this.enableAdrressEdit}
                                  >
                                    <svg
                                      style={{
                                        marginRight: 0,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#fff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-edit"
                                    >
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                  </button>
                                )
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </form>
                          <form
                            className="row"
                            id="proof_of_res_form"
                            data-toggle="validator"
                            data-focus="false"
                            onSubmit={this.handleUploadPOR}
                          >
                            <div className="input-field col s10">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="file_proof_of_res"
                                  title="Proof of residence *"
                                />
                                <input
                                  className=""
                                  id="file_proof_of_res"
                                  type="file"
                                  name="file_proof_of_res"
                                  required
                                />
                              </fieldset>
                            </div>
                            <div className="card--button input-field col s2">
                              {this.state.accSettings ? (
                                this.state.enablePORUpload ? (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    type="submit"
                                    className="green accent-3 border-radius-5"
                                  >
                                    <svg
                                      style={{ marginRight: 0 }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-upload-cloud"
                                    >
                                      <polyline points="16 16 12 12 8 16"></polyline>
                                      <line
                                        x1="12"
                                        y1="12"
                                        x2="12"
                                        y2="21"
                                      ></line>
                                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                      <polyline points="16 16 12 12 8 16"></polyline>
                                    </svg>
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      width: 40,
                                      transform: "translateY(45px)",
                                    }}
                                    className="border-radius-5"
                                    onClick={this.enablePORUpload}
                                  >
                                    <svg
                                      style={{
                                        marginRight: 0,
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#fff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-edit"
                                    >
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                  </button>
                                )
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <div className="col s12 m12 l6 justify-center padding-3">
                    <div className="wallet-container text-center border-radius-10 z-depth-5">
                      <p className="page-title">
                        <i className="fa fa-align-left"></i>My E-wallet
                        <i className="fa fa-user"></i>
                      </p>

                      <div className="amount-box text-center">
                        <img
                          src="https://lh3.googleusercontent.com/ohLHGNvMvQjOcmRpL4rjS3YQlcpO0D_80jJpJ-QA7-fQln9p3n7BAnqu3mxQ6kI4Sw"
                          alt="wallet"
                        />
                        <p>Total Balance</p>
                        <p className="amount">$ 123</p>
                      </div>

                      <div className="btn-group text-center">
                        <button type="button" className="btn btn-outline-light">
                          Add Money
                        </button>
                        <button type="button" className="btn btn-outline-light">
                          Widthdraw
                        </button>
                      </div>

                      <div className="footer-menu">
                        <div className="row text-center">
                          <div className="col m3">
                            <i className="fa fa-home"></i>
                            <p>Home</p>
                          </div>

                          <div className="col m3">
                            <i className="fa fa-inbox"></i>
                            <p>Inbox</p>
                          </div>

                          <div className="col m3">
                            <i className="fa fa-university"></i>
                            <p>Bank</p>
                          </div>

                          <div className="col m3">
                            <i className="fa fa-barcode"></i>
                            <p>Scan</p>
                          </div>
                        </div>
                      </div>
                    </div>
              
                </div> */}

                <div className="col s12 m12 l6 justify-center padding-1">
                  <div className="profile-card  border-radius-10 z-depth-5">
                    <div className="card--insights">
                      <div className="card--heading">
                        <div className="heading">Security</div>
                        <div className="card--button">
                          {this.state.editpass ? (
                            <button
                              style={{ width: "180px" }}
                              onClick={this.handleEditPass}
                              className="border-radius-5"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-edit"
                              >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                              <span>Change Password</span>
                            </button>
                          ) : (
                            <button
                              style={{ width: "170px" }}
                              onClick={this.handleSavePass}
                              className="green accent-3 border-radius-5"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-save"
                              >
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                              </svg>
                              <span>Save Password</span>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="insights justify-center">
                        <div className="insight row tab-active">
                          <div className="col s12">
                            <fieldset className="form-group no-padding no-margin">
                              <ReactFormLabel
                                htmlFor="oldpassword"
                                title="Current Password:"
                              />
                              <input
                                id="oldpassword"
                                type="password"
                                name="oldpassword"
                                className="form-input input-meeting"
                                onChange={this.onChangePass}
                                required
                                readOnly={this.state.editpass}
                              />
                            </fieldset>
                          </div>
                          <div className="col s12">
                            <fieldset className="form-group">
                              <ReactFormLabel
                                htmlFor="newpassword"
                                title="New Password:"
                              />
                              <input
                                id="newpassword"
                                type="password"
                                name="newpassword"
                                className="form-input input-meeting"
                                onChange={this.onChangePass}
                                required
                                readOnly={this.state.editpass}
                              />
                            </fieldset>
                          </div>

                          <div className="col s12">
                            <fieldset className="form-group">
                              <ReactFormLabel
                                htmlFor="newpassword"
                                title="Verify New Password:"
                              />
                              <input
                                id="vnewpassword"
                                type="password"
                                name="vnewpassword"
                                className="form-input input-meeting"
                                onChange={this.onChangePass}
                                required
                                readOnly={this.state.editpass}
                              />
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
