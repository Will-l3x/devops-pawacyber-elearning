import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SideBar from "../../components/SideBar";
import TeacherCourseCard from "./TeacherCourseCard";
import Footer from "../../components/footer";
import Header from "../../components/header";
import TeacherActions from "../../actions/teacher";
import {TeacherService} from '../../services/teacher';


export class TeacherScreen extends Component {

    // Get teacher subjects
    // Get Assignments by subject above
    // Get submissions by Assignement obtained above
    constructor(props) {
      super(props);
      this.state = {
        courses:[],
        assignments:[],
        submissions:[]
      }}

      courseId="";

  getDashData(){
    this.teacherid = this.user.userid;
    TeacherService.get_all_courses(this.teacherid)
    .then((response) => {
      this.setState({ courses: response })
    });
    if(this.state.courses.length>0){
        this.courseId = this.state.courses[0].classId;
        TeacherService.get_assignments(this.courseId) //get by course id 
        .then((response) => {
          this.setState({ assignments: response })
        });
    }else{
      alert("Couldn't find any subject linked to your account");
    }
  }


  render() {


    
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar data={this.props} />

            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",

                    minHeight: 70,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      style={{ marginTop: "3%", marginBottom: "1%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Dashboard
                    </Link>
                  </div>
                </nav>
                <div className="progress display-none">
                  <div className="indeterminate"></div>
                </div>
              </div>

              <section id="content" style={{ paddingTop: "1%" }}>
                <div className="container">
                  <div className="card-stats">
                    <div className="row">
                      <TeacherCourseCard />
                    </div>
                  </div>
                  <div id="work-collections">
                    <div className="row">
                      <div className="col s12 m12 l6">
                        <ul className="task-card collection with-header">
                          <li className="collection-header blue lighten-1">
                            <h5 className="task-card-title">
                              Student classwork
                            </h5>
                          </li>
                        
                          <li className="collection-item dismissable">
                            <label htmlFor="task2">
                              Assignment 1
                              <Link to="#" className="secondary-content">
                                <span className="ultra-small">Due Date</span>
                              </Link>
                            </label>
                            <Link to="#" >
                            <span className="task-cat red accent-2">
                              Subject Name
                            </span>
                            </Link>
                          </li>
                     {this.state.assignments.map((assignment, i) => (
                        <li className="collection-item dismissable">
                        <label htmlFor="task2">
                         {assignment.name} 
                          <Link to="#" className="secondary-content">
                            <span className="ultra-small"> {assignment.date} </span>
                          </Link>
                        </label>
                        <Link to="#" >
                        <span className="task-cat red accent-2">
                          {this.state.courses[0]}
                        </span>
                        </Link>
                      </li>
                     ))}
                        </ul>
                      </div>
                      <div className="col s12 m12 l6">
                        <ul className="task-card collection with-header">
                          <li className="collection-header teal accent-4">
                            <h5 className="task-card-title">
                              Student Submissions
                            </h5>
                          </li>
                          
                          <li className="collection-item dismissable">
                            <label htmlFor="task3">
                              Student Name
                              <Link to="#" className="secondary-content">
                                <span className="ultra-small">Submission Date</span>
                              </Link>
                            </label>
                            <Link to="#">
                            <span className="task-cat teal accent-4">
                              Subject Name | Assignment 1
                            </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = Object.assign({}, TeacherActions);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TeacherScreen)
);
