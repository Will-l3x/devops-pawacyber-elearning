import React, { Component } from "react";
import { connect } from "react-redux";
import dp from "../../assets/images/avatar/avatar-11.png";
import Header from "../header";
import SideBar from "../SideBar";
import Footer from "../footer";
import M from "materialize-css";
import "../../assets/css/profile.css";
import moment from "moment";
import { AuthService } from "../../services/authServices";

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      edit: true,
      tab: "about",
      imagePreviewUrl: dp,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = () => {
    AuthService.profile()
      .then((response) => {
        this.setState({ user: response.data.data.Profile[0] });
      })
      .catch((error) => console.log(error));
  };
  handleEdit = () => {
    this.setState({ edit: false });
  };

  handleSave = (event) => {
    event.preventDefault();

    this.setState({ edit: true });
    AuthService.profile()
      .then((response) => {
        if (response === undefined) {
          M.toast({
            html: `An error occured, update failed!`,
            classes: "red accent-2",
          });
        } else if (response.success === true || response.message === "S") {
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
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({
      user,
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

            <section className="row">
              <div
                className="col s12 justfiyCenter"
                style={{ minHeight: 580, paddingTop: 25 }}
              >
                <div className="profile-card  border-radius-10 z-depth-5">
                  <div className="card--header">
                    {this.state.edit ? (
                      <div className="card--profile">
                        <img className="_profile" src={dp} alt="A man smiling" />
                      </div>
                    ) : (
                      <label
                        htmlFor="photo-upload"
                        className="custom-file-upload"
                      >
                        <div className="img-wrap img-upload">
                          <img
                            className="_profile"
                            for="photo-upload"
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
                      <h2 style={{ textTransform: "capitalize" }}>
                        {this.state.user.firstname} {this.state.user.lastname}
                      </h2>
                      <div className="card--handle">
                        <span className="handle">{this.state.user.email}</span>
                        <span className="circle"></span>
                        <span className="category">
                          {this.state.user.rolename}
                        </span>
                      </div>
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
                  <hr className="border" />
                  <div>
                    <ul className="navlinks">
                      <li
                        onClick={() => {
                          this.setState({ tab: "about" });
                        }}
                        className={`link--item ${
                          this.state.tab === "about" ? "active-tab" : ""
                        }`}
                      >
                        About
                      </li>
                      <li
                        onClick={() => {
                          this.setState({ tab: "account" });
                        }}
                        className={`link--item ${
                          this.state.tab === "account" ? "active-tab" : ""
                        }`}
                      >
                        Account
                      </li>
                      <li
                        onClick={() => {
                          this.setState({ tab: "contact" });
                        }}
                        className={`link--item ${
                          this.state.tab === "contact" ? "active-tab" : ""
                        }`}
                      >
                        Contacts
                      </li>
                    </ul>
                  </div>
                  <div className="card--insights">
                    <div className="card--heading">
                      <div className="heading">Details</div>
                      <div className="date">
                        Joined{" "}
                        {moment(new Date(this.state.user.activefrom)).format(
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
                    <div className="insights justfiyCenter">
                      <div
                        className={`insight row ${
                          this.state.tab === "about"
                            ? "tab-active"
                            : "display-none"
                        }`}
                      >
                        <div className="col s12">
                          <fieldset className="form-group">
                            <ReactFormLabel
                              htmlFor="address"
                              title="Address:"
                            />

                            <textarea
                              id="address1"
                              name="address"
                              className="form-textarea textarea-meeting"
                              rows="3"
                              onChange={this.onChange}
                              value={
                                this.state.user.address === null
                                  ? ""
                                  : this.state.user.address
                              }
                              required
                              readOnly={this.state.edit}
                            ></textarea>
                          </fieldset>
                          <fieldset className="form-group">
                            <ReactFormLabel
                              htmlFor="contact1"
                              title="Contacts:"
                            />
                            <input
                              id="contacts1"
                              type="text"
                              name="contacts1"
                              className="form-input input-meeting"
                              onChange={this.onChange}
                              value={
                                this.state.user.contacts === null
                                  ? ""
                                  : this.state.user.contacts
                              }
                              required
                              readOnly={this.state.edit}
                            />
                          </fieldset>
                        </div>
                      </div>
                    </div>

                    <div className="insights justfiyCenter">
                      <div
                        className={`insight row ${
                          this.state.tab === "account"
                            ? "tab-active"
                            : "display-none"
                        }`}
                      >
                        <div className="col s12">
                          <fieldset className="form-group">
                            <ReactFormLabel
                              htmlFor="address2"
                              title="Address:"
                            />

                            <textarea
                              id="address2"
                              name="address"
                              className="form-textarea textarea-meeting"
                              rows="3"
                              onChange={this.onChange}
                              value={
                                this.state.user.address === null
                                  ? ""
                                  : this.state.user.address
                              }
                              required
                              readOnly={this.state.edit}
                            ></textarea>
                          </fieldset>
                          <fieldset className="form-group">
                            <ReactFormLabel
                              htmlFor="contact2"
                              title="Contacts:"
                            />
                            <input
                              id="contacts2"
                              type="text"
                              name="contacts2"
                              className="form-input input-meeting"
                              onChange={this.onChange}
                              value={
                                this.state.user.contacts === null
                                  ? ""
                                  : this.state.user.contacts
                              }
                              required
                              readOnly={this.state.edit}
                            />
                          </fieldset>
                        </div>
                      </div>
                    </div>

                    <div className="insights justfiyCenter">
                      <div
                        className={`insight row ${
                          this.state.tab === "contact"
                            ? "tab-active"
                            : "display-none"
                        }`}
                      >
                        <div className="col s12">
                          <fieldset className="form-group">
                            <ReactFormLabel
                              htmlFor="address"
                              title="Address:"
                            />

                            <textarea
                              id="address"
                              name="address"
                              className="form-textarea textarea-meeting"
                              rows="3"
                              onChange={this.onChange}
                              value={
                                this.state.user.address === null
                                  ? ""
                                  : this.state.user.address
                              }
                              required
                              readOnly={this.state.edit}
                            ></textarea>
                          </fieldset>
                          <fieldset className="form-group">
                            <ReactFormLabel
                              htmlFor="contact"
                              title="Contacts:"
                            />
                            <input
                              id="contacts"
                              type="text"
                              name="contacts"
                              className="form-input input-meeting"
                              onChange={this.onChange}
                              value={
                                this.state.user.contacts === null
                                  ? ""
                                  : this.state.user.contacts
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
            </section>
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
