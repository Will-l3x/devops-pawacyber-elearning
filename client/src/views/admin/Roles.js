import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AdminService } from "../../services/admin";
import { Link } from "react-router-dom";
//import RoleOptions from "./RoleOptions";

class RolesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      columns: [
        {
          label: "Role Id ",
          field: "roleId",
          sort: "asc",
          width: "5%",
        },
        {
          label: "Role Name",
          field: "rolename",
          sort: "asc",
          width: "35%",
        },
      ],
      rows: [],
      rowId: "",
    };
    this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
  }

  user = {};
  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
  }
  handleTitleDropdownChange(event) {
    this.setState({ title: event.target.value });
  }

  getDashData() {
    let roles = [];
    AdminService.get_roles().then((response) => {
      if (response === undefined) {
        console.log(response);
      } else {
        roles = response;
      }
      /** 
      for (const role of response) {
        role.actions = (
          <ul className="card-action-buttons2">
            <li>
              <a
                href="#!"
                className="btn-floating waves-effect waves-light modal-trigger light-blue"
                data-target="modal2"
                onClick={this.setState({ rowId: role.id })}
              >
                <i className="material-icons">create</i>
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="btn-floating waves-effect waves-light modal-trigger red accent-2"
                data-target="areyousure"
                onClick={this.setState({ rowId: role.id })}
              >
                <i className="material-icons">delete</i>
              </a>
            </li>
          </ul>
        );
        roles.push(role);
      }
      */
      this.setState({
        rows: roles,
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      rolename: event.target.rolename.value,
    };
    AdminService.post_new_role(data).then((response) => {
      if (response === undefined) {
   
        M.toast({
          html: response,
          classes: "red ",
        });
      } else {
     
        M.toast({
          html: response.message,
          classes: "green ",
        });
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    });
  };
  handleEdit = (event) => {
    event.preventDefault();

    var registerAdmin = {
      roleid: this.state.rowId,
      email: event.target.email.value,
      password: "pass@123",
      firstname: event.target.personName.value,
      lastname: event.target.surname.value,
      title: this.state.title,
      vpassword: "pass@123",
      dob: event.target.dob.value,
    };
    console.log(registerAdmin);
    /**AdminService.register(registerAdmin).then((response) => {
      if (response === undefined) {
   
        M.toast({
          html: "Teacher Registration Failed",
          classes: "red",
        });
      } else if (response.success === false) {
      
                M.toast({
          html: response.message,
          classes: "red",
        });
      } else {
        document.getElementById("sibs").reset();
        this.getDashData();
        
                   M.toast({
          html: response.message,
          classes: "red",
        });
      }
    }); */
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
                  style={{ position: "fixed" }}
                >
                  <div className="nav-content">
                    <p style={{ padding: "10px", fontSize: "16px" }}>
                      Manage Roles
                    </p>
                  </div>
                </nav>
              </div>
              <div>
                <section
                  className="row"
                  id="content"
                  style={{ paddingTop: 75 }}
                >
                  <div className="container  col s12 m6 offset-m3">
                    <div className="card padding-5">
                      <div className="col s12" style={{ padding: "20px" }}>
                        <DatatablePage data={this.state} />
                      </div>
                    </div>
                  </div>
                  <div id="modal2" className="modal">
                    <div className="modal-content">
                      <h4 className="header2">Add User To Role</h4>
                      <form onSubmit={this.handleEdit} id="sibs2">
                        <div className="row">
                          <div className="col s12">
                            <div className="row">
                              <div className="input-field col s2">
                                <select
                                  name="title"
                                  defaultValue={this.state.title}
                                  onChange={this.handleTitleDropdownChange}
                                  required
                                >
                                  <option value="Mr">Mr</option>
                                  <option value="Mr">Mrs</option>
                                  <option value="Mr">Rev</option>
                                  <option value="Mr">Dr</option>
                                </select>
                              </div>
                              <div className="input-field col s5">
                                <input
                                  id="personName"
                                  type="text"
                                  name="personName"
                                  required
                                ></input>
                                <label htmlFor="personName">First Name</label>
                              </div>
                              <div className="input-field col s5">
                                <input
                                  id="surname"
                                  type="text"
                                  name="surname"
                                  required
                                ></input>
                                <label htmlFor="surname">Surname</label>
                              </div>
                            </div>
                            <div className="Row">
                              <div className="input-field col s4">
                                <input
                                  id="email"
                                  type="email"
                                  name="email"
                                  required
                                ></input>
                                <label htmlFor="email">Email</label>
                              </div>
                              <div className="input-field col s4">
                                <input
                                  id="dob"
                                  type="date"
                                  name="dob"
                                  required
                                ></input>
                                <label htmlFor="dob">DOB</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s6 offset-s6">
                              <button className="btn file-upload gradient-45deg-light-blue-cyan waves-effect waves-light right">
                                Submit
                                <i className="material-icons right">send</i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
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
                </section>
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(RolesScreen);
