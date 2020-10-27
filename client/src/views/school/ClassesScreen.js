import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import Footer from "../../components/footer";
import Header from "../../components/header";
import M from "materialize-css";

import moment from "moment";
import { SchoolService } from "../../services/school";
import TeacherOptions from "./TeacherOptions";
import DatatablePage from "../../components/DatatablePage";
import { Link } from "react-router-dom";

class ClassesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      unsubscribe: false,
      selectedOption: null,
      classId: "",
      courses: [],
      columns: [
        {
          label: "ID",
          field: "classId",
          sort: "asc",
          width: "10%",
        },
        {
          label: "Course Name",
          field: "classname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Grade",
          field: "grade",
          sort: "asc",
          width: "10%",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: "15%",
        },
        {
          label: "Created On",
          field: "createdon",
          sort: "asc",
          width: "15%",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
          width: "20%",
        },
      ],
      rows: [],
      enrolmentkey: "",
      selectedCourse: {
        classId: "",
        classname: "",
        createdon: "",
        enrolmentkey: "",
        grade: "",
        sharedclassid: "",
        status: "",
        syllabusid: "",
      },
      courseId: "",
    };
    this.handleUnsubscribe.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleUnsubscribe = () => {
    this.setState({ unsubscribe: true });
  };

  user = {};
  componentDidMount() {
    M.AutoInit();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getDashData();
  }

  getDashData() {
    const courses = [];
    const del_courses = [];
    SchoolService.get_courses(this.state.user.schoolid)
      .then((response) => {
        for (const course of response) {
          if (course.status === "deleted") {
            del_courses.push(course);
          } else {
            course.createdon = moment(course.createdon).format("LL");
            course.actions = (
              <ul className="card-action-buttons2">
                <li>
                  <a
                    href="#!"
                    className="btn-floating waves-effect waves-light light-blue"
                    onClick={() => this.handleEdit(course)}
                  >
                    <i className="material-icons">create</i>
                  </a>
                </li>
                <li>
                  <a
                    href="#del_class"
                    className="btn-floating waves-effect waves-light modal-trigger red accent-2"
                    data-target="areyousure"
                    onClick={this.setState({
                      courseId: course.classId,
                    })}
                  >
                    <i className="material-icons">delete</i>
                  </a>
                </li>
              </ul>
            );
            courses.push(course);
          }
        }
        this.setState({
          rows: courses,
        });
        this.setState({
          del_courses,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ courses: [] });
      });
  }
  // getTeacher(id){
  //   SchoolService.get_teacher(id)
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    const elem = document.getElementById("modal1");
    const modal = new M.Modal(elem);
    modal.close();
    var data = {
      teacherid: this.state.selectedOption.value,
      schoolid: this.user.schoolid,
      classname: event.target.classname.value,
      grade: event.target.grade.value,
      enrolmentkey: Math.random().toString(36).substring(7),
      status: "active",
      createdby: this.user.userid,
    };
    this.setState({ enrolmentkey: data.enrolmentkey });
    SchoolService.post_new_course(data).then((response) => {
      if (response === undefined) {
        alert("Apologies. Course addition failed. Please contact admin");
      } else if (response.success === false) {
        alert(response.message);
      } else {
        alert("successfully added");
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    });
  };
  
  handleEdit = (course) => {
    this.setState(
      {
        selectedCourse: {
          classId: course.classId,
          classname: course.classname,
          createdon: course.createdon,
          enrolmentkey: course.enrolmentkey,
          grade: course.grade,
          sharedclassid: course.sharedclassid,
          status: course.status,
          syllabusid: course.syllabusid,
        },
      },
      () => {
        const elem = document.getElementById("modaledit");
        const modal = M.Modal.init(elem);
        this.modal = modal;
        console.log(this.state.selectedCourse);
        modal.open();
      }
    );
  };
  handleSave = (event) => {
    event.preventDefault();
    const elem = document.getElementById("modaledit");
    const modal = new M.Modal(elem);
    modal.close();
    var data = {
      classid: this.state.selectedCourse.classId,
      teacherid:
        this.state.selectedOption === null
          ? ""
          : this.state.selectedOption.value,
      classname: event.target.classname.value,
      enrolmentkey: Math.random().toString(36).substring(7),
      status: "active",
    };
    console.log(data);
    SchoolService.update_course(data).then((response) => {
      console.log(response);
      if (response === undefined) {
        alert("Apologies. Update. Please contact admin");
      } else if (response.success === false) {
        alert(response.message);
      } else {
        alert("successfully added");
        document.getElementById("sibs2").reset();
        this.getDashData();
      }
    });
  };
  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );
  };
  handleDelete = (event) => {
    event.preventDefault();
    SchoolService.delete_course(this.state.courseId)
      .then((response) => {
        console.log(response);
        if (response.data.message === "An error occured") {
          M.toast({
            html: `An error occured, update failed!`,
            classes: "red accent-2",
          });
        } else {
          M.toast({
            html: `Successfully deleted class`,
            classes: "green accent-3",
          });
        }
        this.getDashData();
      })
      .catch((error) => {
        console.log(error.message);
        M.toast({
          html: `An error occured, delete failed`,
          classes: "red accent-2",
        });
        this.getDashData();
      });
  };
  colors = (i) => {
    var colors = [
      "gradient-45deg-light-blue-cyan",
      "gradient-45deg-red-pink",
      "gradient-45deg-green-teal",
      "gradient-45deg-amber-amber",
      "teal accent-4",
    ];
    /* shuffle array
    colors.sort(function(){
      return .5 -Math.random();
    });
    */
    return colors[i % 5];
  };
  onChange = (e) => {
    e.preventDefault();
    const selectedCourse = this.state.selectedCourse;
    selectedCourse[e.target.name] = e.target.value;
    this.setState({
      selectedCourse,
    });
  };
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar />
            <div style={{ position: "relative", zIndex: 50 }}>
              <nav
                className="navbar nav-extended width-75 image-bg-1"
                style={{
                  position: "fixed",
                  transform: "translateY(-7%)",
                }}
              >
                <div className="nav-content">
                  <div className="left">
                    <p style={{ padding: "10px", paddingTop:25, fontSize: "16px" }}>
                      Class Management
                    </p>
                  </div>
                  <a
                    href="#!"
                    data-target="modal1"
                    className="modal-trigger tooltipped waves-effect right"
                    data-tooltip="Add Class"
                    data-position="bottom"
                    style={{
                      marginTop: "1%",
                      marginRight: "2%",
                      color: "#626262",
                    }}
                  >
                    <i className="material-icons">add_circle_outline</i>
                  </a>
                  <a
                    href="#!"
                    className={`tooltipped waves-effect right blue-text accent-2`}
                    data-tooltip="Refresh"
                    data-position="top"
                    onClick={() => this.getDashData()}
                    style={{
                      marginTop: "1%",
                      marginRight: "2%",
                      color: "#626262",
                    }}
                  >
                    <i className="material-icons">refresh</i>
                  </a>
                </div>
              </nav>
            </div>
            <section className="row" id="content" style={{ paddingTop: 85 }}>
              <div className="container  col s12">
                <div className="card-stats z-depth-5 padding-3 border-radius-10">
                  <DatatablePage data={this.state} />
                </div>
              </div>
            </section>
            <div id="modal1" className="modal modal-meeting border-radius-10">
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
                    class
                  </i>
                  Add Class!
                </h1>
                <hr className="hr5" style={{ marginBottom: 30 }} />
                <fieldset className="form-group">
                  <ReactFormLabel htmlFor="classname" title="Class Name:" />

                  <input
                    id="classname"
                    className="form-input input-meeting"
                    name="classname"
                    type="text"
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <ReactFormLabel htmlFor="teacher" title="Teacher:" />
                  <TeacherOptions onSelectOption={this.onSelectOption} />
                  <div className="my-divider"></div>
                </fieldset>
                <fieldset className="form-group">
                  <ReactFormLabel htmlFor="grade" title="Grade:" />
                  <input
                    id="grade"
                    className="form-input input-meeting"
                    name="grade"
                    type="number"
                    min="0"
                    max="12"
                    required
                  />
                </fieldset>

                <div className="form-group" style={{ marginTop: 50 }}>
                  <input
                    id="submit"
                    className="btn modal-close gradient-45deg-light-blue-cyan border-radius-5"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
            <div
              id="modaledit"
              className="modal modal-meeting border-radius-10"
            >
              <form
                className="react-form form-meeting"
                onSubmit={this.handleSave}
                id="sibs2"
              >
                <h1 className="h1-meeting">
                  <i
                    className="material-icons"
                    style={{ transform: "translate(-3px, 4px)" }}
                  >
                    class
                  </i>
                  Edit Class!
                </h1>
                <fieldset className="form-group">
                  <ReactFormLabel
                    htmlFor="edit-classname"
                    title="Class Name:"
                  />

                  <input
                    id="edit-classname"
                    className="form-input input-meeting"
                    name="classname"
                    onChange={this.onChange}
                    value={this.state.selectedCourse.classname}
                    type="text"
                    required
                  />
                </fieldset>

                <fieldset className="form-group" style={{ marginBottom: 40 }}>
                  <ReactFormLabel htmlFor="teacher" title="Teacher:" />
                  <TeacherOptions onSelectOption={this.onSelectOption} />
                  <div className="my-divider"></div>
                </fieldset>

                <div className="form-group">
                  <input
                    id="save"
                    className="btn modal-close gradient-45deg-light-blue-cyan border-radius-5"
                    type="submit"
                    value="Save"
                  />
                </div>
              </form>
            </div>

            <div id="areyousure" className="modal width-250">
              <div className="modal-content">
                <h4 className="header2">Are you sure?</h4>
              </div>
              <div className="modal-footer">
                <Link
                  to="#!"
                  style={{ marginRight: 10 }}
                  onClick={this.handleDelete}
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassesScreen);
