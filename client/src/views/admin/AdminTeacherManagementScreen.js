import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
export class AdminTeacherManagementScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        columns: [
          {
            label: "Teacher Id",
            field: "id",
            sort: "asc",
            width: "15%",
          },
          {
            label: "Name",
            field: "name",
            sort: "asc",
            width: "20%",
          },
          {
            label: "School",
            field: "school",
            sort: "asc",
            width: "20%",
          },
          {
            label: "Teaching Courses",
            field: "courses",
            sort: "asc",
            width: "40%",
          },
          {
            label: "Edit",
            field: "edit",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Delete",
            field: "delete",
            sort: "asc",
            width: "10%",
          },
        ],
        rows: [
          {
            id: "teacher_id1",
            name: "Teacher Name",
            school: "schoolname",
            courses: "Course 1, Course 2",
            edit: (
              <span>
                Edit <i className="material-icons left black-text">create</i>
              </span>
            ),
            delete: (
              <label>
                <input type="checkbox" id="teacher_id1" />
                <span>Delete</span>
              </label>
            ),
          },
          {
            id: "teacher id 2",
            name: "Teacher Name",
            school: "schoolname",
            courses: "Course 1, Course 2",
            edit: (
              <span className="cursor-pointer">
                Edit <i className="material-icons left black-text">create</i>
              </span>
            ),

            delete: (
              <label>
                <input type="checkbox" id="teacher_id2" />
                <span>Delete</span>
              </label>
            ),
          },
        ],
      },
    };
  }

  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
              <SideBar/>
              

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                  
                  }}
                >
                  <div className="nav-content">
                    <Link
                      style={{ marginTop: "2%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Teacher Management
                    </Link>
                    <Link
                      to="#!"
                      className="modal-trigger waves-effect black-text right"
                      style={{ marginTop: "1%", marginRight: "2%" }}
                      data-target="add-teacher"
                    >
                      <i className="material-icons">person_add</i>
                    </Link>
                  </div>
                </nav>
              </div>
              <section id="content" style={{ paddingTop: "7%" }}>
                <div className="container">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12">
                        <div className="center-align flow-text">
                          Teacher List
                        </div>
                        <hr className="hr4"></hr>
                        <DatatablePage data={this.state.data} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div
                id="add-teacher"
                className="modal"
                style={{ overflowY: "hidden" }}
              >
                <div className="modal-content">
                  <h4 className="header2">Add Test/Exercise</h4>
                  <div className="row">
                    <div className="col s12">
                      <div className="row">
                        <div className="input-field col s4">
                          <input id="title2" type="text"></input>
                          <label htmlFor="title2">First Name</label>
                        </div>
                        <div className="input-field col s4">
                          <input
                            type="text"
                            name="due_date"
                            className="datepicker"
                          ></input>
                          <label htmlFor="due_date">Last Name</label>
                        </div>
                        <div className="input-field col s4">
                          <input id="duration" type="text"></input>
                          <label htmlFor="duration">School</label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s6 offset-s6">
                          <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminTeacherManagementScreen);