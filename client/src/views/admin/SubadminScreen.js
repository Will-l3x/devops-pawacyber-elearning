import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import moment from "moment";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AdminService } from "../../services/admin";
import { AuthService } from "../../services/authServices";
import RoleOptions from "./RoleOptions";

class SubadminScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {},
      title: "Mr",
      columns: [
        {
          label: "ID",
          field: "subadminId",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Firstname",
          field: "firstname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Lastname",
          field: "lastname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Date Joined",
          field: "datejoined",
          sort: "asc",
          width: "20%",
        },
      ],
      rows: [],
    };
    this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
  }

  user = {};
  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  getDashData() {
    const subadmins = [];
    AdminService.get_subadmins().then((response) => {
      if (response === undefined) {
        console.log(response);
      } else {
        for (const subadmin of response) {
          subadmin.datejoined = moment(subadmin.datejoined).format(
            "DD/MM/YYYY"
          );
          subadmins.push(subadmin);
        }
      }
      this.setState({
        rows: subadmins,
      });
    });
  }

  handleTitleDropdownChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const registerAdmin = {
      roleid: this.state.selectedOption.value,
      email: event.target.email.value,
      password: "pass@123",
      firstname: event.target.personName.value,
      lastname: event.target.surname.value,
      title: this.state.title,
      vpassword: "pass@123",
      dob: event.target.dob.value,
    };

    let elem = document.getElementById("modaladd");
    let modal = new M.Modal(elem);
    modal.close();

    AuthService.register(registerAdmin).then((response) => {
      if (response === undefined) {
        alert("Subadmin Registration Failed");
      } else if (response.success === false) {
        alert(response.message);
      } else {
        document.getElementById("sibs").reset();
        this.getDashData();
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
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p style={{ padding: "10px", fontSize: "16px" }}>
                        Subadmin Management
                      </p>
                    </div>
                    <a
                      href="#!"
                      data-target="modaladd"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Add New Subadmin"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">add_circle_outline</i>
                    </a>
                  </div>
                </nav>
              </div>
              <section className="row" id="content" style={{ paddingTop: 85 }}>
                <div className="container  col s12">
                  <div className="card-stats z-depth-5 padding-5 border-radius-10">
                    <DatatablePage data={this.state} />
                  </div>
                </div>
              </section>
              <div id="modaladd" className="modal modal-meeting min-width-800">
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
                      add_circle_outline
                    </i>
                    Sub-Administator!
                  </h1>
                  <hr className="hr5" style={{ marginBottom: 30 }} />
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="personName" title="Lastname:" />
                    <input
                      className="form-input input-meeting"
                      id="personName"
                      type="text"
                      name="personName"
                      required
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="surname" title="Lastname:" />

                    <input
                      className="form-input input-meeting"
                      id="surname"
                      type="text"
                      name="surname"
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group row">
                    <div className="col s6">
                      <ReactFormLabel htmlFor="dob" title="Date of Birth:" />
                      <input
                        className="form-input input-meeting"
                        id="dob"
                        type="date"
                        name="dob"
                        required
                      />
                    </div>
                    <div className="col s6">
                      <ReactFormLabel htmlFor="role" title="Role:" />
                      <RoleOptions onSelectOption={this.onSelectOption} />
                      <div className="my-divider"></div>
                    </div>
                  </fieldset>
                  <fieldset className="form-group">
                    <ReactFormLabel htmlFor="email" title="Email:" />
                    <input
                      className="form-input input-meeting"
                      id="email"
                      type="email"
                      name="email"
                      required
                    />
                  </fieldset>

                  <div className="form-group">
                    <input
                      id="formButton"
                      className="btn gradient-45deg-light-blue-cyan"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SubadminScreen);
